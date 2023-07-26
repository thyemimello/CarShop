import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AnnouncementsProvider } from "./contexts/announcements";
import { UserProvider } from "./contexts/user";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AnnouncementsProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AnnouncementsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
