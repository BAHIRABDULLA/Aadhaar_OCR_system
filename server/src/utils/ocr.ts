import Tesseract from 'tesseract.js';

export  const extractText = async (filePath: Tesseract.ImageLike) =>{
    const result = await Tesseract.recognize(filePath,'eng')
    return result.data
}