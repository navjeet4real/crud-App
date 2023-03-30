const router = require('express').Router();
const userController = require("../controllers/userController")


router.post('/create',userController.createUser)
router.get("/get", userController.getUsers)


module.exports = router;