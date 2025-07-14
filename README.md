🧠 AutoSave AI 💸

Smart Spending Insights Based on Your Transactions

AutoSave AI helps users build better saving habits by analyzing their income and expenses. It offers actionable suggestions using uploaded or manually entered transaction data.

📸 Demo



🚀 Features

🔍 Analyze transaction data (CSV or form input)

💡 Personalized savings suggestions

📊 Spending chart visualization

🌙 Beautiful dark-themed UI with clean UX

⚡ Built with FastAPI + React + TailwindCSS

🧩 Tech Stack

Frontend

Backend

Styling

React + Vite

FastAPI

Tailwind CSS

Lucide Icons

Pandas

CORS Middleware

FileSaver

Uvicorn


📁 Project Structure

autosave-ai-starter/
│
├── backend/
│   ├── __pycache__/         # Python cache
│   ├── venv/                # Virtual environment for backend
│   ├── app.py               # FastAPI backend logic
│   └── requirements.txt     # Python dependencies
│
├── frontend/
│   ├── node_modules/        # Node dependencies
│   ├── src/
│   │   ├── App.jsx          # Main React component (UI logic)
│   │   ├── index.css        # Global Tailwind CSS
│   │   └── main.jsx         # Entry point for React
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies and scripts
│   ├── package-lock.json    # Version lock file
│   ├── postcss.config.js    # PostCSS config
│   ├── tailwind.config.js   # TailwindCSS config
│   └── vite.config.js       # Vite configuration
│
├── sample-data/
│   ├── test.csv             # Sample CSV for testing
│   └── transactions.csv     # Another example transaction CSV
│
├── venv/                    # (Optional) top-level Python venv
└── README.md                # Project documentation

🛠️ Setup Instructions

1. Clone the Repository

git clone https://github.com/aaryanpawar16/autosave-ai.git
cd autosave-ai

2. Backend (FastAPI)

cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app:app --reload

⚠️ Make sure your backend runs at: http://localhost:8000

3. Frontend (React + Vite)

cd frontend
npm install
npm run dev

The frontend should run at: http://localhost:5173

🔪 Sample Transactions Format

You can manually enter or upload this data:

Date,Description,Amount,Type
2025-06-01,Salary,65000,Income
2025-06-02,Zomato,-550,Expense
...

Or directly input through the web UI in the form.

📊 Future Improvements

🧠 AI-powered prediction of future savings

📊 Visual dashboards with charts

☁️ Cloud storage of historical data

👤 User authentication

