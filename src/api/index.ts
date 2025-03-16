import { app } from '#lib/app'
import express from 'express'
import expressWs from 'express-ws'

expressWs(app)

const router = express.Router()

router.ws('/', (ws, req) => {
    ws.send("Server Connected.");
    ws.on('message', msg => {
        console.log(msg)
    })
})

export default router