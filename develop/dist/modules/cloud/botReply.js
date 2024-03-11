import { Config } from "../../config/config.js";
import { ComposeReplyToNostr } from "../../class/ComposeReplyToNostr.js";
import { relayInit } from "nostr-tools";
async function main() {
    //relay配列からrelayのURLを取得
    const watchingAllRelays = Config.relayURLs;
    watchingAllRelays.forEach((watchingRelay) => {
        relayInit(watchingRelay);
    });
    console.log(watchingAllRelays);
    const composer = new ComposeReplyToNostr();
}
main();
