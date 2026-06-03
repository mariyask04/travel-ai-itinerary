import axios from "axios";
import * as pdfParse from "pdf-parse/lib/pdf-parse.js";

const extractPdfText = async (fileUrl) => {
    const res = await axios.get(fileUrl, {
        responseType: "arraybuffer",
    });

    const buffer = Buffer.from(res.data);

    const data = await pdfParse.default(buffer);

    return data.text;
};

export default extractPdfText;