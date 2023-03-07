import { load } from "ts-dotenv";

export const {
  TOKEN,
  SECRET,
  NONCE,
  NGROK_HOST,
  NGROK_USERNAME,
  NGROK_PASSWORD,
} = load({
  TOKEN: String,
  SECRET: String,
  NONCE: String,
  NGROK_HOST: String,
  NGROK_USERNAME: String,
  NGROK_PASSWORD: String,
});
