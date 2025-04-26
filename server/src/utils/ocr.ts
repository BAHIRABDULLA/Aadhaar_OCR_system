import Tesseract from 'tesseract.js';

export  const extractText = async (filePath: Tesseract.ImageLike) =>{
    const result = await Tesseract.recognize(filePath,'eng')
    console.log(result,'result , , , , ')
    return result.data
}