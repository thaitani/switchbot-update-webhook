import { load } from "ts-dotenv";

export const { TOKEN, SECRET, NONCE, NGROK_HOST } = load({
  TOKEN: String,
  SECRET: String,
  NONCE: String,
  NGROK_HOST: String,
});
