import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Disciplinas from './pages/disciplina/Disciplinas';
import EditarDisciplina from './pages/disciplina/EditarDisciplina';
import EditarAssunto from './pages/assunto/EditarAssunto';
import PaginaNaoEncontrada from './pages/PaginaNaoEncontrada';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import NaoAutorizado from './pages/NaoAutorizado';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Roadmap from './pages/roadmap/Roadmap';

function App() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/auth/is-logged-in', { params: { token: token } });
            if (response.data.isLoggedIn) {
                setUsuario(response.data.usuario);
            }
        }
        fetchUser();
    }, []);


    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/roadmap/:idDisciplina" element={<Roadmap />} />
                <Route path='/not-found' element={<PaginaNaoEncontrada />} />
                <Route path='*' element={<PaginaNaoEncontrada />} />

                <Route path="/admin" element={<BaseLayout usuario={usuario} setUsuario={setUsuario} />}>
                    {/* Public Routes */}
                    <Route index element={<Admin usuario={usuario} />} />
                    <Route path="auth/login" element={<Login setUsuario={setUsuario} />} />
                    <Route path="auth/signup" element={<Signup />} />

                    {/* Protected Routes */}
                    <Route path="disciplinas" element={
                        <ProtectedRoute usuario={usuario}>
                            <Disciplinas />
                        </ProtectedRoute>
                    } />

                    <Route path="disciplinas/:idParam" element={
                        <ProtectedRoute usuario={usuario}>
                            <EditarDisciplina />
                        </ProtectedRoute>
                    } />

                    <Route path="assuntos/:idDisciplina/:idParam" element={
                        <ProtectedRoute usuario={usuario}>
                            <EditarAssunto />
                        </ProtectedRoute>
                    } />

                    {/* Error Routes */}
                    <Route path='not-authorized' element={<NaoAutorizado />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;