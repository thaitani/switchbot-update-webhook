import { getNgrokUrl } from "./ngrok";
import { updateWebhookUrl } from "./switchbot";

(async () => {
  const url = await getNgrokUrl();
  if (url) {
    await updateWebhookUrl(url);
  } else {
    console.warn(`main: url is ${url}`);
  }
})();
