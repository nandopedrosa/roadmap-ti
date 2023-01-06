import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="offset-md-1 container px-3">
                <Link className="navbar-brand" to="/"><strong>Roadmap de TI</strong></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target=".navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/disciplinas">Disciplinas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/assuntos">Assuntos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Sair</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;