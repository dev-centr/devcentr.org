import "./app.css";

export default function Home() {
  return (
    <main>
      <section class="hero">
        <h1>Orchestrating the Future</h1>
        <p>
          Dev-Centr is the laboratory for the <strong>Development Orchestration Suite (DOS)</strong> movement. We manage the "gravity" of the modern developer's world.
        </p>
        <div class="cta-group">
          <a href="https://devcentr.app" class="btn btn-primary">Download DevCentr</a>
          <a href="https://docs.devcentr.org" class="btn btn-secondary">Read the Vision</a>
          <a href="https://github.com/dev-centr" class="btn btn-secondary">Explore GitHub</a>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">The DOS Manifesto</h2>
        <div class="grid">
          <div class="card">
            <h3>Ecosystem Management</h3>
            <p>
              Move beyond text files. Author and version your entire environment—shells, toolchains, and infrastructure—as first-class citizens.
            </p>
          </div>
          <div class="card">
            <h3>Visual DevEx</h3>
            <p>
              Transition from opaque file trees to high-fidelity system design blueprints. Visualize the invisible structure of your software.
            </p>
          </div>
          <div class="card">
            <h3>AI Synergy</h3>
            <p>
              Provide the deep contextual metadata necessary for human-in-the-loop AI and vibe-coding to reach their full potential.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">The Category Pivot</h2>
        <div class="card" style="text-align: center; max-width: 800px; margin: 0 auto;">
          <p style="font-size: 1.25rem; color: #ccc;">
            "Traditional IDEs focus on the editor. Dev-Centr focuses on the <strong>Orchestration</strong> of the entire developer lifecycle."
          </p>
        </div>
      </section>
    </main>
  );
}
