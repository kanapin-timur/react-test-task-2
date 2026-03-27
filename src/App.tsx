import { Routes, Route } from 'react-router-dom';
import UsersListPage from './pages/UsersListPage';
import UserDetailsPage from './pages/UserDetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UsersListPage />} />
      <Route path="/users/:id" element={<UserDetailsPage />} />
    </Routes>
  );
}

export default App;
