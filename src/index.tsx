/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App";
import { AuthProvider } from "context";
import { Router } from "solid-app-router";

render(
  () => (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  ),
  document.body
);
