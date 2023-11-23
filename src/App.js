import { useState } from "react";
import styles from "./App.module.scss";
import Index from "./components/Index/Index";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  const [authorized, setAuthorized] = useState(false);
  
  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Index setAuthorized={setAuthorized} />}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute authorized={authorized} elements={<div className={styles.dashboard}><Dashboard/></div>}/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
