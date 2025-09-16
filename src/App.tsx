import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <Router>
        <AppRouter />
      </Router>
    </TooltipProvider>
  );
}

export default App;
