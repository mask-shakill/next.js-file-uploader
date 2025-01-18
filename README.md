# File Upload in Next.js (No Library)

A simple and lightweight Next.js project that demonstrates how to handle file uploads without using any external libraries. This project uses built-in HTML form elements and Next.js API routes to process file uploads on the server-side, offering a customizable and straightforward solution for handling file uploads in web applications.

## Features

- Upload files without using external libraries
- Simple integration with Next.js API routes
- Customizable file upload functionality
- Supports both frontend and backend handling of file uploads

## Technologies Used

- **Next.js** - React framework for building the application
- **HTML5** - For file input field and form handling
- **Node.js (Next.js API Routes)** - Server-side handling of file uploads

## Setup & Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/file-upload-without-library-nextjs.git
   cd next.js-file-uploader
   npm install



## File Upload and store  without third-party library

### Upload/page.tsx
```javascript

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const DisplayFiles: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/file-upload")
      .then((res) => res.json())
      .then((data) => setFiles(data.data))
      .catch((error) => console.error("Error fetching files:", error));
  }, []);
  return (
    <div className="mx-28 mb-20 mt-8">
      <h1 className="font-bold text-2xl">All files</h1>
      <hr />
      <div className="grid grid-cols-5 gap-7 mt-4">
        {files.map((file: any, index: any) => (
          <div key={index} className="flex flex-col gap-y-5">
            <h1>Title {file.title}</h1>
            <Image
              src={`/images/${file.fileName}`}
              width={200}
              height={200}
              alt="hero-image"
            ></Image>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayFiles;
```
### api/file-upload/route.ts
```javascript
import { ConnectDB } from "@/dbConfig/ConnectDB";
import FileModel from "@/models/Files";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    await ConnectDB();
    const data = await req.formData();
    const file = data.get("file");
    const title = data.get("title");
    if (!file) {
      return NextResponse.json({ message: "No file found", success: false });
    }

    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const fileName = file.name; // Extracting file name

    const path = `./public/images/${fileName}`;

    // Save file to server
    await writeFile(path, buffer);

    // Save file data to database with only the file name
    const newFile = new FileModel({ fileName, title });
    await newFile.save();
    console.log(fileName, title);
    return NextResponse.json({ message: "File upload success" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred", success: false });
  }
}

export async function GET() {
  await ConnectDB();
  const data = await FileModel.find();
  return NextResponse.json({ data });
}
```
### display/page.tsx
```javascript 
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const DisplayFiles: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/file-upload")
      .then((res) => res.json())
      .then((data) => setFiles(data.data))
      .catch((error) => console.error("Error fetching files:", error));
  }, []);
  return (
    <div className="mx-28 mb-20 mt-8">
      <h1 className="font-bold text-2xl">All files</h1>
      <hr />
      <div className="grid grid-cols-5 gap-7 mt-4">
        {files.map((file: any, index: any) => (
          <div key={index} className="flex flex-col gap-y-5">
            <h1>Title {file.title}</h1>
            <Image
              src={`/images/${file.fileName}`}
              width={200}
              height={200}
              alt="hero-image"
            ></Image>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayFiles;
