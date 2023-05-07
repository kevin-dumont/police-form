import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TravelerFormPage } from "./components/pages/TravelerFormPage";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/police-form" element={<TravelerFormPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
