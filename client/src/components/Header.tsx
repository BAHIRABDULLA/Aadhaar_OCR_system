
const Header = () => {
    return (
        <header className="bg-slate-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="mr-3 text-xl font-bold">आधार</div>
                    <h1 className="text-2xl font-semibold">Aadhaar OCR System</h1>
                </div>
                <div className="hidden md:block">
                    <span className="text-sm font-bold">Keep It Safe</span>
                </div>
            </div>
        </header>
    )
}

export default Header