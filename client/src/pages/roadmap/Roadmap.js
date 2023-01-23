import './Roadmap.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../../components/Footer";
import PublicNav from '../../components/PublicNav';
import RoadmapHeader from './RoadmapHeader';
import Spinner from '../../components/Spinner';

function Roadmap() {
    const { idDisciplina } = useParams();
    const [roadmap, setRoadmap] = useState({ disciplina: { nome: '', descricao: '' }, assuntos: [] });
    const [loading, setLoading] = useState(false);

    const getRoadmap = function () {
        setLoading(true);

        axios(`/api/roadmap/${idDisciplina}`).then((response) => {
            setRoadmap(response.data);
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        getRoadmap();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <PublicNav />
            <div className="roadmap">
                <RoadmapHeader nome={roadmap.disciplina.nome} descricao={roadmap.disciplina.descricao} />
                <div className="roadmap-wrapper">
                    {
                        loading ?
                            <>
                                <Spinner />
                                <br /><br />
                            </>
                            :
                            <div className="roadmap-timeline">
                                {
                                    roadmap.assuntos.map((assunto, index) =>
                                        <div key={assunto.id} className={"roadmap-container " + (index % 2 === 0 ? 'roadmap-left' : 'roadmap-right')}>
                                            <div className="roadmap-content">
                                                <h3>{assunto.nome}</h3>
                                                <p>
                                                    <b>O que devo estudar?</b>
                                                    <div dangerouslySetInnerHTML={{ __html: assunto.descricao }}></div>
                                                </p>
                                                <p>
                                                    <b>Referências</b>
                                                    <div dangerouslySetInnerHTML={{ __html: assunto.referencia }}></div>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Roadmap;