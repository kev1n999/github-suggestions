import Groq from "groq-sdk";
import path from "path";
import fs from "fs";

// export type instructions = 'PROJECT-IDEAS';
const groq = new Groq({ apiKey: process.env.API_KEY });

export async function getGroqChatCompletion(prompt: string) {
  let instructions_file_name = "ideas.txt";
  const instructions_file = path.join(__dirname, "..", instructions_file_name);
  const content = fs.readFileSync(instructions_file, "utf-8");
  return groq.chat.completions.create({
    messages: [
      { role: "system", content: content, },
      { role: "user", content: prompt, },
    ],
    model: "openai/gpt-oss-20b",
  });
}
