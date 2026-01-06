import { useEffect, useState } from "react";

export default function About() {
  const [readme, setReadme] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load README.md content
    fetch("/README.md")
      .then((res) => res.text())
      .then((text) => {
        setReadme(text);
        setIsLoading(false);
      })
      .catch(() => {
        setReadme(
          "# README\n\nFailed to load README.md. Please check the project documentation."
        );
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4">
        {/* Animated background blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>
        
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading documentation...</p>
        </div>
      </div>
    );
  }

  // Simple markdown to HTML converter for basic formatting
  const formatReadme = (md: string) => {
    return md
      .split("\n")
      .map((line, idx) => {
        if (line.startsWith("# ")) {
          return (
            <h1 key={idx} className="text-4xl font-bold mb-4 mt-8">
              {line.slice(2)}
            </h1>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={idx} className="text-2xl font-semibold mb-4 mt-6">
              {line.slice(3)}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3 key={idx} className="text-xl font-semibold mb-2 mt-4">
              {line.slice(4)}
            </h3>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <li key={idx} className="ml-6 text-muted-foreground">
              {line.slice(2)}
            </li>
          );
        }
        if (line.startsWith("`")) {
          return (
            <code key={idx} className="bg-black/20 px-2 py-1 rounded text-sm font-mono">
              {line.slice(1, -1)}
            </code>
          );
        }
        if (line.trim() === "") {
          return <br key={idx} />;
        }
        return (
          <p key={idx} className="text-muted-foreground mb-2">
            {line}
          </p>
        );
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 w-full max-w-3xl animate-fade-in-up">
        <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-2xl border border-white/20 dark:border-white/10 p-8 shadow-2xl prose dark:prose-invert max-w-none">
          <div className="space-y-4">{formatReadme(readme)}</div>
        </div>
      </div>
    </div>
  );
}

