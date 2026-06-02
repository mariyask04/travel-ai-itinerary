import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateItinerary = async (bookingText) => {
    const prompt = `
You are an expert travel planner.

Analyze the travel booking details below.

Generate a structured itinerary.

Include:

1. Destination
2. Travel Dates
3. Flight Details
4. Hotel Details
5. Day Wise Plan
6. Important Notes

Booking Details:

${bookingText}

Return clean markdown.
`;

    const result = model.generateContent(prompt);
    return result.response.text();
}

export { generateItinerary };