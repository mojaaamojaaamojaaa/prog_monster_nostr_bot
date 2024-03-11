import dotenv from "dotenv";
import { getPublicKey } from "nostr-tools";

dotenv.config({ path: "../../.env" });

export namespace Config {
  //アカウントの秘密鍵
  export const BOT_SECRET_KEY: string = process.env.BOT_HEX_SEC_KEY ?? "";
  //公開鍵
  export const pubkey: string = getPublicKey(BOT_SECRET_KEY);

  //Postする際のrelay serverの配列
  export const relayURLs: string[] = [
    "wss://relay.damus.io",
    "wss://relay-jp.nostr.wirednet.jp",
  ];
}
