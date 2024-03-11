import { Config } from "../config/config.js";
import { relayInit } from "nostr-tools";
import { ComposeReplyToNostr } from "../class/ComposeReplyToNostr.js";
import { publishEventToRelay } from "../modules/publishEventToRelay.js";
import { ReplySafetyChecker } from "../class/replySafetyChecker.js";
/**
 * 特定のrelayURLでNostrリレーからイベントを購読し、リプライを処理するクラス。
 */
export class RelaySubscribe {
    checkReply;
    pubkey;
    relayURL;
    relay;
    /**
     * RelaySubscriberクラスのコンストラクタ。
     * @param {string} relayURL - NostrリレーのURL。
     */
    constructor(relayURL) {
        this.checkReply = new ReplySafetyChecker();
        this.pubkey = Config.pubkey;
        this.relayURL = relayURL;
    }
    /**
     * リレーとの接続を初期化し、購読を設定する。
     */
    async init() {
        try {
            this.relay = await relayInit(this.relayURL);
            this.relay.on("error", () => {
                console.error("Relay connection error");
            });
            await this.relay.connect();
            this.setupSubscription();
        }
        catch (error) {
            console.error("Initialization error:", error);
        }
    }
    /**
     * Nostrリレーからの購読を設定し、イベントに対してリプライする。
     */
    setupSubscription() {
        if (!this.relay) {
            return console.error("Relay has not been initialized.");
        }
        const subscription = this.relay.sub([{ kinds: [1], "#p": [this.pubkey] }]);
        subscription.on("event", (ev) => {
            try {
                if (this.checkReply.isSafeToReply(ev)) {
                    const composer = new ComposeReplyToNostr();
                    const replyPost = composer.composeEvent(ev);
                    publishEventToRelay(this.relayURL, replyPost);
                }
            }
            catch (error) {
                console.error("Error handling event:", error);
            }
        });
    }
}
