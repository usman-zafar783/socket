import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {AccountContextProvider} from "./contexts/accountContext";


  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <AccountContextProvider>
          <App />
      </AccountContextProvider>
    </React.StrictMode>
  );
