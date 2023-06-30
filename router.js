import {Router} from "express"
import path from 'path';
import { fileURLToPath } from 'url';
import UserController from "./controllers/user_controller.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let router = new Router()

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
router.use("/api", UserController)

export default  router