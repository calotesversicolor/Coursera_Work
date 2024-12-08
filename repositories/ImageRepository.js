const dbPool = require("../imagesDB");

class ImageRepository {
    static async getImages() {
        try {
            const response = await dbPool.query("SELECT id, path, category FROM images");
            return response.rows;
        } catch (err) {
            throw new Error("Не удалось получить доступ к картинкам:" + err.message);
        }
    }

    static async createImage(path, category) {
        try {
            await dbPool.query("INSERT INTO images (path, category) VALUES ($1, $2)", [path, category])
            return { path: path, category: category }
        } catch (error) {
            throw new Error("Ошибка при создании картинки: " + error.message)
        }
    }

    static async removeImageById(id) {
        try {
            await dbPool.query("DELETE FROM images WHERE id = $1", [id]);
        } catch (error) {
            throw new Error("Ошибка при удалении картинки: " + error.message)
        }
    }
}

module.exports = ImageRepository;