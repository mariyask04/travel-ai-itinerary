import Groq from "groq-sdk";

const generateItinerary = async (bookingText) => {
    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
    });
    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are an expert travel planner."
            },
            {
                role: "user",
                content: `
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
`
            }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
    });

    return completion.choices[0].message.content;
};

export { generateItinerary };