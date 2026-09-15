<?php

include 'cek_login.php';
include 'koneksi.php';

?>

<!DOCTYPE html>
<html lang="id">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Dashboard - Absensi Siswa</title>

    <style>

        .container {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            margin-bottom: 25px;
        }

        .header h1 {
            margin-bottom: 5px;
        }

        .header p {
            color: #777;
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }

        .card {
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        .card h3 {
            margin-top: 0;
            color: #555;
        }

        .card-number {
            font-size: 32px;
            font-weight: bold;
            color: #007bff;
        }

        @media (max-width: 700px) {
            .cards {
                grid-template-columns: 1fr;
            }
        }

    </style>

</head>

<body>

<?php include 'navbar.php'; ?>

<div class="container">

    <div class="header">

        <h1>Dashboard</h1>

        <p>
            Selamat datang di sistem absensi siswa.
        </p>

    </div>

    <div class="cards">

        <div class="card">
            <h3>Total Siswa</h3>
            <div class="card-number">0</div>
        </div>

        <div class="card">
            <h3>Hadir Hari Ini</h3>
            <div class="card-number">0</div>
        </div>

        <div class="card">
            <h3>Tidak Hadir</h3>
            <div class="card-number">0</div>
        </div>

    </div>

</div>

</body>

</html>
