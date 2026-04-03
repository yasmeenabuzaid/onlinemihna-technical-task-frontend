# OnlineMihna - Employer Trial Task (Frontend) 

**Live Demo:** https://onlinemihna-technical-task-frontend.vercel.app/en
// note: the frontend link (Vercel free domain) may be blocked on some networks/ISPs, please try accessing it using mobile data or a different network if it doesn't load



This repository contains the **Frontend (Client-Side)** implementation of the "Employer Trial" task, built with **Next.js** and **Material UI (MUI)**. 

My primary focus here was to deliver a seamless, responsive, and real-world SaaS user experience while maintaining clean React architecture and state management.

*(Note: The Backend API repository utilizing CQRS and Node.js can be found [https://github.com/yasmeenabuzaid/onlinemihna-technical-task-backend.git]).*

## 1. UI/UX & SaaS Features Implemented

✅ **Interactive 7-Day Trial Experience**
* Implemented dynamic status pills and banners that read data from the global Context. 
* Integrated a real-time Progress Bar for the "Post up to 3 Jobs" requirement.
* **UX Magic (The Paywall):** Instead of simple error messages when the trial expires, I implemented a native SaaS experience. The UI gracefully blurs sensitive information (like Talent contact details) and displays an intuitive "Upgrade to Pro" lock overlay, designed to drive conversions rather than block the user entirely.

✅ **Bilingual Dashboard (Arabic & English)**
* Fully integrated `next-intl` for seamless localization.
* The application dynamically switches between **LTR (English)** and **RTL (Arabic)**. All layouts, sidebars, and icons respond correctly to the language direction without breaking the UI.

✅ **Responsive Design & Mobile Optimization**
* **Master-Detail Pattern:** To ensure a clean mobile experience on the Talents Page, I avoided cramming the list and details together. On mobile, users see the talent list first; tapping a talent slides in a full-screen detail view with a "Back" button, mimicking native app behavior.
* **Smart Navigation:** Built a responsive Sidebar that acts as a Drawer (Hamburger menu) on mobile and a permanent Sidebar on desktop.

---

## 2. Frontend Architecture & Technical Decisions

 **Authentication & State Management (Frictionless Approach)**
To keep the evaluation process frictionless and avoid over-engineering (as you requested), I implemented an **Anonymous Guest Session** pattern instead of a full Auth/JWT system. The system generates a simulation of a user session via `LocalStorage` and `Context API` to track the 7-day trial period and the 3-job quota limit. This ensures you can test the core business logic immediately without needing to sign up or log in.

 **Global State (Context API)**
Created a centralized `AppContext` to manage global states such as the `trialStatus`. This prevents prop-drilling and ensures the Navbar, Sidebar, and Dashboard cards always display synchronized, real-time data.

 **API Connector Pattern**
Abstracted all Axios API calls into a dedicated `BackendConnector` service class. This keeps the React components strictly focused on the UI layer and handles the `x-guest-id` headers seamlessly.

---

## 3. How to Run the Frontend Locally

### Prerequisites
* Node.js installed
* The Backend API running locally (Check the Backend Repo).

### Steps
1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and add the Backend API URL (e.g., `NEXT_PUBLIC_API_URL=https://onlinemihna-technical-task-backend.onrender.com/api`).
4. Run the development server:
   npm run dev



---
## Developed by Yasmeen abu zaid 
contact links :
Portfolio: https://portfolio-yasmeen-abu-zaid.vercel.app/
LinkedIn: https://www.linkedin.com/in/yasmeen-abu-zaid-1b492830a