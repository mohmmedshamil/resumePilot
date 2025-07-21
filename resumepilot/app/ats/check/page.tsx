"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Target,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Brain,
  FileText,
  Sparkles,
  TrendingUp,
  Download,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ATSCheckPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [selectedResume, setSelectedResume] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const resumes = [
    { id: '1', title: 'Software Engineer Resume', lastModified: '2024-01-15' },
    { id: '2', title: 'Full Stack Developer', lastModified: '2024-01-10' }
  ];

  const handleAnalysis = async () => {
    if (!selectedResume || !jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setAnalysisResult({
      overallScore: 78,
      sections: {
        keywords: { score: 85, status: 'good' },
        formatting: { score: 92, status: 'excellent' },
        experience: { score: 75, status: 'good' },
        skills: { score: 68, status: 'needs-work' },
        education: { score: 88, status: 'excellent' }
      },
      matchedKeywords: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git', 'Agile'],
      missingKeywords: ['TypeScript', 'Docker', 'AWS', 'CI/CD', 'Testing'],
      suggestions: [
        'Add TypeScript to your skills section',
        'Include Docker experience in your project descriptions',
        'Mention AWS or cloud platform experience',
        'Add testing frameworks you\'ve used',
        'Include CI/CD pipeline experience'
      ]
    });
    
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'good': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'needs-work': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <XCircle className="w-4 h-4 text-red-500" />;
    }
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
                <h1 className="text-lg font-semibold">ATS Compatibility Checker</h1>
                <p className="text-sm text-gray-500">Optimize your resume for Applicant Tracking Systems</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Upload Resume
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                <Download className="w-4 h-4 mr-2" />
                Export Report
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
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  ATS Analysis Setup
                </CardTitle>
                <CardDescription>
                  Select your resume and paste the job description to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="resume-select">Select Resume</Label>
                  <select
                    id="resume-select"
                    className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-gray-800"
                    value={selectedResume}
                    onChange={(e) => setSelectedResume(e.target.value)}
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
                  <Label htmlFor="job-description">Job Description</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Paste the complete job description here..."
                    rows={12}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Include requirements, responsibilities, and preferred qualifications
                  </p>
                </div>

                <Button 
                  onClick={handleAnalysis}
                  disabled={!selectedResume || !jobDescription.trim() || isAnalyzing}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-pulse" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      Run ATS Analysis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ATS Optimization Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Use standard section headings (Experience, Education, Skills)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Include relevant keywords from the job description</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Use simple, clean formatting without graphics</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Save as .docx or .pdf format</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {isAnalyzing && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                      <Brain className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Analyzing Your Resume</h3>
                      <p className="text-gray-500">Our AI is comparing your resume with the job requirements...</p>
                    </div>
                    <div className="space-y-2">
                      <Progress value={33} className="h-2" />
                      <p className="text-xs text-gray-500">This may take a few moments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {analysisResult && (
              <>
                {/* Overall Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>ATS Compatibility Score</span>
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {analysisResult.overallScore}%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Progress value={analysisResult.overallScore} className="h-3" />
                      <div className={`text-center font-semibold ${getScoreColor(analysisResult.overallScore)}`}>
                        {analysisResult.overallScore >= 80 ? 'Excellent Match!' : 
                         analysisResult.overallScore >= 60 ? 'Good Match' : 'Needs Improvement'}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Section Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Section Analysis</CardTitle>
                    <CardDescription>Detailed breakdown by resume section</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(analysisResult.sections).map(([section, data]: [string, any]) => (
                        <div key={section} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getScoreIcon(data.status)}
                            <span className="font-medium capitalize">{section}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`font-semibold ${getScoreColor(data.score)}`}>
                              {data.score}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Keywords Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Keyword Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-600 mb-2">Matched Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.matchedKeywords.map((keyword: string, index: number) => (
                          <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium text-red-600 mb-2">Missing Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.missingKeywords.map((keyword: string, index: number) => (
                          <Badge key={index} variant="outline" className="border-red-200 text-red-600">
                            <XCircle className="w-3 h-3 mr-1" />
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Suggestions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                      AI Recommendations
                    </CardTitle>
                    <CardDescription>
                      Actionable suggestions to improve your ATS score
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.suggestions.map((suggestion: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-semibold text-blue-600">{index + 1}</span>
                          </div>
                          <span className="text-sm">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex space-x-2">
                      <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Apply Suggestions
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {!isAnalyzing && !analysisResult && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                      <Target className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Ready to Analyze</h3>
                      <p className="text-gray-500">Select a resume and paste a job description to get started</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}