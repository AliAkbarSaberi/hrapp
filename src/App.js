import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import EmployeeListPage from './pages/EmployeeListPage';
import AddEmployee from './pages/AddEmployee';
import About from './pages/About';
import { employees as initialEmployees } from './data/employeesData';

function App() {
  const [employees, setEmployees] = useState(initialEmployees);

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<EmployeeListPage employees={employees} setEmployees={setEmployees} />} />
            <Route path="/add-employee" element={<AddEmployee employees={employees} setEmployees={setEmployees} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
