import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
export var Config;
(function (Config) {
    //Nostr botアカウントの秘密鍵
    Config.BOT_SECRET_KEY = process.env.BOT_HEX_SEC_KEY ?? "";
    //Postする際のrelay serverの配列
    Config.relayURLs = [
        "wss://relay.damus.io",
        "wss://yabu.me",
        "wss://relay-jp.nostr.wirednet.jp",
    ];
})(Config || (Config = {}));
