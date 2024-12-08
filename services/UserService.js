const UserRepository = require("../repositories/UserRepository");
const jwt = require("jsonwebtoken");

class UserService {
    static async signup(userName, userEmail, userPassword, userRole, userFavoriteCategory) {
        const newUser = await UserRepository.addUser(userName, userEmail, userPassword, userRole, userFavoriteCategory);
        
        if (!newUser) {
            throw new Error("Ошибка в процессе добавления пользователя.");
        }

        return newUser;
    }

    static async getFavoriteCategory(userEmail) {
        try {
            return await UserRepository.getUserFavoriteCategory(userEmail)
        } catch (error) {
            throw error
        }
    }

    static async changeFavoriteCategory(userEmail, category) {
        try {
            await UserRepository.changeUserFavoriteCategory(userEmail, category)
        } catch (error) {
            throw error
        }
    }

    static async signin(userEmail, userPassword) {
        const existingUser = await UserRepository.getUserByEmail(userEmail);
        
        if (!existingUser) {
            throw new Error("Пользователь отсутствует в системе.");
        }

        if (!await UserRepository.verifyPassword(userPassword, existingUser.password)) {
            throw new Error("Указаны неверные данные для входа.");
        }

        const authToken = jwt.sign(
            { id: existingUser.id, name: existingUser.name, email: existingUser.email, role: existingUser.role, favorite_category: existingUser.favorite_category },
            process.env.JWT_SECRET, { expiresIn: "2h" }
        );

        return { user: existingUser, authToken: authToken };
    }
}

module.exports = UserService;