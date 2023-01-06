import { Outlet } from 'react-router-dom';
import Nav from "./Nav";
import Footer from "./Footer";


function BaseLayout() {
    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>

    );
}

export default BaseLayout;