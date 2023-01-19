import { Link } from 'react-router-dom';

function PublicNav() {
    return (<header style={{ backgroundColor: "#4141c8" }} >
        <div className="collapse" id="navbarSupportedContent" >
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-md-7 py-4">
                        <h4 className="text-white">Sobre</h4>
                        <p
                            style={{ color: "rgba(255, 255, 255, 0.7)" }}
                            className="font-weight-light text-justify"
                        >
                            Pode onde começar? Quais assuntos estudar? Em que ordem ? Roadmap de TI é um site para o concurseiro de tecnologia
                            da informação esclarecer essas e outras dúvidas sobre a sua jornada de estudos. As sugestões de "trilhas de estudos"
                            foram elaboradas pelos professores da equipe Canetas Pretas. Qualquer dúvida, procure-nos em nossos grupos e redes sociais!
                        </p>
                    </div>
                    <div className="col-sm-4 offset-md-1 py-4">
                        <h4 className="text-white">Contato</h4>
                        <ul className="list-unstyled">
                            <li>
                                <a
                                    target="_blank"
                                    href="https://www.instagram.com/canetas.pretas/"
                                    className="text-white text-decoration-none" rel="noreferrer"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="https://t.me/canetaspretas" className="text-white text-decoration-none" rel="noreferrer">
                                    Telegram
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="https://www.estrategiaconcursos.com.br/curso/pacote-para-concursos-area-de-ti-cursos-regulares-2023/" className="text-white text-decoration-none" rel="noreferrer">
                                    Cursos
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="navbar navbar-dark bg-header box-shadow">
            <div className="container d-flex justify-content-between">
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <i style={{ color: "white" }} className="bi bi-signpost-split" />
                    <strong style={{ color: "white" }}>&nbsp;&nbsp;Roadmap de TI</strong>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </div>
    </header>);
}

export default PublicNav;