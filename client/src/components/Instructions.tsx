
const Instructions = () => {
    return (
        <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-slate-800 mb-3">How It Works</h3>
            <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-200 text-slate-800 mr-2 flex-shrink-0">1</span>
                    <span>Upload both front and back sides of your Aadhaar card</span>
                </li>
                <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-200 text-slate-800 mr-2 flex-shrink-0">2</span>
                    <span>Click "Extract Data" to process the images</span>
                </li>
                <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-200 text-slate-800 mr-2 flex-shrink-0">3</span>
                    <span>Review the extracted information for accuracy</span>
                </li>
                <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-200 text-slate-800 mr-2 flex-shrink-0">4</span>
                    <span>Download or copy the extracted data as needed</span>
                </li>
            </ul>
        </div>
    )
}

export default Instructions