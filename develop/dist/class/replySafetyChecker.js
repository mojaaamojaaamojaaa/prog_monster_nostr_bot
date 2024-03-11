import { currUnixtime } from "../util/util.js";
/**
 * 暴走・無限リプライループを避ける為のクラス
 */
export class ReplySafetyChecker {
    static COOL_TIME_DUR_SEC = 60; // リプライクールタイム（秒）
    lastReplyTimePerPubkey = new Map(); // 公開鍵ごとの最後のリプライ時刻を保持するMap
    /**
     * 指定されたイベントに対してリプライしても安全かどうかを判定。
     * イベントの発行時刻が古すぎる、または最近リプライしたばかりでクールタイム中の場合、安全でないと判定。
     *
     * @param {Event} event - 判定対象のイベント。
     * @returns {boolean} リプライが安全であればtrue、そうでなければfalse。
     */
    isSafeToReply(event) {
        const now = currUnixtime();
        const { pubkey, created_at } = event;
        // イベントの発行時刻がクールタイムより前の場合はリプライしない
        if (created_at < now - ReplySafetyChecker.COOL_TIME_DUR_SEC) {
            return false;
        }
        // 最後のリプライ時刻を取得し、クールタイム内であればリプライしない
        const lastReplyTime = this.lastReplyTimePerPubkey.get(pubkey);
        if (lastReplyTime !== undefined &&
            now - lastReplyTime < ReplySafetyChecker.COOL_TIME_DUR_SEC) {
            return false;
        }
        // 安全と判定した場合、最後のリプライ時刻を更新
        this.lastReplyTimePerPubkey.set(pubkey, now);
        return true;
    }
}
