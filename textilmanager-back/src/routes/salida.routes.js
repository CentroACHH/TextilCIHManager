// salida.routes.js
import { Router } from 'express';
import {
  registrarSalida,
  obtenerSalidas,
  eliminarSalida
} from '../controllers/salida.controller.js';

const router = Router();

// Rutas para salidas
router.post('/', registrarSalida);
router.get('/', obtenerSalidas);
router.delete('/:id', eliminarSalida);

export default router;
