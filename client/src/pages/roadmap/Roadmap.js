import './Roadmap.css';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../../components/Footer";

function Roadmap() {
    const { idDisciplina } = useParams();
    const [roadmap, setRoadmap] = useState({ disciplina: { nome: '', descricao: '' }, assuntos: [] });

    const getRoadmap = async function () {
        const response = await axios(`/api/roadmap/${idDisciplina}`);
        setRoadmap(response.data);
    }

    useEffect(() => {
        getRoadmap();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <div className="roadmap">
                <div className="roadmap-text-content">
                    <h1 style={{ textAlign: "center" }}>{roadmap.disciplina.nome}</h1>
                    <div dangerouslySetInnerHTML={{ __html: roadmap.disciplina.descricao }}></div>
                </div>
                <div className="roadmap-wrapper">
                    <div className="roadmap-timeline">
                        {
                            roadmap.assuntos.map((assunto, index) =>
                                <div key={assunto.id} className={"roadmap-container " + (index % 2 === 0 ? 'roadmap-left' : 'roadmap-right')}>
                                    <div className="roadmap-content">
                                        <h3>{assunto.nome}</h3>
                                        <p>
                                            <b>Principais tópicos:</b>
                                            <div dangerouslySetInnerHTML={{ __html: assunto.descricao }}></div>
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Roadmap;