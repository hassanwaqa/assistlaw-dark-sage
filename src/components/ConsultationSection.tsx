
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Send, Scale } from "lucide-react";

const ConsultationSection = () => {
  const [question, setQuestion] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const countries = [
    "United States",
    "United Kingdom", 
    "Canada",
    "Australia",
    "Germany",
    "France",
    "India",
    "Brazil",
    "Japan",
    "South Africa",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || !location) {
      toast({
        title: "Missing Information",
        description: "Please provide both your legal question and location.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:5678/webhook-test/eaf90fdf-4557-403d-8834-8891f0c55343", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.trim(),
          location: location,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Request Sent Successfully!",
          description: "Your legal question has been submitted and is being processed.",
        });
        setQuestion("");
        setLocation("");
      } else {
        throw new Error("Failed to send request");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      toast({
        title: "Error",
        description: "Failed to submit your question. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="consultation" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
            <Scale className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Your Legal <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Consultation</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ask any legal question and get personalized guidance based on your location and jurisdiction.
          </p>
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-md border-purple-500/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Submit Your Legal Question</CardTitle>
            <CardDescription className="text-gray-300">
              Provide your question and location for the most accurate legal guidance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Legal Question
                </label>
                <Textarea
                  id="question"
                  placeholder="Describe your legal situation or question in detail..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="min-h-32 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Location/Country
                </label>
                <Select value={location} onValueChange={setLocation} disabled={isLoading}>
                  <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                    <SelectValue placeholder="Select your country or jurisdiction" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-purple-500/30">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country} className="text-white hover:bg-purple-600/20">
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="mr-2 h-5 w-5" />
                    Submit Legal Question
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            * This service provides general legal information and should not replace professional legal advice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;
