import dotenv from "dotenv";
import { getPublicKey } from "nostr-tools";
dotenv.config({ path: "../../.env" });
export var Config;
(function (Config) {
    //アカウントの秘密鍵
    Config.BOT_SECRET_KEY = process.env.BOT_HEX_SEC_KEY ?? "";
    //公開鍵
    Config.pubkey = getPublicKey(Config.BOT_SECRET_KEY);
    //Postする際のrelay serverの配列
    Config.relayURLs = [
        "wss://relay.damus.io",
        "wss://relay-jp.nostr.wirednet.jp",
    ];
})(Config || (Config = {}));
