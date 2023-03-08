import * as mqtt from "mqtt";
import { SwitchBotWoPresenceContext } from "./type";
const client = mqtt.connect("mqtt://mqtt:1883");

client.on("error", (error) => {
  console.error("mqtt", error);
});

client.on("end", () => {
  console.info("mqtt connect end");
});
client.on("connect", () => {
  console.log("mqtt connect");
});

function _publish(execute: () => void) {
  if (client.connected) {
    console.log("mqtt client connected");
    execute();
  } else {
    console.log("mqtt reconnect");
    execute();
  }
}

function publishMotion(context: SwitchBotWoPresenceContext) {
  _publish(() => {
    client.publish(
      `motion/${context.deviceMac}`,
      context.detectionState === "DETECTED" ? "true" : "false"
    );
    client.publish(`battery/${context.deviceMac}`, context.battery.toString());
  });
}

export { publishMotion };
