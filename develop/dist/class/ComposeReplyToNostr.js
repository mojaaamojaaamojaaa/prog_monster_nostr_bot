import { getReplyMessage } from "../config/getReplyMessage.js";
import { BaseNostrEvent } from "./BaseNostrEvent.js";
export class ComposeReplyToNostr extends BaseNostrEvent {
    reply;
    constructor() {
        super();
        this.reply = getReplyMessage();
    }
    /**
     * Reply時のイベントの作成
     * @param {Event} targetEvent リプライ対象のイベント
     * @returns {VerifiedEvent<number>} 署名されたイベントオブジェクト
     */
    composeEvent(targetEvent) {
        // prettier-ignore
        const event = {
            "pubkey": this.pubkey,
            "content": `${this.reply}`,
            "kind": 1,
            "tags": [
                ["p", targetEvent.pubkey],
                ["e", targetEvent.id],
            ],
            "created_at": this.getCurrentUnixTime(),
        };
        //イベントIDの計算・署名
        return this.signEvent(event);
    }
}
