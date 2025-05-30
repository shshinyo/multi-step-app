# 🧪 Multi-Step React Application

A Simple multi-step form application built with React, Redux, React Router, and TailwindCSS. This task showcases routing, state management, form validation, conditional rendering, edge case handling, and testing using **Jest**, **React Testing Library**, and **Cypress**.

---

## 🚀 Features

- ✅ Three-step form workflow with routing
- ✅ Centralized state management using Redux Toolkit as it has a low boilerplate syntax.
- ✅ Session persistence via `sessionStorage`
- ✅ Form validation with error handling
- ✅ Conditional fields and dynamic form behavior
- ✅ UX enhancements (progress indicator, animations)
- ✅ Edge case handling for route protection
- ✅ Dark Mode Theme.
- ✅ API Calling that fetching some Random Workers that user can select (Step 3).
- ✅ Unit and E2E testing support
- ✅ Lazy Loading Components.
- ✅ Displaying a Table of Submitted Users.
- ✅ Conditional Rendering Based on Step 1 Input (In Step 2, the displayed fields are dynamically influenced by the data collected in Step 1. Specifically, when the user selects "Married" as their marital status, additional fields such as Spouse Name and Number of Dependents are revealed to gather more relevant information.)

## 🛠️ Implementation Details

### 🔗 Routing

- Uses **React Router v6**
- Routes: `/step1`, `/step2`, `/step3`
- Protected navigation: steps cannot be accessed out of order
- Back button retains previous state

### 📦 State Management

- Managed via **Redux Toolkit**
- Persisted in `sessionStorage`
- Conditional logic handled in Redux slices
- `resetForm()` dispatch clears all state

### 🎨 UI/UX

- Built with **Tailwind CSS** for rapid styling
- Progress bar reflects current step
- Disabled buttons until valid
- Error messages shown inline
- Transitions with Framer Motion

### 🧪 Testing

- Unit testing using React testing lib and vitest.
- E2E testing Using Cypress.

- Framework: **Vitest** + **React Testing Library**
- Scope:
  - Redux reducers
  - Form validation behavior
  - UI logic and conditional rendering

Run unit tests with:

```bash
npm test

```

Run E2E tests with:

```bash
npm run test:cypress
```

- Cypress will open the cypress UI that you can choose a browser then choose the `bash flow.cy.ts ` specs file

### 🧪 🧾 Prerequisites

- Node.js >= 18.x
- npm

### 🧪 🧾 Install & Run

git clone https://github.com/shshinyo/multi-step-app.git

```bash
npm install
```

```bash
npm start
```

Then open http://localhost:3000 in your browser.
