const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateSummary = async (noteText) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const prompt = `
            Summarize the following note in 3 to 5 short bullet points.

            only respond with the summary, do not include any other text.

            NOTE:
            ${noteText}
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        return response.text();

    } catch (error) {
        console.error("Gemini error:", error.message);
        return null;
    }
};
