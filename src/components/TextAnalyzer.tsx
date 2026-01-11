import { useState } from "react";
import { Loader2, Sparkles, User, AlertCircle } from "lucide-react";

interface AnalysisResult {
  aiProbability: number;
  humanProbability: number;
  verdict: "ai" | "human" | "mixed";
  confidence: "high" | "medium" | "low";
}

const analyzeText = (text: string): AnalysisResult => {
  // Simulated analysis based on text characteristics
  const words = text.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  
  // Heuristics for demo purposes
  const avgWordLength = words.reduce((acc, w) => acc + w.length, 0) / words.length || 0;
  const avgSentenceLength = words.length / sentences.length || 0;
  const hasRepetitivePatterns = /(\b\w+\b).*\1.*\1/i.test(text);
  const hasVeryLongSentences = sentences.some(s => s.split(/\s+/).length > 40);
  const hasTransitionWords = /\b(however|moreover|furthermore|consequently|therefore|additionally)\b/i.test(text);
  
  let aiScore = 0;
  
  // AI tends to have consistent sentence lengths
  if (avgSentenceLength > 15 && avgSentenceLength < 25) aiScore += 15;
  // AI often uses more transition words
  if (hasTransitionWords) aiScore += 20;
  // AI rarely has very long sentences
  if (!hasVeryLongSentences) aiScore += 10;
  // AI tends to have moderate word lengths
  if (avgWordLength > 4 && avgWordLength < 6) aiScore += 15;
  // Repetitive patterns suggest AI
  if (hasRepetitivePatterns) aiScore += 10;
  
  // Add some randomness for demo realism
  const randomFactor = Math.random() * 30 - 15;
  aiScore = Math.min(95, Math.max(5, aiScore + randomFactor));
  
  const aiProbability = Math.round(aiScore);
  const humanProbability = 100 - aiProbability;
  
  let verdict: "ai" | "human" | "mixed" = "mixed";
  if (aiProbability >= 65) verdict = "ai";
  else if (humanProbability >= 65) verdict = "human";
  
  let confidence: "high" | "medium" | "low" = "medium";
  if (Math.abs(aiProbability - 50) > 30) confidence = "high";
  else if (Math.abs(aiProbability - 50) < 15) confidence = "low";
  
  return { aiProbability, humanProbability, verdict, confidence };
};

export function TextAnalyzer() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (text.trim().length < 50) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const analysis = analyzeText(text);
    setResult(analysis);
    setIsAnalyzing(false);
  };

  const charCount = text.length;
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const isValidLength = charCount >= 50;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="card-elevated p-8 animate-fade-in">
        <label htmlFor="text-input" className="block text-sm font-medium text-muted-foreground mb-3">
          Paste or type your text below
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter at least 50 characters to analyze the text. The more text you provide, the more accurate the analysis will be..."
          className="input-large resize-none"
          rows={8}
        />
        
        {/* Stats Bar */}
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <div className="flex gap-4">
            <span>{charCount} characters</span>
            <span>{wordCount} words</span>
          </div>
          {!isValidLength && charCount > 0 && (
            <div className="flex items-center gap-1.5 text-accent">
              <AlertCircle className="w-4 h-4" />
              <span>Need {50 - charCount} more characters</span>
            </div>
          )}
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={!isValidLength || isAnalyzing}
          className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Analyze Text</span>
            </>
          )}
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <div className="card-elevated p-8 animate-slide-up">
          <h3 className="font-display text-2xl font-semibold mb-6">Analysis Results</h3>
          
          {/* Verdict */}
          <div className="text-center py-6 mb-6 rounded-xl bg-secondary/50">
            <div className="flex items-center justify-center gap-3 mb-2">
              {result.verdict === "ai" ? (
                <Sparkles className="w-8 h-8 text-accent" />
              ) : result.verdict === "human" ? (
                <User className="w-8 h-8 text-primary" />
              ) : (
                <div className="flex">
                  <Sparkles className="w-6 h-6 text-accent" />
                  <User className="w-6 h-6 text-primary -ml-1" />
                </div>
              )}
              <span className="text-3xl font-display font-bold">
                {result.verdict === "ai" ? "AI Generated" : 
                 result.verdict === "human" ? "Human Written" : "Mixed Content"}
              </span>
            </div>
            <p className="text-muted-foreground">
              {result.confidence === "high" ? "High" : 
               result.confidence === "medium" ? "Medium" : "Low"} confidence
            </p>
          </div>

          {/* Probability Meters */}
          <div className="space-y-6">
            {/* AI Probability */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="font-medium">AI Generated</span>
                </div>
                <span className="text-lg font-semibold">{result.aiProbability}%</span>
              </div>
              <div className="result-meter">
                <div 
                  className="result-meter-fill-ai"
                  style={{ width: `${result.aiProbability}%` }}
                />
              </div>
            </div>

            {/* Human Probability */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <span className="font-medium">Human Written</span>
                </div>
                <span className="text-lg font-semibold">{result.humanProbability}%</span>
              </div>
              <div className="result-meter">
                <div 
                  className="result-meter-fill-human"
                  style={{ width: `${result.humanProbability}%` }}
                />
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground mt-6 text-center">
            This analysis is for demonstration purposes. Actual AI detection requires sophisticated models.
          </p>
        </div>
      )}
    </div>
  );
}
