const ViewController = require("../controllers/ViewController")
const Middleware = require("../middleware")
const router = require("express").Router()

router.get("/", Middleware.ident, ViewController.displayGallery)
router.get("/account", Middleware.auth, ViewController.showAccount)
router.get("/authorization", ViewController.showAuthorization)
router.get("/registration", ViewController.showRegistration)
router.get("/new_image", ViewController.showNewImage)

router.post("/delete_image/:id", Middleware.auth, ViewController.deleteImage)
router.post("/add_image", Middleware.auth, ViewController.addImage)

module.exports = router