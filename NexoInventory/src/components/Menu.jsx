import "../assets/style/input.css";


function Menu({ children }) {
    return (
        <div className="w-xs h-screen bg-gray-800 text-white flex flex-col justify-center">
            <div className="flex flex-col space-y-2 w-xs justify-center items-center">
                {children}
            </div>
        </div>
    );
}

export default Menu;