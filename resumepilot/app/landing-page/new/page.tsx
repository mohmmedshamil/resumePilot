"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MinimalLandingPage from "../../../components/portfolioTemplate/minimal/minimalLandingPage";
import CreativePortfolio from "../../../components/portfolioTemplate/creative/page";
import PremiumLandingPage from "../../../components/portfolioTemplate/premium/page";
import { egdata } from "./egdata";
import ResumeUploader from "./resumeUploader"
import {
    ArrowLeft,
    Globe,
    Palette,
    Layout,
    Eye,
    Download,
    Share,
    Settings,
    Sparkles,
    Monitor,
    Smartphone,
    Tablet,
    Crown,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { apiService } from "@/services/apiService";
import DeployStatusModal from "./deployStatusModel";

export default function LandingPageBuilder() {
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [selectedResume, setSelectedResume] = useState("");
    const [egdata, setEgData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [customization, setCustomization] = useState({
        primaryColor: "#3B82F6",
        backgroundColor: "#000000",
        textColor: "#ffffff",
        subdomain: "",
        customDomain: "",
    });
    const [previewMode, setPreviewMode] = useState("desktop");

    useEffect(() => {
        const fetchResume = async () => {
          try {
            const res = await apiService.getResumeDetails();
            console.log("res", res)
            setEgData(res.data.extractedData); // assuming response has this shape
          } catch (error) {
            console.error("Error fetching resume data:", error);
          }
        };
      
        fetchResume();
      }, []);

      const deployPortfolio = async () => {
        const res = await apiService.deployPortfolio(egdata);
        return res?.data;
      };
    

    const templates = [
        {
            id: "minimal",
            name: "Minimal Professional",
            description: "Clean and elegant design perfect for any profession",
            preview:
                "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400",
            isPro: false,
            features: ["Responsive Design", "Contact Form", "Social Links"],
        },
        {
            id: "creative",
            name: "Creative Portfolio",
            description:
                "Vibrant and dynamic layout for creative professionals",
            preview:
                "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400",
            isPro: true,
            features: ["Portfolio Gallery", "Animations", "Custom Sections"],
        },
        {
            id: "executive",
            name: "Executive Elite",
            description: "Sophisticated design for senior professionals",
            preview:
                "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400",
            isPro: true,
            features: ["Timeline View", "Testimonials", "Analytics"],
        },
    ];

    const resumes = [
        {
            id: "1",
            title: "Software Engineer Resume",
            lastModified: "2024-01-15",
        },
        { id: "2", title: "Full Stack Developer", lastModified: "2024-01-10" },
    ];

    const colorOptions = [
        "#3B82F6",
        "#8B5CF6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#6366F1",
    ];

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
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
                                <h1 className="text-lg font-semibold">
                                    Landing Page Builder
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Transform your resume into a stunning
                                    website
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="flex border rounded-lg p-1">
                                <Button
                                    variant={
                                        previewMode === "desktop"
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    onClick={() => setPreviewMode("desktop")}
                                >
                                    <Monitor className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant={
                                        previewMode === "tablet"
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    onClick={() => setPreviewMode("tablet")}
                                >
                                    <Tablet className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant={
                                        previewMode === "mobile"
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    onClick={() => setPreviewMode("mobile")}
                                >
                                    <Smartphone className="w-4 h-4" />
                                </Button>
                            </div>
                            <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                            </Button>
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                            >
                                <Globe className="w-4 h-4 mr-2" />
                                Publish
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Configuration Panel */}
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={fadeIn}
                        className="lg:col-span-1 space-y-6"
                    >
                        <Tabs defaultValue="template" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="template">
                                    Template
                                </TabsTrigger>
                                <TabsTrigger value="customize">
                                    Customize
                                </TabsTrigger>
                                <TabsTrigger value="settings">
                                    Settings
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="template" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Layout className="w-5 h-5 mr-2 text-orange-600" />
                                            Choose Template
                                        </CardTitle>
                                        <CardDescription>
                                            Select a template for your landing
                                            page
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {templates.map((template) => (
                                            <div
                                                key={template.id}
                                                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                                    selectedTemplate ===
                                                    template.id
                                                        ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                                                        : "border-gray-200 hover:border-gray-300"
                                                }`}
                                                onClick={() =>
                                                    setSelectedTemplate(
                                                        template.id
                                                    )
                                                }
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-medium">
                                                            {template.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            {
                                                                template.description
                                                            }
                                                        </p>
                                                    </div>
                                                    {template.isPro && (
                                                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                                                            <Crown className="w-3 h-3 mr-1" />
                                                            Pro
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded mb-2 overflow-hidden">
                                                    <img
                                                        src={template.preview}
                                                        alt={template.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {template.features.map(
                                                        (feature, index) => (
                                                            <Badge
                                                                key={index}
                                                                variant="secondary"
                                                                className="text-xs"
                                                            >
                                                                {feature}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <ResumeUploader setEgData={setEgData} />

                            </TabsContent>

                            <TabsContent
                                value="customize"
                                className="space-y-6"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Palette className="w-5 h-5 mr-2 text-purple-600" />
                                            Customization
                                        </CardTitle>
                                        <CardDescription>
                                            Personalize your landing page design
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="bg-color">
                                                    Background Color
                                                </Label>
                                                <Input
                                                    id="bg-color"
                                                    type="color"
                                                    value={
                                                        customization.backgroundColor
                                                    }
                                                    onChange={(e) =>
                                                        setCustomization(
                                                            (prev) => ({
                                                                ...prev,
                                                                backgroundColor:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        )
                                                    }
                                                    className="h-10"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="text-color">
                                                    Text Color
                                                </Label>
                                                <Input
                                                    id="text-color"
                                                    type="color"
                                                    value={
                                                        customization.textColor
                                                    }
                                                    onChange={(e) =>
                                                        setCustomization(
                                                            (prev) => ({
                                                                ...prev,
                                                                textColor:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        )
                                                    }
                                                    className="h-10"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="custom-color">
                                                Custom Color
                                            </Label>
                                            <Input
                                                id="custom-color"
                                                type="color"
                                                value={
                                                    customization.primaryColor
                                                }
                                                onChange={(e) =>
                                                    setCustomization(
                                                        (prev) => ({
                                                            ...prev,
                                                            primaryColor:
                                                                e.target.value,
                                                        })
                                                    )
                                                }
                                                className="h-10"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-medium">
                                                Typography
                                            </h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {[
                                                    "Inter",
                                                    "Poppins",
                                                    "Roboto",
                                                    "Open Sans",
                                                ].map((font) => (
                                                    <button
                                                        key={font}
                                                        className="p-2 text-left border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                                                        style={{
                                                            fontFamily: font,
                                                        }}
                                                    >
                                                        {font}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-medium">
                                                Layout Options
                                            </h4>
                                            <div className="space-y-2">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded"
                                                    />
                                                    <span className="text-sm">
                                                        Show contact form
                                                    </span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded"
                                                    />
                                                    <span className="text-sm">
                                                        Include testimonials
                                                    </span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded"
                                                    />
                                                    <span className="text-sm">
                                                        Add portfolio section
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="settings" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Settings className="w-5 h-5 mr-2 text-gray-600" />
                                            Publishing Settings
                                        </CardTitle>
                                        <CardDescription>
                                            Configure your landing page URL and
                                            settings
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div>
                                            <Label htmlFor="subdomain">
                                                Subdomain
                                            </Label>
                                            <div className="flex mt-1">
                                                <Input
                                                    id="subdomain"
                                                    placeholder="yourname"
                                                    value={
                                                        customization.subdomain
                                                    }
                                                    onChange={(e) =>
                                                        setCustomization(
                                                            (prev) => ({
                                                                ...prev,
                                                                subdomain:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        )
                                                    }
                                                    className="rounded-r-none"
                                                />
                                                <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 rounded-r-md text-sm text-gray-500">
                                                    .resumepilot.com
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="custom-domain">
                                                Custom Domain (Pro)
                                            </Label>
                                            <Input
                                                id="custom-domain"
                                                placeholder="www.yourname.com"
                                                value={
                                                    customization.customDomain
                                                }
                                                onChange={(e) =>
                                                    setCustomization(
                                                        (prev) => ({
                                                            ...prev,
                                                            customDomain:
                                                                e.target.value,
                                                        })
                                                    )
                                                }
                                                disabled
                                                className="mt-1"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Upgrade to Pro to use your own
                                                domain
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-medium">
                                                SEO Settings
                                            </h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <Label htmlFor="meta-title">
                                                        Page Title
                                                    </Label>
                                                    <Input
                                                        id="meta-title"
                                                        placeholder="John Doe - Software Engineer"
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="meta-description">
                                                        Meta Description
                                                    </Label>
                                                    <Input
                                                        id="meta-description"
                                                        placeholder="Experienced software engineer specializing in..."
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-medium">
                                                Analytics
                                            </h4>
                                            <div className="space-y-2">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded"
                                                        defaultChecked
                                                    />
                                                    <span className="text-sm">
                                                        Enable visitor tracking
                                                    </span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded"
                                                    />
                                                    <span className="text-sm">
                                                        Google Analytics (Pro)
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </motion.div>

                    {/* Preview Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-2"
                    >
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Live Preview</CardTitle>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="outline">
                                            {previewMode}
                                        </Badge>
                                        <Button variant="outline" size="sm">
                                            <Share className="w-4 h-4 mr-2" />
                                            Share Preview
                                        </Button>
                                    </div>
                                </div>
                                <CardDescription>
                                    See how your landing page will look to
                                    visitors
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className={`mx-auto bg-white dark:bg-gray-900 border rounded-lg overflow-auto ${
                                        previewMode === "desktop"
                                            ? "w-full h-96"
                                            : previewMode === "tablet"
                                            ? "w-2/3 h-96"
                                            : "w-80 h-96"
                                    }`}
                                >
                                    {selectedTemplate && egdata ? (
                                        <>
                                            {selectedTemplate ===
                                                "executive" && (
                                                <PremiumLandingPage
                                                    portfolioData={egdata}
                                                    customization={{
                                                        backgroundColor:
                                                            customization.backgroundColor,
                                                        textColor:
                                                            customization.textColor,
                                                        accentColor:
                                                            customization.primaryColor,
                                                    }}
                                                />
                                            )}

                                            {selectedTemplate === "minimal" && (
                                                <MinimalLandingPage
                                                    portfolioData={egdata}
                                                    customization={{
                                                        backgroundColor:
                                                            customization.backgroundColor,
                                                        textColor:
                                                            customization.textColor,
                                                        accentColor:
                                                            customization.primaryColor,
                                                    }}
                                                />
                                            )}

                                            {selectedTemplate ===
                                                "creative" && (
                                                <CreativePortfolio
                                                    portfolioData={egdata}
                                                    customization={{
                                                        backgroundColor:
                                                            customization.backgroundColor,
                                                        textColor:
                                                            customization.textColor,
                                                        accentColor:
                                                            customization.primaryColor,
                                                    }}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-gray-500">
                                            <div className="text-center space-y-4">
                                                <Globe className="w-16 h-16 mx-auto opacity-50" />
                                                <div>
                                                    <h3 className="font-semibold">
                                                        Select Template & Resume
                                                    </h3>
                                                    <p className="text-sm">
                                                        Choose a template and
                                                        resume to see the
                                                        preview
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-8 flex justify-center space-x-4"
                >
                    <Button variant="outline" size="lg">
                        <Download className="w-4 h-4 mr-2" />
                        Save Draft
                    </Button>
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                        onClick={() => setShowModal(true)}
                        disabled={!selectedTemplate || !egdata}
                    >
                        <Globe className="w-4 h-4 mr-2" />
                        Publish Landing Page
                    </Button>
                </motion.div>
            </div>
            {showModal && <DeployStatusModal deployFunction={deployPortfolio} />}

        </div>
    );
}
