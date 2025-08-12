import e from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"
import { router as apiRouter } from "../api/api-router.js"

const CORS_OPTIONS = {
    origin: 'http://localhost:5173',
    credentials: true,
}

const app = e()
app.use(e.json())


app.use(cors(CORS_OPTIONS))
app.use(cookieParser());
app.use('/', apiRouter)

app.listen(3000, () => {
    console.log("Listening on port 3000")
})
