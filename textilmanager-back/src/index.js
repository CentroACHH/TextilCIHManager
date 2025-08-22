import "dotenv/config";
import connectDB from "./config/database.js";
import app from "./app.js";

const PORT = process.env.PORT || 2000;

// Conexión a la base de datos
connectDB();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
