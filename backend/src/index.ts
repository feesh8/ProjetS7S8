import express, { Application, Request, Response } from "express";
import axios from "axios";

const app: Application = express();
const port: number = 3000;

app.use(express.json());

app.get("/api/accidents", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://localhost:5001/api/accidents");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching accident data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
