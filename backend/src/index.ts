import express, { Application, Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import { createServer } from "http";

const app: Application = express();
const port: number = 3001;

app.use(express.json());
app.use(cors());

app.get("/api/accidents", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://localhost:5001/api/accidents");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching accident data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/accidents/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `http://localhost:5001/api/accidents/${id}`
    );
    res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      res.status(404).json({ error: "Not Found" });
    } else {
      console.error("Error fetching accident data:", error);
      res.status(500).json({ error: "Internal Server Error" }); 
    }
  }
});


const listener = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
  
  export { app, listener };