import { Config } from "../config/config.js";
import { currUnixtime } from "../util/util.js";
import { finishEvent, getPublicKey } from "nostr-tools";
export class ComposePostToNostr {
    sk; //Secret Key
    constructor() {
        this.sk = Config.BOT_SECRET_KEY;
    }
    /**
     * テキスト投稿イベントを作成
     * @param {string} imageUrl tagに記入するための画像URL
     * @param {string} imageUrl tagに記入するためのhash値
     * @returns {VerifiedEvent<number>} 署名されたイベントオブジェクト
     */
    composeEvent(imageUrl, hash) {
        const pubkey = getPublicKey(this.sk);
        // prettier-ignore
        const event = {
            "pubkey": pubkey,
            "content": `${imageUrl}`,
            "kind": 1,
            "tags": [
                [
                    "imeta",
                    `url ${imageUrl}`,
                    "m image/jpeg",
                    "alt An example photo hosted on Cloudinary",
                    `x ${hash}`,
                ]
            ],
            "created_at": currUnixtime(),
        };
        //イベントIDの計算・署名
        return finishEvent(event, this.sk);
    }
}
