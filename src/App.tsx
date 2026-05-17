import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importamos tus dos páginas
import LoginPage from '@/modules/auth/ui/Login';
import Home from '@/Home';

// Opcional: Importamos tu store para proteger la ruta
import { useAuthStore } from './modules/auth/application/authStore';

function App() {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Si entran a la raíz (/), los mandamos al login por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Tu página de Login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Tu página de Inicio (Protegida) */}
        <Route 
          path="/home" 
          element={
            // Un pequeño guardia de seguridad: 
            // Si hay usuario, muestra el Home. Si no, mándalo al login.
            user ? <Home /> : <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;