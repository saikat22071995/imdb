const express=require('express')
const router=express.Router()
const {authenticateUser}=require('../app/middleware/authentication')
const actorController=require('../app/controllers/actorsController')
const movieController=require('../app/controllers/moviesController')
const userController=require('../app/controllers/usersController')
const producerController=require('../app/controllers/producersController')
const {upload}=require('../app/middleware/multer')

router.get('/producers',authenticateUser,producerController.list)
router.get('/producers/:id',authenticateUser,producerController.show)
router.post('/producers/new',authenticateUser,producerController.create)
router.put('/producers/edit/:id',authenticateUser,producerController.update)
router.delete('/producers/:id',authenticateUser,producerController.destroy)


router.get('/actors',authenticateUser,actorController.list)
router.get('/actors/:id',authenticateUser,actorController.show)
router.post('/actors/new',authenticateUser,actorController.create)
router.put('/actors/edit/:id',authenticateUser,actorController.update)
router.delete('/actors/:id',authenticateUser,actorController.destroy)



router.get('/movies',authenticateUser,movieController.list)
router.get('/movies/:id',authenticateUser,movieController.show)
router.post('/movies/new',upload.single('poster'),authenticateUser,movieController.create)
router.put('/movies/edit/:id',upload.single('poster'),authenticateUser,movieController.update)
router.delete('/movies/:id',authenticateUser,movieController.destroy)


router.post('/users/register',userController.create)
router.post('/users/login',userController.loginCreate)
router.get('/users/account',authenticateUser,userController.account)
router.delete('/users/logout',authenticateUser,userController.logout)

module.exports=router