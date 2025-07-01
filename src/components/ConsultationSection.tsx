
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Send, Scale, CheckCircle } from "lucide-react";

const ConsultationSection = () => {
  const [question, setQuestion] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [hasResponse, setHasResponse] = useState(false);

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
    "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
    "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
    "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
    "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
    "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
    "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
    "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
    "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
    "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
    "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
    "Vietnam", "Yemen", "Zambia", "Zimbabwe"
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
    setHasResponse(false);
    setResponse("");
    
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
        const responseData = await response.text();
        setResponse(responseData || "Your legal consultation has been processed successfully. Our AI assistant has analyzed your question based on your jurisdiction.");
        setHasResponse(true);
        
        toast({
          title: "Response Received!",
          description: "Your legal consultation response is ready.",
        });
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

        <div className="space-y-8">
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
                    <SelectContent className="bg-slate-800 border-purple-500/30 max-h-60">
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

          {hasResponse && (
            <Card className="bg-slate-800/50 backdrop-blur-md border-green-500/20 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">Legal Consultation Response</CardTitle>
                    <CardDescription className="text-gray-300">
                      AI-powered legal guidance based on your question and jurisdiction
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-700/30 border border-green-500/20 rounded-lg p-6">
                  <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {response}
                  </p>
                </div>
                <div className="mt-4 p-4 bg-amber-900/20 border border-amber-500/20 rounded-lg">
                  <p className="text-amber-200 text-sm">
                    <strong>Disclaimer:</strong> This response provides general legal information and should not replace professional legal advice. Always consult with a qualified attorney for specific legal matters.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

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
