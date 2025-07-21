"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  MessageSquare,
  Brain,
  FileText,
  Sparkles,
  Download,
  Copy,
  RefreshCw,
  Send,
  Building,
  User,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CoverLetterGenerator() {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    hiringManager: '',
    jobDescription: '',
    selectedResume: '',
    tone: 'professional'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');

  const resumes = [
    { id: '1', title: 'Software Engineer Resume', lastModified: '2024-01-15' },
    { id: '2', title: 'Full Stack Developer', lastModified: '2024-01-10' }
  ];

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal and business-appropriate' },
    { value: 'enthusiastic', label: 'Enthusiastic', description: 'Energetic and passionate' },
    { value: 'confident', label: 'Confident', description: 'Assertive and self-assured' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' }
  ];

  const handleGenerate = async () => {
    if (!formData.selectedResume || !formData.jobDescription.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const sampleLetter = `Dear ${formData.hiringManager || 'Hiring Manager'},

I am writing to express my strong interest in the ${formData.jobTitle} position at ${formData.companyName}. With my background in software development and passion for creating innovative solutions, I am excited about the opportunity to contribute to your team.

In my previous role as a Full Stack Developer, I successfully led the development of multiple web applications using React, Node.js, and MongoDB. My experience includes:

• Developing responsive web applications that improved user engagement by 40%
• Implementing automated testing procedures that reduced bugs by 60%
• Collaborating with cross-functional teams to deliver projects on time and within budget
• Mentoring junior developers and contributing to code review processes

What particularly excites me about this opportunity at ${formData.companyName} is your commitment to innovation and user-centric design. I am impressed by your recent product launches and would love to contribute my skills in JavaScript, React, and cloud technologies to help drive your continued success.

I am confident that my technical expertise, problem-solving abilities, and collaborative approach make me an ideal candidate for this role. I would welcome the opportunity to discuss how my experience aligns with your team's needs.

Thank you for considering my application. I look forward to hearing from you soon.

Best regards,
John Doe`;

    setGeneratedLetter(sampleLetter);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Cover Letter Generator</h1>
                <p className="text-sm text-gray-500">Create personalized cover letters with AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Templates
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
                  Cover Letter Details
                </CardTitle>
                <CardDescription>
                  Provide job details to generate a personalized cover letter
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="company"
                        placeholder="TechCorp Inc."
                        className="pl-10"
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="job-title">Job Title</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="job-title"
                        placeholder="Software Engineer"
                        className="pl-10"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="hiring-manager">Hiring Manager (Optional)</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="hiring-manager"
                      placeholder="Jane Smith"
                      className="pl-10"
                      value={formData.hiringManager}
                      onChange={(e) => setFormData(prev => ({ ...prev, hiringManager: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="resume-select">Select Resume</Label>
                  <select
                    id="resume-select"
                    className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-gray-800"
                    value={formData.selectedResume}
                    onChange={(e) => setFormData(prev => ({ ...prev, selectedResume: e.target.value }))}
                  >
                    <option value="">Choose a resume...</option>
                    {resumes.map((resume) => (
                      <option key={resume.id} value={resume.id}>
                        {resume.title} (Modified: {resume.lastModified})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Writing Tone</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {toneOptions.map((tone) => (
                      <button
                        key={tone.value}
                        onClick={() => setFormData(prev => ({ ...prev, tone: tone.value }))}
                        className={`p-3 text-left border rounded-lg transition-colors ${
                          formData.tone === tone.value 
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-sm">{tone.label}</div>
                        <div className="text-xs text-gray-500">{tone.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="job-description">Job Description</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Paste the job description here..."
                    rows={8}
                    value={formData.jobDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, jobDescription: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={!formData.selectedResume || !formData.jobDescription.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                >
                  {isGenerating ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-pulse" />
                      Generating Cover Letter...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Cover Letter
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {isGenerating && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                      <Brain className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Crafting Your Cover Letter</h3>
                      <p className="text-gray-500">Our AI is writing a personalized cover letter for you...</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {generatedLetter && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Generated Cover Letter</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleGenerate}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Review and edit your personalized cover letter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={generatedLetter}
                    onChange={(e) => setGeneratedLetter(e.target.value)}
                    rows={20}
                    className="font-mono text-sm"
                  />
                  
                  <Separator className="my-4" />
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Send className="w-4 h-4 mr-2" />
                      Save to Library
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {!isGenerating && !generatedLetter && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                      <MessageSquare className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Ready to Generate</h3>
                      <p className="text-gray-500">Fill in the job details to create your personalized cover letter</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cover Letter Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-500 mt-0.5" />
                    <span>Customize each letter for the specific job and company</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-500 mt-0.5" />
                    <span>Highlight achievements that match the job requirements</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-500 mt-0.5" />
                    <span>Keep it concise - aim for 3-4 paragraphs</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-500 mt-0.5" />
                    <span>End with a strong call to action</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}