import { Outlet } from "react-router-dom";
import Footer from './Footer.jsx';
import './Layout.css';
import NavBar from './NavBar.jsx';



export default function Layout() {
    return (
        <div className="layout">
            <NavBar />
            <div className="content-container">
                <div className="content">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
}