import { VerifiedEvent } from "nostr-tools";
import { ComposePostToNostr } from "../class/ComposePostToNostr.js";
import { Config } from "../config.js";
import { publishEventToRelay } from "./publishEventToRelay.js";

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

export async function postToNostr(imageUrl: string, hash: string) {
  try {
    //ComposePostToNostrクラスのインスタンスを作成
    const composer: ComposePostToNostr = new ComposePostToNostr();

    //composeEventメソッドを使用してイベントを作成
    const event: VerifiedEvent<number> = await composer.composeEvent(
      imageUrl,
      hash
    );

    //relayURLを取得
    const relayUrls: string[] = Config.relayURLs;
    //relayURLをpublishEventToRelay関数で送信
    const publishPromises = relayUrls.map((relayUrl) =>
      publishEventToRelay(relayUrl, event)
    );

    // すべてのプロミスが解決するのを待つ
    const results = await Promise.allSettled(publishPromises);
    // 接続の成功と失敗のカウント
    // prettier-ignore
    const successCount = results.filter((result) => result.status === "fulfilled").length;
    // prettier-ignore
    const failureCount = results.filter((result) => result.status === "rejected").length;

    // 結果の表示
    console.log(
      `Event publishing results: ${successCount} successful, ${failureCount} failed.`
    );
  } catch (error) {
    // エラー処理
    console.error("Error creating or publishing event:", error);
  }
}
