import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Mainapp from "../pages/Mainapp";

const rotas = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/main",
        element: <Mainapp />
    }
]);

export default rotas