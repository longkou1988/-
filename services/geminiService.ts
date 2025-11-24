import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedScript } from "../types";

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-build' });

const scriptSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "视频的吸引人标题" },
    analysis: {
      type: Type.OBJECT,
      properties: {
        tone: { type: Type.STRING, description: "整体基调（例如：幽默、犀利、温暖）" },
        wordCount: { type: Type.NUMBER, description: "预估字数" },
        hookStrategy: { type: Type.STRING, description: "前3秒使用的钩子策略解释" },
        densityCheck: { type: Type.STRING, description: "如何最大化信息密度的解释" },
      },
      required: ["tone", "wordCount", "hookStrategy", "densityCheck"],
    },
    segments: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          section: { type: Type.STRING, description: "视频的环节（例如：黄金前3秒，干货1，干货2，神转折，结尾CTA）" },
          visualCue: { type: Type.STRING, description: "画面描述或B-roll建议（例如：快速剪辑，展示对比图，主播大特写）" },
          audioText: { type: Type.STRING, description: "实际的口播文案。必须是口语化的、有冲击力的中文。" },
          durationEstimate: { type: Type.STRING, description: "预估时长（例如：'3秒'）" },
        },
        required: ["section", "visualCue", "audioText", "durationEstimate"],
      },
    },
  },
  required: ["title", "analysis", "segments"],
};

export const generateScript = async (input: string): Promise<GeneratedScript> => {
  if (!apiKey) {
    throw new Error("API Key not found via process.env.API_KEY");
  }

  const systemPrompt = `
    你是一位专业的抖音/TikTok/小红书短视频脚本作家。
    你的目标是将用户的输入（主题或长文章）重写为病毒式的短视频口播文案。
    
    你必须严格遵循以下6个文案技巧：
    1. **别废话，上干货 (No Nonsense):** 前3秒定生死。不要说“大家好，我是...”。直接开始讲核心问题或价值。
    2. **大密度、信息点 (High Density):** 总长度控制在30-60秒（约200-400中文字符）。删掉所有废话。
    3. **放钩子，留观众 (Drop Hooks):** 在开头或中间设置“留存钩子”（例如：“最关键的一步在最后”）。
    4. **别端着，好玩些 (Be Fun):** 不要学术化。要娱乐、放松。
    5. **口语化，很重要 (Conversational):** 使用口语，不要用书面语。读起来必须自然顺口。
    6. **做选题，亲大众 (Mass Appeal):** 将话题与普通人的日常生活联系起来。

    语言规则：
    - **必须完全使用中文**。
    - 语气要自然、有感染力。

    请将脚本构建为逻辑分段：黄金前3秒(Hook) -> 核心价值点1 -> 核心价值点2 -> 留存钩子/反转 -> 结尾/行动呼吁(CTA)。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: input,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: scriptSchema,
        temperature: 0.7, 
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No text returned from Gemini");
    }

    return JSON.parse(text) as GeneratedScript;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};