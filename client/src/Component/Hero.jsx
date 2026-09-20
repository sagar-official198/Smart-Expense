import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

// 5 Vibrant Color Themes
const colorThemes = [
  {
    id: "blue",
    name: "Ocean Sapphire",
    primary: "#2563eb",
    secondary: "#06b6d4",
    gradient: "linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #06b6d4 100%)",
    glow: "rgba(37, 99, 235, 0.42)",
    bgGlow1: "rgba(37, 99, 235, 0.25)",
    bgGlow2: "rgba(79, 70, 229, 0.22)",
    border: "rgba(37, 99, 235, 0.35)",
    badgeBg: "rgba(37, 99, 235, 0.1)",
  },
  {
    id: "emerald",
    name: "Emerald Wealth",
    primary: "#10b981",
    secondary: "#059669",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 50%, #14b8a6 100%)",
    glow: "rgba(16, 185, 129, 0.42)",
    bgGlow1: "rgba(16, 185, 129, 0.25)",
    bgGlow2: "rgba(20, 184, 166, 0.22)",
    border: "rgba(16, 185, 129, 0.35)",
    badgeBg: "rgba(16, 185, 129, 0.12)",
  },
  {
    id: "purple",
    name: "Cyber Violet",
    primary: "#8b5cf6",
    secondary: "#ec4899",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #ec4899 100%)",
    glow: "rgba(139, 92, 246, 0.42)",
    bgGlow1: "rgba(139, 92, 246, 0.25)",
    bgGlow2: "rgba(236, 72, 153, 0.22)",
    border: "rgba(139, 92, 246, 0.35)",
    badgeBg: "rgba(139, 92, 246, 0.12)",
  },
  {
    id: "amber",
    name: "Sunset Amber",
    primary: "#f59e0b",
    secondary: "#ef4444",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ef4444 100%)",
    glow: "rgba(245, 158, 11, 0.42)",
    bgGlow1: "rgba(245, 158, 11, 0.25)",
    bgGlow2: "rgba(239, 68, 68, 0.22)",
    border: "rgba(245, 158, 11, 0.35)",
    badgeBg: "rgba(245, 158, 11, 0.12)",
  },
  {
    id: "rose",
    name: "Rose Crimson",
    primary: "#f43f5e",
    secondary: "#fb7185",
    gradient: "linear-gradient(135deg, #f43f5e 0%, #e11d48 50%, #fb7185 100%)",
    glow: "rgba(244, 63, 94, 0.42)",
    bgGlow1: "rgba(244, 63, 94, 0.25)",
    bgGlow2: "rgba(251, 113, 133, 0.22)",
    border: "rgba(244, 63, 94, 0.35)",
    badgeBg: "rgba(244, 63, 94, 0.12)",
  },
];

function Hero() {
  const navigate = useNavigate();
  const [activeTheme, setActiveTheme] = useState(colorThemes[0]);
  const [period, setPeriod] = useState("monthly"); // "monthly" | "weekly"
  const [activeMonth, setActiveMonth] = useState(4); // May selected

  // Dynamic Chart Data based on period
  const monthlyData = [
    { label: "Jan", height: "45%", amount: "$1,820" },
    { label: "Feb", height: "60%", amount: "$2,400" },
    { label: "Mar", height: "50%", amount: "$2,050" },
    { label: "Apr", height: "75%", amount: "$3,120" },
    { label: "May", height: "92%", amount: "$3,850" },
    { label: "Jun", height: "68%", amount: "$2,790" },
  ];

  const weeklyData = [
    { label: "W1", height: "55%", amount: "$420" },
    { label: "W2", height: "80%", amount: "$710" },
    { label: "W3", height: "65%", amount: "$560" },
    { label: "W4", height: "95%", amount: "$890" },
  ];

  const chartData = period === "monthly" ? monthlyData : weeklyData;
  const currentItem = chartData[activeMonth] || chartData[0];

  return (
    <section
      className="hero-section"
      style={{
        "--theme-primary": activeTheme.primary,
        "--theme-secondary": activeTheme.secondary,
        "--theme-gradient": activeTheme.gradient,
        "--theme-glow": activeTheme.glow,
        "--theme-bg-glow1": activeTheme.bgGlow1,
        "--theme-bg-glow2": activeTheme.bgGlow2,
        "--theme-border": activeTheme.border,
        "--theme-badge-bg": activeTheme.badgeBg,
      }}
    >
      {/* Floating Animated Currency Particles */}
      <div className="floating-particles">
        <span className="particle p1">💎</span>
        <span className="particle p2">+18.4% Growth</span>
        <span className="particle p3">✨</span>
        <span className="particle p4">$</span>
        <span className="particle p5">📊</span>
      </div>

      {/* Ambient Animated Glow Orbs */}
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>
      <div className="hero-glow-3"></div>

      <div className="hero-container">
        {/* Left Side: Headlines, Color Theme Feature & Action Buttons */}
        <div className="hero-content">
          {/* Live Theme Color Switcher Feature */}
          <div className="hero-color-picker">
            <span className="color-picker-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              Theme Color:
            </span>
            <div className="color-options">
              {colorThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setActiveTheme(theme)}
                  className={`color-dot ${activeTheme.id === theme.id ? "active" : ""}`}
                  style={{ background: theme.gradient }}
                  title={`Switch to ${theme.name}`}
                  aria-label={theme.name}
                />
              ))}
            </div>
            <span className="active-theme-name">{activeTheme.name}</span>
          </div>

          {/* Feature Badge */}
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            <span>Intelligent AI Expense Tracker 2.0</span>
          </div>

          {/* Animated Headline */}
          <h1 className="hero-title">
            Master Your Money with <br />
            <span className="hero-gradient-text">Smart Expense Tracking</span>
          </h1>

          <p className="hero-description">
            Take total control of your cash flow. Track spending automatically,
            detect money leaks, set dynamic budgets, and watch your savings grow
            with personalized color insights and live analytics.
          </p>

          {/* Prominent Action Buttons: Sign Up & Login */}
          <div className="hero-actions">
            <button
              className="btn-hero-primary"
              onClick={() => navigate("/signup")}
              id="hero-signup-btn"
            >
              <span>Get Started Free</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <button
              className="btn-hero-secondary"
              onClick={() => navigate("/login")}
              id="hero-login-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              <span>Log In</span>
            </button>
          </div>

          {/* Social Proof Badges */}
          <div className="hero-trust">
            <div className="avatar-stack">
              <div className="avatar-stack-item avatar-1">JD</div>
              <div className="avatar-stack-item avatar-2">AK</div>
              <div className="avatar-stack-item avatar-3">SL</div>
              <div className="avatar-stack-item avatar-4">MR</div>
            </div>
            <div className="trust-text">
              <div className="trust-stars">★★★★★</div>
              <span>Loved by <strong>10,000+</strong> users worldwide</span>
            </div>
          </div>
        </div>

        {/* Right Side: Animated Mockup with Rotating Glow & Floating Badges */}
        <div className="hero-visual">
          {/* Top Floating Badge */}
          <div className="floating-badge floating-badge-top">
            <div className="badge-icon-wrap badge-icon-theme">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <p className="floating-badge-title">+$340 Saved</p>
              <p className="floating-badge-desc">Auto-budgeting tip applied</p>
            </div>
          </div>

          {/* Conic Glow Border Wrapper */}
          <div className="mockup-glow-wrapper">
            <div className="mockup-main-card">
              {/* Header */}
              <div className="mockup-header">
                <div className="mockup-user-info">
                  <div className="mockup-user-avatar">SE</div>
                  <div>
                    <h4 className="mockup-user-name">Smart Portfolio</h4>
                    <p className="mockup-user-subtitle">Personal Vault</p>
                  </div>
                </div>
                <div className="mockup-badge-live">
                  <span className="badge-pulse"></span>
                  <span>Live Sync</span>
                </div>
              </div>

              {/* Period Switcher (Monthly vs Weekly) */}
              <div className="period-toggle-wrap">
                <span className="balance-label">Net Balance</span>
                <div className="period-buttons">
                  <button
                    className={`period-btn ${period === "monthly" ? "active" : ""}`}
                    onClick={() => {
                      setPeriod("monthly");
                      setActiveMonth(4);
                    }}
                  >
                    Monthly
                  </button>
                  <button
                    className={`period-btn ${period === "weekly" ? "active" : ""}`}
                    onClick={() => {
                      setPeriod("weekly");
                      setActiveMonth(2);
                    }}
                  >
                    Weekly
                  </button>
                </div>
              </div>

              {/* Total Balance Amount */}
              <div className="mockup-balance-section">
                <div className="balance-row">
                  <h3 className="balance-amount">
                    {period === "monthly" ? "$14,850.40" : "$3,680.15"}
                  </h3>
                  <span className="balance-growth">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                    +18.4%
                  </span>
                </div>
              </div>

              {/* Interactive Spending Chart with Dynamic Theme Coloring */}
              <div className="mockup-chart-box">
                <div className="chart-header">
                  <span>Cashflow Analytics</span>
                  <span style={{ color: activeTheme.primary, fontWeight: 700 }}>
                    {currentItem ? currentItem.amount : "$3,850"}
                  </span>
                </div>
                <div className="chart-bars">
                  {chartData.map((item, index) => (
                    <div
                      key={item.label}
                      className="chart-bar-group"
                      onClick={() => setActiveMonth(index)}
                    >
                      <div
                        className={`chart-bar ${activeMonth === index ? "active" : ""}`}
                        style={{ height: item.height }}
                        title={`${item.label}: ${item.amount}`}
                      ></div>
                      <span className="chart-label">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Expenses List with Category Color Badges */}
              <div className="mockup-transactions">
                <div className="tx-item">
                  <div className="tx-left">
                    <div className="tx-icon software">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <div>
                      <p className="tx-title">Cloud Storage Pro</p>
                      <div className="tx-tag-wrap">
                        <span className="tx-category-badge badge-purple">Tech</span>
                        <span className="tx-subtitle">• Today</span>
                      </div>
                    </div>
                  </div>
                  <span className="tx-amount">-$14.99</span>
                </div>

                <div className="tx-item">
                  <div className="tx-left">
                    <div className="tx-icon coffee">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                        <line x1="6" y1="1" x2="6" y2="4" />
                        <line x1="10" y1="1" x2="10" y2="4" />
                        <line x1="14" y1="1" x2="14" y2="4" />
                      </svg>
                    </div>
                    <div>
                      <p className="tx-title">Artisan Coffee & Bakery</p>
                      <div className="tx-tag-wrap">
                        <span className="tx-category-badge badge-amber">Dining</span>
                        <span className="tx-subtitle">• Yesterday</span>
                      </div>
                    </div>
                  </div>
                  <span className="tx-amount">-$6.40</span>
                </div>

                <div className="tx-item">
                  <div className="tx-left">
                    <div className="tx-icon groceries">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                    </div>
                    <div>
                      <p className="tx-title">Organic Supermarket</p>
                      <div className="tx-tag-wrap">
                        <span className="tx-category-badge badge-green">Grocery</span>
                        <span className="tx-subtitle">• 2 days ago</span>
                      </div>
                    </div>
                  </div>
                  <span className="tx-amount">-$48.20</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Floating Badge */}
          <div className="floating-badge floating-badge-bottom">
            <div className="badge-icon-wrap badge-icon-purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <div>
              <p className="floating-badge-title">AI Color Tagging</p>
              <p className="floating-badge-desc">Auto-categorized & styled</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
