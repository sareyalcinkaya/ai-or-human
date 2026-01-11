import { TextAnalyzer } from "@/components/TextAnalyzer";
import { Sparkles, Shield, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-6 px-4 border-b border-border">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-semibold">TextDetect</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Is it <span className="text-gradient">AI</span> or Human?
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Instantly analyze any text to determine if it was written by artificial intelligence or a human author.
          </p>
        </div>
      </section>

      {/* Main Analyzer */}
      <main className="px-4 pb-16">
        <TextAnalyzer />
      </main>

      {/* Features */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Instant Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get results in seconds with our advanced detection algorithm
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                Your text is never stored. Analysis happens in real-time
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">High Accuracy</h3>
              <p className="text-sm text-muted-foreground">
                Trained on millions of texts for reliable detection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm text-muted-foreground border-t border-border">
        <p>© 2026 TextDetect. Built for demonstration purposes.</p>
      </footer>
    </div>
  );
};

export default Index;
