import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI();

export async function generateAnswer(query: string, context: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant tasked with answering questions based on provided context. Carefully analyze if the context is relevant to the question. If the context is irrelevant or insufficient, acknowledge that fact and explain why. Maintain a professional and analytical tone."
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion: ${query}\n\nProvide a detailed answer based on the context. If the context is not relevant to the question, explain why it's not suitable for answering this specific query.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content || "Failed to generate response";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to generate answer from OpenAI");
  }
}