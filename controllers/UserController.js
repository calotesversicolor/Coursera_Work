const UserService = require("../services/UserService");

class UserController {
    static async signup(req, res) {
        try {
            const { userName, userEmail, userPassword, userRole, userFavoriteCategory } = req.body;
            if (!userEmail || !userPassword) {
                throw new Error("Электронная почта и пароль являются обязательными.");
            }

            await UserService.signup(userName, userEmail, userPassword, userRole, userFavoriteCategory);
            
            const { _, authToken } = await UserService.signin(userEmail, userPassword);
            res.cookie("token", authToken, { secure: true });

            return res.redirect("/");
        } catch (err) {
            return res.json({ message: "Регистрация не удалась.", error: err.message });
        }
    }

    static async changeFavorite(req, res) {
        try {
            const userEmail = req.user.email;
            const category = req.params.category;

            console.log("change category: ", userEmail, category)

            await UserService.changeFavoriteCategory(userEmail, category);

            return res.redirect("account");
        } catch (err) {
            return res.json({ message: "Авторизация не удалась.", error: err.message });
        }
    }

    static async signin(req, res) {
        try {
            const { userEmail, userPassword } = req.body;
            if (!userEmail || !userPassword) {
                throw new Error("Электронная почта и пароль являются обязательными.");
            }

            const { _, authToken } = await UserService.signin(userEmail, userPassword);
            res.cookie("token", authToken, { secure: true });

            return res.redirect("/");
        } catch (err) {
            return res.json({ message: "Авторизация не удалась.", error: err.message });
        }
    }

    static async signout(req, res) {
        res.clearCookie("token", { secure: true });
        return res.redirect("/");
    }
}

module.exports = UserController;