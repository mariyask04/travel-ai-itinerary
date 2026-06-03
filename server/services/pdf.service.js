import axios from "axios";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const extractPdfText = async (fileUrl) => {
    try {
        const res = await axios.get(fileUrl, {
            responseType: "arraybuffer",
        });

        const data = new Uint8Array(res.data);

        const pdf = await pdfjsLib.getDocument({ data }).promise;

        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();

            const pageText = content.items.map(item => item.str).join(" ");
            text += pageText + "\n";
        }

        return text.trim();
    } catch (err) {
        console.log("PDF extraction error:", err.message);
        return "";
    }
};

export default extractPdfText;