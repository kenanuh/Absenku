function requireLogin() {
    if (!localStorage.getItem("username")) {
        location.replace("login.html");
    }
}


function today() {
    return new Date().toISOString().slice(0, 10);
}


function renderNavbar() {

    const n = document.querySelector(".navbar");

    if (!n) return;

    const page =
        location.pathname.split("/").pop() || "index.html";

    const user =
        localStorage.getItem("username") || "Admin";


    n.innerHTML = `
        <a href="index.html" class="navbar-brand">
            Absenku
        </a>

        <ul class="navbar-menu">

            <li>
                <a href="index.html"
                   class="${page === "index.html" ? "active" : ""}">
                    Dashboard
                </a>
            </li>

            <li>
                <a href="input_absensi.html"
                   class="${page === "input_absensi.html" ? "active" : ""}">
                    Input Absensi
                </a>
            </li>

            <li>
                <a href="tampil_siswa.html"
                   class="${[
                       "tampil_siswa.html",
                       "tambah_siswa.html",
                       "edit_siswa.html"
                   ].includes(page) ? "active" : ""}">
                    Data Siswa
                </a>
            </li>

        </ul>

        <div class="navbar-user">

            <span>
                Halo,
                <strong>${escapeHtml(user)}</strong>
            </span>

            <a href="logout.html"
               class="btn-logout"
               onclick="return confirm('Apakah Anda yakin ingin keluar?')">
                Logout
            </a>

        </div>
    `;
}


function escapeHtml(s) {

    return String(s).replace(
        /[&<>"']/g,
        m => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[m])
    );

}


function updateDashboard() {

    const siswa =
        JSON.parse(
            localStorage.getItem("siswa") || "[]"
        );

    const absensi =
        JSON.parse(
            localStorage.getItem("absensi") || "[]"
        );


    const sekarang = new Date();

    const tahun =
        sekarang.getFullYear();

    const bulan =
        String(
            sekarang.getMonth() + 1
        ).padStart(2, "0");


    const bulanIni =
        `${tahun}-${bulan}`;


    const absensiBulanIni =
        absensi.filter(function(item) {

            return item.tanggal &&
                   item.tanggal.startsWith(
                       bulanIni
                   );

        });


    const jumlahHadir =
        absensiBulanIni.filter(function(item) {

            return item.status === "Hadir";

        }).length;


    const jumlahTidakHadir =
        absensiBulanIni.filter(function(item) {

            return item.status !== "Hadir";

        }).length;


    const totalSiswa =
        document.getElementById(
            "totalSiswa"
        );

    if (totalSiswa) {

        totalSiswa.textContent =
            siswa.length;

    }


    const hadirBulanIni =
        document.getElementById(
            "hadirBulanIni"
        );

    if (hadirBulanIni) {

        hadirBulanIni.textContent =
            jumlahHadir;

    }


    const tidakHadirBulanIni =
        document.getElementById(
            "tidakHadirBulanIni"
        );

    if (tidakHadirBulanIni) {

        tidakHadirBulanIni.textContent =
            jumlahTidakHadir;

    }

}


function renderSiswa() {

    const t =
        document.getElementById(
            "siswaTable"
        );

    if (!t) return;


    const s =
        JSON.parse(
            localStorage.getItem("siswa") || "[]"
        );


    t.innerHTML =
        s.length

        ?

        s.map(function(x, i) {

            return `
                <tr>

                    <td>
                        ${i + 1}
                    </td>

                    <td>
                        ${escapeHtml(x.nis)}
                    </td>

                    <td>
                        ${escapeHtml(x.nama)}
                    </td>

                    <td>
                        ${escapeHtml(x.kelas)}
                    </td>

                    <td>

                        <a
                            class="btn"
                            href="edit_siswa.html?id=${encodeURIComponent(x.id)}"
                        >
                            Edit
                        </a>

                        <button
                            class="danger"
                            onclick="hapusSiswa('${x.id}')"
                        >
                            Hapus
                        </button>

                    </td>

                </tr>
            `;

        }).join("")

        :

        `
            <tr>

                <td colspan="5">
                    Belum ada data siswa.
                </td>

            </tr>
        `;
}


function hapusSiswa(id) {

    if (!confirm("Hapus siswa ini?")) {
        return;
    }


    let s =
        JSON.parse(
            localStorage.getItem("siswa") || "[]"
        ).filter(function(x) {

            return x.id !== id;

        });


    let a =
        JSON.parse(
            localStorage.getItem("absensi") || "[]"
        ).filter(function(x) {

            return x.siswaId !== id;

        });


    localStorage.setItem(
        "siswa",
        JSON.stringify(s)
    );


    localStorage.setItem(
        "absensi",
        JSON.stringify(a)
    );


    renderSiswa();

}


function loadSiswaOptions() {

    const el =
        document.getElementById("siswa");

    if (!el) return;


    const s =
        JSON.parse(
            localStorage.getItem("siswa") || "[]"
        );


    el.innerHTML =

        s.length

        ?

        s.map(function(x) {

            return `
                <option value="${x.id}">
                    ${escapeHtml(x.nis)}
                    -
                    ${escapeHtml(x.nama)}
                </option>
            `;

        }).join("")

        :

        `
            <option value="">
                Belum ada siswa
            </option>
        `;
}


function renderAbsensi() {

    const table =
        document.getElementById(
            "absensiTable"
        );


    if (!table) {
        return;
    }


    const siswa =
        JSON.parse(
            localStorage.getItem("siswa") || "[]"
        );


    const absensi =
        JSON.parse(
            localStorage.getItem("absensi") || "[]"
        );


    if (absensi.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="3">

                    Belum ada absensi.

                </td>

            </tr>

        `;

        return;
    }


    table.innerHTML =

        [...absensi]
        .reverse()
        .map(function(item) {


            const siswaData =
                siswa.find(function(s) {

                    return s.id === item.siswaId;

                });


            const namaSiswa =
                siswaData
                    ? escapeHtml(
                        siswaData.nama
                    )
                    : "Siswa dihapus";


            const linkDetail =

                siswaData

                ?

                `
                detail_absensi.html?siswaId=${encodeURIComponent(
                    item.siswaId
                )}&tanggal=${encodeURIComponent(
                    item.tanggal
                )}
                `

                :

                "#";


            return `

                <tr
                    style="cursor:pointer"
                    onclick="window.location.href='${linkDetail}'"
                    title="Klik untuk melihat detail absensi"
                >

                    <td>

                        ${escapeHtml(
                            item.tanggal
                        )}

                    </td>


                    <td>

                        ${namaSiswa}

                    </td>


                    <td>

                        ${escapeHtml(
                            item.status
                        )}

                    </td>

                </tr>

            `;

        })

        .join("");

}

function hapusAbsensi(index) {

    let a =
        JSON.parse(
            localStorage.getItem("absensi") || "[]"
        );


    a.splice(index, 1);


    localStorage.setItem(
        "absensi",
        JSON.stringify(a)
    );


    renderAbsensi();

}
