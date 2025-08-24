import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import pool from "./db.js";
// import pdfParse from "pdf-parse";

const router = Router();

const DEST_DIR = "uploads/resume";
fs.mkdirSync(DEST_DIR, { recursive: true });
// const MD_DIR = "uploads/resume_md"; // where we’ll save .md files
// fs.mkdirSync(MD_DIR, { recursive: true });

// Multer storage: keep PDFs in /uploads/resumes
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, DEST_DIR),
  filename: (req, file, cb) => {
    const userId = req?.user?.user_id;
    if (!userId) return cb(new Error("Missing authenticated user"));

    const dest = path.resolve("uploads/resume");
    const filename = `${userId}.pdf`;

    // Remove old resume if it exists so we overwrite cleanly
    try {
      fs.unlinkSync(path.join(dest, filename));
    } catch (_) {
      /* ignore if not present */
    }

    cb(null, filename);
  },
});

// File filter: PDF only
function pdfOnly(req, file, cb) {
  if (file.mimetype === "application/pdf") return cb(null, true);
  cb(new Error("Only PDF files are allowed"));
}

const upload = multer({
  storage,
  fileFilter: pdfOnly,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// function textToMarkdown(text) {
//   const lines = text.split(/\r?\n/).map((l) => l.replace(/\s+$/, ""));

//   const out = [];
//   for (let raw of lines) {
//     const line = raw.trim();
//     if (!line) {
//       out.push("");
//       continue;
//     }

//     // bullets
//     if (/^([•\-\u2013\u2022])\s+/.test(line)) {
//       out.push("- " + line.replace(/^([•\-\u2013\u2022])\s+/, ""));
//       continue;
//     }

//     // section headings (common resume sections are all-caps)
//     if (
//       /^[A-Z][A-Z\s/&]+$/.test(line) &&
//       line.length >= 3 &&
//       line.length <= 40
//     ) {
//       out.push(`## ${line}`);
//       continue;
//     }

//     out.push(line);
//   }
//   return out.join("\n").replace(/\n{3,}/g, "\n\n");
// }

// POST /uploads/resume
router.post("/resume", upload.single("resume"), async (req, res) => {
  try {
    const userId = req.user.user_id;
    const url = `/uploads/resume/${userId}.pdf`;

    // Convert the just-saved PDF to Markdown
    // const pdfPath = path.resolve(DEST_DIR, `${userId}.pdf`);
    // let markdownUrl = null;
    // try {
    //   const data = await pdfParse(fs.readFileSync(pdfPath));
    //   const md = textToMarkdown(data.text || "");
    //   const mdPath = path.resolve(MD_DIR, `${userId}.md`);
    //   fs.writeFileSync(mdPath, md, "utf8");
    //   markdownUrl = `/uploads/resume_md/${userId}.md`;
    // } catch (e) {
    //   console.error("Markdown conversion failed:", e.message);
    // }

    // Save URLs on the user record
    // await pool.query(
    //   "UPDATE users SET resume_url = $1, resume_md_url = $2 WHERE user_id = $3",
    //   [url, markdownUrl, userId]
    // );

    // Save URLs on the user record
    await pool.query("UPDATE users SET resume_url = $1 WHERE user_id = $2", [
      url,
      userId,
    ]);

    res.status(201).json({ url, filename: `${userId}.pdf` });
  } catch (err) {
    console.error("Error saving resume URL:", err);
    res.status(500).json({ message: "Failed to save resume URL" });
  }
});

//     res.status(201).json({
//       url,
//       markdown_url: markdownUrl,
//       filename: `${userId}.pdf`,
//       markdown_filename: markdownUrl ? `${userId}.md` : null,
//     });
//   } catch (err) {
//     console.error("Error saving resume URL:", err);
//     res.status(500).json({ message: "Failed to save resume URL" });
//   }
// });

export default router;
