import express from "express";
import cors from "cors";
import tasks from "./routes/tasks.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasks);

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
