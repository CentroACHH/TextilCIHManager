import { Router } from "express";
import {
  crearReporte,
  obtenerReportes,
  eliminarReporte
} from "../controllers/reportes.controller.js";

const router = Router();

router.post("/", crearReporte);
router.get("/", obtenerReportes);
router.delete("/:id", eliminarReporte);

export default router;
