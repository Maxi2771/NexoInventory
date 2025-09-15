function Header({title, children}) {
    return (
        <header className="flex flex-col gap-6 mb-6 p-6w-390">
            <div className="pt-2 pb-2 border-b border-gray-700 w-full md:w-auto">
                <h1 className="text-2xl font-bold text-center">{title}</h1>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
                    {children}
            </div>
        </header>
    );
}
export default Header;