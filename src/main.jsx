import { ToastContainer } from "@Components";
import { ToastProvider } from "@Providers";
import { Store } from "@Store";
import "@Styles/main.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <NextUIProvider>
      <Provider store={Store}>
        <ToastProvider>
          <ToastContainer />
          <App />
        </ToastProvider>
      </Provider>
    </NextUIProvider>
  </BrowserRouter>
  // </StrictMode>
);
