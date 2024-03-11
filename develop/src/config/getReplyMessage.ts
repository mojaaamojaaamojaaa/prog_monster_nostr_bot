/**
 *リプライ用のメッセージをランダムに取得
 * @return {string} replyMessageを渡す
 */
export function getReplyMessage() {
  const reply =
    replyMessageList[Math.floor(Math.random() * replyMessageList.length)];
  return reply;
}

//replyのバリエーション
const replyMessageList = [
  "Hamatai!",
  "Talk,It's only talk.",
  "chit-chat chit-chat chit-chat",
];
