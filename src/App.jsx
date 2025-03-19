import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/Admin/Login.jsx';
import UserManagement from './components/Admin/UserManagement.jsx';
import AdminTestManagement from './components/Admin/AdminTestManagement';
import AdminTestResults from './components/Admin/AdminTestResults';
import AdminQuestionManagement from './components/Admin/AdminQuestionManagement';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/usermanagement" element={<UserManagement />} />
        <Route path="/admin/tests" element={<AdminTestManagement />} />
        <Route path="/admin/tests/questions" element={<AdminQuestionManagement />} />
        <Route path="/admin/results" element={<AdminTestResults />} />
        </Routes>
    </Router>
  );
};

export default App;