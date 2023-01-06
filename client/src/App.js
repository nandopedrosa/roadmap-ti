import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import Home from './pages/Home';
import Disciplinas from './pages/disciplina/Disciplinas';
import PaginaNaoEncontrada from './pages/PaginaNaoEncontrada';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route index element={<Home />} />
                    <Route path="disciplinas" element={<Disciplinas />} />
                    <Route path='*' element={<PaginaNaoEncontrada />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;