# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

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
- **Backend:** Express.js  
- **Frontend:** Vue 3 + Vite  
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
- npm install express
- npm create vite@latest

**Configure environment variables:**
- cp .env.example .env
**Start your database:**
- mongod
**Run the project:**
- npm run dev
- node src/index.js
**Open in browser:**
- http://localhost:3000

---

## Database Connection
Rakendus loob ühenduse andmebaasiga `.env` failist saadud andmete abil.

Näidis `.env.example` fail:

```env
DB_HOST=localhost
DB_PORT=27017
DB_NAME=GameLib
PORT=3000


