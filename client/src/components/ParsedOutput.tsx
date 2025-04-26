import React from 'react'

interface IExtractedData {
    name: string
    dob: string
    gender: 'Male' | 'Female' | 'Transgender'
    aadhaarNumber: string,
    address: string
    issuedDate: string
    pincode:string
}
interface ParsedOutputProps {
    extractedData:IExtractedData
}

const ParsedOutput:React.FC<ParsedOutputProps> = ({extractedData}) => {
    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Extracted Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{extractedData.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium">{extractedData.dob}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="font-medium">{extractedData.gender}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Aadhaar Number</p>
                        <p className="font-medium">{extractedData.aadhaarNumber}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{extractedData.address}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Pin Code</p>
                        <p className="font-medium">{extractedData.pincode}</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-end">
                    <button className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500">
                        Download Data
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ParsedOutput