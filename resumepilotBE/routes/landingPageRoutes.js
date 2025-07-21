import express from "express";
import multer from "multer";
import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import OpenAI from "openai";
import { config } from "dotenv";
import Resume from "../models/landingPageResponse.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { exec } from "child_process";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
import {egdata} from "../egData.js"
config();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Set this in .env
});

router.post(
    "/upload",
    authenticateToken,
    upload.single("file"),
    async (req, res) => {
        const file = req.file;
        const user = req.user;

        if (!file) return res.status(400).send("No file uploaded");

        try {
            let text = "";

            if (file.mimetype === "application/pdf") {
                const dataBuffer = fs.readFileSync(file.path);
                const data = await pdfParse(dataBuffer);
                text = data.text;
            } else if (
                file.mimetype ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ) {
                const result = await mammoth.extractRawText({
                    path: file.path,
                });
                text = result.value;
            } else if (file.mimetype === "text/plain") {
                text = fs.readFileSync(file.path, "utf-8");
            } else {
                return res.status(400).send("Unsupported file type");
            }

            fs.unlinkSync(file.path); // cleanup

            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are an assistant that extracts structured portfolio data from resume text. Return the data in JSON format matching this schema: " +
                            JSON.stringify(Object.keys(egdata)) +
                            ".",
                    },
                    {
                        role: "user",
                        content: `Here is the parsed resume:\n\n${text}`,
                    },
                ],
                temperature: 0.4,
            });
            console.log("completion", completion)
            const extractedData = completion.choices[0].message.content;
            console.log("extractedData", extractedData)

            try {
                const parsedJson = JSON.parse(extractedData)
                ;
                console.log("parsedJson", typeof parsedJson)

                    const resume = new Resume({
                    user: user,
                    originalText: text,
                    extractedData: parsedJson,
                });

                await resume.save();

                res.status(200).json({ message: 'Resume saved', parsedJson });
            } catch (jsonErr) {
                console.error("Failed to parse OpenAI response as JSON", jsonErr);
                res.status(500).json({
                    error: "OpenAI returned invalid JSON",
                    raw: extractedData,
                });
            }
        } catch (err) {
            console.error(
                "Error during resume parsing or OpenAI request:",
                err
            );
            res.status(500).send("Server error");
        }
    }
);

router.get('/latest', authenticateToken, async (req, res) => {
    try {
      const userId = req.user._id;
  
      const latestResume = await Resume.findOne({ 'user._id': userId })
        .sort({ createdAt: -1 })
        .exec();
  
      if (!latestResume) {
        return res.status(404).json({ message: 'No resume found for this user.' });
      }
  
      res.status(200).json(latestResume);
    } catch (error) {
      console.error('Error fetching latest resume:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// router.post('/deploy', authenticateToken, async (req, res) => {
//   const { portfolioData, customization } = req.body;

//   const tempDir = path.join(__dirname, 'temp-project-' + Date.now());
//   await fsl.mkdirp(tempDir);

//   try {
//     // 1. Create Next.js basic structure
//     await fsl.mkdirp(path.join(tempDir, 'pages'));

//     // 2. Write dynamic index.js file
//     const pageContent = `
//     "use client";

//     import { useState, useEffect } from 'react';
//     import { Button } from '@/components/ui/button';
//     import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
//     import { Badge } from '@/components/ui/badge';
//     import { Progress } from '@/components/ui/progress';
//     import { Input } from '@/components/ui/input';
//     import { Textarea } from '@/components/ui/textarea';
//     import { Label } from '@/components/ui/label';
//     import { Separator } from '@/components/ui/separator';
//     import { 
//       Menu, 
//       X, 
//       Github, 
//       Linkedin, 
//       Mail, 
//       MapPin, 
//       ExternalLink, 
//       Download, 
//       Phone, 
//       Send, 
//       Calendar,
//       ArrowLeft,
//       Home,
//       User,
//       FolderOpen,
//       FileText,
//       MessageCircle
//     } from 'lucide-react';
//     import Image from 'next/image';
    
//     export default function Portfolio({ portfolioData }) {
//       const [currentPage, setCurrentPage] = useState('home');
//       const [isMenuOpen, setIsMenuOpen] = useState(false);
//       const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         message: ''
//       });
    
//       const navItems = [
//         { id: 'home', label: 'Home', icon: Home },
//         { id: 'about', label: 'About', icon: User },
//         { id: 'projects', label: 'Projects', icon: FolderOpen },
//         { id: 'resume', label: 'Resume', icon: FileText },
//         { id: 'contact', label: 'Contact', icon: MessageCircle },
//       ];
    
//       const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: 'short'
//         });
//       };
    
//       const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//           ...prev,
//           [name]: value
//         }));
//       };
    
//       const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Form submitted:', formData);
//         setFormData({ name: '', email: '', message: '' });
//       };
    
//       const getSocialIcon = (platform) => {
//         switch (platform) {
//           case 'GitHub': return <Github className="w-6 h-6" />;
//           case 'LinkedIn': return <Linkedin className="w-6 h-6" />;
//           default: return <Mail className="w-6 h-6" />;
//         }
//       };
    
//       // Navigation Component
//       const Navigation = () => (
//         <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <div className="font-bold text-xl text-gray-900">
//                 {portfolioData.personal?.name || 'Portfolio'}
//               </div>
    
//               {/* Desktop Navigation */}
//               <div className="hidden md:flex space-x-8">
//                 {navItems.map((item) => {
//                   const Icon = item.icon;
//                   return (
//                     <button
//                       key={item.id}
//                       onClick={() => setCurrentPage(item.id)}
//                       className={"flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ${
//                         currentPage === item.id
//                           ? 'text-blue-600 border-b-2 border-blue-600'
//                           : 'text-gray-700 hover:text-blue-600'
//                       }"}
//                     >
//                       <Icon className="w-4 h-4 mr-2" />
//                       {item.label}
//                     </button>
//                   );
//                 })}
//               </div>
    
//               {/* Mobile Menu Button */}
//               <div className="md:hidden">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 >
//                   {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//                 </Button>
//               </div>
//             </div>
    
//             {/* Mobile Navigation */}
//             {isMenuOpen && (
//               <div className="md:hidden bg-white border-t border-gray-200">
//                 <div className="px-2 pt-2 pb-3 space-y-1">
//                   {navItems.map((item) => {
//                     const Icon = item.icon;
//                     return (
//                       <button
//                         key={item.id}
//                         onClick={() => {
//                           setCurrentPage(item.id);
//                           setIsMenuOpen(false);
//                         }}
//                         className={"flex items-center w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 ${
//                           currentPage === item.id
//                             ? 'text-blue-600 bg-blue-50'
//                             : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
//                         }"}
//                       >
//                         <Icon className="w-4 h-4 mr-3" />
//                         {item.label}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>
//         </nav>
//       );
    
//       // Home Page
//       const HomePage = () => (
//         <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
//           {/* Background Image */}
//             <div className="absolute inset-0 z-0">
//               <div 
//                 className="w-full h-full bg-cover bg-center bg-no-repeat"
//                 style={{ backgroundImage: "url("https://www.google.com/imgres?q=portfolio%20bg%20images%20url&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F056%2F513%2F884%2Fsmall_2x%2Fan-evocative-interior-scene-featuring-a-textured-wall-painted-in-a-vibrant-gradient-bathed-in-a-blend-of-light-and-shadow-and-a-floor-with-a-cool-hue-free-photo.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fportfolio-background&docid=8Gzk2lb46F6rEM&tbnid=FT3QYvK_nSarxM&vet=12ahUKEwjT14f0ocuOAxWkRaQEHYksBacQM3oECBcQAA..i&w=714&h=400&hcb=2&ved=2ahUKEwjT14f0ocuOAxWkRaQEHYksBacQM3oECBcQAA")" }}
//               />
//               <div className="absolute inset-0 bg-black/50" />
//             </div>
    
//           {/* Content */}
//           <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
//             <div className="mb-8">
//               {portfolioData.personal?.avatar && (
//                 <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm">
//                   <Image
//                     src={portfolioData.personal.avatar}
//                     alt={portfolioData.personal.name || 'Profile'}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//               )}
//               {portfolioData.personal?.name && (
//                 <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
//                   {portfolioData.personal.name}
//                 </h1>
//               )}
//               {portfolioData.personal?.title && (
//                 <p className="text-xl md:text-2xl mb-2 text-blue-200">
//                   {portfolioData.personal.title}
//                 </p>
//               )}
//               {portfolioData.personal?.location && (
//                 <div className="flex items-center justify-center text-gray-300 mb-6">
//                   <MapPin className="w-4 h-4 mr-1" />
//                   <span>{portfolioData.personal.location}</span>
//                 </div>
//               )}
//               {portfolioData.personal?.bio && (
//                 <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
//                   {portfolioData.personal.bio}
//                 </p>
//               )}
//             </div>
    
//             {/* Call to Actions */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
//               <Button 
//                 size="lg" 
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
//                 onClick={() => setCurrentPage('projects')}
//               >
//                 View My Work
//               </Button>
//               <Button 
//                 size="lg" 
//                 variant="outline" 
//                 className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
//                 onClick={() => setCurrentPage('contact')}
//               >
//                 Get In Touch
//               </Button>
//             </div>
    
//             {/* Social Links */}
//             {portfolioData.personal?.socialLinks && portfolioData.personal.socialLinks.length > 0 && (
//               <div className="flex justify-center space-x-6">
//                 {portfolioData.personal.socialLinks.map((link, index) => (
//                   <a
//                     key={index}
//                     href={link.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-300 hover:text-white transition-colors duration-200"
//                   >
//                     {getSocialIcon(link.platform)}
//                   </a>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       );
    
//       // About Page
//       const AboutPage = () => (
//         <div className="min-h-screen pt-20 pb-12 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 About Me
//               </h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 Passionate about creating exceptional digital experiences
//               </p>
//             </div>
    
//             <div className="grid lg:grid-cols-2 gap-12 mb-16">
//               {/* Bio Section */}
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-6">My Story</h3>
//                 {portfolioData.personal?.bio && (
//                   <p className="text-gray-600 leading-relaxed mb-6">
//                     {portfolioData.personal.bio}
//                   </p>
//                 )}
//                 <div className="space-y-4">
//                   {portfolioData.personal?.email && (
//                     <div>
//                       <span className="font-semibold text-gray-900">Email: </span>
//                       <span className="text-gray-600">{portfolioData.personal.email}</span>
//                     </div>
//                   )}
//                   {portfolioData.personal?.phone && (
//                     <div>
//                       <span className="font-semibold text-gray-900">Phone: </span>
//                       <span className="text-gray-600">{portfolioData.personal.phone}</span>
//                     </div>
//                   )}
//                   {portfolioData.personal?.languages && portfolioData.personal.languages.length > 0 && (
//                     <div>
//                       <span className="font-semibold text-gray-900">Languages: </span>
//                       <span className="text-gray-600">{portfolioData.personal.languages.join(', ')}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
    
//               {/* Stats Section */}
//               {portfolioData.stats && (
//                 <div className="grid grid-cols-2 gap-6">
//                   {Object.entries(portfolioData.stats).map(([key, value], index) => (
//                     <Card key={index} className="text-center p-6">
//                       <CardContent className="p-0">
//                         <div className="text-3xl font-bold text-blue-600 mb-2">
//                           {value}
//                         </div>
//                         <div className="text-sm text-gray-600 capitalize">
//                           {key.replace(/([A-Z])/g, ' $1').trim()}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </div>
    
//             {/* Skills Section */}
//             {portfolioData.skills && (
//               <div className="space-y-12">
//                 {/* Technical Skills */}
//                 {portfolioData.skills.technical && portfolioData.skills.technical.length > 0 && (
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-8">Technical Skills</h3>
//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {portfolioData.skills.technical.map((skill, index) => (
//                         <Card key={index} className="p-6">
//                           <CardContent className="p-0">
//                             <div className="flex justify-between items-center mb-3">
//                               <h4 className="font-semibold text-gray-900">{skill.name}</h4>
//                               <span className="text-sm text-gray-600">{skill.level}%</span>
//                             </div>
//                             <Progress value={skill.level} className="mb-2" />
//                             <div className="flex justify-between text-sm text-gray-500">
//                               <span>{skill.category}</span>
//                               {skill.years && <span>{skill.years} years</span>}
//                             </div>
//                           </CardContent>
//                         </Card>
//                       ))}
//                     </div>
//                   </div>
//                 )}
    
//                 {/* Design Skills */}
//                 {portfolioData.skills.design && portfolioData.skills.design.length > 0 && (
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-8">Design Skills</h3>
//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {portfolioData.skills.design.map((skill, index) => (
//                         <Card key={index} className="p-6">
//                           <CardContent className="p-0">
//                             <div className="flex justify-between items-center mb-3">
//                               <h4 className="font-semibold text-gray-900">{skill.name}</h4>
//                               <span className="text-sm text-gray-600">{skill.level}%</span>
//                             </div>
//                             <Progress value={skill.level} className="mb-2" />
//                             <div className="flex justify-between text-sm text-gray-500">
//                               <span>{skill.category}</span>
//                               {skill.years && <span>{skill.years} years</span>}
//                             </div>
//                           </CardContent>
//                         </Card>
//                       ))}
//                     </div>
//                   </div>
//                 )}
    
//                 {/* Soft Skills */}
//                 {portfolioData.skills.soft && portfolioData.skills.soft.length > 0 && (
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-8">Soft Skills</h3>
//                     <div className="flex flex-wrap gap-3">
//                       {portfolioData.skills.soft.map((skill, index) => (
//                         <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
//                           {skill.name} - {skill.level}%
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       );
    
//       // Projects Page
//       const ProjectsPage = () => (
//         <div className="min-h-screen pt-20 pb-12 bg-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Featured Projects
//               </h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 A showcase of my recent work and technical expertise
//               </p>
//             </div>
    
//             {portfolioData.projects && portfolioData.projects.length > 0 && (
//               <div className="grid md:grid-cols-2 gap-8 mb-16">
//                 {portfolioData.projects.map((project, index) => (
//                   <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                     {project.image && (
//                       <div className="relative h-48 overflow-hidden">
//                         <Image
//                           src={project.image}
//                           alt={project.title}
//                           fill
//                           className="object-cover hover:scale-105 transition-transform duration-300"
//                         />
//                       </div>
//                     )}
//                     <CardHeader>
//                       <div className="flex justify-between items-start mb-2">
//                         <CardTitle className="text-xl">{project.title}</CardTitle>
//                         {project.year && <span className="text-sm text-gray-500">{project.year}</span>}
//                       </div>
//                       <CardDescription className="text-gray-600">
//                         {project.description}
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       {project.role && (
//                         <div className="mb-4">
//                           <p className="text-sm text-gray-600 mb-2">
//                             <span className="font-semibold">Role:</span> {project.role}
//                           </p>
//                         </div>
//                       )}
                      
//                       {project.features && project.features.length > 0 && (
//                         <div className="mb-4">
//                           <p className="text-sm font-semibold text-gray-900 mb-2">Key Features:</p>
//                           <ul className="text-sm text-gray-600 space-y-1">
//                             {project.features.map((feature, idx) => (
//                               <li key={idx} className="flex items-center">
//                                 <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
//                                 {feature}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
                      
//                       {project.technologies && project.technologies.length > 0 && (
//                         <div className="flex flex-wrap gap-2 mb-4">
//                           {project.technologies.map((tech, techIndex) => (
//                             <Badge key={techIndex} variant="outline" className="text-xs">
//                               {tech}
//                             </Badge>
//                           ))}
//                         </div>
//                       )}
    
//                       <div className="flex gap-3">
//                         {project.link && (
//                           <Button asChild size="sm" className="flex-1">
//                             <a href={project.link} target="_blank" rel="noopener noreferrer">
//                               <ExternalLink className="w-4 h-4 mr-2" />
//                               Live Demo
//                             </a>
//                           </Button>
//                         )}
//                         {project.github && (
//                           <Button asChild variant="outline" size="sm" className="flex-1">
//                             <a href={project.github} target="_blank" rel="noopener noreferrer">
//                               <Github className="w-4 h-4 mr-2" />
//                               Code
//                             </a>
//                           </Button>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
    
//             {/* Achievements Section */}
//             {portfolioData.achievements && portfolioData.achievements.length > 0 && (
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Achievements</h3>
//                 <div className="grid md:grid-cols-2 gap-6">
//                   {portfolioData.achievements.map((achievement, index) => (
//                     <Card key={index} className="p-6">
//                       <CardContent className="p-0">
//                         <div className="flex justify-between items-start mb-2">
//                           <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
//                           {achievement.year && <span className="text-sm text-gray-500">{achievement.year}</span>}
//                         </div>
//                         {achievement.issuer && <p className="text-sm text-blue-600 mb-2">{achievement.issuer}</p>}
//                         {achievement.description && <p className="text-sm text-gray-600">{achievement.description}</p>}
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       );
    
//       // Resume Page
//       const ResumePage = () => (
//         <div className="min-h-screen pt-20 pb-12 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Resume
//               </h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
//                 My professional journey and educational background
//               </p>
//               {portfolioData.resume && (
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   {portfolioData.resume.downloadUrl && (
//                     <Button asChild className="bg-blue-600 hover:bg-blue-700">
//                       <a href={portfolioData.resume.downloadUrl} target="_blank" rel="noopener noreferrer">
//                         <Download className="w-4 h-4 mr-2" />
//                         Download Resume
//                       </a>
//                     </Button>
//                   )}
//                   {portfolioData.resume.onlineVersion && (
//                     <Button asChild variant="outline">
//                       <a href={portfolioData.resume.onlineVersion} target="_blank" rel="noopener noreferrer">
//                         <ExternalLink className="w-4 h-4 mr-2" />
//                         View Online
//                       </a>
//                     </Button>
//                   )}
//                 </div>
//               )}
//             </div>
    
//             <div className="grid lg:grid-cols-2 gap-12">
//               {/* Experience Section */}
//               {portfolioData.experience && portfolioData.experience.length > 0 && (
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-8">Professional Experience</h3>
//                   <div className="space-y-6">
//                     {portfolioData.experience.map((job, index) => (
//                       <Card key={index} className="p-6">
//                         <CardHeader className="p-0 mb-4">
//                           <div className="flex justify-between items-start mb-2">
//                             <CardTitle className="text-lg">{job.position}</CardTitle>
//                             <Badge variant={job.current ? "default" : "secondary"}>
//                               {job.current ? "Current" : "Previous"}
//                             </Badge>
//                           </div>
//                           {job.company && (
//                             <CardDescription className="text-blue-600 font-semibold mb-1">
//                               {job.company}
//                             </CardDescription>
//                           )}
//                           <div className="flex items-center text-sm text-gray-500 space-x-4">
//                             {job.startDate && (
//                               <div className="flex items-center">
//                                 <Calendar className="w-4 h-4 mr-1" />
//                                 {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : 'Present'}
//                               </div>
//                             )}
//                             {job.location && (
//                               <div className="flex items-center">
//                                 <MapPin className="w-4 h-4 mr-1" />
//                                 {job.location}
//                               </div>
//                             )}
//                           </div>
//                         </CardHeader>
//                         <CardContent className="p-0">
//                           {job.description && <p className="text-gray-600 mb-4">{job.description}</p>}
//                           {job.responsibilities && job.responsibilities.length > 0 && (
//                             <div className="mb-4">
//                               <h4 className="font-semibold text-gray-900 mb-2">Key Responsibilities:</h4>
//                               <ul className="space-y-1">
//                                 {job.responsibilities.map((responsibility, idx) => (
//                                   <li key={idx} className="text-sm text-gray-600 flex items-start">
//                                     <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
//                                     {responsibility}
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                           )}
//                           {job.technologies && job.technologies.length > 0 && (
//                             <div className="flex flex-wrap gap-2">
//                               {job.technologies.map((tech, techIdx) => (
//                                 <Badge key={techIdx} variant="outline" className="text-xs">
//                                   {tech}
//                                 </Badge>
//                               ))}
//                             </div>
//                           )}
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//               )}
    
//               {/* Education & Certifications */}
//               <div className="space-y-12">
//                 {/* Education */}
//                 {portfolioData.education && portfolioData.education.length > 0 && (
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-8">Education</h3>
//                     <div className="space-y-6">
//                       {portfolioData.education.map((edu, index) => (
//                         <Card key={index} className="p-6">
//                           <CardHeader className="p-0 mb-4">
//                             <CardTitle className="text-lg">{edu.degree}</CardTitle>
//                             {edu.institution && (
//                               <CardDescription className="text-blue-600 font-semibold mb-1">
//                                 {edu.institution}
//                               </CardDescription>
//                             )}
//                             <div className="flex items-center text-sm text-gray-500 space-x-4">
//                               {edu.startDate && edu.endDate && (
//                                 <div className="flex items-center">
//                                   <Calendar className="w-4 h-4 mr-1" />
//                                   {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
//                                 </div>
//                               )}
//                               {edu.location && (
//                                 <div className="flex items-center">
//                                   <MapPin className="w-4 h-4 mr-1" />
//                                   {edu.location}
//                                 </div>
//                               )}
//                             </div>
//                           </CardHeader>
//                           <CardContent className="p-0">
//                             {edu.description && <p className="text-gray-600 mb-2">{edu.description}</p>}
//                             {edu.gpa && (
//                               <p className="text-sm text-gray-500">GPA: {edu.gpa}/4.0</p>
//                             )}
//                           </CardContent>
//                         </Card>
//                       ))}
//                     </div>
//                   </div>
//                 )}
    
//                 {/* Certifications */}
//                 {portfolioData.certifications && portfolioData.certifications.length > 0 && (
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-8">Certifications</h3>
//                     <div className="space-y-4">
//                       {portfolioData.certifications.map((cert, index) => (
//                         <Card key={index} className="p-6">
//                           <CardContent className="p-0">
//                             <div className="flex justify-between items-start mb-2">
//                               <h4 className="font-semibold text-gray-900">{cert.name}</h4>
//                               {cert.url && (
//                                 <Button asChild variant="ghost" size="sm">
//                                   <a href={cert.url} target="_blank" rel="noopener noreferrer">
//                                     <ExternalLink className="w-4 h-4" />
//                                   </a>
//                                 </Button>
//                               )}
//                             </div>
//                             {cert.issuer && <p className="text-sm text-blue-600 mb-1">{cert.issuer}</p>}
//                             <div className="text-sm text-gray-500">
//                               {cert.date && <p>Issued: {formatDate(cert.date)}</p>}
//                               {cert.expiration && <p>Expires: {formatDate(cert.expiration)}</p>}
//                               {cert.credentialId && <p>ID: {cert.credentialId}</p>}
//                             </div>
//                           </CardContent>
//                         </Card>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       );
    
//       // Contact Page
//       const ContactPage = () => (
//         <div className="min-h-screen pt-20 pb-12 bg-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Get In Touch
//               </h2>
//               {portfolioData.contact?.availability && (
//                 <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                   {portfolioData.contact.availability}
//                 </p>
//               )}
//             </div>
    
//             <div className="grid lg:grid-cols-2 gap-12">
//               {/* Contact Information */}
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
//                 <div className="space-y-6 mb-8">
//                   {portfolioData.contact?.email && (
//                     <div className="flex items-start space-x-4">
//                       <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                         <Mail className="w-6 h-6 text-blue-600" />
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
//                         <p className="text-gray-600">{portfolioData.contact.email}</p>
//                       </div>
//                     </div>
//                   )}
    
//                   {portfolioData.contact?.phone && (
//                     <div className="flex items-start space-x-4">
//                       <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                         <Phone className="w-6 h-6 text-blue-600" />
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
//                         <p className="text-gray-600">{portfolioData.contact.phone}</p>
//                       </div>
//                     </div>
//                   )}
    
//                   {portfolioData.contact?.address && (
//                     <div className="flex items-start space-x-4">
//                       <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                         <MapPin className="w-6 h-6 text-blue-600" />
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
//                         <p className="text-gray-600">{portfolioData.contact.address}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
    
//                 {/* Availability Status */}
//                 {portfolioData.availability && (
//                   <Card className="bg-green-50 border-green-200">
//                     <CardHeader>
//                       <CardTitle className="text-lg text-green-800">Availability Status</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-2">
//                         <div className="flex justify-between">
//                           <span className="text-green-700">Freelance:</span>
//                           <span className="text-green-800 font-semibold">
//                             {portfolioData.availability.freelance ? 'Available' : 'Not Available'}
//                           </span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-green-700">Full-time:</span>
//                           <span className="text-green-800 font-semibold">
//                             {portfolioData.availability.forHire ? 'Available' : 'Not Available'}
//                           </span>
//                         </div>
//                         {portfolioData.availability.noticePeriod && (
//                           <div className="flex justify-between">
//                             <span className="text-green-700">Notice Period:</span>
//                             <span className="text-green-800 font-semibold">
//                               {portfolioData.availability.noticePeriod}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 )}
//               </div>
    
//               {/* Contact Form */}
//               {portfolioData.contact?.formEnabled && (
//                 <div>
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Send Me a Message</CardTitle>
//                       <CardDescription>
//                         I'll get back to you as soon as possible
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="space-y-2">
//                           <Label htmlFor="name">Name *</Label>
//                           <Input
//                             id="name"
//                             name="name"
//                             type="text"
//                             required
//                             placeholder="Your Name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                           />
//                         </div>
    
//                         <div className="space-y-2">
//                           <Label htmlFor="email">Email *</Label>
//                           <Input
//                             id="email"
//                             name="email"
//                             type="email"
//                             required
//                             placeholder="Your Email"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                           />
//                         </div>
    
//                         <div className="space-y-2">
//                           <Label htmlFor="message">Message *</Label>
//                           <Textarea
//                             id="message"
//                             name="message"
//                             required
//                             placeholder="Your Message"
//                             rows={6}
//                             value={formData.message}
//                             onChange={handleInputChange}
//                           />
//                         </div>
    
//                         <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
//                           <Send className="w-4 h-4 mr-2" />
//                           Send Message
//                         </Button>
//                       </form>
//                     </CardContent>
//                   </Card>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       );
    
//       // Footer Component
//       const FooterComponent = () => (
//         <footer className="bg-gray-900 text-white py-12">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center">
//               {portfolioData.personal?.name && (
//                 <h3 className="text-2xl font-bold mb-4">{portfolioData.personal.name}</h3>
//               )}
//               {portfolioData.personal?.bio && (
//                 <p className="text-gray-400 mb-6 max-w-md mx-auto">
//                   {portfolioData.personal.bio}
//                 </p>
//               )}
              
//               {/* Social Links */}
//               {portfolioData.personal?.socialLinks && portfolioData.personal.socialLinks.length > 0 && (
//                 <div className="flex justify-center space-x-6 mb-8">
//                   {portfolioData.personal.socialLinks.map((link, index) => (
//                     <a
//                       key={index}
//                       href={link.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-gray-400 hover:text-white transition-colors duration-200"
//                     >
//                       {getSocialIcon(link.platform)}
//                     </a>
//                   ))}
//                 </div>
//               )}
    
//               <div className="border-t border-gray-800 pt-8">
//                 <p className="text-gray-400 text-sm">
//                   © {new Date().getFullYear()} {portfolioData.personal?.name || 'Portfolio'}. All rights reserved.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </footer>
//       );
    
//       // Main render function
//       const renderCurrentPage = () => {
//         switch (currentPage) {
//           case 'home':
//             return <HomePage />;
//           case 'about':
//             return <AboutPage />;
//           case 'projects':
//             return <ProjectsPage />;
//           case 'resume':
//             return <ResumePage />;
//           case 'contact':
//             return <ContactPage />;
//           default:
//             return <HomePage />;
//         }
//       };
    
//       return (
//         <div className="min-h-screen">
//           <Navigation />
//           {renderCurrentPage()}
//           <FooterComponent />
//         </div>
//       );
//     }
// `;
//     await fsl.writeFile(path.join(tempDir, 'pages', 'index.js'), pageContent);

//     // 3. Add basic package.json
//     const packageJson = {
//       name: 'custom-portfolio',
//       version: '1.0.0',
//       scripts: { dev: 'next dev', build: 'next build', start: 'next start' },
//       dependencies: { next: 'latest', react: 'latest', 'react-dom': 'latest' }
//     };
//     await fsl.writeJSON(path.join(tempDir, 'package.json'), packageJson, { spaces: 2 });

//     // 4. Add vercel config
//     await fsl.writeJSON(path.join(tempDir, 'vercel.json'), {
//       version: 2,
//       builds: [{ src: "pages/index.js", use: "@vercel/next" }]
//     });

//     // 5. Run `npm install`
//     await execPromise(`npm install`, { cwd: tempDir });

//     // 6. Run Vercel deploy (Assumes you have already linked project/token)
//     const deployCommand = `npx vercel --cwd ${tempDir} --token=${process.env.VERCEL_TOKEN} --prod --confirm`;
//     const { stdout } = await execPromise(deployCommand);

//     const deployedUrlMatch = stdout.match(/https:\/\/[^\s]+\.vercel\.app/);
//     const deployedUrl = deployedUrlMatch ? deployedUrlMatch[0] : null;

//     if (!deployedUrl) throw new Error('Failed to extract URL');

//     res.status(200).json({ success: true, url: deployedUrl });
//   } catch (err) {
//     console.error('Deployment Error:', err);
//     res.status(500).json({ error: err.message });
//   } finally {
//     // Optionally delete tempDir after deploy
//     // await fs.remove(tempDir);
//   }
// });

// // Utility to promisify exec
// function execPromise(command, options = {}) {
//   return new Promise((resolve, reject) => {
//     exec(command, options, (err, stdout, stderr) => {
//       if (err) return reject(stderr || err);
//       resolve({ stdout, stderr });
//     });
//   });
// }

router.post("/deploy", async (req, res) => {
    try {
        console.log("Request received");
        
        const userData = req.body;
        if (!userData) {
            return res.status(400).send("No data provided");
        }

        const filePath = "/home/mohmmedshamil/projects/myWorks/resume/resumepilotBE/portfolio/app/portfolioData.js";
        const newContent = `export const portfolioData = ${JSON.stringify(userData, null, 2)};\n`;
        
        fs.writeFileSync(filePath, newContent, "utf8");
        console.log("File updated successfully");

        const projectDir = "/home/mohmmedshamil/projects/myWorks/resume/resumepilotBE/portfolio";
        
        console.log("Attempting deployment...");
        exec(
            `cd ${projectDir} && vercel --prod --confirm`,
            { maxBuffer: 1024 * 1024 * 5 }, // Increase buffer if needed
            (error, stdout, stderr) => {
                console.log("STDOUT:", stdout);
                console.error("STDERR:", stderr); // Use console.error for stderr
                
                if (error) {
                    console.error(`Deploy error: ${error}`);
                    return res.status(500).json({ 
                        success: false, 
                        error: error.message,
                        stderr: stderr.toString()
                    });
                }
                
                const urlMatch = stdout.match(/https:\/\/[^\s]+\.vercel\.app/);
                const siteUrl = urlMatch ? urlMatch[0] : null;
                
                if (siteUrl) {
                    console.log("Deployment successful at:", siteUrl);
                    return res.json({ success: true, url: siteUrl });
                } else {
                    console.warn("Could not find deployment URL in output");
                    return res.status(500).json({ 
                        success: false, 
                        message: "Deploy succeeded but URL not found",
                        stdout: stdout.toString()
                    });
                }
            }
        );
    } catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ 
            success: false, 
            error: err.message 
        });
    }
});

export default router;
