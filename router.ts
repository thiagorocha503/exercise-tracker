import {Router, Request, Response} from "express"
import UserController from "./controllers/user_controller"

let router = Router()

router.get('/', (_: Request, res: Response) => {
  res.render('index')
});
router.use("/api", UserController)

export default  router