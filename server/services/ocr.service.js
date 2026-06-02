import tesseract from 'tesseract.js';

const extractImageText = async (filePath) => {
    const result = await tesseract.recognize(filePath, "eng");
    return result.data.text;
}

export default extractImageText;