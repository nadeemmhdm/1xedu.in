
import { useLocation, Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    const location = useLocation();
    // Don't show header on admin pages (login or dashboard)
    const hideHeader = location.pathname.startsWith("/admin");

    return (
        <>
            {!hideHeader && <Header />}
            <Outlet />
        </>
    );
};

export default Layout;
