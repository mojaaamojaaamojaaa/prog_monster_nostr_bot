import { finishEvent } from "nostr-tools";
import { currUnixtime } from "../util/util.js";
import { Config } from "../config/config.js";
/**
 * Nostr イベントを作成し、署名するための抽象クラス。
 * このクラスを継承して、具体的なイベントタイプ（リプライ、投稿など）を作成
 */
export class BaseNostrEvent {
    /**
     * Botの秘密鍵。イベント署名に使用
     * @protected
     */
    sk;
    pubkey;
    constructor() {
        this.sk = Config.BOT_SECRET_KEY;
        this.pubkey = Config.pubkey;
    }
    /**
     * 署名付きイベントを返す。
     * @protected
     * @param {UnsignedEvent} event 署名する未署名のイベント。
     * @returns {VerifiedEvent} 署名付きイベント。
     */
    signEvent(event) {
        return finishEvent(event, this.sk);
    }
    /**
     * UnixTimeを計算
     *@returns {number} 秒(ms)単位
     */
    getCurrentUnixTime() {
        return currUnixtime();
    }
}
