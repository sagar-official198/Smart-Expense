# 💰 SmartExpense

<p align="center">
  <strong>Personal Expense & Finance Management System</strong>
</p>

<p align="center">
  A full-stack MERN application for managing salary, expenses, savings, and financial analytics.
</p>

<p align="center">
  <a href="https://smart-expense-tau-two.vercel.app">
    <strong>🚀 Live Demo</strong>
  </a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://github.com/sagar-official198/Smart-Expense">
    <strong>📂 GitHub Repository</strong>
  </a>
</p>

---

## 🌐 Live Links

### 🚀 Live Application

**Frontend:**  
https://smart-expense-tau-two.vercel.app

### 🔗 Backend API

**Backend:**  
https://smart-expense-m50r.onrender.com

### 📦 GitHub Repository

https://github.com/sagar-official198/Smart-Expense

---

# 📌 About The Project

**SmartExpense** is a full-stack personal finance management application developed using the **MERN Stack**.

The main purpose of the application is to help users manage their personal finances from a single platform.

Users can securely log in, manage their monthly salary, record expenses, monitor their balance, track savings, and analyze their spending patterns through an interactive dashboard and analytics section.

The application follows a modern client-server architecture where the React frontend communicates with the Node.js and Express.js backend through REST APIs, while MongoDB Atlas is used for storing application data.

---

# 🎯 Project Objective

The objective of SmartExpense is to provide a simple and user-friendly platform for personal financial management.

The application helps users:

- Manage their monthly salary
- Record daily expenses
- Categorize expenses
- Monitor total spending
- Track remaining balance
- Calculate savings
- Analyze spending patterns
- View financial information through charts
- Manage financial information securely

---

# ✨ Key Features

## 🔐 User Authentication

SmartExpense provides secure authentication functionality.

Features include:

- User registration
- User login
- JWT-based authentication
- Protected API routes
- Authorization
- Logout functionality
- User-specific financial data

---

## 💰 Salary Management

Users can manage their monthly salary.

Features include:

- Add salary
- Update salary
- View current salary
- Use salary for financial calculations

The salary information is used to calculate the user's available balance and savings.

---

## 💸 Expense Management

Users can record and manage their expenses.

Expense information can include:

- Expense amount
- Expense category
- Expense description
- Expense date

Users can view their expense records and track their overall spending.

---

## 📊 Dashboard

The dashboard provides an overview of the user's financial information.

It can display:

- 💰 Monthly Salary
- 💸 Total Expenses
- 💵 Remaining Balance
- 📈 Savings
- 📊 Savings Percentage
- 🧾 Recent Transactions
- 📂 Expense Categories
- 📅 Monthly Spending

The dashboard gives users a quick overview of their current financial situation.

---

## 📈 Analytics

The analytics section provides visual insights into spending data.

It includes information such as:

- Expense trends
- Category-wise expenses
- Monthly spending
- Spending distribution
- Financial summaries

Charts are implemented using **Recharts**.

---

# 🧮 Financial Calculations

SmartExpense uses basic financial calculations to provide meaningful information to users.

### Remaining Balance

```text
Balance = Salary - Total Expenses
