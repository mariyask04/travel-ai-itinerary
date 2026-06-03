import tesseract from "tesseract.js";
import axios from "axios";

const extractImageText = async (fileUrl) => {
    const response = await axios.get(fileUrl, {
        responseType: "arraybuffer",
    });

    const buffer = Buffer.from(response.data);

    const result = await tesseract.recognize(buffer, "eng");

    return result.data.text;
};

export default extractImageText;