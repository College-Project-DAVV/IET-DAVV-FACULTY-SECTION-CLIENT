import styles from './App.module.scss';
import Dashboard from './components/Dashboard/Dashboard';
function App() {
  return (
    <div className={styles.App}>
      <div className={styles.dashboard}>
        <Dashboard/>
      </div>
    </div>
  );
}

export default App;
