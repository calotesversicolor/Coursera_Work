const UserRepo = require("../repositories/UserRepository");
const ImgRepo = require("../repositories/ImageRepository");

class PageService {
    static async getUsers() {
        const userData = await UserRepo.listUsers();
        return userData;
    }
    
    static async getImages(category) {
        const imageData = await ImgRepo.getImages();

        for (let i = imageData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [imageData[i], imageData[j]] = [imageData[j], imageData[i]];
        }

        if (category == "")
            return imageData;

        return imageData.sort((a, b) => {
            if (a.category === category && b.category !== category) {
                return -1; // a идет перед b
            } else if (a.category !== category && b.category === category) {
                return 1; // b идет перед a
            } else {
                return 0; // порядок не меняется
            }
        });
    }
}

module.exports = PageService;