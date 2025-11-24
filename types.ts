export interface ScriptSegment {
  section: string; // e.g., "Hook", "Body", "Value Drop", "CTA"
  visualCue: string;
  audioText: string;
  durationEstimate: string;
}

export interface ScriptAnalysis {
  tone: string;
  wordCount: number;
  hookStrategy: string;
  densityCheck: string;
}

export interface GeneratedScript {
  title: string;
  segments: ScriptSegment[];
  analysis: ScriptAnalysis;
}

export interface Technique {
  id: number;
  title: string;
  description: string;
  icon: string;
}