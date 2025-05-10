import { DragEvent, useRef, useState } from "react";
import {  AlertCircle, Loader2 } from "lucide-react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Instructions from "./components/Instructions";
import ParsedOutput from "./components/ParsedOutput";
import Upload from "./components/Upload";

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

    const handleDrop = (side: 'front' | 'back', e: DragEvent<HTMLDivElement>) => {
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
                } else {
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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ocr-process`, {
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


                    {/* Instructions */}
                    <Instructions />

                    {/* Upload section */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Front side upload */}
                        <Upload handleDrop={handleDrop} handleDragOver={handleDragOver} handleFileChange={handleFileChange} inputRef={frontInputRef} preview={frontPreview} side='front' />


                        {/* Back side upload */}
                        <Upload handleDrop={handleDrop} handleDragOver={handleDragOver} handleFileChange={handleFileChange} inputRef={backInputRef} preview={backPreview} side='back' />
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

                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}