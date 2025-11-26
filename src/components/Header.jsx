function Header({title, children}) {
    return (
        <header className="flex flex-col gap-6 mb-6 w-full">
            <div className="pt-2 pb-2 border-b border-gray-700 w-full">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {title}
                </h1>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full md:items-center md:justify-center">
                {children}
            </div>
        </header>
    );
}
export default Header;