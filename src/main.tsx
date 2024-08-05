import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App.tsx";
import "./global.css";
import "@fontsource/merriweather";
import "phaser/dist/phaser.min.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main className="light text-foreground bg-background">
      <App />
    </main>
  </React.StrictMode>,
);
