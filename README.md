
# CreditSea LMS — Loan Management System

A full-stack fintech-style Loan Management System (LMS) built with modern web technologies.

This project simulates a real-world lending workflow where borrowers apply for loans and internal operational teams manage those loans through their lifecycle.

---

#  Features

## Borrower Portal

* User Registration & Login
* JWT Authentication
* Password hashing with bcrypt
* Multi-step loan application flow
* Business Rule Engine (BRE)
* Salary slip upload (PDF/JPG/PNG)
* Loan calculator with live EMI/interest calculations
* Loan application tracking

---

## Operations Dashboard

Role-based internal dashboard for:

* Sales Team
* Sanction Team
* Disbursement Team
* Collection Team
* Admin

---

## Loan Lifecycle

```txt
REGISTER
↓
LOGIN
↓
PROFILE CREATION
↓
SALARY SLIP UPLOAD
↓
LOAN APPLICATION
↓
PENDING
↓
SANCTIONED / REJECTED
↓
DISBURSED
↓
REPAYMENTS
↓
CLOSED
```

---

#  Tech Stack

## Frontend

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* Radix UI
* Axios
* Sonner Toasts

---

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* multer

---

# 📂 Project Structure

## Frontend

```txt
src
 ├── app
 │    ├── login
 │    ├── register
 │    ├── apply
 │    └── dashboard
 │         ├── loans
 │         ├── collections
 │         └── analytics
 │
 ├── components
 │    ├── auth
 │    ├── dashboard
 │    ├── forms
 │    ├── layout
 │    └── ui
 │
 ├── services
 │
 ├── lib
 │
 └── types
```

---

## Backend

```txt
src
 ├── controllers
 ├── middleware
 ├── models
 ├── routes
 ├── services
 ├── config
 └── utils
```

---

# 🔐 Authentication & RBAC

The application uses JWT-based authentication.

Passwords are securely hashed using bcrypt before storing in MongoDB.

---

## Roles

* ADMIN
* SALES
* SANCTION
* DISBURSEMENT
* COLLECTION
* BORROWER

---

## Access Rules

| Role         | Access                   |
| ------------ | ------------------------ |
| Borrower     | Application portal only  |
| Sales        | Leads module             |
| Sanction     | Loan approval module     |
| Disbursement | Loan disbursement module |
| Collection   | Repayment module         |
| Admin        | Full access              |

---

## Backend RBAC

Protected using:

* `authMiddleware`
* `authorizeRoles()`

API-level access control is enforced.

Unauthorized access returns:

* `401 Unauthorized`
* `403 Forbidden`

---

# 🧠 Business Rule Engine (BRE)

The BRE runs on the backend before profile approval.

## Validation Rules

| Rule       | Condition                  |
| ---------- | -------------------------- |
| Age        | Must be between 23–50      |
| Salary     | Minimum ₹25,000/month      |
| PAN        | Must match valid PAN regex |
| Employment | Cannot be unemployed       |

---

## PAN Validation

```regex
[A-Z]{5}[0-9]{4}[A-Z]{1}
```

---

# 📤 Salary Slip Upload

Supported file types:

* PDF
* JPG
* PNG

Maximum file size:

```txt
5 MB
```

Uploads are handled using multer middleware.

---

# 💰 Loan Calculation Logic

The platform uses Simple Interest.

## Formula

```txt
SI = (P × R × T) / (365 × 100)
```

Where:

* `P` = Principal Amount
* `R` = Interest Rate (12%)
* `T` = Tenure in days

---

## Total Repayment

```txt
Total Repayment = Principal + Simple Interest
```

---

# 📊 Dashboard Modules

## 1. Sales Module

Tracks:

* Registered users
* Users who have not yet applied for loans

Features:

* Leads table
* Borrower tracking

---

## 2. Sanction Module

Handles:

* Pending loan applications
* Loan approvals
* Loan rejection with reason

Status transitions:

```txt
PENDING → SANCTIONED
PENDING → REJECTED
```

---

## 3. Disbursement Module

Handles:

* Approved loans
* Fund release workflow

Status transition:

```txt
SANCTIONED → DISBURSED
```

---

## 4. Collection Module

Handles:

* Active loans
* Repayments
* Outstanding balance tracking
* Auto-close logic

---

## Repayment Features

Each repayment includes:

* Amount
* Payment Mode
* UTR Number
* Payment Date

---

## UTR Validation

UTR numbers are unique across all repayments.

Duplicate UTR submissions are rejected.

---

## Auto Close Logic

When:

```txt
Total Paid >= Total Repayment
```

Loan status automatically becomes:

```txt
CLOSED
```

---

# 📡 API Overview

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Borrower

### Create Profile

```http
POST /api/borrower/profile
```

### Upload Salary Slip

```http
POST /api/borrower/upload-slip
```

---

## Loan

### Apply Loan

```http
POST /api/loan/apply
```

---

## Sales

### Leads

```http
GET /api/sales/leads
```

---

## Sanction

### Pending Loans

```http
GET /api/sanction/pending
```

### Approve / Reject Loan

```http
PATCH /api/sanction/:loanId
```

---

## Disbursement

### Get Sanctioned Loans

```http
GET /api/disbursement/sanctioned
```

### Disburse Loan

```http
PATCH /api/disbursement/:loanId
```

---

## Collection

### Active Loans

```http
GET /api/collection/active
```

### Repayment

```http
POST /api/repayment/:loanId
```

---

# ⚙️ Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

## Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=(https://creditsea-backend-r4po.onrender.com/)
```

---

# ▶️ Installation & Setup

## 1. Clone Repository

```bash
git clone <repo-url>
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create:

```txt
.env
```

Run:

```bash
npm run dev
```

Backend runs on:

```txt
https://creditsea-backend-r4po.onrender.com/
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Create:

```txt
.env.local
```

Run:

```bash
npm run dev
```

Frontend runs on:

```txt
(https://creditsea-frontend-delta.vercel.app/)
```

---

# 🧪 Demo Credentials

## Admin

```txt
Email: admin@test.com
Password: password123
```

---

## Sales

```txt
Email: sales@test.com
Password: password123
```

---

## Sanction

```txt
Email: sanction@test.com
Password: password123
```

---

## Disbursement

```txt
Email: disbursement@test.com
Password: password123
```

---

## Collection

```txt
Email: collection@test.com
Password: password123
```

---

# 📱 Responsive Design

The application is fully responsive and optimized for:

* Desktop
* Tablet
* Mobile

Features:

* Responsive layouts
* Scrollable tables
* Mobile-friendly forms
* Adaptive dashboard UI

---

# 🎯 Key Engineering Decisions

## Why BRE on Backend?

BRE is enforced server-side to prevent bypassing validations from frontend manipulation.

Frontend validation improves UX, but backend validation ensures security and integrity.

---

## Why JWT?

JWT enables:

* stateless authentication
* scalable APIs
* secure protected routes
* role-based authorization

---

## Why Role Middleware?

Centralized RBAC logic:

```ts
authorizeRoles(Role.ADMIN)
```

keeps route protection clean and scalable.

---

# 📸 Screens Included

* Authentication pages
* Borrower application flow
* Salary slip upload
* Loan calculator
* Sales dashboard
* Sanction workflow
* Disbursement module
* Collection module
* Analytics dashboard

---

# ✅ Assignment Coverage

| Requirement        | Status |
| ------------------ | ------ |
| Authentication     | ✅      |
| JWT + bcrypt       | ✅      |
| BRE                | ✅      |
| Salary Slip Upload | ✅      |
| Loan Calculator    | ✅      |
| Pending Loans      | ✅      |
| Sanction Workflow  | ✅      |
| Reject with Reason | ✅      |
| Disbursement       | ✅      |
| Repayments         | ✅      |
| UTR Validation     | ✅      |
| Auto Close Logic   | ✅      |
| RBAC Frontend      | ✅      |
| RBAC Backend       | ✅      |
| Responsive UI      | ✅      |
| Admin Dashboard    | ✅      |
| TypeScript         | ✅      |

---

# 👨‍💻 Author

Built as part of the CreditSea LMS Assignment.

A full-stack fintech workflow implementation demonstrating:

* scalable architecture
* RBAC
* workflow orchestration
* backend validations
* responsive UI/UX
* enterprise loan lifecycle management

* ## 🌐 Live Demo
Frontend:
https://your-vercel-url.vercel.app

Backend:
https://your-render-url.onrender.com

## 🎥 Demo Video

[Watch Full Project Demo](https://drive.google.com/file/d/1t357iXaZdaLa-K1vQQlbewTCywiu-gG5/view?usp=drivesdk)
