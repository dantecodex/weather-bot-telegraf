import express from "express"
import { Telegraf } from "telegraf"

const app = express()

app.use(express.json())

app.use('*', (req, res) => {
    console.log(req.body);
})



export default app