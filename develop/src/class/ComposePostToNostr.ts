import { UnsignedEvent } from "nostr-tools";
import { BaseNostrEvent } from "./BaseNostrEvent.js";

export class ComposePostToNostr extends BaseNostrEvent {
  /**
   * テキスト投稿イベントを作成
   * @param {string} imageUrl tagに記入するための画像URL
   * @param {string} imageUrl tagに記入するためのhash値
   * @returns {VerifiedEvent<number>} 署名されたイベントオブジェクト
   */
  public composeEvent(imageUrl: string, hash: string) {
    // prettier-ignore
    const event:UnsignedEvent = {
      "content" : `${imageUrl}`,
      "kind" : 1,
      "tags" : [
        [
          "imeta",
          `url ${imageUrl}`,
          "m image/jpeg",
          "alt An example photo hosted on Cloudinary",
          `x ${hash}`,
        ]
      ],
      "created_at" : this.getCurrentUnixTime(),
      "pubkey" : this.pubkey,
    };

    return this.signEvent(event);
  }
}
