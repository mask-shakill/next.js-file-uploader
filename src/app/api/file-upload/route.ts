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
