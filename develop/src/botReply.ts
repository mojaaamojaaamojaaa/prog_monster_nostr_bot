import { RelaySubscribe } from "./class/RelaySubscribe.js";
import { Config } from "./config/config.js";

async function main() {
  try {
    const relayURL = Config.relayURLs[1];
    const subscribe = new RelaySubscribe(relayURL);
    await subscribe.init();
  } catch (error) {
    console.error("Error handling event:", error);
  }
}

main();
