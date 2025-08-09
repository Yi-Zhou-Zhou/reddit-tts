import e from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { router as apiRouter } from "../api/api-router.js";
const app = e();
app.use(e.json());
app.use(cors());
app.use(cookieParser());
app.use('/', apiRouter);
app.listen(8000, () => {
    console.log("Listening on port 80000");
});
//# sourceMappingURL=index.js.map