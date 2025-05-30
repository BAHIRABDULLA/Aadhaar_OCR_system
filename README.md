# Aadhar OCR System (Optical Character Recognition)

A web application that extracts text information from uploaded images (like Aadhaar cards, etc.).  
Built with **React**, **TypeScript**, **TailwindCSS** (frontend) and **Node.js**, **Express**, **TypeScript** (backend).

---

## ✨ Features

- Upload an image and extract key information (Name, DOB, Gender, Aadhaar Number, Address, Pin Code)
- View extracted data neatly organized
- Copy extracted data easily
- Fast, reliable OCR processing
- CORS secured for production
- No permanent storage of uploaded files (temporary use only)

---

## 📂 Technologies Used

**Frontend:**
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios (for API requests)

**Backend:**
- Node.js
- Express.js
- TypeScript
- Multer (for file upload)
- Tesseract.js (for OCR)
- CORS
- Dotenv (for environment variables)

---

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- npm or yarn installed

---

## Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Build TypeScript
npm run build

# Start production server
npm start

# Or start development server
npm run dev
