import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserProfile,
  updateUserPassword,
  deleteUser,
  getAllUsers,
} from "../models/userModel.js";

dotenv.config();

// ✅ Registrasi User
export const register = async (req, res) => {
  try {
    const { nik, nama, alamat, email, noTelp, password, idCard, role } = req.body;

    // Cek jika email sudah terdaftar
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    await createUser(nik, nama, alamat, email, noTelp, hashedPassword, idCard, role);

    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// ✅ Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Email atau password salah" });
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email atau password salah" });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login berhasil", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Ambil Semua User
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Ambil User berdasarkan ID
export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Profil User
export const updateProfile = async (req, res) => {
  try {
    const { nama, email } = req.body;
    await updateUserProfile(req.params.id, nama, email);
    res.json({ message: "Profil berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Password
export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    await updateUserPassword(req.params.id, password);
    res.json({ message: "Password berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Hapus User
export const deleteUserAccount = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
