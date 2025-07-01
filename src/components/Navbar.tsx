
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const scrollToConsultation = () => {
    const element = document.getElementById('consultation');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md border border-purple-500/20 rounded-full shadow-2xl shadow-purple-500/10">
      <div className="px-8 py-4 flex items-center justify-between min-w-fit">
        <div className="text-2xl font-bold text-white mr-8">
          Assist<span className="text-purple-400">Law</span>
        </div>
        <Button
          onClick={scrollToConsultation}
          variant="outline"
          className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-300 rounded-full px-6"
        >
          Get Legal Help
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
