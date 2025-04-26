import { DragEvent, useRef, useState } from "react";
import { UploadCloud, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Instructions from "./components/Instructions";
import ParsedOutput from "./components/ParsedOutput";

export default function AadhaarOCRLandingPage() {
    const [frontImage, setFrontImage] = useState<File | null>(null);
    const [backImage, setBackImage] = useState<File | null>(null);
    const [frontPreview, setFrontPreview] = useState<string | null>(null);
    const [backPreview, setBackPreview] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [extractedData, setExtractedData] = useState(null);
    const [error, setError] = useState<string>('');

    const frontInputRef = useRef<HTMLInputElement>(null)
    const backInputRef = useRef<HTMLInputElement>(null)
    const handleFileChange = (side: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.match('image.*')) {
            setError(`Please select a valid image file for the ${side} side.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            const result = event.target?.result
            if (typeof result === 'string') {
                if (side === 'front') {
                    setFrontImage(file);
                    setFrontPreview(result);
                } else {
                    setBackImage(file);
                    setBackPreview(result);
                }
                setError('');
            } else {
                setError('Failed to load image preview')
            }

        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (side:'front' | 'back', e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];

            if (!file.type.match('image.*')) {
                setError(`Please select a valid image file for the ${side} side.`);
                return;
            }

            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const result = event.target?.result;
                if (typeof result === 'string') {
                    if (side === 'front') {
                        setFrontImage(file);
                        setFrontPreview(result);
                    } else {
                        setBackImage(file);
                        setBackPreview(result);
                    }
                    setError('');
                }else{
                    setError('Failed to load image preview')
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const processAadhaar = async () => {
        if (!frontImage || !backImage) {
            setError("Please upload both front and back images of your Aadhaar card.");
            return;
        }
        setIsProcessing(true);
        setError('');
        try {
            const formData = new FormData()
            formData.append('front', frontImage)
            formData.append('back', backImage)
            const response = await fetch('http://localhost:3000/ocr-process', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to extract data');
            }
            const result = await response.json()
            setExtractedData(result.data)

        } catch (error: any) {
            setError(error.message || "An error occurred while processing the Aadhaar data.");

        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans">
            {/* Header section */}
            <Header />

            {/* Main content */}
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Introduction */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Extract Aadhaar Card Information</h2>
                        <p className="text-gray-600">Upload the front and back sides of your Aadhaar card to extract the information</p>
                    </div>

                    {/* Upload section */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Front side upload */}
                        <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center"
                            onDrop={(e) => handleDrop('front', e)}
                            onDragOver={handleDragOver}>
                            <div className="text-center">
                                <UploadCloud className="mx-auto h-12 w-12 text-slate-500" />
                                <h3 className="mt-2 text-lg font-medium text-slate-700">Front Side</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Drag and drop or click to upload
                                </p>
                                <input
                                    type="file"
                                    ref={frontInputRef}
                                    id="front-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange('front', e)}
                                />
                                <button
                                    type="button"
                                    onClick={() => frontInputRef.current?.click()}
                                    // onClick={() => document.getElementById('front-upload').click()}
                                    className="mt-4 px-4 py-2 border cursor-pointer  text-slate-600 hover:text-white rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
                                >
                                    Select File
                                </button>
                            </div>
                            {frontPreview && (
                                <div className="mt-4 w-full">
                                    <p className="text-sm text-gray-500 mb-2">Preview:</p>
                                    <div className="relative h-40 bg-gray-200 rounded-md overflow-hidden">
                                        <img src={frontPreview} alt="Front Preview" className="w-full h-full object-contain" />
                                        <div className="absolute top-2 right-2">
                                            <CheckCircle className="h-6 w-6 text-green-500 bg-white rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Back side upload */}
                        <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center"
                            onDrop={(e) => handleDrop('back', e)}
                            onDragOver={handleDragOver}>
                            <div className="text-center">
                                <UploadCloud className="mx-auto h-12 w-12 text-slate-500" />
                                <h3 className="mt-2 text-lg font-medium text-slate-700">Back Side</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Drag and drop or click to upload
                                </p>
                                <input
                                    type="file"
                                    id="back-upload"
                                    ref={backInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange('back', e)}
                                />
                                <button
                                    type="button"
                                    onClick={() => backInputRef.current?.click()}
                                    className="mt-4 px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
                                >
                                    Select File
                                </button>
                            </div>
                            {backPreview && (
                                <div className="mt-4 w-full">
                                    <p className="text-sm text-gray-500 mb-2">Preview:</p>
                                    <div className="relative h-40 bg-gray-200 rounded-md overflow-hidden">
                                        <img src={backPreview} alt="Back Preview" className="w-full h-full object-contain" />
                                        <div className="absolute top-2 right-2">
                                            <CheckCircle className="h-6 w-6 text-green-500 bg-white rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                            <div className="flex items-center">
                                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                                <p className="text-red-700">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Extract button */}
                    <div className="text-center mb-8">
                        <button
                            type="button"
                            onClick={processAadhaar}
                            disabled={isProcessing || !frontImage || !backImage}
                            className={`px-8 py-3 text-lg font-medium rounded-md shadow-sm ${isProcessing || !frontImage || !backImage
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-slate-600 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500'
                                }`}
                        >
                            {isProcessing ? (
                                <span className="flex items-center">
                                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                    Processing...
                                </span>
                            ) : (
                                'Extract Data'
                            )}
                        </button>
                    </div>

                    {/* Results section */}
                    {extractedData && (
                        <ParsedOutput extractedData={extractedData} />
                    )}

                    {/* Instructions */}
                    <Instructions />
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}