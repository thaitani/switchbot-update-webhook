import express, { Application, Request, Response } from "express";
import { publishMotion } from "./mqtt";
import { SwitchBotWebhookBody } from "./type";

const app: Application = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (_req: Request, res: Response) => {
  if (!_req.body.context.deviceType) {
    return res.status(400).send();
  }
  const body = _req.body as SwitchBotWebhookBody;
  switch (body.context.deviceType) {
    case "WoPresence":
      publishMotion(body.context);
  }

  return res.status(200).send();
});

try {
  app.listen(PORT, () => {
    console.log(`dev server running at: http://localhost:${PORT}/`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
