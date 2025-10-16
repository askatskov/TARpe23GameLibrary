# TARpe23GameLibrary

## Project Description
**GameLibrary** on Node.js põhine veebirakendus, mis võimaldab kasutajatel sirvida erinevaid videomänge, vaadata nende kirjeldusi ja hinnanguid ning osta mänge otse rakenduse kaudu.  
Projekt kasutab andmebaasi, kuhu on salvestatud mängude info (nimi, žanr, kirjeldus, hind, hinnang jne).

---

## Developers
- **Artjom Skatškov**
- **Allan Lond**

---

## Tech Stack
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB 
- **Version Control:** Git + GitHub  

---

## Features
- Kuvab kõik mängud andmebaasist  
- Näitab iga mängu detailset infot  
- Võimaldab mängu osta või lisada ostukorvi  
- Kasutab `.env` faili andmebaasiühenduse ja serveri porti hoidmiseks  

---

## How to Set Up and Run the Project

**Create the repository:** 
- GitHub
**Install dependencies:**
- npm init -y
- npm install express mongoose dotenv
- npm install --save-dev nodemon
**Configure environment variables:**
- cp .env.example .env
**Start your database:**
- mongod
**Run the project:**
- npm run dev
- npm start
**Open in browser:**
- http://localhost:3000

---

## Database Connection
Rakendus loob ühenduse andmebaasiga `.env` failist saadud andmete abil.

Näidis `.env.example` fail:

```env
DB_HOST=localhost
DB_PORT=27017
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=GameLib
PORT=3000

