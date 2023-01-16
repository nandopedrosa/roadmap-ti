import { Outlet } from 'react-router-dom';
import Nav from "./Nav";
import Footer from "./Footer";


function BaseLayout({ usuario, setUsuario }) {
    return (
        <>
            <Nav usuario={usuario} setUsuario={setUsuario} />
            <Outlet />
            <Footer />
        </>

    );
}

export default BaseLayout;