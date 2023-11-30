import { useState } from "react";
import styles from "./App.module.scss";
import Index from "./components/Index/Index";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import GoogleLogin from "./components/rightContainer/Login/GoogleLogin"
import Search from "./components/Search/Search";
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
          <Route path="/googleauth" element={<GoogleLogin/>}/>
          <Route path="/search" element={<div className={styles.search}><Search/></div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
