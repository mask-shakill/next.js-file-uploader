import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileName: String,
  title: String,
});

const FileModel = mongoose.models.File || mongoose.model("File", fileSchema);

export default FileModel;
