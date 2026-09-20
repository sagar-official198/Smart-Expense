import Navbar from './Component/navbar.jsx'
import { TrendingUp, ArrowUpRight, ArrowDownRight, Wallet, PieChart } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome to Smart Expense
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track your daily spending, manage accounts, and achieve your financial goals.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Live Sync Active
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App