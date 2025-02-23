import express from "express";
import database from "../config/database.js"; // Sesuaikan dengan database.js

const router = express.Router();

router.get("/dashboard-stats", async (req, res) => {
  try {
    const [books] = await database.promise().query("SELECT COUNT(*) AS totalBooks FROM books");
    const [users] = await database.promise().query("SELECT COUNT(*) AS totalUsers FROM users");
    const [activeLoans] = await database.promise().query(
      "SELECT COUNT(*) AS activeLoans FROM peminjaman WHERE status = 'dipinjam'"
    );
    const [totalLoans] = await database.promise().query("SELECT COUNT(*) AS totalLoans FROM peminjaman");

    res.json({
      totalBooks: books[0].totalBooks,
      totalUsers: users[0].totalUsers,
      activeLoans: activeLoans[0].activeLoans,
      totalLoans: totalLoans[0].totalLoans,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
