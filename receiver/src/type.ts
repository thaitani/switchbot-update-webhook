type SwitchBotWebhookBody = SwitchBotWoPresence;

type SwitchBotWoPresence = {
  eventType: "changeReport";
  eventVersion: "1";
  context: SwitchBotWoPresenceContext;
};

type SwitchBotWoPresenceContext = {
  deviceType: "WoPresence";
  deviceMac: string;
  detectionState: "NOT_DETECTED" | "DETECTED";
  battery: number;
  timeOfSample: number;
};

export {
  SwitchBotWebhookBody,
  SwitchBotWoPresence,
  SwitchBotWoPresenceContext,
};
