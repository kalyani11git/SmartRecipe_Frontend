import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const AIRecipeSuggest = () => {
  const [prompt, setPrompt] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const formatText = (text) => {
    return text
      .replace(/^#+\s?/gm, "")
      .replace(/[*_~`>]/g, "")
      .replace(/\*\*/g, "")
      .replace(/^- /gm, "• ")
      .replace(/\n{3,}/g, "\n\n");
  };

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage = { role: "user", content: prompt };
    setChat((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const text =
        result?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response generated.";
      const aiMessage = { role: "ai", content: formatText(text) };

      setChat((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setChat((prev) => [
        ...prev,
        { role: "ai", content: "Something went wrong while fetching response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 flex flex-col h-[80vh] text-[#114232]">
      <h2 className="text-2xl font-bold mb-4">AI Recipe Chat</h2>

      <div className="flex-1 overflow-y-auto pr-2 mb-4 space-y-4">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-5xl whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-[#FCDC2A] self-end text-right"
                : "bg-[#F7F6BB] self-start text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="bg-gray-100 rounded-lg p-3 text-sm italic text-gray-500">
            Gemini is thinking...
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask something about recipes..."
          className="flex-1 border border-gray-300 rounded px-4 py-2"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-[#87A922] text-white px-4 py-2 rounded hover:bg-[#6f8c1b]"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default AIRecipeSuggest;
