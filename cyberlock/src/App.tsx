import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './screens/Login';
import { AuthScreen } from './screens/Cadastro';
import { Home } from './screens/Home';
import { Jogos } from './screens/Jogos';
import { Noticias } from './screens/Noticias';
import { SobreNos } from './screens/SobreNos';
import { Planos } from './screens/Planos';
import { Perfil } from './screens/Perfil';
import { JogoDetalhe } from './screens/JogoDetalhe';
import { JogoNivel } from './screens/JogoNivel';
import { NoticiaDetalhe } from './screens/NoticiaDetalhe';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressoProvider } from './contexts/ProgressoContext';
import { RotaProtegida } from './components/RotaProtegida';

export function App() {
  return (
    <AuthProvider>
      <ProgressoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<AuthScreen />} />

          <Route element={<RotaProtegida />}>
            <Route path="/home" element={<Home />} />
            <Route path="/jogos" element={<Jogos />} />
            <Route path="/jogos/:jogoId" element={<JogoDetalhe />} />
            <Route path="/jogos/:jogoId/nivel/:nivelId" element={<JogoNivel />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/noticias/:noticiaId" element={<NoticiaDetalhe />} />
            <Route path="/sobre" element={<SobreNos />} />
            <Route path="/planos" element={<Planos />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>
        </Routes>
      </Router>
      </ProgressoProvider>
    </AuthProvider>
  );
}

export default App;