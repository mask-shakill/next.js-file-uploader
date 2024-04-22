"use client";
import React, { useState } from "react";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      console.error("No file selected");
      return;
    }
    const data = new FormData();
    data.set("file", file);
    data.set("title", title);
    try {
      const response = await fetch("api/file-upload", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl mb-4">Upload Image</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChangeTitle}
              placeholder="Enter title"
              className="border border-gray-300 px-4 py-2 w-full rounded-md"
            />
          </div>
          <div>
            <input
              name="file"
              onChange={handleChange}
              type="file"
              className="border border-gray-300 px-4 py-2 w-full rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
