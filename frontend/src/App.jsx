import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { saveAs } from "file-saver";

function App() {
  const [rows, setRows] = useState([]);
  const [entry, setEntry] = useState({ date: "", description: "", amount: "", type: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const addRow = () => {
    if (!entry.date || !entry.description || !entry.amount || !entry.type) return;
    setRows([...rows, entry]);
    setEntry({ date: "", description: "", amount: "", type: "" });
    setSuggestions([]);
  };

  const handleAnalyze = async () => {
    if (rows.length === 0) return;
    setLoading(true);
    const header = "Date,Description,Amount,Type\n";
    const csv = rows.map(r => `${r.date},${r.description},${r.amount},${r.type}`).join("\n");
    const blob = new Blob([header + csv], { type: "text/csv" });

    const formData = new FormData();
    formData.append("file", blob, "transactions.csv");

    try {
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setSuggestions(data.suggestions || []);
    } catch (err) {
      alert("Error analyzing data.");
    } finally {
      setLoading(false);
    }
  };

  const income = rows.filter(r => r.type.toLowerCase() === "income").reduce((acc, r) => acc + parseFloat(r.amount || 0), 0);
  const expense = rows.filter(r => r.type.toLowerCase() === "expense").reduce((acc, r) => acc + parseFloat(r.amount || 0), 0);

  const pieData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const COLORS = ["#4ade80", "#f87171"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <Sparkles className="text-yellow-400" />
          AutoSave AI 💸
        </h1>
        <p className="text-center text-gray-300">Add your transactions to get smart savings tips.</p>

        <div className="grid grid-cols-2 gap-4">
          <input name="date" type="date" value={entry.date} onChange={handleChange} placeholder="Date" className="border p-2 rounded bg-gray-800 text-white border-gray-600" />
          <input name="description" placeholder="Description" value={entry.description} onChange={handleChange} className="border p-2 rounded bg-gray-800 text-white border-gray-600" />
          <input name="amount" type="number" placeholder="Amount" value={entry.amount} onChange={handleChange} className="border p-2 rounded bg-gray-800 text-white border-gray-600" />
          <select name="type" value={entry.type} onChange={handleChange} className="border p-2 rounded bg-gray-800 text-white border-gray-600">
            <option value="">Select Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <button onClick={addRow} className="w-full mt-2 bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition">
          Add Transaction
        </button>

        {rows.length > 0 && (
          <div className="mt-4 space-y-4">
            <h3 className="font-medium text-white">Transactions:</h3>
            <ul className="list-disc list-inside text-sm text-gray-300">
              {rows.map((r, i) => (
                <li key={i}>{`${r.date} - ${r.description} - ₹${r.amount} - ${r.type}`}</li>
              ))}
            </ul>

            <div className="h-64 bg-gray-800 p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={rows.length === 0 || loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" /> Analyzing...
            </span>
          ) : (
            "Analyze Spending"
          )}
        </button>

        {suggestions.length > 0 && (
          <div className="pt-4 space-y-2">
            <h2 className="text-lg font-semibold text-white">💡 Suggestions</h2>
            {suggestions.map((s, i) => (
              <div key={i} className="bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-sm">
                {s}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
