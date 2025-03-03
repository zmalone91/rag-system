import ContactForm from "@/components/ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
      
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <a 
          href="https://github.com/zmalone91" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <Card>
            <CardContent className="pt-6 text-center">
              <Github className="mx-auto h-8 w-8 mb-2" />
              <p className="font-medium">GitHub</p>
            </CardContent>
          </Card>
        </a>
        
        <a 
          href="https://linkedin.com/in/zacharydmalone" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <Card>
            <CardContent className="pt-6 text-center">
              <Linkedin className="mx-auto h-8 w-8 mb-2" />
              <p className="font-medium">LinkedIn</p>
            </CardContent>
          </Card>
        </a>
        
        <a href="mailto:zdmalone1@gmail.com">
          <Card>
            <CardContent className="pt-6 text-center">
              <Mail className="mx-auto h-8 w-8 mb-2" />
              <p className="font-medium">Email</p>
            </CardContent>
          </Card>
        </a>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
}
