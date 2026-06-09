import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles.css";
import ErrorBoundary from "./components/ErrorBoundary";

import { NotificationProvider } from "./context/NotificationContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <ErrorBoundary>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </ErrorBoundary>
  </React.StrictMode>
);