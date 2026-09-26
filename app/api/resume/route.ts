import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "resume.pdf");

  if (!fs.existsSync(filePath)) {
    return new Response("Resume not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new Response(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="John_Kamau_Resume.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
