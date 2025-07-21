"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    FileText,
    CheckCircle,
    MessageSquare,
    Globe,
    Plus,
    Crown,
    Eye,
    Download,
    BarChart3,
    Calendar,
    Star,
    Brain,
    Target,
    Sparkles,
    ArrowRight,
    TrendingUp,
    Users,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";

export default function Dashboard() {
    const { user } = useAuth();
    console.log("user", user);

    const [stats] = useState({
        resumeViews: 0,
        atsScore: 0,
        coverLetters: 0,
        landingPages: 0,
    });

    const [resumes] = useState([
        {
            id: 1,
            title: "Software Engineer Resume",
            lastModified: "2024-01-15",
            status: "Complete",
            atsScore: 85,
        },
        {
            id: 2,
            title: "Full Stack Developer",
            lastModified: "2024-01-10",
            status: "Draft",
            atsScore: 72,
        },
    ]);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    const features = [
        {
            icon: Brain,
            title: "AI Resume Builder",
            description:
                "Create professional resumes with AI-powered content generation",
            href: "/resume/new",
            color: "from-blue-500 to-blue-600",
            stats: "2 resumes created",
            isNew: false,
        },
        {
            icon: Target,
            title: "ATS Compatibility Checker",
            description: "Optimize your resume for Applicant Tracking Systems",
            href: "/ats/check",
            color: "from-green-500 to-green-600",
            stats: "85% average score",
            isNew: false,
        },
        {
            icon: MessageSquare,
            title: "Cover Letter Generator",
            description:
                "Generate personalized cover letters for any job application",
            href: "/cover-letter/new",
            color: "from-purple-500 to-purple-600",
            stats: "3 letters generated",
            isNew: false,
        },
        {
            icon: Globe,
            title: "Landing Page Builder",
            description:
                "Transform your resume into a stunning personal website",
            href: "/landing-page/new",
            color: "from-orange-500 to-orange-600",
            stats: "1 page created",
            isNew: true,
        },
        {
            icon: BarChart3,
            title: "Resume Analytics",
            description: "Track views, downloads, and performance metrics",
            href: "/analytics",
            color: "from-indigo-500 to-indigo-600",
            stats: "1,247 total views",
            isNew: true,
        },
        {
            icon: FileText,
            title: "Resume Editor",
            description: "Advanced editing tools with real-time preview",
            href: "/resume/editor",
            color: "from-teal-500 to-teal-600",
            stats: "Auto-save enabled",
            isNew: false,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <div className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                            >
                                ResumePilot
                            </Link>
                            <Badge variant="secondary">Dashboard</Badge>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                                <AvatarFallback>
                                    {user?.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="text-sm font-medium">
                                    {user?.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {user?.plan} Plan
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={{
                        animate: { transition: { staggerChildren: 0.1 } },
                    }}
                    className="space-y-8"
                >
                    {/* Welcome Section */}
                    {user && (
                        <motion.div variants={fadeIn}>
                            <h1 className="text-3xl font-bold mb-2">
                                Welcome back, {user?.name}!
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Ready to take your career to the next level?
                                Explore our powerful AI-driven tools below.
                            </p>
                        </motion.div>
                    )}

                    {/* Quick Stats */}
                    <motion.div variants={fadeIn}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    title: "Resume Views",
                                    value: stats.resumeViews,
                                    icon: Eye,
                                    color: "blue",
                                    change: "+12%",
                                },
                                {
                                    title: "ATS Score",
                                    value: `${stats.atsScore}%`,
                                    icon: Target,
                                    color: "green",
                                    change: "+5%",
                                },
                                {
                                    title: "Cover Letters",
                                    value: stats.coverLetters,
                                    icon: MessageSquare,
                                    color: "purple",
                                    change: "+2",
                                },
                                {
                                    title: "Landing Pages",
                                    value: stats.landingPages,
                                    icon: Globe,
                                    color: "orange",
                                    change: "New!",
                                },
                            ].map((stat, index) => (
                                <Card
                                    key={index}
                                    className="hover:shadow-lg transition-shadow"
                                >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {stat.title}
                                        </CardTitle>
                                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {stat.value}
                                        </div>
                                        <div className="flex items-center text-xs text-green-600">
                                            <TrendingUp className="w-3 h-3 mr-1" />
                                            {stat.change}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div variants={fadeIn}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">
                                Your AI-Powered Toolkit
                            </h2>
                            <Badge variant="outline" className="text-xs">
                                <Sparkles className="w-3 h-3 mr-1" />
                                All features included
                            </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden">
                                        {feature.isNew && (
                                            <div className="absolute top-3 right-3 z-10">
                                                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                                                    New
                                                </Badge>
                                            </div>
                                        )}
                                        <Link href={feature.href}>
                                            <CardHeader>
                                                <div
                                                    className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                                                >
                                                    <feature.icon className="w-6 h-6 text-white" />
                                                </div>
                                                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                                                    {feature.title}
                                                </CardTitle>
                                                <CardDescription className="text-sm">
                                                    {feature.description}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">
                                                        {feature.stats}
                                                    </span>
                                                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </CardContent>
                                        </Link>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Plan Status */}
                    {user?.plan === "Free" && (
                        <motion.div variants={fadeIn}>
                            <Card className="border-2 border-dashed border-purple-300 dark:border-purple-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="flex items-center">
                                                <Crown className="w-5 h-5 text-purple-600 mr-2" />
                                                Unlock Premium Features
                                            </CardTitle>
                                            <CardDescription>
                                                Get unlimited access to all
                                                tools, premium templates, and
                                                priority support
                                            </CardDescription>
                                        </div>
                                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                            Upgrade to Pro
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span className="text-sm">
                                                Unlimited resumes
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span className="text-sm">
                                                Advanced ATS checks
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span className="text-sm">
                                                Premium templates
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Free Plan Usage</span>
                                            <span>1/1 Resumes</span>
                                        </div>
                                        <Progress value={100} className="h-2" />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Recent Activity */}
                    <motion.div variants={fadeIn}>
                        <Tabs defaultValue="resumes" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="resumes">
                                    Recent Resumes
                                </TabsTrigger>
                                <TabsTrigger value="ats">
                                    ATS Reports
                                </TabsTrigger>
                                <TabsTrigger value="cover-letters">
                                    Cover Letters
                                </TabsTrigger>
                                <TabsTrigger value="analytics">
                                    Analytics
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="resumes" className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">
                                        Your Resumes
                                    </h3>
                                    <Button
                                        asChild
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                    >
                                        <Link href="/resume/new">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create New Resume
                                        </Link>
                                    </Button>
                                </div>

                                <div className="grid gap-4">
                                    {resumes.map((resume) => (
                                        <Card
                                            key={resume.id}
                                            className="hover:shadow-lg transition-shadow"
                                        >
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <CardTitle className="text-lg">
                                                            {resume.title}
                                                        </CardTitle>
                                                        <CardDescription>
                                                            Last modified:{" "}
                                                            {new Date(
                                                                resume.lastModified
                                                            ).toLocaleDateString()}
                                                        </CardDescription>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Badge
                                                            variant={
                                                                resume.status ===
                                                                "Complete"
                                                                    ? "default"
                                                                    : "secondary"
                                                            }
                                                        >
                                                            {resume.status}
                                                        </Badge>
                                                        <Badge
                                                            variant="outline"
                                                            className="flex items-center"
                                                        >
                                                            <Star className="w-3 h-3 mr-1" />
                                                            {resume.atsScore}%
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/resume/${resume.id}`}
                                                        >
                                                            <Eye className="w-4 h-4 mr-2" />
                                                            View
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/resume/${resume.id}/edit`}
                                                        >
                                                            <FileText className="w-4 h-4 mr-2" />
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <Download className="w-4 h-4 mr-2" />
                                                        Download
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="ats" className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">
                                        ATS Compatibility Reports
                                    </h3>
                                    <Button
                                        asChild
                                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                                    >
                                        <Link href="/ats/check">
                                            <Target className="w-4 h-4 mr-2" />
                                            Run ATS Check
                                        </Link>
                                    </Button>
                                </div>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            {[
                                                {
                                                    resume: "Software Engineer Resume",
                                                    score: 85,
                                                    date: "2024-01-15",
                                                    status: "Good",
                                                    improvement: "+5%",
                                                },
                                                {
                                                    resume: "Full Stack Developer",
                                                    score: 72,
                                                    date: "2024-01-10",
                                                    status: "Needs Work",
                                                    improvement: "New",
                                                },
                                            ].map((check, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <div>
                                                        <div className="font-medium">
                                                            {check.resume}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Checked on{" "}
                                                            {new Date(
                                                                check.date
                                                            ).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <Badge
                                                            variant={
                                                                check.score >=
                                                                80
                                                                    ? "default"
                                                                    : "secondary"
                                                            }
                                                        >
                                                            {check.status}
                                                        </Badge>
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold">
                                                                {check.score}%
                                                            </div>
                                                            <div className="text-xs text-green-600">
                                                                {
                                                                    check.improvement
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent
                                value="cover-letters"
                                className="space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">
                                        Generated Cover Letters
                                    </h3>
                                    <Button
                                        asChild
                                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                                    >
                                        <Link href="/cover-letter/new">
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Generate New Letter
                                        </Link>
                                    </Button>
                                </div>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            {[
                                                {
                                                    title: "Software Engineer at TechCorp",
                                                    date: "2024-01-15",
                                                    status: "Generated",
                                                    words: 245,
                                                },
                                                {
                                                    title: "Full Stack Developer at StartupXYZ",
                                                    date: "2024-01-10",
                                                    status: "Generated",
                                                    words: 198,
                                                },
                                                {
                                                    title: "Frontend Developer at WebCo",
                                                    date: "2024-01-05",
                                                    status: "Generated",
                                                    words: 267,
                                                },
                                            ].map((letter, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <div>
                                                        <div className="font-medium">
                                                            {letter.title}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Created on{" "}
                                                            {new Date(
                                                                letter.date
                                                            ).toLocaleDateString()}{" "}
                                                            • {letter.words}{" "}
                                                            words
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Badge variant="default">
                                                            {letter.status}
                                                        </Badge>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <Eye className="w-4 h-4 mr-2" />
                                                            View
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent
                                value="analytics"
                                className="space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">
                                        Performance Analytics
                                    </h3>
                                    <Button variant="outline" size="sm">
                                        <BarChart3 className="w-4 h-4 mr-2" />
                                        View Full Report
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Total Views
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                1,247
                                            </div>
                                            <div className="flex items-center text-xs text-green-600">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                +12% this week
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Downloads
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                89
                                            </div>
                                            <div className="flex items-center text-xs text-green-600">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                +8% this week
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Profile Visits
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                156
                                            </div>
                                            <div className="flex items-center text-xs text-green-600">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                +15% this week
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
