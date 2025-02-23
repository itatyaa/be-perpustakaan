import database from "../config/database.js";
import bcrypt from "bcryptjs";

// ✅ Registrasi User
export const createUser = async (nik, nama, alamat, email, noTelp, password, idCard, role) => {
  const query = `
    INSERT INTO users (nik, nama, alamat, email, noTelp, password, idCard, role) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  return database.execute(query, [nik, nama, alamat, email, noTelp, password, idCard, role]);
};

// ✅ Ambil User berdasarkan Email
export const getUserByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    database.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) reject(err);
      resolve(results[0]); // Ambil satu user
    });
  });
};

// ✅ Ambil User berdasarkan ID
export const getUserById = async (id) => {
  return new Promise((resolve, reject) => {
    database.query("SELECT id, nama, email FROM users WHERE id = ?", [id], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

// ✅ Update Profil User
export const updateUserProfile = async (id, nama, email) => {
  return new Promise((resolve, reject) => {
    database.query("UPDATE users SET nama = ?, email = ? WHERE id = ?", [nama, email, id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// ✅ Update Password User
export const updateUserPassword = async (id, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    database.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// ✅ Ambil Semua User
export const getAllUsers = async () => {
  return new Promise((resolve, reject) => {
    database.query("SELECT id, nama, email, role FROM users", (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// ✅ Hapus User
export const deleteUser = async (id) => {
  return new Promise((resolve, reject) => {
    database.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};
