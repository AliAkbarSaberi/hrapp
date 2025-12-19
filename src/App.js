import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Person from './components/Person';

function App() {
  const employees = [
    {
      name: 'Alice Johnson',
      title: 'HR Manager',
      salary: 75000,
      phone: '+1-555-0101',
      email: 'alice.johnson@hrapp.com',
      animal: '🐱'
    },
    {
      name: 'Bob Smith',
      title: 'Senior Developer',
      salary: 95000,
      phone: '+1-555-0102',
      email: 'bob.smith@hrapp.com',
      animal: '🐕'
    },
    {
      name: 'Carol White',
      title: 'Designer',
      salary: 65000,
      phone: '+1-555-0103',
      email: 'carol.white@hrapp.com',
      animal: '🦁'
    }
  ];

  return (
    <div className="App">
      <Header />
      <main className="app-main">
        <div className="employees-section">
          <h2 className="section-title">Team Members</h2>
          <div className="employees-grid">
            {employees.map((employee, index) => (
              <Person
                key={index}
                name={employee.name}
                title={employee.title}
                salary={employee.salary}
                phone={employee.phone}
                email={employee.email}
                animal={employee.animal}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
