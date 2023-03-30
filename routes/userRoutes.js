const router = require('express').Router();
const userController = require("../controllers/userController")

// create
router.post('/create',userController.createUser)
// get all user
router.get("/get", userController.getUsers)

// delete
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;