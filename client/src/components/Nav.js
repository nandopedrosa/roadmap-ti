import { Link, useNavigate } from 'react-router-dom';

function Nav({ usuario, setUsuario }) {

    const navigate = useNavigate();

    function handleLogout() {
        setUsuario(null);
        localStorage.clear();
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="offset-md-1 container px-3">
                <Link className="navbar-brand" to="/admin"><strong>Roadmap de TI</strong></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/disciplinas">Disciplinas e Assuntos</Link>
                        </li>

                        {usuario ?
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleLogout}>Sair</Link>
                            </li>
                            :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/auth/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/auth/signup">Criar conta</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;