
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const scrollToConsultation = () => {
    const element = document.getElementById('consultation');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-white">
          Assist<span className="text-purple-400">Law</span>
        </div>
        <Button
          onClick={scrollToConsultation}
          variant="outline"
          className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-300"
        >
          Get Legal Help
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
