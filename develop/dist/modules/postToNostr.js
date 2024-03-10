import { ComposePostToNostr } from "../class/ComposePostToNostr.js";
import { Config } from "../config.js";
import { publishEventToRelay } from "./publishEventToRelay.js";
//最後にイベントを公開した時刻を追跡する変数
let lastPublishTime = 0;
//クールタイムを三時間（10800秒）に設定
const COOL_TIME_DUR_SEC = 10800;
/**
 * Nostrプロトコルを使用してイベントを公開する関数。
 * 特定の画像URLを含むイベントを作成し、設定された全リレーに対して公開試みを行う。
 * この関数は、最後の公開から一定のクールダウン期間（3時間）が経過している場合にのみイベントを公開する。
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
        //現在時刻を取得
        const now = Math.floor(Date.now() / 1000); // 秒単位
        //最後にイベントを公開してからの経過時間を計算
        const elapsedTime = now - lastPublishTime;
        //クールタイム内であれば、イベントの公開を中止
        if (elapsedTime < COOL_TIME_DUR_SEC) {
            console.log(`Cooling Down.Please wait ${COOL_TIME_DUR_SEC - elapsedTime} more seconds.`);
            return;
        }
        //ComposePostToNostrクラスのインスタンスを作成
        const composer = new ComposePostToNostr();
        //composeEventメソッドを使用してイベントを作成
        const event = await composer.composeEvent(imageUrl, hash);
        //relayURLを取得
        const relayUrls = Config.relayURLs;
        //relayURLをpublishEventToRelay関数で送信
        const publishPromises = relayUrls.map((relayUrl) => publishEventToRelay(relayUrl, event));
        // すべてのプロミスが解決するのを待つ
        await Promise.allSettled(publishPromises);
        // 最後の公開時刻を更新（成功・失敗に関わらず）
        lastPublishTime = now;
    }
    catch (error) {
        // エラー処理
        console.error("Error creating or publishing event:", error);
    }
}
