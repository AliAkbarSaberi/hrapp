import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import PersonList from './components/PersonList';
import { employees } from './data/employeesData';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="app-main">
        <div className="employees-section">
          <h2 className="section-title">Team Members</h2>
          <p className="section-subtitle">Total: {employees.length} employees</p>
          <PersonList employees={employees} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
