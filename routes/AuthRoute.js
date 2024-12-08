const UserController = require("../controllers/UserController")
const Middleware = require("../middleware")
const router = require("express").Router()

router.post("/signup", UserController.signup)
router.post("/signin", UserController.signin)
router.post("/change_favorite/:category", Middleware.auth, UserController.changeFavorite)
router.post("/signout", Middleware.auth, UserController.signout)

module.exports = router