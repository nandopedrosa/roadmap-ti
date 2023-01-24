// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function RoadmapHeader({ nome, descricao }) {
    return (
        <div style={{ paddingTop: 45, paddingBottom: 30 }}>
            <div className="container" style={{ maxWidth: "42rem" }}>
                <h1 className="text-center display-4">{nome}</h1>
                <h1 className="text-center">
                    <p className="lead text-muted">
                        <div dangerouslySetInnerHTML={{ __html: descricao }}></div>
                    </p>
                </h1>
                <p className="fst-italic text-center"><i className="bi bi-exclamation-circle"></i> Este roteiro não contém todos os assuntos possíveis da disciplina (foco no essencial).</p>
            </div>
        </div>
    );
}

export default RoadmapHeader;