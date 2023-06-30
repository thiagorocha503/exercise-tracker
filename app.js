import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import router from "./router.js"

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use("/", router)

export default app