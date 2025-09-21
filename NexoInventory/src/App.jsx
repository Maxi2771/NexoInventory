import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Movimientos from './pages/Movimientos';
import './assets/style/input.css';

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-row font-sans">
      <div className="flex-grow flex items-start justify-center">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/movimientos" element={<Movimientos />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;