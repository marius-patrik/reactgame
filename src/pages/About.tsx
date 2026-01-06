export default function About() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-4xl font-bold">About This Project</h1>

      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Stack</h2>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>React 18 - UI library</li>
            <li>TypeScript - Type safety</li>
            <li>Rsbuild - Fast build tool</li>
            <li>Tailwind CSS - Styling</li>
            <li>shadcn/ui - Component library</li>
            <li>Wouter - Lightweight routing</li>
            <li>Supabase - Backend & Database</li>
            <li>Vercel - Deployment</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
          <p className="text-muted-foreground">
            This project is configured and ready to use. Check the README for setup instructions.
          </p>
        </section>
      </div>
    </div>
  );
}
