import Groq from "groq-sdk";
import path from "path";
import fs from "fs";

export type instructions = 'FEEDBACK' | 'PROJECT-IDEAS';
const groq = new Groq({ apiKey: process.env.API_KEY });

export async function getGroqChatCompletion(prompt: string, instructions_type: instructions) {
  let instructions_file_name: string;
  if (instructions_type == 'FEEDBACK') {
    instructions_file_name = "feedback.txt";
  } else {
    instructions_file_name = "ideas.txt";
  }

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
