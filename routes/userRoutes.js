const router = require('express').Router();
const userController = require("../controllers/userController")

// create
router.post('/create',userController.createUser)
// get all user
router.get("/get", userController.getUsers)
// get just one user
router.get("/get_user/:id", userController.getUserById)
// delete
router.delete("/delete/:id", userController.deleteUser);
// edit user
router.post("/edit", userController.editUser)

module.exports = router;