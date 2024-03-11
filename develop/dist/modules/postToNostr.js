import { ComposePostToNostr } from "../class/ComposePostToNostr.js";
import { Config } from "../config/config.js";
import { publishEventToRelay } from "./publishEventToRelay.js";
/**
 * Nostrプロトコルを使用してイベントを公開する関数。
 * 特定の画像URLを含むイベントを作成し、設定された全リレーに対して公開試みを行う。
 * 公開成功時には最後の公開時刻が更新される。
 *
 * @async
 * @param {string} imageUrl - 公開するイベントに含める画像のURL
 * @param {string} imageUrl - 画像のhash値
 * @returns {Promise<void>} プロミスが解決するとイベントの公開プロセスが完了
 * @throws {Error} イベントの作成や公開プロセス中にエラーが発生した場合にスロー
 *
 */
export async function postToNostr(imageUrl, hash) {
    try {
        //ComposePostToNostrクラスのインスタンスを作成
        const composer = new ComposePostToNostr();
        //composeEventメソッドを使用してイベントを作成
        const event = await composer.composeEvent(imageUrl, hash);
        //relayURLを取得して送信
        const relayUrls = Config.relayURLs;
        const publishPromises = relayUrls.map((relayUrl) => publishEventToRelay(relayUrl, event));
        //以下は公開成功と失敗のカウント(debug用)
        //すべてのプロミスが解決するのを待つ
        const results = await Promise.allSettled(publishPromises);
        const { successCount, failureCount } = results.reduce((acc, result) => {
            if (result.status === "fulfilled" && result.value === true) {
                //接続に成功かつ投稿が成功した時のみsuccess
                acc.successCount++;
            }
            else {
                acc.failureCount++;
            }
            return acc;
        }, { successCount: 0, failureCount: 0 });
        console.log(`Success Count: ${successCount}, Failure Count: ${failureCount}`);
    }
    catch (error) {
        console.error("Error creating or publishing event:", error);
    }
}
