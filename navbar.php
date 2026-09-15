<?php
$current_page = basename($_SERVER['PHP_SELF']);
?>

<style>
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: #f4f7fb;
    }

    .navbar {
        background: #007bff;
        display: flex;
        align-items: center;
        padding: 0 30px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .navbar-brand {
        color: white;
        text-decoration: none;
        font-size: 20px;
        font-weight: bold;
        padding: 17px 0;
        margin-right: 30px;
    }

    .navbar-menu {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        flex: 1;
    }

    .navbar-menu li a {
        display: block;
        color: rgba(255,255,255,0.9);
        text-decoration: none;
        padding: 20px 18px;
        font-size: 14px;
        font-weight: bold;
        transition: 0.2s;
    }

    .navbar-menu li a:hover,
    .navbar-menu li a.active {
        background: rgba(255,255,255,0.2);
        color: white;
    }

    .navbar-user {
        display: flex;
        align-items: center;
        gap: 15px;
        color: white;
        font-size: 14px;
    }

    .btn-logout {
        background: #dc3545;
        color: white !important;
        text-decoration: none;
        padding: 8px 14px;
        border-radius: 5px;
        font-size: 13px;
        font-weight: bold;
    }

    .btn-logout:hover {
        background: #bb2d3b;
    }

    @media (max-width: 800px) {
        .navbar {
            flex-direction: column;
            padding: 10px;
        }

        .navbar-brand {
            margin-right: 0;
        }

        .navbar-menu {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
        }

        .navbar-menu li a {
            padding: 12px;
        }

        .navbar-user {
            margin: 10px 0;
        }
    }
</style>

<nav class="navbar">

    <a href="index.php" class="navbar-brand">
        Absensi Siswa
    </a>

    <ul class="navbar-menu">

        <li>
            <a href="index.php"
               class="<?php echo $current_page == 'index.php' ? 'active' : ''; ?>">
                Dashboard
            </a>
        </li>

        <li>
            <a href="input_absensi.php"
               class="<?php echo $current_page == 'input_absensi.php' ? 'active' : ''; ?>">
                Input Absensi
            </a>
        </li>

        <li>
            <a href="tampil_siswa.php"
               class="<?php echo in_array($current_page, [
                   'tampil_siswa.php',
                   'tambah_siswa.php',
                   'edit_siswa.php'
               ]) ? 'active' : ''; ?>">
                Data Siswa
            </a>
        </li>

    </ul>

    <div class="navbar-user">

        <span>
            Halo,
            <strong>
                <?php
                echo isset($_SESSION['username'])
                    ? htmlspecialchars($_SESSION['username'])
                    : 'Admin';
                ?>
            </strong>
        </span>

        <a href="logout.php"
           class="btn-logout"
           onclick="return confirm('Apakah Anda yakin ingin keluar?')">
            Logout
        </a>

    </div>

</nav>
