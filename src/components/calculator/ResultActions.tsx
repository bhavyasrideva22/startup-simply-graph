
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Download, Mail, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CostCategory } from "@/types/calculator";
import { exportToPdf } from "@/utils/exportToPdf";

interface ResultActionsProps {
  categorizedCosts: CostCategory[];
  values: Record<string, number>;
  businessName: string;
}

export default function ResultActions({ categorizedCosts, values, businessName }: ResultActionsProps) {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(`${businessName || 'Your'} Startup Cost Analysis`);
  const { toast } = useToast();
  
  const handleDownload = () => {
    exportToPdf(categorizedCosts, values, businessName);
    toast({
      title: "Download Started",
      description: "Your PDF is being generated and will download shortly.",
    });
  };

  const handleSendEmail = () => {
    // In a real app, this would call an API to send the email
    toast({
      title: "Email Sent",
      description: `Your startup cost analysis has been sent to ${email}.`,
    });
    setShowEmailDialog(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button 
          onClick={handleDownload}
          className="bg-brand-green hover:bg-brand-green/90 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setShowEmailDialog(true)}
          className="border-brand-green text-brand-green hover:bg-brand-green/10"
        >
          <Mail className="h-4 w-4 mr-2" />
          Email Report
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast({
              title: "Link Copied",
              description: "The link to this calculator has been copied to your clipboard.",
            });
          }}
          className="text-brand-charcoal hover:bg-brand-mint/20"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Email your results</DialogTitle>
            <DialogDescription>
              Send a detailed startup cost analysis report to your inbox.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={handleSendEmail} 
              className="bg-brand-green hover:bg-brand-green/90 text-white"
              disabled={!email}
            >
              Send Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
