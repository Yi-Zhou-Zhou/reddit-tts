import e from "express";
import cors from "cors"

const app = e()
app.use(cors())

app.get('/' ,(req, res) => {
    res.send("Welcome")
})
app.listen(8000, () => {
    console.log("Listening on port 80000")
})
