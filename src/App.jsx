import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Movimientos from './pages/Movimientos';
import './assets/style/input.css';
import Layout from './components/Layout';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="productos" element={<Productos />} />
          <Route path="movimientos" element={<Movimientos />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
