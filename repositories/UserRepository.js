const hashLib = require("bcrypt");
const databasePool = require("../usersDB");

class UserRepository {
    static async getUserByEmail(userEmail) {
        try {
            const response = await databasePool.query("SELECT * FROM users WHERE email = $1", [userEmail]);
            return response.rows[0];
        } catch (err) {
            throw new Error("Ошибка в процессе поиска пользователя:" + err.message);
        }
    }

    static async addUser(userName, userEmail, userPassword, userRole, userFavoriteCategory) {
        try {
            if (await this.getUserByEmail(userEmail))
                throw new Error("С таким email уже имеется зарегистрированный пользователь.");

            const encryptedPassword = await hashLib.hash(userPassword, 10);
            await databasePool.query(
                "INSERT INTO users (name, email, password, role, favorite_category) VALUES ($1, $2, $3, $4, $5)",
                [userName, userEmail, encryptedPassword, userRole, userFavoriteCategory]
            );

            return { name: userName, email: userEmail, role: userRole, favorite_category: userFavoriteCategory };
        } catch (err) {
            throw new Error("Ошибка при добавлении нового пользователя:" + err.message);
        }
    }

    static async getUserFavoriteCategory(userEmail) {
        try {
            const result = await databasePool.query("SELECT favorite_category FROM users WHERE email = $1", [userEmail]);
            
            if (result.rows.length > 0) {
                return result.rows[0].favorite_category;
            } else {
                throw new Error("Категория не найдена");
            }
        } catch (err) {
            throw new Error("Ошибка при получении любимой категории у пользователя: " + err.message);
        }
    }

    static async changeUserFavoriteCategory(userEmail, category) {
        try {
            await databasePool.query("UPDATE users SET category = $1 WHERE email = $2", [category, userEmail]);
        } catch (err) {
            throw new Error("Ошибка при изменении любимой категории у пользователя:" + err.message);
        }
    }

    static async deleteUserById(userId) {
        try {
            await databasePool.query("DELETE FROM users WHERE id = $1", [userId]);
        } catch (err) {
            throw new Error("Не удалось удалить пользователя:" + err.message);
        }
    }

    static async listUsers() {
        try {
            const response = await databasePool.query("SELECT id, name, email, role FROM users");
            return response.rows;
        } catch (err) {
            throw new Error("Не удалось извлечь информацию о пользователях:" + err.message);
        }
    }

    static async verifyPassword(userPassword, hashedPassword) {
        return await hashLib.compare(userPassword, hashedPassword);
    }
}

module.exports = UserRepository;