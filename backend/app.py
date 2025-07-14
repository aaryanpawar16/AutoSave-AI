from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper function to classify categories from Description
def categorize(description):
    desc = description.lower()
    if "zomato" in desc or "grocer" in desc or "coffee" in desc:
        return "food"
    elif "uber" in desc or "cab" in desc or "petrol" in desc:
        return "transport"
    elif "netflix" in desc or "cinema" in desc:
        return "entertainment"
    elif "amazon" in desc or "shopping" in desc:
        return "shopping"
    elif "medicine" in desc:
        return "health"
    elif "course" in desc or "book" in desc:
        return "education"
    elif "rent" in desc:
        return "housing"
    else:
        return "other"

@app.post("/analyze")
async def analyze_transactions(file: UploadFile = File(...)):
    try:
        df = pd.read_csv(file.file)
        df.columns = df.columns.str.strip()

        # Add Category based on Description
        df["Category"] = df["Description"].apply(categorize)

        income = df[df["Amount"] > 0]["Amount"].sum()
        expenses = df[df["Amount"] < 0]["Amount"].abs().sum()
        net_savings = income - expenses

        # Sum per category
        food = df[df["Category"] == "food"]["Amount"].abs().sum()
        entertainment = df[df["Category"] == "entertainment"]["Amount"].abs().sum()

        suggestions = []

        if income > 0:
            suggestions.append(f"You can auto-save ₹{int(income * 0.2)} (20% of your income).")
        if food > 1000:
            suggestions.append("You're spending ₹1,000+ on food. Try cooking 2 extra meals per week.")
        if entertainment > 700:
            suggestions.append("Entertainment spend is high. Set a monthly cap of ₹500.")
        if net_savings > 3000:
            suggestions.append("You have a net surplus. Auto-save ₹3,000/month easily.")
        if not suggestions:
            suggestions.append("You're doing great! No major savings issues detected.")

        return {
            "income": int(income),
            "expenses": int(expenses),
            "net_savings": int(net_savings),
            "suggestions": suggestions,
        }

    except Exception as e:
        return {"error": str(e)}
