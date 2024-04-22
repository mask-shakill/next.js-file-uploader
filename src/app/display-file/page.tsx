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
