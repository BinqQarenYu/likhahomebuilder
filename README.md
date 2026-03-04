# Likha Home Builders

Shaping Tomorrow’s Homes Since 2001.

Likha Home Builders specializes in affordable, precision-engineered modular homes built with advanced steel framing. Our mission is to expand access to quality housing through reliable design and craftsmanship.

## 🚀 Key Features

- **Modern Modular Concept**: High-quality modular home designs focused on durability and style.
- **Airbnb-Ready Designs**: Optimized for short-term rental profitability.
- **Interactive UI**: Responsive frontend built with React, Tailwind CSS, and Shadcn UI components.
- **Fullstack Integration**: robust FastAPI backend with MongoDB for data persistence.
- **Automated Communication**: Contact forms, Newsletter subscription, and Purchase inquiry endpoints.
- **Performance Optimized**: Built with advanced steel frame technology for faster construction timelines.

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19
- **Styling**: Tailwind CSS, Lucide Icons
- **Components**: Shadcn UI (Radix UI)
- **State Management**: React Hooks
- **Build Tool**: Craco (Create React App Configuration Override)

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.12+
- **Database**: MongoDB (via Motor/Pymongo)
- **Validation**: Pydantic
- **Development**: Uvicorn with Auto-reload

## 📁 Project Structure

```bash
likhahomebuilder/
├── backend/            # FastAPI Backend
│   ├── routes/         # API Endpoints (Contact, Newsletter, Purchase)
│   ├── venv/           # Python Virtual Environment
│   ├── server.py       # Main Entry Point
│   └── database.py     # MongoDB Connection & Config
├── frontend/           # React Frontend
│   ├── src/
│   │   ├── components/ # Reusable UI Components
│   │   ├── hooks/      # Custom React Hooks
│   │   └── pages/      # Application Pages (Home, About, Contact, etc.)
│   ├── public/         # Static Assets
│   └── craco.config.js # Craco / Webpack Configuration
└── .likhatechbuilder/  # Project Configuration & Metadata
```

## ⚙️ Getting Started

### Prerequisites
- Node.js v20+
- Python 3.12+
- MongoDB instance (Local or Atlas)

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file with your `MONGO_URL`.
5. Run the server:
   ```bash
   uvicorn server:app --reload --port 8000
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Run the development server:
   ```bash
   npm start
   ```

---
*Copyright 2024 – LIKHA HOME BUILDERS ®. All rights reserved.*
