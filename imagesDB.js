const { Pool } = require("pg")

const pool = new Pool({
    host: "localhost",
    database: "postgres",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const pushImages = async () => {
    try {
        const result = await pool.query("SELECT COUNT(*) FROM images")
        if (parseInt(result.rows[0].count) != 0) {
            return
        }

        for (let i = 1; i <= 3; i++) {
            const category = "sport";
            await pool.query("INSERT INTO images (path, category) VALUES ($1, $2)", [`${category}/image${i}.jpg`, category])
        }

        for (let i = 1; i <= 3; i++) {
            const category = "cars";
            await pool.query("INSERT INTO images (path, category) VALUES ($1, $2)", [`${category}/image${i}.jpg`, category])
        }

        for (let i = 1; i <= 3; i++) {
            const category = "sky";
            await pool.query("INSERT INTO images (path, category) VALUES ($1, $2)", [`${category}/image${i}.jpg`, category])
        }

        for (let i = 1; i <= 3; i++) {
            const category = "animals";
            await pool.query("INSERT INTO images (path, category) VALUES ($1, $2)", [`${category}/image${i}.jpg`, category])
        }

    } catch (error) {
        console.error("Ошибка добавления картинок:", error)
    }
}

const createImagesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS images (
            id SERIAL PRIMARY KEY,
            path VARCHAR(255) NOT NULL,
            category VARCHAR(10) NOT NULL DEFAULT 'none' CHECK (category IN ('none', 'animals', 'sport', 'sky', 'cars'))
        )
    `

    try {
        await pool.query(query)
        pushImages()
    } catch (error) {
        console.error("Ошибка при создании таблицы картинок:", error)
    }
}

createImagesTable()

process.on("SIGINT", async () => {
    await pool.end()
})

module.exports = pool