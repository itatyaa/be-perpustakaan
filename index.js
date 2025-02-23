import dotenv from "dotenv";
import app from "./src/app.js";
import database from "./src/config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Cek koneksi database sebelum menjalankan server
database.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("✅ Connected to database");

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
