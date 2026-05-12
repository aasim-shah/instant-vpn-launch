import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { registerWebMcpTools } from "./lib/webmcp";
import "./index.css";

registerWebMcpTools();

createRoot(document.getElementById("root")!).render(<App />);
