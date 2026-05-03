import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        });

        const data = await response.json();

        // 🔥 DEBUG (VERY IMPORTANT)
        console.log("OPENAI RESPONSE:", data);

        // ❗ Safe access
        const reply = data?.choices?.[0]?.message?.content;

        if (!reply) {
            throw new Error("No valid response from OpenAI");
        }

        return reply;

    } catch (err) {
        console.log("OpenAI Error:", err.message);
        return null; // ❗ important
    }
};

export default getOpenAIAPIResponse;









