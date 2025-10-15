import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import DonateButton from "./components/DonateButton.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <App />
       <DonateButton />
    </BrowserRouter>
);
