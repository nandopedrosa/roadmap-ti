import { Link } from 'react-router-dom';

function PaginaNaoEncontrada() {
    return (
        <div className="container">
            <div className="p-3 m-3">
                <div className="row mb-2">
                    <div className="col-sm-12">
                        <h3>404 - Página não encontrada.</h3>
                        <Link to="/">Voltar ao início</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaNaoEncontrada;