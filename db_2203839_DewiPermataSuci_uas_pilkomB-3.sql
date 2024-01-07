-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 07 Jan 2024 pada 13.50
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2203839_DewiPermataSuci_uas_pilkomB`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `peminjamanBuku_DewiPermataSuci`
--

CREATE TABLE `peminjamanBuku_DewiPermataSuci` (
  `id` int(11) NOT NULL,
  `judul_buku` text NOT NULL,
  `jumlah` int(11) NOT NULL,
  `nama_peminjam` text NOT NULL,
  `alamat_peminjam` text NOT NULL,
  `noHp_peminjam` text NOT NULL,
  `tanggal_pinjam` date NOT NULL,
  `tanggal_pengembalian` date NOT NULL,
  `lama_pinjam` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `peminjamanBuku_DewiPermataSuci`
--

INSERT INTO `peminjamanBuku_DewiPermataSuci` (`id`, `judul_buku`, `jumlah`, `nama_peminjam`, `alamat_peminjam`, `noHp_peminjam`, `tanggal_pinjam`, `tanggal_pengembalian`, `lama_pinjam`) VALUES
(21, 'Laskar Pelangi', 1, 'Laras', 'Cicalengka', '08986843600', '2024-01-06', '2024-01-08', '2 hari'),
(22, 'Administrasi Bisnis', 1, 'Putri', 'Bandung', '081324563783', '2024-01-06', '2024-01-10', '4 hari'),
(23, 'Lokal Area Network', 2, 'Aldi', 'Cimahi', '085867452435', '2024-01-06', '2024-01-08', '2 hari'),
(24, 'Metode Numerik', 3, 'Elsha', 'Ujung Berung', '087756784567', '2024-01-06', '2024-01-08', '2 hari'),
(25, 'Algoritma Pemrograman', 1, 'Esa', 'Ciwaruga', '087756741432', '2024-01-04', '2024-01-07', '3 Hari'),
(26, 'Psikologi', 1, 'Lutfia', 'Bandung', '085345672341', '2024-01-04', '2024-01-07', '3 Hari'),
(27, 'P3K', 2, 'Milenda', 'Cimahi', '087765764321', '2024-01-05', '2024-01-06', '1 hari'),
(28, 'Resep Masakan', 1, 'Dewi', 'Bandung', '08986843600', '2024-01-06', '2024-01-09', '3 hari'),
(29, 'Komputer Abad21', 1, 'Kayla', 'Bandung', '087765764534', '2024-01-06', '2024-01-07', '1 hari');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `peminjamanBuku_DewiPermataSuci`
--
ALTER TABLE `peminjamanBuku_DewiPermataSuci`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `peminjamanBuku_DewiPermataSuci`
--
ALTER TABLE `peminjamanBuku_DewiPermataSuci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
