import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container">
            <div className="bg-light p-5 rounded-lg m-3">
                <h1 className="display-4">Roadmap de TI</h1>
                <p className="lead">Gerenciador de roteiro de estudos para Concursos de TI</p>
                <hr className="my-4" />
                <p><i>implementar login...</i></p>
                <Link className="btn btn-success btn-lg mb-3 me-3" to="/disciplinas" role="button">Gerenciar Disciplinas e Assuntos</Link>
            </div>
        </div>
    );
}

export default Home;