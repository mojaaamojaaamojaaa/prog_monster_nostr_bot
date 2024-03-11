import { getReplyMessage } from "../config/getReplyMessage.js";
import { BaseNostrEvent } from "./BaseNostrEvent.js";
import { Event, UnsignedEvent } from "nostr-tools";

export class ComposeReplyToNostr extends BaseNostrEvent {
  private reply: string;
  constructor() {
    super();
    this.reply = getReplyMessage();
  }

  /**
   * Reply時のイベントの作成
   * @param {Event} targetEvent リプライ対象のイベント
   * @returns {VerifiedEvent<number>} 署名されたイベントオブジェクト
   */
  public composeEvent(targetEvent: Event) {
    // prettier-ignore
    const event:UnsignedEvent = {
      "pubkey" : this.pubkey,
      "content" : `${this.reply}`,
      "kind" : 1,
      "tags" : [
        ["p", targetEvent.pubkey],
        ["e", targetEvent.id],
      ],
      "created_at" : this.getCurrentUnixTime(),
    };
    //イベントIDの計算・署名
    return this.signEvent(event);
  }
}
