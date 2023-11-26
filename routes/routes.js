const express=require("express")
const router = express.Router()
const {signup,login}=require("../controllers/UserController")
const protect=require("../middleware/authenticate")
const {createTask,updateTask,getSingleTask,getAllTask,deleteTask}=require("../controllers/TaskController")

router.post("/signup",signup);
router.post("/login",login);
router.post("/createTask",protect,createTask);
router.get("/getAllTask",protect,getAllTask);
router.put("/updateTask",protect,updateTask);
router.delete("/deleteTask",protect,deleteTask);
router.get("/getSingleTask",protect,getSingleTask);

module.exports=router