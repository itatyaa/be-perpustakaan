-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 23 Feb 2025 pada 18.18
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perpustakaan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `penulis` varchar(100) NOT NULL,
  `tahun_terbit` int(11) NOT NULL,
  `penerbit` varchar(100) NOT NULL,
  `jumlah_halaman` int(11) NOT NULL,
  `isbn` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `books`
--

INSERT INTO `books` (`id`, `judul`, `penulis`, `tahun_terbit`, `penerbit`, `jumlah_halaman`, `isbn`, `created_at`, `updated_at`) VALUES
(1, 'Pemrograman JavaScript', 'Eko Kurniawan', 2022, 'Gramedia', 320, '978-602-03-1234-1', '2025-02-06 17:17:37', '2025-02-06 17:17:37'),
(2, 'Laravel untuk Pemula', 'Dian Kusuma', 2021, 'Informatika', 280, '978-602-03-5678-2', '2025-02-06 17:17:37', '2025-02-06 17:17:37');

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `peminjaman`
--

CREATE TABLE `peminjaman` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `tanggal_pinjam` date NOT NULL,
  `tanggal_kembali` date NOT NULL,
  `status` enum('dipinjam','dikembalikan') DEFAULT 'dipinjam',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `nik` varchar(16) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `noTelp` varchar(15) DEFAULT NULL,
  `idCard` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `role`, `created_at`, `updated_at`, `nik`, `alamat`, `noTelp`, `idCard`) VALUES
(1, 'Admin Perpustakaan', 'admin@perpus.com', '$2a$10$Qe/PhL61Cdx6Bf38wY8U/uqSnxnbOdReu2fEplfbyiTV1v1P3F98e', 'admin', '2025-02-06 17:16:55', '2025-02-06 17:16:55', NULL, NULL, NULL, NULL),
(2, 'Chandra', 'chandra@perpus.com', '$2a$10$Qe/PhL61Cdx6Bf38wY8U/uqSnxnbOdReu2fEplfbyiTV1v1P3F98e', 'user', '2025-02-06 17:16:55', '2025-02-06 17:16:55', NULL, NULL, NULL, NULL),
(6, 'chandra', 'chandra@gmail.com', '$2a$10$PNgmHeZN2iwq4jXqHubgnOtaONYy1NE8SeUcbQw8AWqzn42tt9QGi', '', '2025-02-10 08:49:44', '2025-02-10 08:49:44', '2223119586', 'bandung', '085647884233', '');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `isbn` (`isbn`);

--
-- Indeks untuk tabel `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_password_reset` (`email`);

--
-- Indeks untuk tabel `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nik` (`nik`),
  ADD UNIQUE KEY `idCard` (`idCard`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `peminjaman`
--
ALTER TABLE `peminjaman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `password_resets`
--
ALTER TABLE `password_resets`
  ADD CONSTRAINT `fk_password_reset` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD CONSTRAINT `peminjaman_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `peminjaman_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
