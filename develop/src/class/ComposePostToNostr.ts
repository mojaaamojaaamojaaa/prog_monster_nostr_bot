import { Config } from "../config.js";
import { currUnixtime } from "../util/util.js";
import { VerifiedEvent, finishEvent, getPublicKey } from "nostr-tools";

export class ComposePostToNostr {
  private sk: string; //Secret Key
  constructor() {
    this.sk = Config.BOT_SECRET_KEY;
  }

  /**
   * テキスト投稿イベントを作成
   * @param {string} imageUrl tagに記入するための画像URL
   * @param {string} imageUrl tagに記入するためのhash値
   * @returns {VerifiedEvent<number>} 署名されたイベントオブジェクト
   */
  public composeEvent(imageUrl: string, hash: string): VerifiedEvent<number> {
    const pubkey = getPublicKey(this.sk);
    // prettier-ignore
    const event = {
      "pubkey" : pubkey,
      "content" : `Test,get the Picture from Cloudinary ${imageUrl}`,
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
      "created_at" : currUnixtime(),
    };
    //イベントIDの計算・署名
    return finishEvent(event, this.sk);
  }
}
