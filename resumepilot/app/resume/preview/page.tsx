"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

// Resume Template Components
const ATSClassicTemplate = ({ data }: { data: any }) => (
  <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg" style={{ fontFamily: 'Arial, sans-serif' }}>
    {/* Header */}
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
      <div className="text-gray-600 space-y-1">
        <div>{data.personalInfo.email} | {data.personalInfo.phone}</div>
        <div>{data.personalInfo.location}</div>
        {data.personalInfo.linkedin && <div>{data.personalInfo.linkedin}</div>}
        {data.personalInfo.github && <div>{data.personalInfo.github}</div>}
      </div>
    </div>

    {/* Summary */}
    {data.summary && (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">PROFESSIONAL SUMMARY</h2>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </div>
    )}

    {/* Experience */}
    {data.experience.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">PROFESSIONAL EXPERIENCE</h2>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
              <span className="text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            <div className="text-gray-700 font-medium mb-2">{exp.company} | {exp.location}</div>
            <div className="text-gray-700 whitespace-pre-line">{exp.description}</div>
          </div>
        ))}
      </div>
    )}

    {/* Education */}
    {data.education.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">EDUCATION</h2>
        {data.education.map((edu: any, index: number) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                <div className="text-gray-700">{edu.institution} | {edu.location}</div>
                {edu.gpa && <div className="text-gray-600">GPA: {edu.gpa}</div>}
                {edu.honors && <div className="text-gray-600">{edu.honors}</div>}
              </div>
              <span className="text-gray-600">{edu.startDate} - {edu.endDate}</span>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {data.skills.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">TECHNICAL SKILLS</h2>
        <div className="text-gray-700">{data.skills.join(' • ')}</div>
      </div>
    )}

    {/* Projects */}
    {data.projects.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">PROJECTS</h2>
        {data.projects.map((project: any, index: number) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
              <span className="text-gray-600">{project.startDate} - {project.endDate}</span>
            </div>
            {project.link && <div className="text-blue-600 mb-1">{project.link}</div>}
            <div className="text-gray-700 mb-2">{project.description}</div>
            {project.technologies.length > 0 && (
              <div className="text-gray-600">Technologies: {project.technologies.join(', ')}</div>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Languages */}
    {data.languages.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">LANGUAGES</h2>
        <div className="text-gray-700">
          {data.languages.map((lang: any, index: number) => (
            <span key={index}>{lang.name} ({lang.proficiency}){index < data.languages.length - 1 ? ' • ' : ''}</span>
          ))}
        </div>
      </div>
    )}

    {/* Certifications */}
    {data.certifications.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300 pb-1">CERTIFICATIONS</h2>
        {data.certifications.map((cert: any, index: number) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                <div className="text-gray-700">{cert.issuer}</div>
                {cert.credentialId && <div className="text-gray-600">ID: {cert.credentialId}</div>}
              </div>
              <span className="text-gray-600">{cert.date}</span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const ModernProfessionalTemplate = ({ data }: { data: any }) => (
  <div className="max-w-4xl mx-auto bg-white shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
    {/* Header with accent */}
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
      <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName}</h1>
      <div className="text-blue-100 space-y-1">
        <div>{data.personalInfo.email} | {data.personalInfo.phone}</div>
        <div>{data.personalInfo.location}</div>
        <div className="flex space-x-4 mt-2">
          {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
          {data.personalInfo.github && <span>{data.personalInfo.github}</span>}
        </div>
      </div>
    </div>

    <div className="p-8">
      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-blue-600">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Experience</h2>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-6 border-l-4 border-blue-200 pl-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="text-blue-600 font-semibold mb-3">{exp.company} | {exp.location}</div>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">{exp.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string, index: number) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Education</h2>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-4 border-l-4 border-blue-200 pl-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <div className="text-blue-600 font-semibold">{edu.institution} | {edu.location}</div>
                  {edu.gpa && <div className="text-gray-600">GPA: {edu.gpa}</div>}
                  {edu.honors && <div className="text-gray-600">{edu.honors}</div>}
                </div>
                <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const TechFocusedTemplate = ({ data }: { data: any }) => (
  <div className="max-w-4xl mx-auto bg-white shadow-lg" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
    {/* Header */}
    <div className="bg-gray-900 text-green-400 p-8">
      <div className="text-sm mb-2">$ whoami</div>
      <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
      <div className="text-green-300 space-y-1">
        <div>📧 {data.personalInfo.email} | 📱 {data.personalInfo.phone}</div>
        <div>📍 {data.personalInfo.location}</div>
        {data.personalInfo.github && <div>🔗 {data.personalInfo.github}</div>}
        {data.personalInfo.linkedin && <div>💼 {data.personalInfo.linkedin}</div>}
      </div>
    </div>

    <div className="p-8">
      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-mono">// About Me</h2>
          <div className="bg-gray-100 p-4 rounded border-l-4 border-green-500">
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-mono">// Tech Stack</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded">
            <div className="grid grid-cols-3 gap-4">
              {data.skills.map((skill: string, index: number) => (
                <div key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-mono">// Projects</h2>
          {data.projects.map((project: any, index: number) => (
            <div key={index} className="mb-6 border border-gray-300 rounded p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 font-mono">{project.name}</h3>
                <span className="text-gray-600 text-sm">{project.startDate} - {project.endDate}</span>
              </div>
              {project.link && (
                <div className="text-blue-600 mb-2 font-mono text-sm">🔗 {project.link}</div>
              )}
              <div className="text-gray-700 mb-3">{project.description}</div>
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, techIndex: number) => (
                    <span key={techIndex} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-mono">// Work Experience</h2>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-6 border-l-4 border-green-500 pl-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                <span className="text-gray-600 text-sm">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <div className="text-green-600 font-semibold mb-3">{exp.company} | {exp.location}</div>
              <div className="text-gray-700 whitespace-pre-line">{exp.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const ExecutiveEliteTemplate = ({ data }: { data: any }) => (
  <div className="max-w-4xl mx-auto bg-white shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
    {/* Header with photo */}
    <div className="flex items-center p-8 border-b-2 border-gray-200">
      {data.personalInfo.photo && (
        <div className="w-24 h-24 rounded-full overflow-hidden mr-6 border-2 border-gray-300">
          <img src={data.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
        </div>
      )}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{data.personalInfo.fullName}</h1>
        <div className="text-gray-600 italic">{data.personalInfo.title}</div>
        <div className="text-gray-600 mt-2 space-y-1">
          <div>{data.personalInfo.email} | {data.personalInfo.phone}</div>
          <div>{data.personalInfo.location}</div>
        </div>
      </div>
    </div>

    <div className="p-8">
      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">EXECUTIVE PROFILE</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Core Competencies */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">CORE COMPETENCIES</h2>
          <div className="grid grid-cols-3 gap-4">
            {data.skills.map((skill: string, index: number) => (
              <div key={index} className="flex items-center">
                <span className="text-gray-700">• {skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">PROFESSIONAL EXPERIENCE</h2>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                <span className="text-gray-600 italic">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="text-gray-700 font-semibold italic mb-2">{exp.company} | {exp.location}</div>
              <div className="text-gray-700 whitespace-pre-line pl-4 border-l-2 border-gray-200">
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">EDUCATION</h2>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <div className="text-gray-700 italic">{edu.institution} | {edu.location}</div>
                  {edu.gpa && <div className="text-gray-600">GPA: {edu.gpa}</div>}
                </div>
                <span className="text-gray-600 italic">{edu.startDate} - {edu.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const CreativeMinimalTemplate = ({ data }: { data: any }) => (
  <div className="max-w-4xl mx-auto bg-white shadow-lg" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
    {/* Two-column layout */}
    <div className="flex">
      {/* Left sidebar */}
      <div className="w-1/3 bg-gray-100 p-6">
        {data.personalInfo.photo && (
          <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
            <img src={data.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">{data.personalInfo.fullName}</h1>
        
        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-xs uppercase font-bold text-gray-500 mb-3">Contact</h2>
          <div className="space-y-2">
            <div className="text-gray-700">{data.personalInfo.email}</div>
            <div className="text-gray-700">{data.personalInfo.phone}</div>
            <div className="text-gray-700">{data.personalInfo.location}</div>
          </div>
        </div>
        
        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs uppercase font-bold text-gray-500 mb-3">Skills</h2>
            <div className="space-y-3">
              {data.skills.map((skill: string, index: number) => (
                <div key={index}>
                  <div className="text-gray-900 font-medium">{skill}</div>
                  <div className="w-full bg-gray-300 h-1 mt-1">
                    <div className="bg-gray-700 h-1" style={{ width: `${Math.min(100, 70 + Math.random() * 30)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs uppercase font-bold text-gray-500 mb-3">Languages</h2>
            <div className="space-y-3">
              {data.languages.map((lang: any, index: number) => (
                <div key={index}>
                  <div className="text-gray-900 font-medium">{lang.name}</div>
                  <div className="text-gray-600 text-sm">{lang.proficiency}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Right content */}
      <div className="w-2/3 p-6">
        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Profile</h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Experience</h2>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-5">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-gray-700 text-sm italic mb-2">{exp.company} | {exp.location}</div>
                <div className="text-gray-700 text-sm">{exp.description}</div>
              </div>
            ))}
          </div>
        )}
        
        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Education</h2>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <div className="text-gray-700 text-sm">{edu.institution} | {edu.location}</div>
                  </div>
                  <span className="text-gray-600 text-sm">{edu.startDate} - {edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function ResumePreview() {
  const searchParams = useSearchParams();
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

  const handleDownload = () => {
    window.print();
  };

  if (!resumeData || !templateId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Resume Preview...</h2>
          <p className="text-gray-600">Please wait while we load your resume.</p>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    switch (templateId) {
      case 'ats-classic':
        return <ATSClassicTemplate data={resumeData} />;
      case 'modern-professional':
        return <ModernProfessionalTemplate data={resumeData} />;
      case 'tech-focused':
        return <TechFocusedTemplate data={resumeData} />;
      case 'executive-elite':
        return <ExecutiveEliteTemplate data={resumeData} />;
      case 'creative-minimal':
        return <CreativeMinimalTemplate data={resumeData} />;
      default:
        return <ATSClassicTemplate data={resumeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Hidden in print */}
      <div className="bg-white border-b p-4 print:hidden">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/resume/new">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Resume Preview</h1>
              <p className="text-sm text-gray-500">Review your resume before downloading</p>
            </div>
          </div>
          <Button onClick={handleDownload} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="py-8 print:py-0">
        {renderTemplate()}
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:py-0 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}