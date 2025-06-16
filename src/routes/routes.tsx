import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Mainapp from "../pages/main/Mainapp";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import TokenExpiredPage from "../pages/err/tokenExpirado/TokenExpirado";

const rotas = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/tokenExpirado",
        element: <TokenExpiredPage />
    },
    {
        element: <ProtectedRoute redirectPath="/tokenExpirado" />,
        children: [
            {
                path: "/main",
                element: <Mainapp />
            }
        ]
    }
]);

export default rotas