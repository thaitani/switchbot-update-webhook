import { NGROK_PASSWORD, NGROK_USERNAME } from "./env";
import { getNgrokUrl } from "./ngrok";
import { updateWebhookUrl } from "./switchbot";

(async () => {
  const url = await getNgrokUrl();
  if (url) {
    const _url = url.replace(
      "https://",
      `https://${NGROK_USERNAME}:${NGROK_PASSWORD}@`
    );
    await updateWebhookUrl(_url);
  } else {
    console.warn(`main: url is ${url}`);
  }
})();
