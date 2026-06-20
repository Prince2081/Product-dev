# Product-Development
 # AI Solutions - Premium Technology Agency Platform

Welcome to the official codebase for **AI Solutions**, a premium technology agency based in Kathmandu, Nepal. This platform features a stunning modern frontend and a highly secure, feature-rich backend designed to showcase services, portfolios, and capture leads while offering maximum security for the administrative portal.

## 🚀 Features

### Frontend (Client-Side)
- **Modern & Responsive UI**: Built with React, Vite, and Tailwind CSS. Features dark mode, glassmorphism, and micro-animations via Framer Motion.
- **Dynamic Content**: Sections for Services, Blogs, Portfolios, Event Galleries, FAQs, Testimonials, and Team Members.
- **Intelligent Chatbot**: A smart virtual assistant that interacts with visitors. It currently runs on a fast, locally-simulated Smart Fallback Engine, but is 100% pre-configured to plug into Google's Gemini AI.
- **Admin Dashboard**: A secure portal to manage all dynamic content, view leads, and handle settings.

### Backend (Server-Side)
- **RESTful API**: Built with Node.js, Express, and MongoDB (Mongoose).
- **Maximum Security Login**: The Admin portal features a 3-Step Authentication Flow:
  1. Secure Password (bcrypt hashed).
  2. Email Verification (OTP sent via Nodemailer).
  3. Time-based Two-Factor Authentication (2FA via Google Authenticator/Authy using `speakeasy`).
- **Data Management**: Full CRUD endpoints for managing the website's dynamic content (blogs, team, services, etc.).

---

## 🛠️ Technology Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- Framer Motion (Animations)
- React Router DOM
- Axios
- Lucide React (Icons)

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcryptjs (Password Hashing)
- Nodemailer (Email OTPs)
- Speakeasy & QRCode (2FA Authentication)
- Google Generative AI SDK (Gemini Chatbot)

---

## 💻 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB running locally on `mongodb://127.0.0.1:27017`
- A Gmail account with an App Password (for email verification)

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables. Ensure your `.env` file looks like this:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/ai-solution
   JWT_SECRET=your_super_secret_jwt_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   GEMINI_API_KEY=your_gemini_api_key_here (Optional)
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🔒 Admin Access & Security
To access the admin dashboard, navigate to `http://localhost:5173/admin/login`.

**Default Initial Credentials:**
- **Username:** `admin`
- **Password:** `Admin@123`

*Note: Upon your first login, the system will auto-generate this user if the database is empty.*

**The 3-Step Login Process:**
1. Enter your username and password.
2. Check the email inbox configured in your backend `.env` for the 6-digit OTP code and enter it.
3. If you have 2FA enabled on your profile, enter the code from your Authenticator app.

---

## 🤖 Activating the Real AI Chatbot
The chatbot currently uses a highly capable mock engine to answer common questions for free. 
To upgrade it to a true Large Language Model:
1. Generate a free API key at [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Add `GEMINI_API_KEY=your_api_key` to your `backend/.env` file.
3. Restart your backend server. The chatbot will instantly switch to using the Gemini AI!

---

## 📝 License
Proprietary & Confidential - Created for AI Solutions.

Author: Prince Pandey
