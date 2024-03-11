import { finishEvent, VerifiedEvent, UnsignedEvent } from "nostr-tools";
import { currUnixtime } from "../util/util.js";
import { Config } from "../config/config.js";

/**
 * Nostr イベントを作成し、署名するための抽象クラス。
 * このクラスを継承して、具体的なイベントタイプ（リプライ、投稿など）を作成
 */
export abstract class BaseNostrEvent {
  /**
   * Botの秘密鍵。イベント署名に使用
   * @protected
   */
  protected sk: string;
  protected pubkey: string;

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
  protected signEvent(event: UnsignedEvent): VerifiedEvent {
    return finishEvent(event, this.sk);
  }

  /**
   * UnixTimeを計算
   *@returns {number} 秒(ms)単位
   */
  protected getCurrentUnixTime(): number {
    return currUnixtime();
  }

  /**
   * イベントの作成処理。具体的な実装は派生クラスで定義する。
   * @abstract
   * @param {any} args イベント作成に必要な引数。
   * @returns {VerifiedEvent} 作成された署名付きイベント。
   */
  abstract composeEvent(...args: any): VerifiedEvent;
}
