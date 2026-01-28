


---

Ngoding Repo GitHub di Terminal

Ngoding Repo GitHub di Terminal adalah terminal-based IDE untuk mengelola, mengedit, me-reset, dan meng-upload ulang sebuah repository GitHub langsung dari terminal, baik di HP (Termux) maupun PC (Linux / Windows / macOS).

Project ini dibuat dengan konsep:

> “Rasa ngoding di aplikasi, tapi semuanya lewat terminal dan langsung ke repo GitHub.”




---

Kenapa Project Ini Ada?

Biasanya workflow GitHub itu:

edit file

commit

push

buka browser

deploy

ulangi lagi


Project ini membalik pendekatan itu.

Dengan tool ini, kamu bisa:

menganggap repo GitHub sebagai workspace aktif

melakukan edit, reset, upload ZIP, rollback langsung dari terminal

cocok untuk ngoding santai, eksperimen, atau recovery repo



---

Target Pengguna

Tool ini cocok untuk:

pengguna Termux (HP Android)

developer Linux / Ubuntu / Debian

pengguna Windows (Node.js)

belajar Git secara mendalam

eksperimen repo pribadi

rollback / reset repo darurat


Tidak disarankan untuk:

repo tim besar tanpa koordinasi

repo production sensitif tanpa backup

user yang belum paham konsep dasar Git



---

Fitur Utama (Ringkasan Besar)

Kontrol Repo Git

git init

commit (custom / auto)

push normal

force push (reset total)

pull

reset hard

clean working directory

history log

diff viewer


ZIP Workflow (Fitur Kunci)

ambil ZIP dari HP

auto-detect ZIP terbaru

extract ZIP ke workspace

hapus .git

upload ulang ke repo

quick reset satu langkah


File Management

lihat tree file

edit file

buat file baru

rename file

hapus file

search text global

replace text global


Branch & Versioning

list branch

create branch

switch branch

merge branch

delete branch

stash (save, apply, pop, drop)

tag & release

push tag


Mode & Safety

interactive mode

preset mode (quick / safe / inspect)

dry-run (simulasi)

backup lokal

session save / load

konfirmasi aksi destruktif


Advanced & Developer

plugin system (hook before/after commit & push)

auto-commit watcher

diagnostics

health check

README generator

export log

pack/bundle project


Total fitur aktif: 70+ fitur


---

Filosofi Desain

Project ini bukan script sekali jalan.

Prinsip utama:

semua langkah terlihat

user pegang kendali penuh

tidak ada auto-destruktif tanpa konfirmasi

repo diperlakukan seperti “project hidup”

cocok untuk ngoding sambil belajar



---

Struktur Project

ngoding-repo-github-di-terminal/
├─ index.mjs
├─ package.json
├─ src/
│  ├─ main.mjs
│  ├─ app_root.mjs
│  ├─ controller.mjs
│  ├─ git.mjs
│  ├─ fs.mjs
│  ├─ ui.mjs
│  ├─ menu.mjs
│  ├─ menu_extra.mjs
│  ├─ menu_tools.mjs
│  ├─ presets.mjs
│  ├─ dryrun.mjs
│  ├─ backup.mjs
│  ├─ search.mjs
│  ├─ branch.mjs
│  ├─ stash.mjs
│  ├─ release.mjs
│  ├─ watcher.mjs
│  ├─ history.mjs
│  ├─ stats.mjs
│  ├─ session.mjs
│  ├─ autozip.mjs
│  ├─ installer.mjs
│  ├─ plugins.mjs
│  ├─ logger.mjs
│  ├─ health.mjs
│  ├─ diagnose.mjs
│  ├─ readme.mjs
│  └─ pack.mjs
└─ plugins/
   └─ example.mjs


---

Instalasi

Syarat

Node.js ≥ 18 (disarankan 22)

git terinstall

GitHub Personal Access Token

Repo GitHub milik sendiri


Install dependency

npm install

Jalankan

node index.mjs

Atau setelah install global:

repocontrol


---

Autentikasi GitHub

Saat start, kamu akan diminta:

GitHub username

GitHub token

Repo URL

Branch

Path ZIP


Token:

tidak disimpan

tidak ditulis ke file

hanya aktif selama session



---

Workflow Reset Repo dari ZIP (Paling Penting)

Ini fitur inti project.

1. Pilih ZIP dari HP


2. ZIP diextract ke workspace sementara


3. .git dihapus


4. Git init baru


5. Commit pertama dibuat


6. Push ke repo dengan --force


7. Seluruh source lama di repo terhapus


8. Repo sekarang berisi source dari ZIP



Workflow ini resmi, transparan, dan bisa dikontrol penuh.


---

Mode Preset

Quick

ZIP → extract → init → commit → force push

untuk reset cepat


Safe

ZIP → extract → init → commit → push normal


Inspect

ZIP → extract → preview file

tidak menyentuh repo



---

Mode Interaktif (IDE Terminal)

Menu interaktif membuat tool ini terasa seperti:

> aplikasi ngoding di HP, tapi semua langsung ke GitHub



Menu utama:

Repo Controller

Search

Replace

Branch Manager

Tools

Extras

Config

Plugins

Export

Exit



---

Shortcut Keyboard

Saat runtime:

r repo controller

s search

b branch

t tools

e extras

h help

q exit



---

Plugin System

Plugin adalah file .mjs di folder plugins.

Hook tersedia:

beforeCommit

afterCommit

beforePush

afterPush


Plugin memberi kebebasan extend fitur tanpa ubah core.


---

Keamanan & Etika

Tool ini:

tidak membypass GitHub

hanya memakai git CLI resmi

hanya cocok untuk repo milik sendiri


Gunakan dengan tanggung jawab.


---

Penutup

Ngoding Repo GitHub di Terminal adalah:

playground ngoding

alat belajar Git

tool recovery repo

terminal IDE ringan


Kalau mau dikembangkan lebih jauh:

multi-repo support

CI mode

permission scope

TUI lanjutan



---