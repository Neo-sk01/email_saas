"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, Send, Sparkles } from "lucide-react"
import { useLocalStorage } from "usehooks-ts"

export function AIEmailAssistant() {
  const [companyName, setCompanyName] = React.useState("")
  const [linkedInDescription, setLinkedInDescription] = React.useState("")
  const [blogPosts, setBlogPosts] = React.useState("")
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [generatedEmail, setGeneratedEmail] = React.useState("")
  const [history, setHistory] = useLocalStorage<Array<{
    companyName: string
    linkedInDescription: string
    blogPosts: string
    generatedEmail: string
    timestamp: number
  }>>("ai-email-assistant-history", [])

  const handleGenerateEmail = async () => {
    if (!companyName.trim()) {
      alert("Please enter a company name")
      return
    }

    setIsGenerating(true)
    
    try {
      // TODO: Replace with actual API call to Perplexity
      // This is a mock implementation for UI testing
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockEmail = `Subject: Partnering with ${companyName} for LGBTIQ+ Market Engagement

Dear ${companyName} Team,

I'm reaching out from MambaOnline, South Africa's leading LGBTIQ+ digital platform serving 40,000+ monthly visitors across Southern Africa. We help forward-thinking brands like ${companyName} connect with the R250B+ LGBTIQ+ market in South Africa.

${linkedInDescription ? `I noticed your recent work on ${linkedInDescription.split('.').slice(0, 2).join('.')}...` : ''}

${blogPosts ? `Your recent content about "${blogPosts.split('.').slice(0, 1).join('.')}" aligns well with our community's interests.` : ''}

Would you be open to a quick call next week to explore potential partnership opportunities?

Best regards,
[Your Name]
MambaOnline`
      
      setGeneratedEmail(mockEmail)
      
      // Add to history
      const newEntry = {
        companyName,
        linkedInDescription,
        blogPosts,
        generatedEmail: mockEmail,
        timestamp: Date.now()
      }
      setHistory([newEntry, ...history.slice(0, 9)]) // Keep last 10 items
      
    } catch (error) {
      console.error("Error generating email:", error)
      alert("Failed to generate email. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleUseTemplate = (template: typeof history[0]) => {
    setCompanyName(template.companyName)
    setLinkedInDescription(template.linkedInDescription)
    setBlogPosts(template.blogPosts)
    setGeneratedEmail(template.generatedEmail)
  }

  return (
    <div className="flex h-full">
      {/* Left panel - Input form */}
      <div className="w-1/2 p-4 border-r overflow-y-auto">
        <div className="space-y-6">
          <div>
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              placeholder="e.g., ClarinsMen"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="linkedin-description">LinkedIn Description</Label>
            <Textarea
              id="linkedin-description"
              placeholder="Paste the LinkedIn company/individual description here..."
              value={linkedInDescription}
              onChange={(e) => setLinkedInDescription(e.target.value)}
              className="mt-1 min-h-[100px]"
            />
          </div>
          
          <div>
            <Label htmlFor="blog-posts">Blog Posts/Additional Context</Label>
            <Textarea
              id="blog-posts"
              placeholder="Paste relevant blog posts or additional context here..."
              value={blogPosts}
              onChange={(e) => setBlogPosts(e.target.value)}
              className="mt-1 min-h-[150px]"
            />
          </div>
          
          <Button 
            onClick={handleGenerateEmail}
            disabled={isGenerating || !companyName.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Email
              </>
            )}
          </Button>
        </div>
        
        {/* History Section */}
        {history.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-medium mb-2">Recent Generations</h3>
            <div className="space-y-2">
              {history.map((item, index) => (
                <Card 
                  key={index} 
                  className="p-2 text-xs cursor-pointer hover:bg-accent"
                  onClick={() => handleUseTemplate(item)}
                >
                  <p className="font-medium truncate">{item.companyName}</p>
                  <p className="text-muted-foreground truncate">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Right panel - Generated email */}
      <div className="w-1/2 p-4 overflow-y-auto">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Generated Email</CardTitle>
            <CardDescription>
              {generatedEmail 
                ? "Review and copy the generated email below"
                : "Fill out the form and click 'Generate Email' to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedEmail ? (
              <div className="whitespace-pre-wrap bg-muted/50 p-4 rounded-md font-mono text-sm">
                {generatedEmail}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center space-y-2">
                  <Send className="h-8 w-8 mx-auto" />
                  <p>Your generated email will appear here</p>
                </div>
              </div>
            )}
          </CardContent>
          {generatedEmail && (
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generatedEmail)}>
                Copy to Clipboard
              </Button>
              <Button size="sm" onClick={() => {
                // TODO: Implement insert to email composer
                alert("This will insert the email into the composer when integrated");
              }}>
                Insert to Email
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
