import CanvasBackground from './components/CanvasBackground';
import Hero from './components/Hero';

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-chalkboard font-sans text-chalk-white selection:bg-gold-accent selection:text-chalkboard">
      <CanvasBackground />
      <Hero />
    </div>
  );
}

export default App;