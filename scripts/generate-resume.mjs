import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Palette
  const primaryColor = rgb(15 / 255, 23 / 255, 42 / 255); // Slate 900
  const emeraldColor = rgb(16 / 255, 185 / 255, 129 / 255); // Emerald 500
  const mutedColor = rgb(100 / 255, 116 / 255, 139 / 255); // Slate 500
  const darkColor = rgb(51 / 255, 65 / 255, 85 / 255); // Slate 700
  const lineColor = rgb(226 / 255, 232 / 255, 240 / 255); // Slate 200

  let y = height - 48;
  const margin = 48;

  // Header
  page.drawText("JOHN KAMAU", {
    x: margin,
    y,
    size: 24,
    font: fontBold,
    color: primaryColor,
  });

  y -= 16;
  page.drawText("FULL-STACK SOFTWARE ENGINEER & SYSTEMS ARCHITECT", {
    x: margin,
    y,
    size: 10,
    font: fontBold,
    color: emeraldColor,
  });

  y -= 16;
  const contactText =
    "Nairobi, Kenya  •  desarixpowell@gmail.com  •  linkedin.com/in/john-powell-39b295379  •  github.com/Mantra2226";
  page.drawText(contactText, {
    x: margin,
    y,
    size: 8.5,
    font: fontRegular,
    color: mutedColor,
  });

  y -= 14;
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 1,
    color: lineColor,
  });

  // Section Helper
  function drawSectionTitle(title) {
    y -= 22;
    page.drawText(title.toUpperCase(), {
      x: margin,
      y,
      size: 11,
      font: fontBold,
      color: primaryColor,
    });
    y -= 5;
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.8,
      color: lineColor,
    });
    y -= 12;
  }

  // Summary
  drawSectionTitle("Professional Summary");
  const summaryLines = [
    "Full-Stack Software Engineer with dedicated expertise in distributed backend systems, event-driven architectures,",
    "and responsive modern web applications. Proven track record building production-grade IoT telemetry platforms,",
    "e-commerce marketplaces with Safaricom Daraja M-Pesa automated payouts, and resilient microservices.",
  ];
  for (const line of summaryLines) {
    page.drawText(line, {
      x: margin,
      y,
      size: 9,
      font: fontRegular,
      color: darkColor,
    });
    y -= 13;
  }

  // Technical Skills
  drawSectionTitle("Technical Capabilities");
  const skillCategories = [
    { label: "Languages:", text: "Python, TypeScript, JavaScript, Go (Golang), SQL, Bash" },
    { label: "Frameworks & Runtimes:", text: "Next.js (App Router), React, FastAPI, Django, Node.js, Express, Tailwind CSS" },
    { label: "Databases & Cache:", text: "PostgreSQL, TimescaleDB, Redis, SQLite" },
    { label: "Cloud & Infrastructure:", text: "Docker, Linux / Unix, Git & GitHub Actions, RESTful APIs, GraphQL" },
    { label: "Specialized Integrations:", text: "Safaricom Daraja 2.0 (M-Pesa STK Push), IoT Telemetry, Webhooks, Microservices" },
  ];

  for (const item of skillCategories) {
    page.drawText(item.label, {
      x: margin,
      y,
      size: 8.5,
      font: fontBold,
      color: primaryColor,
    });
    page.drawText(item.text, {
      x: margin + 140,
      y,
      size: 8.5,
      font: fontRegular,
      color: darkColor,
    });
    y -= 13;
  }

  // Flagship Engineering Projects
  drawSectionTitle("Flagship Engineering Projects");

  const projects = [
    {
      title: "Smart Poultry — Comprehensive IoT Telemetry & Farm Management Platform",
      stack: "Python • Django / FastAPI • PostgreSQL • Edge IoT Sensor Telemetry",
      points: [
        "Engineered an automated farm telemetry system tracking real-time brooder ambient temperature, humidity, and feed consumption.",
        "Integrated threshold alerting via push notifications and SMS, cutting mortality rates during brooding cycles by 35%.",
        "Architected historical sensor telemetry storage and analytics dashboards for flock growth curve modeling.",
      ],
    },
    {
      title: "Market Mtaani — Rural Business Hub & Direct Artisan Marketplace",
      stack: "Python • Django • Safaricom Daraja 2.0 M-Pesa STK • PostgreSQL",
      points: [
        "Built a digital exchange linking smallholder farmers and rural artisans directly with regional buyers, cutting out middlemen.",
        "Engineered automated mobile escrow checkout using Safaricom Daraja 2.0 M-Pesa STK push with idempotent webhook verification.",
        "Designed mobile-responsive web storefronts optimized for 3G mobile devices with low-bandwidth image payloads.",
      ],
    },
    {
      title: "Django Enterprise ERP & Core Architecture Modules (djangosystem)",
      stack: "Python • Django REST Framework • PostgreSQL • Docker",
      points: [
        "Developed a modular ERP core supporting role-based access control (RBAC), multi-tenant schemas, and audit logs.",
        "Optimized database indexes and query prefetching, achieving sub-40ms response times on high-concurrency API endpoints.",
        "Packaged complete CI/CD pipelines with automated unit testing and containerized Docker deployments.",
      ],
    },
    {
      title: "High-Performance URL Shortener & Analytics Gateway",
      stack: "Python • FastAPI • Redis • REST API",
      points: [
        "Designed a high-throughput URL hashing and redirection service with in-memory Redis caching.",
        "Integrated real-time click analytics, geographic IP breakdown, and rate limiting per client API token.",
      ],
    },
  ];

  for (const proj of projects) {
    page.drawText(proj.title, {
      x: margin,
      y,
      size: 9.5,
      font: fontBold,
      color: primaryColor,
    });
    y -= 11;
    page.drawText(proj.stack, {
      x: margin,
      y,
      size: 8,
      font: fontOblique,
      color: emeraldColor,
    });
    y -= 11;

    for (const pt of proj.points) {
      page.drawText("•", {
        x: margin + 6,
        y,
        size: 8,
        font: fontBold,
        color: emeraldColor,
      });
      page.drawText(pt, {
        x: margin + 18,
        y,
        size: 8.5,
        font: fontRegular,
        color: darkColor,
      });
      y -= 11.5;
    }
    y -= 3;
  }

  // Education
  drawSectionTitle("Education & Continuous Learning");
  page.drawText("Software Engineering & Distributed Systems Development", {
    x: margin,
    y,
    size: 9.5,
    font: fontBold,
    color: primaryColor,
  });
  page.drawText("Nairobi, Kenya", {
    x: width - margin - 80,
    y,
    size: 8.5,
    font: fontRegular,
    color: mutedColor,
  });
  y -= 12;
  page.drawText("Focus on Backend Architecture, Data Modeling, API Design, and Cloud Native Deployments.", {
    x: margin,
    y,
    size: 8.5,
    font: fontRegular,
    color: darkColor,
  });

  const pdfBytes = await pdfDoc.save();
  const publicDir = path.resolve("./public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(path.join(publicDir, "resume.pdf"), pdfBytes);
  console.log("Resume PDF generated successfully at public/resume.pdf!");
}

generateResume().catch(console.error);
