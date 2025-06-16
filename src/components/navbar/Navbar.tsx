import Navoption from "./nav-option/Navoption";

function Navbar() {
    return(
        <nav className="w-full h-20 bg-gray-800 text-white">
            <Navoption 
                titulo="teste"  
            />
        </nav>
    );
};

export default Navbar;