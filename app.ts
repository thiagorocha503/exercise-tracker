import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import router from "./router"

const app = express()
// view engine
app.set('view engine', 'ejs');
// views
app.set('views', './views');
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use("/", router)

export default app