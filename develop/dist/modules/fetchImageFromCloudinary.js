import { createHash } from "crypto";
import axios from "axios";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("../../../.env") });
// Cloudinary の設定
function configureCloudinary() {
    cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_USER_NAME ?? "",
        api_key: process.env.CLOUDINARY_API_KEY ?? "",
        api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
    });
}
/**
 * Cloudinary から画像を取得し、その画像のハッシュ値を生成。
 *
 * @returns {Promise<{imageUrl: string, hash: string}>} 画像の URL とその SHA-256 ハッシュ値
 * @throws {Error} 画像のダウンロードまたはハッシュ化中にエラーが発生した場合
 */
export async function FetchImageFromCloudinary() {
    try {
        // Cloudinaryの設定を初期化
        configureCloudinary();
        //画像IDを設定
        const imageID = "listener_ife0kd";
        // URL を生成
        const imageUrl = cloudinary.v2.url(imageID, { secure: true });
        //cloudinaryから画像ファイルを取得してhash値を計算
        const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
        //画像のBinary Data
        const imageBuffer = response.data;
        const hash = createHash("sha256").update(imageBuffer).digest("hex");
        return { imageUrl, hash };
    }
    catch (error) {
        console.error("Error downloading or hashing the image:", error);
        throw error;
    }
}
