# 📘 E-Book Referral API

This is the **backend** service for the E-Book Referral System — built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**.

It handles authentication, referral tracking, purchases, and user credit updates.

---

## 🚀 Tech Stack

- **Node.js + Express.js**
- **TypeScript**
- **Mongoose (MongoDB)**
- **JWT Authentication**
- **Bcrypt** for password hashing
- **Dotenv** for environment configuration
- **Zod / Joi (if used)** for validation


---

## ⚙️ Environment Setup

Create `.env` file in the root:

```env
follow .env.example file for setup the env file
```

---

## 🧑‍💻 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/I-am-MoRsHeD/e-book-referral-server.git
cd e-book-referral-server
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the server
```bash
npm run dev
```

Server will start on **http://localhost:5000**

---

## 🧩 Features

✅ User registration with unique referral code  
✅ Referral validation (`?r=referralCode`)  
✅ JWT authentication  
✅ Book purchase logic with referral reward system  
✅ Transaction rollback with Mongoose session  
✅ Referral overview & stats endpoints  

---

## 🔄 API Endpoints Overview

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/api/v1/users/register` | Register a new user (with optional referral) |
| **POST** | `/api/v1/auth/login` | Login user |
| **POST** | `/api/v1/books/purchase` | Purchase a book (triggers referral reward if valid) |
| **GET**  | `/api/v1/referrals/overview` | Get referral stats for a user |

---

## 🔐 Referral Flow

1️⃣ User A registers → gets `referralCode = A12345`  
2️⃣ User B registers using `?r=A12345`  
3️⃣ When B makes first purchase:
   - Both A and B earn **2 credits**
   - Referral status changes from `PENDING` → `CONVERTED`

---

## 🧱 Models Overview

### 🧍 User
| Field | Type | Description |
|--------|------|-------------|
| name | String | Full name |
| email | String | Unique email |
| password | String | Hashed password |
| referralCode | String | Auto-generated |
| referredBy | ObjectId | Referring user |
| credit | Number | Default: 0 |

### 🎟️ Referral
| Field | Type | Description |
|--------|------|-------------|
| referrerUser | ObjectId | Who invited |
| referredUser | ObjectId | Who joined |
| status | String | `PENDING` / `CONVERTED` |

---

## 🧾 Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Run in dev mode |
| `npm run build` | Build for production |
| `npm start` | Run compiled server |
| `npm run lint` | Lint source files |

---

## 🧑‍💼 Author

Developed by **Md Morshed**  
📧 Email: mdmorshed0187@gmail.com  
🔗 GitHub: [https://github.com/I-am-MoRsHeD](https://github.com/I-am-MoRsHeD)
