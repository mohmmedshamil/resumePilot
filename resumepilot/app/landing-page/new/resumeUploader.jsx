"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { apiService } from "@/services/apiService";

export default function ResumeUploader(setEgData) {
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setUploadStatus("⏳ Uploading and parsing...");

    try {
      const response = await apiService.uploadResume(formData);
        console.log("response", response)
        setEgData(response.data.parsedJson)
      if (!response.data) throw new Error("Failed to parse file");

    //   setResumeText(data.text);
      setUploadStatus("✅ Resume parsed successfully");
    } catch (err) {
      console.error(err);
      setUploadStatus("❌ Failed to parse resume");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Resume</CardTitle>
        <CardDescription>
          Supports .pdf, .docx, and .txt. We’ll extract the content on the
          server.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition">
          <p className="text-gray-600 dark:text-gray-300">
            Click below to upload your resume
          </p>
          <Input
            type="file"
            accept=".pdf,.docx,.txt"
            className="mt-4"
            onChange={handleFileUpload}
          />
        </div>

        {uploadStatus && (
          <p className="text-sm text-green-600 mt-3">{uploadStatus}</p>
        )}

        {/* {resumeText && (
          <div className="mt-4 p-3 border rounded bg-gray-50 dark:bg-gray-900 text-sm h-48 overflow-y-scroll whitespace-pre-wrap">
            {resumeText}
          </div>
        )} */}
      </CardContent>
    </Card>
  );
}
