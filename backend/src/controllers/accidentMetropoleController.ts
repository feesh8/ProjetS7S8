import { Request, Response } from "express";
import axios from "axios";

const apiUrl = "http://projets7s8.esir.univ-rennes1.fr:8080";

export class AccidentMetropoleController {
  static async getAccidents(req: Request, res: Response) {
    try {
      const response = await axios.get(`${apiUrl}/de/api/accidents`);
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching accident data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getAccidentById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await axios.get(`${apiUrl}/de/api/accidents/${id}`);
      res.json(response.data);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 404
      ) {
        res.status(404).json({ error: "Not Found" });
      } else {
        console.error("Error fetching accident data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
}
