import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Welcome from './pages/Welcome';
import EmployeeListPage from './pages/EmployeeListPage';
import AddEmployee from './pages/AddEmployee';
import About from './pages/About';

const API_URL = 'http://localhost:3001/employees';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Failed to load employees. Make sure json-server is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (employeeId, updates) => {
    try {
      const response = await axios.patch(`${API_URL}/${employeeId}`, updates);
      // Update the employee in the state
      setEmployees(prevEmployees =>
        prevEmployees.map(emp =>
          emp.id === employeeId ? { ...emp, ...response.data } : emp
        )
      );
    } catch (err) {
      console.error('Error updating employee:', err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="App">
        <Header />
        <main className="app-main">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Loading employees...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <Header />
        <main className="app-main">
          <div style={{ textAlign: 'center', padding: '2rem', color: '#e74c3c' }}>
            <p>{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <main className="app-main">
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/employees" element={<EmployeeListPage employees={employees} setEmployees={setEmployees} fetchEmployees={fetchEmployees} updateEmployee={updateEmployee} />} />
            <Route path="/add-employee" element={<AddEmployee employees={employees} setEmployees={setEmployees} fetchEmployees={fetchEmployees} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
  );
}

export default App;
