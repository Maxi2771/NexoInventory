import "../assets/style/input.css";


function Menu({ children }) {
    return (
        <div className="w-xs h-screen bg-gray-800 text-white flex flex-col justify-between items-center py-4">
                {children}
        </div>
    );
}

export default Menu;