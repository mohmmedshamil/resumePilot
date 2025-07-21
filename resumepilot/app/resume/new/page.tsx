"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  Download, 
  Sparkles, 
  ArrowLeft,
  Brain,
  FileText,
  ArrowRight,
  Check,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  languages: Language[];
  certifications: Certification[];
  achievements: string[];
  interests: string[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  atsScore: number;
  features: string[];
}

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      portfolio: ''
    },
    summary: '',
    experience: [],
    education: [],
    projects: [],
    skills: [],
    languages: [],
    certifications: [],
    achievements: [],
    interests: []
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingSection, setGeneratingSection] = useState<string | null>(null);
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('personal');

  const templates: Template[] = [
    {
      id: 'ats-classic',
      name: 'ATS Classic',
      description: 'Traditional format optimized for ATS systems',
      preview: '/resumeCover.jpg',
      atsScore: 98,
      features: ['ATS Optimized', 'Clean Layout', 'Standard Sections']
    },
    {
      id: 'modern-professional',
      name: 'Modern Professional',
      description: 'Contemporary design with ATS compatibility',
      preview: '/resumeCover.jpg',
      atsScore: 95,
      features: ['Modern Design', 'ATS Friendly', 'Professional']
    },
    {
      id: 'tech-focused',
      name: 'Tech Focused',
      description: 'Perfect for software engineers and developers',
      preview: '/resumeCover.jpg',
      atsScore: 96,
      features: ['Tech Optimized', 'Project Showcase', 'Skills Highlight']
    },
    {
      id: 'executive-elite',
      name: 'Executive Elite',
      description: 'Sophisticated design for senior professionals',
      preview: '/resumeCover.jpg',
      atsScore: 94,
      features: ['Executive Style', 'Achievement Focus', 'Leadership']
    },
    {
      id: 'creative-minimal',
      name: 'Creative Minimal',
      description: 'Clean creative design that passes ATS',
      preview: '/resumeCover.jpg',
      atsScore: 92,
      features: ['Creative Touch', 'ATS Safe', 'Minimal Design']
    }
  ];

  const generateWithAI = async (section: string, index?: number) => {
    setIsGenerating(true);
    setGeneratingSection(section);
    if (index !== undefined) setGeneratingIndex(index);
    
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
      
      // Generate content based on section type and existing resume data
      let generatedContent = '';
      const position = resumeData.experience[0]?.position || 'professional';
      const skills = resumeData.skills.slice(0, 3).join(', ');
      const company = index !== undefined ? resumeData.experience[index]?.company : '';
      const projectName = index !== undefined ? resumeData.projects[index]?.name : '';
      const technologies = index !== undefined ? resumeData.projects[index]?.technologies.join(', ') : '';
      
      if (section === 'summary') {
        generatedContent = `Results-driven ${position} with ${Math.floor(Math.random() * 10) + 3} years of experience specializing in ${skills}. `;
        generatedContent += `Proven track record of ${['delivering innovative solutions', 'exceeding performance targets', 'leading cross-functional teams'][Math.floor(Math.random() * 3)]}. `;
        generatedContent += `Adept at ${['problem-solving', 'strategic planning', 'process optimization'][Math.floor(Math.random() * 3)]} with strong ${['communication', 'leadership', 'technical'][Math.floor(Math.random() * 3)]} skills.`;
        
        setResumeData(prev => ({
          ...prev,
          summary: generatedContent
        }));
      } 
      else if (section === 'experience' && index !== undefined) {
        generatedContent = `• ${['Led', 'Managed', 'Spearheaded'][Math.floor(Math.random() * 3)]} ${resumeData.experience[index].position} at ${company}, ${['resulting in', 'achieving', 'leading to'][Math.floor(Math.random() * 3)]} ${Math.floor(Math.random() * 50) + 10}% ${['increase in efficiency', 'reduction in costs', 'improvement in performance'][Math.floor(Math.random() * 3)]}\n`;
        generatedContent += `• ${['Collaborated with', 'Worked alongside', 'Partnered with'][Math.floor(Math.random() * 3)]} ${Math.floor(Math.random() * 5) + 2} team members to ${['deliver', 'implement', 'develop'][Math.floor(Math.random() * 3)]} ${['innovative solutions', 'strategic initiatives', 'key projects'][Math.floor(Math.random() * 3)]}\n`;
        generatedContent += `• ${['Optimized', 'Streamlined', 'Enhanced'][Math.floor(Math.random() * 3)]} ${['processes', 'systems', 'workflows'][Math.floor(Math.random() * 3)]} to ${['improve', 'increase', 'maximize'][Math.floor(Math.random() * 3)]} ${['productivity', 'efficiency', 'output'][Math.floor(Math.random() * 3)]} by ${Math.floor(Math.random() * 30) + 10}%`;
        
        setResumeData(prev => ({
          ...prev,
          experience: prev.experience.map((item, i) => 
            i === index ? { ...item, description: generatedContent } : item
          )
        }));
      }
      else if (section === 'project' && index !== undefined) {
        generatedContent = `• Developed ${projectName} using ${technologies} to ${['solve', 'address', 'tackle'][Math.floor(Math.random() * 3)]} ${['business challenges', 'user needs', 'technical problems'][Math.floor(Math.random() * 3)]}\n`;
        generatedContent += `• Implemented ${['key features', 'core functionality', 'critical components'][Math.floor(Math.random() * 3)]} that ${['improved', 'enhanced', 'transformed'][Math.floor(Math.random() * 3)]} ${['user experience', 'system performance', 'business outcomes'][Math.floor(Math.random() * 3)]} by ${Math.floor(Math.random() * 50) + 10}%\n`;
        generatedContent += `• ${['Collaborated with', 'Worked alongside', 'Partnered with'][Math.floor(Math.random() * 3)]} ${Math.floor(Math.random() * 5) + 1} team members to deliver project ${['on time', 'under budget', 'with high quality'][Math.floor(Math.random() * 3)]}`;
        
        setResumeData(prev => ({
          ...prev,
          projects: prev.projects.map((item, i) => 
            i === index ? { ...item, description: generatedContent } : item
          )
        }));
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
      setGeneratingSection(null);
      setGeneratingIndex(null);
    }
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: ''
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'Intermediate'
    };
    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, newLang]
    }));
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: ''
    };
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !resumeData.skills.includes(skill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handlePreview = () => {
    const resumeJson = JSON.stringify(resumeData, null, 2);
    const templateId = selectedTemplate;
    
    const previewUrl = `/resume/preview?template=${templateId}&data=${encodeURIComponent(resumeJson)}`;
    window.open(previewUrl, '_blank');
  };

  const handleDownload = () => {
    const resumeJson = JSON.stringify(resumeData, null, 2);
    const templateId = selectedTemplate;
    
    const pdfUrl = `/resume/pdf?template=${templateId}&data=${encodeURIComponent(resumeJson)}`;
    window.open(pdfUrl, '_blank');
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
                  <h1 className="text-lg font-semibold">Resume Builder</h1>
                  <p className="text-sm text-gray-500">Step 1: Choose your template</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Step 1 of 2</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Choose Your Resume Template</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Select from our collection of ATS-optimized templates designed to help you land your dream job.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedTemplate === template.id 
                        ? 'ring-2 ring-blue-500 shadow-lg' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-t-lg overflow-hidden">
                      <img
                        src={template.preview}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {template.description}
                          </CardDescription>
                        </div>
                        {selectedTemplate === template.id && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            ATS Score: {template.atsScore}%
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {template.features.map((feature, featureIndex) => (
                            <Badge key={featureIndex} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button 
                size="lg" 
                onClick={() => setCurrentStep(2)}
                disabled={!selectedTemplate}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Continue to Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Resume Builder</h1>
                <p className="text-sm text-gray-500">Step 2: Enter your details</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Step 2 of 2</Badge>
              <Button variant="outline" size="sm" onClick={handlePreview}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Save className="w-4 h-4 mr-2" />
                Save Resume
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="languages">Languages</TabsTrigger>
                  <TabsTrigger value="extras">Extras</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Enter your basic contact information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            placeholder="John Doe"
                            value={resumeData.personalInfo.fullName}
                            onChange={(e) => setResumeData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={resumeData.personalInfo.email}
                            onChange={(e) => setResumeData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, email: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            placeholder="+1 (555) 123-4567"
                            value={resumeData.personalInfo.phone}
                            onChange={(e) => setResumeData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, phone: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location *</Label>
                          <Input
                            id="location"
                            placeholder="New York, NY"
                            value={resumeData.personalInfo.location}
                            onChange={(e) => setResumeData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, location: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            placeholder="https://johndoe.com"
                            value={resumeData.personalInfo.website}
                            onChange={(e) => setResumeData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, website: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            placeholder="https://linkedin.com/in/johndoe"
                            value={resumeData.personalInfo.linkedin}
                            onChange={(e) => setResumeData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="github">GitHub</Label>
                          <Input
                            id="github"
                            placeholder="https://github.com/johndoe"
                            value={resumeData.personalInfo.github}
                            onChange={(e) => setResumeData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, github: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="portfolio">Portfolio</Label>
                          <Input
                            id="portfolio"
                            placeholder="https://portfolio.johndoe.com"
                            value={resumeData.personalInfo.portfolio}
                            onChange={(e) => setResumeData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, portfolio: e.target.value }
                            }))}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="experience" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Work Experience</CardTitle>
                          <CardDescription>
                            Add your professional experience
                          </CardDescription>
                        </div>
                        <Button onClick={addExperience} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {resumeData.experience.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No work experience added yet.</p>
                          <p className="text-sm">Click "Add Experience" to get started.</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {resumeData.experience.map((exp, index) => (
                            <div key={exp.id} className="border rounded-lg p-6 space-y-4">
                              <div className="flex justify-between items-start">
                                <h3 className="font-semibold">Experience {index + 1}</h3>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => generateWithAI('experience', index)}
                                    disabled={isGenerating && generatingIndex === index}
                                  >
                                    {isGenerating && generatingIndex === index ? (
                                      <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Generating...
                                      </>
                                    ) : (
                                      <>
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Enhance
                                      </>
                                    )}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setResumeData(prev => ({
                                      ...prev,
                                      experience: prev.experience.filter(e => e.id !== exp.id)
                                    }))}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Company *</Label>
                                  <Input
                                    placeholder="Company Name"
                                    value={exp.company}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map(item => 
                                        item.id === exp.id ? { ...item, company: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                                <div>
                                  <Label>Position *</Label>
                                  <Input
                                    placeholder="Job Title"
                                    value={exp.position}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map(item => 
                                        item.id === exp.id ? { ...item, position: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                                <div>
                                  <Label>Location</Label>
                                  <Input
                                    placeholder="City, State"
                                    value={exp.location}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map(item => 
                                        item.id === exp.id ? { ...item, location: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id={`current-${exp.id}`}
                                    checked={exp.current}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map(item => 
                                        item.id === exp.id ? { ...item, current: e.target.checked } : item
                                      )
                                    }))}
                                  />
                                  <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
                                </div>
                                <div>
                                  <Label>Start Date *</Label>
                                  <Input
                                    type="month"
                                    value={exp.startDate}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map(item => 
                                        item.id === exp.id ? { ...item, startDate: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                                <div>
                                  <Label>End Date</Label>
                                  <Input
                                    type="month"
                                    value={exp.endDate}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map(item => 
                                        item.id === exp.id ? { ...item, endDate: e.target.value } : item
                                      )
                                    }))}
                                    disabled={exp.current}
                                    placeholder={exp.current ? "Present" : ""}
                                  />
                                </div>
                              </div>
                              <div>
                                <Label>Description *</Label>
                                <Textarea
                                  placeholder="• Describe your responsibilities and achievements using bullet points\n• Use action verbs and quantify results when possible\n• Focus on accomplishments rather than just duties"
                                  rows={4}
                                  value={exp.description}
                                  onChange={(e) => setResumeData(prev => ({
                                    ...prev,
                                    experience: prev.experience.map(item => 
                                      item.id === exp.id ? { ...item, description: e.target.value } : item
                                    )
                                  }))}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Education</CardTitle>
                          <CardDescription>
                            Add your educational background
                          </CardDescription>
                        </div>
                        <Button onClick={addEducation} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Education
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {resumeData.education.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No education added yet.</p>
                          <p className="text-sm">Click "Add Education" to get started.</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {resumeData.education.map((edu, index) => (
                            <div key={edu.id} className="border rounded-lg p-6 space-y-4">
                              <div className="flex justify-between items-start">
                                <h3 className="font-semibold">Education {index + 1}</h3>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setResumeData(prev => ({
                                    ...prev,
                                    education: prev.education.filter(e => e.id !== edu.id)
                                  }))}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Institution *</Label>
                                  <Input
                                    placeholder="University Name"
                                    value={edu.institution}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      education: prev.education.map(item => 
                                        item.id === edu.id ? { ...item, institution: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                                <div>
                                  <Label>Degree *</Label>
                                  <Input
                                    placeholder="Bachelor's, Master's, etc."
                                    value={edu.degree}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      education: prev.education.map(item => 
                                        item.id === edu.id ? { ...item, degree: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                                <div>
                                  <Label>Field of Study *</Label>
                                  <Input
                                    placeholder="Computer Science, Business, etc."
                                    value={edu.field}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      education: prev.education.map(item => 
                                        item.id === edu.id ? { ...item, field: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                                <div>
                                  <Label>Location</Label>
                                  <Input
                                    placeholder="City, State"
                                    value={edu.location}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      education: prev.education.map(item => 
                                        item.id === edu.id ? { ...item, location: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                                <div>
                                  <Label>Start Date</Label>
                                  <Input
                                    type="month"
                                    value={edu.startDate}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      education: prev.education.map(item => 
                                        item.id === edu.id ? { ...item, startDate: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                                <div>
                                  <Label>End Date</Label>
                                  <Input
                                    type="month"
                                    value={edu.endDate}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      education: prev.education.map(item => 
                                        item.id === edu.id ? { ...item, endDate: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                                <div>
                                  <Label>GPA (Optional)</Label>
                                  <Input
                                    placeholder="3.8"
                                    value={edu.gpa || ''}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      education: prev.education.map(item => 
                                        item.id === edu.id ? { ...item, gpa: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                                <div>
                                  <Label>Honors (Optional)</Label>
                                  <Input
                                    placeholder="Magna Cum Laude, Dean's List, etc."
                                    value={edu.honors || ''}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      education: prev.education.map(item => 
                                        item.id === edu.id ? { ...item, honors: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="projects" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Projects</CardTitle>
                          <CardDescription>
                            Showcase your key projects and achievements
                          </CardDescription>
                        </div>
                        <Button onClick={addProject} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Project
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {resumeData.projects.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No projects added yet.</p>
                          <p className="text-sm">Click "Add Project" to get started.</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {resumeData.projects.map((project, index) => (
                            <div key={project.id} className="border rounded-lg p-6 space-y-4">
                              <div className="flex justify-between items-start">
                                <h3 className="font-semibold">Project {index + 1}</h3>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => generateWithAI('project', index)}
                                    disabled={isGenerating && generatingIndex === index}
                                  >
                                    {isGenerating && generatingIndex === index ? (
                                      <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Generating...
                                      </>
                                    ) : (
                                      <>
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Enhance
                                      </>
                                    )}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setResumeData(prev => ({
                                      ...prev,
                                      projects: prev.projects.filter(p => p.id !== project.id)
                                    }))}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Project Name *</Label>
                                  <Input
                                    placeholder="E-commerce Platform"
                                    value={project.name}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      projects: prev.projects.map(item => 
                                        item.id === project.id ? { ...item, name: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                                <div>
                                  <Label>Project Link</Label>
                                  <Input
                                    placeholder="https://github.com/username/project"
                                    value={project.link || ''}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      projects: prev.projects.map(item => 
                                        item.id === project.id ? { ...item, link: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                                <div>
                                  <Label>Start Date</Label>
                                  <Input
                                    type="month"
                                    value={project.startDate}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      projects: prev.projects.map(item => 
                                        item.id === project.id ? { ...item, startDate: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                                <div>
                                  <Label>End Date</Label>
                                  <Input
                                    type="month"
                                    value={project.endDate}
                                    onChange={(e) => setResumeData(prev => ({
                                      ...prev,
                                      projects: prev.projects.map(item => 
                                        item.id === project.id ? { ...item, endDate: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                              </div>
                              <div>
                                <Label>Description *</Label>
                                <Textarea
                                  placeholder="Describe the project, your role, technologies used, and key achievements..."
                                  rows={3}
                                  value={project.description}
                                  onChange={(e) => setResumeData(prev => ({
                                    ...prev,
                                    projects: prev.projects.map(item => 
                                      item.id === project.id ? { ...item, description: e.target.value } : item
                                    )
                                  }))}
                                />
                              </div>
                              <div>
                                <Label>Technologies Used</Label>
                                <Input
                                  placeholder="React, Node.js, MongoDB (comma separated)"
                                  value={project.technologies.join(', ')}
                                  onChange={(e) => setResumeData(prev => ({
                                    ...prev,
                                    projects: prev.projects.map(item => 
                                      item.id === project.id ? { 
                                        ...item, 
                                        technologies: e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech)
                                      } : item
                                    )
                                  }))}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills & Expertise</CardTitle>
                      <CardDescription>
                        Add your technical and soft skills
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label>Add Skills</Label>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Type a skill and press Enter"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  addSkill(e.currentTarget.value);
                                  e.currentTarget.value = '';
                                }
                              }}
                            />
                            <Button 
                              onClick={(e) => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                if (input?.value) {
                                  addSkill(input.value);
                                  input.value = '';
                                }
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                        
                        {resumeData.skills.length > 0 && (
                          <div>
                            <Label className="mb-2 block">Your Skills</Label>
                            <div className="flex flex-wrap gap-2">
                              {resumeData.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="px-3 py-1">
                                  {skill}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2 h-4 w-4 p-0"
                                    onClick={() => removeSkill(skill)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="languages" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Languages</CardTitle>
                          <CardDescription>
                            Add languages you speak and your proficiency level
                          </CardDescription>
                        </div>
                        <Button onClick={addLanguage} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Language
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {resumeData.languages.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No languages added yet.</p>
                          <p className="text-sm">Click "Add Language" to get started.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {resumeData.languages.map((lang, index) => (
                            <div key={lang.id} className="flex items-center gap-4 p-4 border rounded-lg">
                              <div className="flex-1">
                                <Input
                                  placeholder="Language name"
                                  value={lang.name}
                                  onChange={(e) => setResumeData(prev => ({
                                    ...prev,
                                    languages: prev.languages.map(item => 
                                      item.id === lang.id ? { ...item, name: e.target.value } : item
                                    )
                                  }))}
                                />
                              </div>
                              <div className="flex-1">
                                <select
                                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
                                  value={lang.proficiency}
                                  onChange={(e) => setResumeData(prev => ({
                                    ...prev,
                                    languages: prev.languages.map(item => 
                                      item.id === lang.id ? { ...item, proficiency: e.target.value } : item
                                    )
                                  }))}
                                >
                                  <option value="Native">Native</option>
                                  <option value="Fluent">Fluent</option>
                                  <option value="Advanced">Advanced</option>
                                  <option value="Intermediate">Intermediate</option>
                                  <option value="Basic">Basic</option>
                                </select>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setResumeData(prev => ({
                                  ...prev,
                                  languages: prev.languages.filter(l => l.id !== lang.id)
                                }))}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="extras" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Certifications</CardTitle>
                          <CardDescription>
                            Add your professional certifications
                          </CardDescription>
                        </div>
                        <Button onClick={addCertification} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Certification
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {resumeData.certifications.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">
                          <p>No certifications added yet.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {resumeData.certifications.map((cert, index) => (
                            <div key={cert.id} className="border rounded-lg p-4 space-y-3">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">Certification {index + 1}</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setResumeData(prev => ({
                                    ...prev,
                                    certifications: prev.certifications.filter(c => c.id !== cert.id)
                                  }))}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Input
                                  placeholder="Certification Name"
                                  value={cert.name}
                                  onChange={(e) => setResumeData(prev => ({
                                    ...prev,
                                    certifications: prev.certifications.map(item => 
                                      item.id === cert.id ? { ...item, name: e.target.value } : item
                                    )
                                  }))}
                                />
                                <Input
                                  placeholder="Issuing Organization"
                                  value={cert.issuer}
                                  onChange={(e) => setResumeData(prev => ({
                                    ...prev,
                                    certifications: prev.certifications.map(item => 
                                      item.id === cert.id ? { ...item, issuer: e.target.value } : item
                                    )
                                  }))}
                                />
                                <Input
                                  type="month"
                                  placeholder="Issue Date"
                                  value={cert.date}
                                  onChange={(e) => setResumeData(prev => ({
                                    ...prev,
                                    certifications: prev.certifications.map(item => 
                                      item.id === cert.id ? { ...item, date: e.target.value } : item
                                    )
                                  }))}
                                />
                                <Input
                                  placeholder="Credential ID (Optional)"
                                  value={cert.credentialId || ''}
                                  onChange={(e) => setResumeData(prev => ({
                                    ...prev,
                                    certifications: prev.certifications.map(item => 
                                      item.id === cert.id ? { ...item, credentialId: e.target.value } : item
                                    )
                                  }))}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Achievements</CardTitle>
                      <CardDescription>
                        Add notable achievements and awards
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add an achievement and press Enter"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                setResumeData(prev => ({
                                  ...prev,
                                  achievements: [...prev.achievements, e.currentTarget.value.trim()]
                                }));
                                e.currentTarget.value = '';
                              }
                            }}
                          />
                          <Button 
                            onClick={(e) => {
                              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                              if (input?.value.trim()) {
                                setResumeData(prev => ({
                                  ...prev,
                                  achievements: [...prev.achievements, input.value.trim()]
                                }));
                                input.value = '';
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        {resumeData.achievements.length > 0 && (
                          <div className="space-y-2">
                            {resumeData.achievements.map((achievement, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                <span className="text-sm">{achievement}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setResumeData(prev => ({
                                    ...prev,
                                    achievements: prev.achievements.filter((_, i) => i !== index)
                                  }))}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Interests</CardTitle>
                      <CardDescription>
                        Add your hobbies and interests
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add an interest and press Enter"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                setResumeData(prev => ({
                                  ...prev,
                                  interests: [...prev.interests, e.currentTarget.value.trim()]
                                }));
                                e.currentTarget.value = '';
                              }
                            }}
                          />
                          <Button 
                            onClick={(e) => {
                              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                              if (input?.value.trim()) {
                                setResumeData(prev => ({
                                  ...prev,
                                  interests: [...prev.interests, input.value.trim()]
                                }));
                                input.value = '';
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        {resumeData.interests.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {resumeData.interests.map((interest, index) => (
                              <Badge key={index} variant="outline" className="px-3 py-1">
                                {interest}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-2 h-4 w-4 p-0"
                                  onClick={() => setResumeData(prev => ({
                                    ...prev,
                                    interests: prev.interests.filter((_, i) => i !== index)
                                  }))}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="summary" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Professional Summary</CardTitle>
                          <CardDescription>
                            Write a compelling summary of your experience and skills
                          </CardDescription>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => generateWithAI('summary')}
                          disabled={isGenerating && generatingSection === 'summary'}
                        >
                          {isGenerating && generatingSection === 'summary' ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 mr-2" />
                              Generate with AI
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Write a brief summary of your professional background, key achievements, and career goals..."
                        rows={6}
                        value={resumeData.summary}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          summary: e.target.value
                        }))}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-24 space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resume Progress</CardTitle>
                  <CardDescription>
                    Complete all sections for the best results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { key: 'personal', label: 'Personal Info', completed: resumeData.personalInfo.fullName && resumeData.personalInfo.email },
                      { key: 'experience', label: 'Experience', completed: resumeData.experience.length > 0 },
                      { key: 'education', label: 'Education', completed: resumeData.education.length > 0 },
                      { key: 'projects', label: 'Projects', completed: resumeData.projects.length > 0 },
                      { key: 'skills', label: 'Skills', completed: resumeData.skills.length > 0 },
                      { key: 'summary', label: 'Summary', completed: resumeData.summary.length > 50 }
                    ].map((section) => (
                      <div key={section.key} className="flex items-center justify-between">
                        <span className="text-sm">{section.label}</span>
                        {section.completed ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Selected Template</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedTemplate && (
                    <div className="space-y-3">
                      <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                        <img
                          src={templates.find(t => t.id === selectedTemplate)?.preview}
                          alt="Selected template"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{templates.find(t => t.id === selectedTemplate)?.name}</h3>
                        <p className="text-sm text-gray-500">{templates.find(t => t.id === selectedTemplate)?.description}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setCurrentStep(1)}>
                        Change Template
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <div className="flex items-center space-x-3">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <div>
                <h3 className="font-medium">
                  {generatingSection === 'summary' ? 'Generating professional summary' : 
                   generatingSection === 'experience' ? `Enhancing experience at ${resumeData.experience[generatingIndex || 0]?.company}` : 
                   generatingSection === 'project' ? `Enhancing project: ${resumeData.projects[generatingIndex || 0]?.name}` : 
                   'Generating content'}
                </h3>
                <p className="text-sm text-gray-500">This may take a few seconds...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}