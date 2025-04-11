import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import { PropertiesProvider } from "../src/context/PropertiesContent"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <PropertiesProvider>
        <App />
      </PropertiesProvider>
    </AuthProvider>
  </BrowserRouter>
);