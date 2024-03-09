// 現在のunixtime(秒単位)を取得
export function currUnixtime() {
    return Math.floor(new Date().getTime() / 1000);
}
// 1番目のコマンドライン引数を取得
export function getCliArg(errorMessage) {
    if (process.argv.length <= 2) {
        console.error(errorMessage);
        process.exit(1);
    }
    return process.argv[2];
}
