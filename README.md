# HR Management Application (hrApp)

A modern, full-stack HR management system built with React and Node.js. Manage employee information, track years of service, edit employee details, and celebrate work anniversaries.

## 🚀 Features

- ✅ **Employee Directory** - View all employees with detailed information
- ✅ **Add Employees** - Create new employee records with validation
- ✅ **Edit Employees** - Update salary, location, department, and skills
- ✅ **Anniversary Tracking** - Automatic reminders for 5, 10, 15-year milestones and probation periods
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile devices
- ✅ **Clean Code Architecture** - Modular components with extracted helper functions and custom hooks
- ✅ **Environment Configuration** - Easy switching between local and production backends

## 🛠️ Tech Stack

### Frontend
- **React 19.2.3** - UI framework
- **React Router DOM 7.11.0** - Client-side routing
- **Axios 1.13.2** - HTTP client
- **CSS** - Styling with gradients and animations

### Backend
- **json-server 1.0.0-beta.3** - Mock REST API
- **Node.js** - Runtime environment

## 📋 Project Structure

```
src/
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── PersonCard.js
│   ├── PersonCardEditForm.js
│   ├── PersonCardEmploymentView.js
│   └── PersonList.js
├── pages/
│   ├── Welcome.jsx
│   ├── EmployeeListPage.jsx
│   ├── AddEmployee.jsx
│   └── About.jsx
├── hooks/
│   └── useAxios.js (Custom hook for API calls)
├── utils/
│   ├── dateHelpers.js
│   ├── animalHelpers.js
│   └── reminderHelpers.js
├── styles/
│   ├── AddEmployee.css
│   ├── Pages.css
│   └── Welcome.css
├── App.js
└── index.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/AliAkbarSaberi/hrapp.git
cd hrapp
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
# .env should contain:
# REACT_APP_API_URL=http://localhost:3001/employees
```

4. **Start the backend server (json-server)**
```bash
npm run server
# Runs on http://localhost:3001
```

5. **In a new terminal, start the React app**
```bash
npm start
# Opens http://localhost:3000 in your browser
```

## 📦 Available Scripts

- `npm start` - Start React development server on port 3000
- `npm run server` - Start json-server backend on port 3001
- `npm run build` - Create production build
- `npm test` - Run test suite

## 🌐 Deployment

### Backend Deployment (Render)

1. **Create a backend repository** with the following files:
   - `db.json` - Your employee database
   - `package.json` - Node.js dependencies
   - `server.js` - Express/json-server configuration

2. **Push to GitHub** and connect to Render:
   - Create a new Web Service on Render
   - Connect your backend GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Note the live API URL provided by Render

3. **Backend repository structure:**
```
.
├── db.json
├── package.json
├── server.js
└── .gitignore
```

### Frontend Deployment (Render or Vercel)

1. **Update environment for production:**
   - Create `.env.production` or use Render/Vercel environment variables
   - Set `REACT_APP_API_URL` to your live backend URL

2. **Deploy to Render:**
   - Create new Static Site on Render
   - Connect frontend GitHub repository
   - Build command: `npm run build`
   - Publish directory: `build`
   - Add environment variable: `REACT_APP_API_URL=https://your-backend.onrender.com/employees`

3. **Or deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Add environment variable: `REACT_APP_API_URL=https://your-backend.onrender.com/employees`
   - Deploy automatically on push

## 🔧 Code Quality Improvements (Step 6)

### Custom Hooks
- **useAxios** - Centralized API calls (GET, POST, PATCH, DELETE)
- Used in App.js, AddEmployee.jsx for clean code

### Helper Functions & Utilities
- `dateHelpers.js` - Year of service calculations
- `animalHelpers.js` - Animal emoji mappings
- `reminderHelpers.js` - Anniversary reminder logic

### Component Refactoring
- **PersonCard.js** - Cleaner with extracted components
- **PersonCardEditForm.js** - Dedicated edit form component
- **PersonCardEmploymentView.js** - Dedicated employment display component
- Reduced component complexity and improved reusability

## 🧪 Testing the Application

1. **Navigate to Employee List** - View all employees
2. **Click "Add Employee"** - Add a new employee (all fields required)
3. **Click "Edit"** - Edit any employee's salary, location, department, or skills
4. **Check Reminders** - 🎉 for 5/10/15-year milestones, 🔔 for employees in probation
5. **Test with Live Backend** - Verify all operations persist to the database

## 📊 Database Schema

Employees have the following properties:
```json
{
  "id": 1,
  "name": "John Doe",
  "title": "Senior Developer",
  "salary": 5500,
  "phone": "040-1234567",
  "email": "john@example.com",
  "animal": "Dog",
  "startDate": "2014-06-15",
  "location": "Helsinki",
  "department": "Engineering",
  "skills": ["React", "Node.js", "Python"]
}
```

## 🐛 Troubleshooting

### Backend not connecting
- Ensure json-server is running on port 3001
- Check `REACT_APP_API_URL` environment variable
- Verify database `db.json` exists in root directory

### Changes not persisting
- Confirm json-server is writing to `db.json`
- Check browser console for API errors
- Verify employee object structure matches schema

### Port conflicts
- If port 3000/3001 is in use, kill the process or change ports
- Run: `lsof -i :3000` (macOS/Linux) to find the process

## 📝 Environment Variables

Create a `.env` file in the project root:
```
REACT_APP_API_URL=http://localhost:3001/employees
```

For production with Render backend:
```
REACT_APP_API_URL=https://your-backend.onrender.com/employees
```

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)
- [json-server Documentation](https://github.com/typicode/json-server)

## 👤 Author

Ali Akbar Saberi

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **Frontend Repository:** [https://github.com/AliAkbarSaberi/hrapp](https://github.com/AliAkbarSaberi/hrapp)
- **Backend Repository:** [https://github.com/AliAkbarSaberi/hrapp-backend](https://github.com/AliAkbarSaberi/hrapp-backend)
- **Live Frontend:** [https://hrapp.onrender.com](https://hrapp.onrender.com) (Update with your deployed URL)
- **Live Backend API:** [https://hrapp-backend.onrender.com](https://hrapp-backend.onrender.com/employees) (Update with your deployed URL)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# hrapp
# hrapp
