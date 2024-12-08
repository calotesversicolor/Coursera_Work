const PageService = require("../services/PageService");
const UserService = require("../services/UserService");
const ImageRepository = require("../repositories/ImageRepository");

class ViewController {
    static async displayGallery(req, res) {
        try {
            const category = req.user != undefined ? await UserService.getFavoriteCategory(req.user.email) : ""
            const imagesList = await PageService.getImages(category);
            res.render("gallery", { data: imagesList, user: req.user });
        } catch (error) {
            return res.json({ message: "Произошла ошибка при попытке прочитать данные.", error: error.message });
        }
    }

    static async addImage(req, res) {
        try {
            const { path, category } = req.body
            await ImageRepository.createImage(path, category)

            return res.redirect("/")
        } catch (error) {
            return res.json({ message: "Ошибка при добавлении новой картинки", error: error.message })
        }
    }

    static async deleteImage(req, res) {
        try {
            await ImageRepository.removeImageById(req.params.id)

            return res.redirect("/")
        } catch (error) {
            return res.json({ message: "Ошибка при удалении картинки", error: error.message })
        }
    }

    static async showAuthorization(req, res) {
        res.render("authorization", { user: req.user });
    }

    static async showRegistration(req, res) {
        res.render("registration", { user: req.user });
    }
    
    static async showNewImage(req, res) {
        res.render("new_image", { user: req.user });
    }

    static async showAccount(req, res) {
        res.render("account", { user: req.user, favorite_category: await UserService.getFavoriteCategory(req.user.email) });
    }
}

module.exports = ViewController;