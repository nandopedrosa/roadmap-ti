// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Footer from "../components/Footer";
import PublicNav from "../components/PublicNav";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Spinner from '../components/Spinner';

function Home() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCards = function () {
        setLoading(true);

        axios(`/api/home/cards`).then((response) => {
            setCards(response.data);
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        getCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function truncateDescricao(descricao) {
        if (!descricao) return '';

        if (descricao.length > 200) {
            return descricao.substring(0, 200) + "...";
        }

        return descricao;
    }

    return (
        <>
            <PublicNav />

            <main role="main">
                <div style={{ paddingTop: 45, paddingBottom: 30 }}>
                    <div className="container text-center" style={{ maxWidth: "40rem" }}>
                        <h1 className="display-4">Roadmap de TI</h1>
                        <h1>
                            <p className="lead text-muted">
                                Pode onde começar? Quais assuntos estudar? Em que ordem ? Escolha uma disciplina e acesse o
                                seu <b>"Roadmap"</b> (trilha, roteiro) para começar a sua jornada... .
                            </p>
                        </h1>
                    </div>
                </div>
                <div className="album py-5 bg-light">
                    <div className="container">
                        {
                            loading ?
                                <Spinner />
                                :
                                <div className="row row-cols-3 row-cols-md-3 g-4">
                                    {
                                        cards.map((card) =>
                                            <div key={card.id} className="col">
                                                <div className="card h-100">
                                                    <div className="card-body">
                                                        <Link to={`/roadmap/${card.id}`} style={{ textDecoration: "inherit", color: "inherit" }}>
                                                            <h5 className="card-title">{card.nome}</h5>
                                                            <div className="card-text text-muted"
                                                                style={{ textAlign: "justify" }}
                                                                dangerouslySetInnerHTML={{ __html: truncateDescricao(card.descricao) }}>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="card-footer" >
                                                        <small >{card.qtd === 0 || card.qtd > 1 ? `${card.qtd} assuntos` : `${card.qtd} assunto`}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                        }
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Home;