"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ResumePDF() {
  const searchParams = useSearchParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);
  const [templateId, setTemplateId] = useState<string>('');

  useEffect(() => {
    const template = searchParams.get('template');
    const data = searchParams.get('data');
    
    if (template && data) {
      setTemplateId(template);
      try {
        const parsedData = JSON.parse(decodeURIComponent(data));
        setResumeData(parsedData);
      } catch (error) {
        console.error('Error parsing resume data:', error);
      }
    }
  }, [searchParams]);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create a blob with sample PDF content (in real implementation, use jsPDF or similar)
    const pdfContent = `Resume for ${resumeData?.personalInfo?.fullName || 'User'}`;
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData?.personalInfo?.fullName?.replace(/\s+/g, '_') || 'resume'}_resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setIsGenerating(false);
  };

  if (!resumeData || !templateId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p className="text-gray-600">Please wait while we prepare your resume for download.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/resume/new">
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Download Resume</h1>
                <p className="text-sm text-gray-500">Generate and download your resume as PDF</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-8">
          {!isGenerating ? (
            <>
              <div className="space-y-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Download className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Ready to Download</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Your resume is ready to be generated as a PDF. Click the button below to download your professionally formatted resume.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-md mx-auto">
                <h3 className="font-semibold mb-4">Resume Details</h3>
                <div className="space-y-2 text-sm text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{resumeData.personalInfo.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Template:</span>
                    <span className="font-medium capitalize">{templateId.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sections:</span>
                    <span className="font-medium">
                      {[
                        resumeData.summary && 'Summary',
                        resumeData.experience.length > 0 && 'Experience',
                        resumeData.education.length > 0 && 'Education',
                        resumeData.skills.length > 0 && 'Skills',
                        resumeData.projects.length > 0 && 'Projects'
                      ].filter(Boolean).length}
                    </span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={generatePDF}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Download className="w-5 h-5 mr-2" />
                Generate & Download PDF
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <h2 className="text-3xl font-bold">Generating Your Resume</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Please wait while we generate your professional PDF resume. This may take a few moments.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
                <p className="text-sm text-gray-500">Formatting your resume...</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}