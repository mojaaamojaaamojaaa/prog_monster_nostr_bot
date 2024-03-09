import { VerifiedEvent, relayInit } from "nostr-tools";
import "websocket-polyfill";
/**
 * 指定されたNostrリレーURLにイベントを非同期で公開する。
 * 成功した場合はtrueを返し、失敗した場合はfalseを返す。
 * @param {string} relayUrl イベントを公開するNostrリレーのURL
 * @param {object} event Nostrイベントオブジェクト
 * @returns {Promise<boolean>} イベントの公開が成功したかどうかを示すPromise。
 * @throws 通信エラーやリレーからの応答の失敗など、イベントの公開中に発生したエラーをキャッチしてコンソールに表示
 */
export const publishEventToRelay = async (
  relayUrl: string,
  event: VerifiedEvent
) => {
  const relay = relayInit(relayUrl);
  try {
    //relayに接続
    await relay.connect();
    //eventの公開
    await relay.publish(event);
    console.log(`Event successfully published to ${relayUrl}`);
    return true;
  } catch (error) {
    console.error(`Failed to publish event to ${relayUrl}:`, error);
    return false;
  }
};
