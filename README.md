# Redux Intro: Classic Redux & Redux Toolkit Example

## Getting Started

To clone and run this project locally:

```bash
git clone https://github.com/Caisere/redux-intro.git
cd redux-intro
npm install
npm start
```

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [State Management](#state-management)
  - [Accounts](#accounts)
  - [Customers](#customers)
- [UI Components](#ui-components)
- [How to Run](#how-to-run)
- [Extending the Project](#extending-the-project)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project demonstrates the use of Redux for state management in a React application, showcasing both **Classic Redux** and **Redux Toolkit (RTK)** approaches. The app simulates a simple banking system where users can create a customer profile, deposit/withdraw money, request/pay loans, and see their account balance.

---

## Project Structure

```
redux-intro/
│
├── src/
│   ├── App.js                # Main React component
│   ├── index.js              # Entry point
│   ├── index.css             # Global styles
│   ├── store.js              # Redux store configuration (RTK)
│   ├── store-v1.js           # Classic Redux store example
│   ├── ui/
│   │   └── header.js         # Header component
│   │   └── button.js         # Reusable button component
│   └── features/
│       ├── accounts/
│       │   ├── accountSlice.js        # Account state logic (RTK)
│       │   ├── AccountOperations.jsx  # UI for account actions
│       │   └── BalanceDisplay.jsx     # UI for displaying balance
│       └── customers/
│           ├── customerSlice.js       # Customer state logic (RTK)
│           ├── CreateCustomer.jsx     # UI for creating a customer
│           └── Customer.jsx           # UI for displaying customer info
│
├── package.json
├── tailwind.config.js
└── README.md
```

---

## State Management

### Accounts

- **State Shape:**
  ```js
  {
    balance: number,
    loan: number,
    loanPurpose: string,
    isLoading: boolean,
    error: boolean,
    conversionError: string
  }
  ```
- **Actions:**

  - `deposit(amount, currency)`: Deposits money, with currency conversion if needed.
  - `withdraw(amount)`: Withdraws money.
  - `loan(amount, purpose)`: Requests a loan (only one active at a time).
  - `payLoan()`: Pays off the current loan.
  - `currencyConversion`: Sets loading state for currency conversion.

- **Async Logic:**  
  Currency conversion is handled via a thunk that fetches rates from [Frankfurter API](https://www.frankfurter.app/).

### Customers

- **State Shape:**
  ```js
  {
    fullName: string,
    nationalID: string,
    createdAt: string
  }
  ```
- **Actions:**
  - `customerCreation(fullName, nationalId)`: Creates a new customer.
  - `customerDetailUpdate(fullName)`: Updates the customer's name.
  - `logoutUser()`: Logs out the customer (clears name).

---

## UI Components

- **App.js:**  
  Main component. Renders either the customer creation form or, if a customer exists, the account dashboard.

- **CreateCustomer.jsx:**  
  Form for entering customer details.

- **Customer.jsx:**  
  Displays customer information.

- **AccountOperations.jsx:**  
  UI for deposit, withdrawal, loan request, and loan payment. Handles user input and dispatches Redux actions.

- **BalanceDisplay.jsx:**  
  Shows the current account balance and loan status.

- **Header.js:**  
  Application header.

---

## How to Run

1. **Open your browser:**  
   Visit `http://localhost:3000`

---

## Extending the Project

- **Add new features:**  
  Create new slices in `src/features/` and connect them to the store.
- **UI enhancements:**  
  Add new components in `src/ui/` or extend existing ones.
- **API integration:**  
  Replace the mock or Frankfurter API with your own backend as needed.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---
