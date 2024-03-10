import { FetchImageFromCloudinary } from "./modules/fetchImageFromCloudinary.js";
import { postToNostr } from "./modules/postToNostr.js";
async function main() {
    try {
        const { imageUrl, hash } = await FetchImageFromCloudinary();
        console.log(imageUrl, hash);
        await postToNostr(imageUrl, hash);
    }
    catch (error) {
        console.error("An error occurred:", error);
    }
}
main();
//3時間ごとに実行<-もしかしたら使うかも？？？
//setInterval(main, 3 * 60 * 60 * 1000);
