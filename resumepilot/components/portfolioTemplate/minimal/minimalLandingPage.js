
'use client';
import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Download, 
  Phone, 
  Send, 
  Calendar,
  Home,
  User,
  FolderOpen,
  FileText,
  MessageCircle,
  Star,
  Award,
  Briefcase
} from 'lucide-react';

export default function Portfolio({ portfolioData }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'GitHub': return <Github className="w-5 h-5" />;
      case 'LinkedIn': return <Linkedin className="w-5 h-5" />;
      default: return <Mail className="w-5 h-5" />;
    }
  };

  // Styles object for better organization
  const styles = {
    glassMorphism: "backdrop-blur-xl bg-white/10 border border-white/20",
    glassMorphismDark: "backdrop-blur-xl bg-slate-900/80 border border-white/10",
    glassMorphismCard: "backdrop-blur-lg bg-white/80 border border-white/30 shadow-xl",
    gradient: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    gradientText: "bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent",
    button: "px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105",
    buttonPrimary: "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-2xl hover:shadow-amber-500/25",
    buttonSecondary: "backdrop-blur-lg bg-white/20 border border-white/30 text-white hover:bg-white/30",
    card: "backdrop-blur-lg bg-white/90 border border-white/40 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:transform hover:scale-[1.02]",
    input: "w-full px-6 py-4 rounded-xl backdrop-blur-lg bg-white/80 border border-white/30 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300",
    textarea: "w-full px-6 py-4 rounded-xl backdrop-blur-lg bg-white/80 border border-white/30 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 resize-none"
  };

  // Navigation Component
  const Navigation = () => (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${styles.glassMorphismDark} shadow-2xl transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">
                {portfolioData.personal?.name?.charAt(0) || 'P'}
              </span>
            </div>
            <span className="text-white font-bold text-xl tracking-wide">
              {portfolioData.personal?.name?.split(' ')[0] || 'Portfolio'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg transform scale-105'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center w-full text-left px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  // Home Page
  const HomePage = () => (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${styles.gradient}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Background Image Overlay */}
      {(
        <div className="absolute inset-0 z-0">
          <img 
            src="/landingPageBg.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/60 to-slate-900/80"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-12">
          {portfolioData.personal?.avatar && (
            <div className="relative w-40 h-40 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <img
                src={portfolioData.personal.avatar}
                alt={portfolioData.personal.name || 'Profile'}
                className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
              />
            </div>
          )}
          
          {portfolioData.meta?.name && (
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Hello, I'm </span>
              <span className={styles.gradientText}>{portfolioData.meta.name.split(' ')[0]}</span>
            </h1>
          )}
          
          {portfolioData.meta?.title && (
            <p className="text-xl md:text-3xl mb-4 text-white/90 font-light">
              {portfolioData.meta.title}
            </p>
          )}
          
          {portfolioData.personal?.location && (
            <div className="flex items-center justify-center text-white/70 mb-8">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{portfolioData.personal.location}</span>
            </div>
          )}
          
          {portfolioData.personal?.bio && (
            <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed">
              {portfolioData.personal.bio}
            </p>
          )}
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <button 
            onClick={() => setCurrentPage('projects')}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            <FolderOpen className="w-5 h-5 mr-3" />
            View My Work
          </button>
          <button 
            onClick={() => setCurrentPage('contact')}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Get In Touch
          </button>
        </div>

        {/* Social Links */}
        {portfolioData.personal?.socialLinks && portfolioData.personal.socialLinks.length > 0 && (
          <div className="flex justify-center space-x-6">
            {portfolioData.personal.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-all duration-300 hover:transform hover:scale-110 hover:shadow-xl"
              >
                {getSocialIcon(link.platform)}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // About Page
  const AboutPage = () => (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            About <span className={styles.gradientText}>Me</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Passionate about creating exceptional digital experiences that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Bio Section */}
          <div className={`${styles.card} p-8`}>
            <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
              <User className="w-8 h-8 mr-3 text-amber-500" />
              My Story
            </h3>
            {portfolioData.personal?.bio && (
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                {portfolioData.personal.bio}
              </p>
            )}
            <div className="space-y-6">
              {portfolioData.personal?.email && (
                <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <Mail className="w-6 h-6 mr-4 text-blue-600" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Email</span>
                    <span className="text-slate-600">{portfolioData.personal.email}</span>
                  </div>
                </div>
              )}
              {portfolioData.personal?.phone && (
                <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                  <Phone className="w-6 h-6 mr-4 text-green-600" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Phone</span>
                    <span className="text-slate-600">{portfolioData.personal.phone}</span>
                  </div>
                </div>
              )}
              {portfolioData.personal?.languages && portfolioData.personal.languages.length > 0 && (
                <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100">
                  <Star className="w-6 h-6 mr-4 text-purple-600" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Languages</span>
                    <span className="text-slate-600">{portfolioData.personal.languages.join(', ')}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Section */}
          {portfolioData.stats && (
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(portfolioData.stats).map(([key, value], index) => (
                <div key={index} className={`${styles.card} p-8 text-center group`}>
                  <div className="text-4xl font-bold mb-4">
                    <span className={styles.gradientText}>{value}</span>
                  </div>
                  <div className="text-slate-600 font-medium capitalize leading-tight">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills Section */}
        {portfolioData.skills && (
          <div className="space-y-16">
            {/* Technical Skills */}
            {portfolioData.skills.technical && portfolioData.skills.technical.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                  Technical <span className={styles.gradientText}>Skills</span>
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {portfolioData.skills.technical.map((skill, index) => (
                    <div key={index} className={`${styles.card} p-6 group`}>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-900 text-lg">{skill.name}</h4>
                        <span className="text-amber-600 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
                        <div 
                          className="bg-gradient-to-r from-amber-500 to-orange-600 h-3 rounded-full transition-all duration-1000 delay-200"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-slate-500">
                        <span className="px-3 py-1 bg-slate-100 rounded-full">{skill.category}</span>
                        {skill.years && <span className="font-medium">{skill.years} years</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Design Skills */}
            {portfolioData.skills.design && portfolioData.skills.design.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                  Design <span className={styles.gradientText}>Skills</span>
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {portfolioData.skills.design.map((skill, index) => (
                    <div key={index} className={`${styles.card} p-6`}>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-900 text-lg">{skill.name}</h4>
                        <span className="text-amber-600 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-1000 delay-300"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-slate-500">
                        <span className="px-3 py-1 bg-slate-100 rounded-full">{skill.category}</span>
                        {skill.years && <span className="font-medium">{skill.years} years</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Soft Skills */}
            {portfolioData.skills.soft && portfolioData.skills.soft.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                  Soft <span className={styles.gradientText}>Skills</span>
                </h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {portfolioData.skills.soft.map((skill, index) => (
                    <div key={index} className="px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full border border-slate-300 hover:from-amber-50 hover:to-orange-50 hover:border-amber-300 transition-all duration-300 hover:transform hover:scale-105">
                      <span className="font-semibold text-slate-700">{skill.name}</span>
                      <span className="ml-2 text-amber-600 font-bold">{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Projects Page
  const ProjectsPage = () => (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-white to-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Featured <span className={styles.gradientText}>Projects</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work and technical expertise
          </p>
        </div>

        {portfolioData.projects && portfolioData.projects.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {portfolioData.projects.map((project, index) => (
              <div key={index} className={`${styles.card} overflow-hidden group`}>
                {project.image && (
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-slate-900">{project.title}</h3>
                    {project.year && (
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm font-semibold">
                        {project.year}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {project.role && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <span className="font-semibold text-blue-900">Role: </span>
                      <span className="text-blue-700">{project.role}</span>
                    </div>
                  )}
                  
                  {project.features && project.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center">
                        <Star className="w-5 h-5 mr-2 text-amber-500" />
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-slate-600">
                            <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all duration-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex-1 ${styles.button} ${styles.buttonPrimary} flex items-center justify-center text-center`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-4 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements Section */}
        {portfolioData.achievements && portfolioData.achievements.length > 0 && (
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              <Award className="w-8 h-8 inline mr-3 text-amber-500" />
              Achievements
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {portfolioData.achievements.map((achievement, index) => (
                <div key={index} className={`${styles.card} p-8`}>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-slate-900 text-lg">{achievement.title}</h4>
                    {achievement.year && (
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm font-semibold">
                        {achievement.year}
                      </span>
                    )}
                  </div>
                  {achievement.issuer && (
                    <p className="text-amber-600 font-semibold mb-3">{achievement.issuer}</p>
                  )}
                  {achievement.description && (
                    <p className="text-slate-600 leading-relaxed">{achievement.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Resume Page
  const ResumePage = () => (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            My <span className={styles.gradientText}>Resume</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            My professional journey and educational background
          </p>
          {portfolioData.resume && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {portfolioData.resume.downloadUrl && (
                <a 
                  href={portfolioData.resume.downloadUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${styles.button} ${styles.buttonPrimary} flex items-center justify-center`}
                >
                  <Download className="w-5 h-5 mr-3" />
                  Download Resume
                </a>
              )}
              {portfolioData.resume.onlineVersion && (
                <a 
                  href={portfolioData.resume.onlineVersion} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:border-slate-400 hover:bg-slate-100 transition-all duration-300 flex items-center justify-center"
                >
                  <ExternalLink className="w-5 h-5 mr-3" />
                  View Online
                </a>
              )}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience Section */}
          {portfolioData.experience && portfolioData.experience.length > 0 && (
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-12 flex items-center">
                <Briefcase className="w-8 h-8 mr-3 text-amber-500" />
                Professional Experience
              </h3>
              <div className="space-y-8">
                {portfolioData.experience.map((job, index) => (
                  <div key={index} className={`${styles.card} p-8`}>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold text-slate-900">{job.position}</h4>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        job.current 
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' 
                          : 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700'
                      }`}>
                        {job.current ? "Current" : "Previous"}
                      </span>
                    </div>
                    {job.company && (
                      <p className="text-amber-600 font-bold text-lg mb-3">{job.company}</p>
                    )}
                    <div className="flex flex-wrap items-center text-sm text-slate-500 space-x-6 mb-6">
                      {job.startDate && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : 'Present'}
                        </div>
                      )}
                      {job.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {job.location}
                        </div>
                      )}
                    </div>
                    
                    {job.description && (
                      <p className="text-slate-600 mb-6 leading-relaxed">{job.description}</p>
                    )}
                    
                    {job.responsibilities && job.responsibilities.length > 0 && (
                      <div className="mb-6">
                        <h5 className="font-bold text-slate-900 mb-3">Key Responsibilities:</h5>
                        <ul className="space-y-2">
                          {job.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="text-slate-600 flex items-start">
                              <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {job.technologies && job.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, techIdx) => (
                          <span key={techIdx} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-slate-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education & Certifications */}
          <div className="space-y-16">
            {/* Education */}
            {portfolioData.education && portfolioData.education.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-12">Education</h3>
                <div className="space-y-8">
                  {portfolioData.education.map((edu, index) => (
                    <div key={index} className={`${styles.card} p-8`}>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{edu.degree}</h4>
                      {edu.institution && (
                        <p className="text-amber-600 font-bold text-lg mb-3">{edu.institution}</p>
                      )}
                      <div className="flex flex-wrap items-center text-sm text-slate-500 space-x-6 mb-4">
                        {edu.startDate && edu.endDate && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                          </div>
                        )}
                        {edu.location && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {edu.location}
                          </div>
                        )}
                      </div>
                      {edu.description && (
                        <p className="text-slate-600 mb-4 leading-relaxed">{edu.description}</p>
                      )}
                      {edu.gpa && (
                        <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-semibold">
                          GPA: {edu.gpa}/4.0
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {portfolioData.certifications && portfolioData.certifications.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-12">Certifications</h3>
                <div className="space-y-6">
                  {portfolioData.certifications.map((cert, index) => (
                    <div key={index} className={`${styles.card} p-6`}>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-slate-900 text-lg">{cert.name}</h4>
                        {cert.url && (
                          <a 
                            href={cert.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-600 transition-colors duration-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      {cert.issuer && (
                        <p className="text-amber-600 font-semibold mb-3">{cert.issuer}</p>
                      )}
                      <div className="text-sm text-slate-500 space-y-1">
                        {cert.date && <p>Issued: {formatDate(cert.date)}</p>}
                        {cert.expiration && <p>Expires: {formatDate(cert.expiration)}</p>}
                        {cert.credentialId && <p>ID: {cert.credentialId}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Contact Page
  const ContactPage = () => (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-white to-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Get In <span className={styles.gradientText}>Touch</span>
          </h2>
          {portfolioData.contact?.availability && (
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {portfolioData.contact.availability}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-12">Contact Information</h3>
            <div className="space-y-6 mb-12">
              {portfolioData.contact?.email && (
                <div className="flex items-start space-x-6 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">Email</h4>
                    <p className="text-slate-600 text-lg">{portfolioData.contact.email}</p>
                  </div>
                </div>
              )}

              {portfolioData.contact?.phone && (
                <div className="flex items-start space-x-6 p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">Phone</h4>
                    <p className="text-slate-600 text-lg">{portfolioData.contact.phone}</p>
                  </div>
                </div>
              )}

              {portfolioData.contact?.address && (
                <div className="flex items-start space-x-6 p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">Address</h4>
                    <p className="text-slate-600 text-lg">{portfolioData.contact.address}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Availability Status */}
            {portfolioData.availability && (
              <div className={`${styles.card} p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200`}>
                <h4 className="text-2xl font-bold text-green-800 mb-6">Availability Status</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-green-700 font-medium">Freelance:</span>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      portfolioData.availability.freelance 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {portfolioData.availability.freelance ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700 font-medium">Full-time:</span>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      portfolioData.availability.forHire 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {portfolioData.availability.forHire ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                  {portfolioData.availability.noticePeriod && (
                    <div className="flex justify-between items-center">
                      <span className="text-green-700 font-medium">Notice Period:</span>
                      <span className="text-green-800 font-bold">
                        {portfolioData.availability.noticePeriod}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          {portfolioData.contact?.formEnabled && (
            <div className={`${styles.card} p-8`}>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Send Me a Message</h3>
              <p className="text-slate-600 mb-8 text-lg">
                I'll get back to you as soon as possible
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-900 mb-3">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-3">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-slate-900 mb-3">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Your Message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.textarea}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`w-full ${styles.button} ${styles.buttonPrimary} flex items-center justify-center text-lg`}
                >
                  <Send className="w-5 h-5 mr-3" />
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Footer Component
  const FooterComponent = () => (
    <footer className={`${styles.gradient} text-white py-16`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          {portfolioData.personal?.name && (
            <h3 className="text-3xl font-bold mb-6">{portfolioData.personal.name}</h3>
          )}
          {portfolioData.personal?.bio && (
            <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              {portfolioData.personal.bio}
            </p>
          )}
          
          {/* Social Links */}
          {portfolioData.personal?.socialLinks && portfolioData.personal.socialLinks.length > 0 && (
            <div className="flex justify-center space-x-6 mb-12">
              {portfolioData.personal.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-all duration-300 hover:transform hover:scale-110 hover:shadow-xl"
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          )}

          <div className="border-t border-white/20 pt-8">
            <p className="text-white/60">
              © {new Date().getFullYear()} {portfolioData.personal?.name || 'Portfolio'}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

  // Main render function
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'resume':
        return <ResumePage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      {renderCurrentPage()}
      <FooterComponent />
    </div>
  );
}