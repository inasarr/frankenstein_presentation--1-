import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-frankenstein-gradient flex items-center justify-center p-8">
      <div className="text-center space-y-6">
        <h1 className="font-horror text-8xl text-primary animate-text-glow">404</h1>
        <h2 className="font-elegant text-4xl text-secondary">Page Not Found</h2>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          The page you're looking for has vanished into the darkness, like Victor's abandoned creation.
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-primary hover:bg-primary/80 text-primary-foreground font-elegant text-lg px-8 py-3"
        >
          Return to Analysis
        </Button>
      </div>
    </div>
  );
};

export default NotFound;