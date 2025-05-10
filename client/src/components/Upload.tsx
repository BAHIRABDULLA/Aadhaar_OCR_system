import { CheckCircle, UploadCloud } from 'lucide-react'
import React, { DragEventHandler } from 'react'

type UploadPropsType ={
    handleDrop: (side: 'front' | 'back', e: React.DragEvent<HTMLDivElement>) => void;
    handleDragOver:DragEventHandler<HTMLDivElement> | undefined;
    side:'front'|'back'
    handleFileChange:(side: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => void
    preview:string | null;
    inputRef:React.RefObject<HTMLInputElement | null> ;
}


const Upload:React.FC<UploadPropsType> =  ({handleDrop,handleDragOver ,handleFileChange ,inputRef ,preview ,side}) => {
    return (
        <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center"
            onDrop={(e) => handleDrop(side, e)}
            onDragOver={handleDragOver}>
            <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-slate-500" />
                <h3 className="mt-2 text-lg font-medium text-slate-700">{side} Side</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Drag and drop or click to upload
                </p>
                <input
                    type="file"
                    ref={inputRef}
                    id={`${side}-upload`}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(side, e)}
                />
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    // onClick={() => document.getElementById('front-upload').click()}
                    className="mt-4 px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer"
                >
                    Select File
                </button>
            </div>
            {preview && (
                <div className="mt-4 w-full">
                    <p className="text-sm text-gray-500 mb-2">  Preview:</p>
                    <div className="relative h-40 bg-gray-200 rounded-md overflow-hidden">
                        <img src={preview} alt={`${side} Preview`} className="w-full h-full object-contain" />
                        <div className="absolute top-2 right-2">
                            <CheckCircle className="h-6 w-6 text-green-500 bg-white rounded-full" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Upload