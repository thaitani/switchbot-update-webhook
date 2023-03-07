import * as crypto from "node:crypto";
import fetch from "node-fetch";
import { NONCE, SECRET, TOKEN } from "./env";

// どうやらWebhookは複数登録できないらしい
// なのでこの処理はupdateWebhookですべて代替できる
// でもめんどくさいのでこのまま
async function updateWebhookUrl(url: string) {
  const urls = await queryWebhook();
  console.log(`update webhook url: webhooks => ${urls}`);

  let sameUrlExisting = false;
  for await (const _url of urls) {
    if (_url === url) {
      sameUrlExisting = true;
      break;
    }
    await deleteWebHook(_url);
  }
  if (sameUrlExisting) {
    console.log(`update webhook url: ${url} is existing`);
    return;
  }
  await setupWebhook(url);
}

async function setupWebhook(url: string) {
  const setupWebhookBody = JSON.stringify({
    action: "setupWebhook",
    url: url,
    deviceList: "ALL",
  });

  const setupResult = await fetch(
    "https://api.switch-bot.com/v1.1/webhook/setupWebhook",
    {
      body: setupWebhookBody,
      method: "POST",
      headers: {
        ...createHeaders(),
        "Content-Length": setupWebhookBody.length.toString(),
      },
    }
  );

  if (setupResult.ok) {
    console.info(`setup webhook: ${url}`);
  } else {
    throw Error("failed setupWebhook");
  }
}

async function queryWebhook(): Promise<string[]> {
  const queryBody = JSON.stringify({
    action: "queryUrl",
  });
  const query = await fetch(
    "https://api.switch-bot.com/v1.1/webhook/queryWebhook",
    {
      body: queryBody,
      method: "POST",
      headers: {
        ...createHeaders(),
        "Content-Length": queryBody.length.toString(),
      },
    }
  );
  const queryJson = await query.json();

  const urls = queryJson.body.urls;
  if (urls) {
    return urls as string[];
  }
  return [];
}

async function deleteWebHook(url: string) {
  if (!url) {
    console.warn(`deleteWebhook: url is ${url}`);
    return;
  }
  const body = JSON.stringify({
    action: "deleteWebhook",
    url: url,
  });
  const result = await fetch(
    "https://api.switch-bot.com/v1.1/webhook/deleteWebhook",
    {
      body: body,
      method: "POST",
      headers: {
        ...createHeaders(),
        "Content-Length": body.length.toString(),
      },
    }
  );
  if (result.ok) {
    console.info(`delete webhook: ${url}`);
  } else {
    throw Error("failed deleteWebhook");
  }
}

function createHeaders() {
  const token = TOKEN;
  const secret = SECRET;
  const nonce = NONCE;
  const t = Date.now();
  const data = token + t + nonce;
  const signTerm = crypto
    .createHmac("sha256", secret)
    .update(Buffer.from(data, "utf-8"))
    .digest();
  const sign = signTerm.toString("base64");

  return {
    "Content-Type": "application/json",
    Authorization: token,
    sign: sign,
    nonce: nonce,
    t: t.toString(),
  };
}

export { updateWebhookUrl };
