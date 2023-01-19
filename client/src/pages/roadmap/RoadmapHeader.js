// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function RoadmapHeader({ nome, descricao }) {
    return (
        <div style={{ paddingTop: 45, paddingBottom: 30 }}>
            <div className="container text-center" style={{ maxWidth: "42rem" }}>
                <h1 className="display-4">{nome}</h1>
                <h1>
                    <p className="lead text-muted">
                        <div dangerouslySetInnerHTML={{ __html: descricao }}></div>
                    </p>
                </h1>
            </div>
        </div>
    );
}

export default RoadmapHeader;