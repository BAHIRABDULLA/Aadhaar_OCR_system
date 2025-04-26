import React, { useState } from 'react'

interface IExtractedData {
    name: string
    dob: string
    gender: 'Male' | 'Female' | 'Transgender'
    aadhaarNumber: string,
    address: string
    issuedDate: string
    pincode: string
}
interface ParsedOutputProps {
    extractedData: IExtractedData
}

const ParsedOutput: React.FC<ParsedOutputProps> = ({ extractedData }) => {

    const [message, setMessage] = useState('')
    const handleCopy = () => {
        const copyText = `
      Name: ${extractedData.name || '-'}
      Date of Birth: ${extractedData.dob || '-'}
      Gender: ${extractedData.gender || '-'}
      Aadhaar Number: ${extractedData.aadhaarNumber || '-'}
      Address: ${extractedData.address || '-'}
      Pin Code: ${extractedData.pincode || '-'}
        `;
        navigator.clipboard.writeText(copyText)
            .then(() => {
                setMessage('Copied to clipboard!');
                setTimeout(() => {
                    setMessage('')
                }, 3000);
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
                setTimeout(() => {
                    setMessage('')
                }, 3000);
            });
    };

    // const handleDownload = () => {
    //     const data = {
    //       Name: extractedData.name || '-',
    //       'Date of Birth': extractedData.dob || '-',
    //       Gender: extractedData.gender || '-',
    //       'Aadhaar Number': extractedData.aadhaarNumber || '-',
    //       Address: extractedData.address || '-',
    //       'Pin Code': extractedData.pincode || '-',
    //     };
      
    //     const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    //     const url = URL.createObjectURL(blob);
      
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'aadhaar-data.json';
    //     a.click();
      
    //     URL.revokeObjectURL(url);
    //   };
      

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-8">
            {message && <p className='text-blue-500 font-bold'>{message}</p>}
            <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-lg font-semibold text-slate-800">
                    Extracted Information
                </h3>
                <button
                    onClick={handleCopy}
                    className="text-sm text-slate-600 border border-slate-300 rounded px-3 py-1 hover:bg-slate-100"
                >
                    Copy
                </button>
            </div>


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

            {/* <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-end">
                    <button onClick={handleDownload} className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500">
                        Download Data
                    </button>
                </div>
            </div> */}
        </div>
    )
}

export default ParsedOutput