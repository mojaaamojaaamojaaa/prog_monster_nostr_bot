import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export namespace Config {
  //Nostr botアカウントの秘密鍵
  export const BOT_SECRET_KEY: string = process.env.BOT_HEX_SEC_KEY ?? "";

  //Postする際のrelay serverの配列
  export const relayURLs: string[] = [
    "wss://relay.damus.io",
    "wss://relay-jp.nostr.wirednet.jp",
  ];
}
