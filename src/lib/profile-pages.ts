import type { Locale } from "@/i18n/routing";

export type ProfileStat = {
  value: string;
  label: string;
};

export type ProfileCard = {
  eyebrow: string;
  title: string;
  description: string;
};

export type ProfileRow = {
  label: string;
  title: string;
  description: string;
};

export type ProfileCaseStudy = {
  sector: string;
  title: string;
  description: string;
  outcome: string;
};

export type ProfilePageSlug =
  | "company"
  | "capabilities"
  | "technology"
  | "case-studies"
  | "contact";

export type ProfilePageContent = {
  slug: ProfilePageSlug;
  kicker: string;
  title: string;
  description: string;
  stats: ProfileStat[];
  cardsTitle: string;
  cards: ProfileCard[];
  rowsKicker: string;
  rowsTitle: string;
  rows: ProfileRow[];
  proofKicker: string;
  proofTitle: string;
  proof: ProfileCaseStudy[];
  ctaKicker: string;
  ctaTitle: string;
  ctaBody: string;
  ctaHref: string;
  ctaLabel: string;
};

type ProfilePageMap = Record<ProfilePageSlug, ProfilePageContent>;

const en: ProfilePageMap = {
  company: {
    slug: "company",
    kicker: "Company profile",
    title: "A high-tech AI systems company built around production reality.",
    description:
      "NativeLab AI designs private AI systems for companies that need measurable automation, trustworthy knowledge retrieval, and controlled decision support.",
    stats: [
      { value: "AI-native", label: "Systems designed around model behavior and operations" },
      { value: "Private", label: "Deployment options for governed enterprise data" },
      { value: "Eval-first", label: "Quality gates before broad rollout" },
    ],
    cardsTitle: "What defines the company",
    cards: [
      {
        eyebrow: "Mission",
        title: "Make AI operationally useful",
        description:
          "We build around the work people already do: searching knowledge, preparing decisions, reviewing exceptions, and moving tasks through secure workflows.",
      },
      {
        eyebrow: "Studio model",
        title: "Small expert team, close to the workflow",
        description:
          "Strategy, product design, model engineering, and deployment planning happen together so the system feels native to the company using it.",
      },
      {
        eyebrow: "Standard",
        title: "No demo-only systems",
        description:
          "Every project is shaped around evaluation, data boundaries, escalation paths, monitoring, and ownership after launch.",
      },
    ],
    rowsKicker: "Method",
    rowsTitle: "Company operating model",
    rows: [
      {
        label: "01",
        title: "Business process first",
        description:
          "We map the decision path, users, data permissions, exception handling, and value measurement before choosing a model or agent pattern.",
      },
      {
        label: "02",
        title: "Prototype with production constraints",
        description:
          "The first version already accounts for access control, retrieval quality, logs, feedback, and human review.",
      },
      {
        label: "03",
        title: "Deploy with clear ownership",
        description:
          "We define who owns prompts, datasets, approvals, monitoring, and improvement cycles once the system goes live.",
      },
    ],
    proofKicker: "Proof",
    proofTitle: "Profile signals",
    proof: [
      {
        sector: "Knowledge work",
        title: "Company memory as an AI system",
        description:
          "Connect policies, SOPs, tickets, documents, and operational data into a private knowledge layer.",
        outcome: "Faster internal search with traceable answers.",
      },
      {
        sector: "Operations",
        title: "AI-assisted work preparation",
        description:
          "Agents prepare tasks, draft summaries, route exceptions, and keep people in control of final decisions.",
        outcome: "Lower manual handling without losing oversight.",
      },
    ],
    ctaKicker: "Next step",
    ctaTitle: "Need the detailed capability map?",
    ctaBody:
      "Review the AI systems we design, from knowledge engines to agent operations and evaluation pipelines.",
    ctaHref: "/capabilities",
    ctaLabel: "View capabilities",
  },
  capabilities: {
    slug: "capabilities",
    kicker: "Capabilities",
    title: "AI systems for knowledge, automation, evaluation, and multimodal work.",
    description:
      "The capability stack is designed for teams that need AI to integrate with tools, data, policies, and operator review.",
    stats: [
      { value: "RAG", label: "Private knowledge retrieval and citation-aware answers" },
      { value: "Agents", label: "Tool-calling workflows with human approval points" },
      { value: "Evals", label: "Test sets and scorecards for production behavior" },
    ],
    cardsTitle: "Core services",
    cards: [
      {
        eyebrow: "Knowledge",
        title: "Enterprise RAG systems",
        description:
          "Document ingestion, chunking strategy, embeddings, search quality, source citations, permissions, and feedback loops.",
      },
      {
        eyebrow: "Automation",
        title: "Agentic workflow systems",
        description:
          "Agents reason over tasks, call approved tools, prepare work, and request human approval when risk increases.",
      },
      {
        eyebrow: "Model layer",
        title: "Customization and prompt systems",
        description:
          "Prompt architecture, domain adaptation, fine-tuning strategy, model routing, and reusable evaluation datasets.",
      },
      {
        eyebrow: "Multimodal",
        title: "Document, image, and audio intelligence",
        description:
          "Systems that classify, extract, summarize, and route information from complex operational content.",
      },
    ],
    rowsKicker: "Method",
    rowsTitle: "Delivery pattern",
    rows: [
      {
        label: "Scope",
        title: "Define the narrow high-value workflow",
        description:
          "We identify a process where AI can reduce time, improve consistency, or reveal knowledge hidden across systems.",
      },
      {
        label: "Build",
        title: "Create a production-shaped prototype",
        description:
          "The prototype includes interface, retrieval or agent core, evaluation path, permissions, and handoff behavior.",
      },
      {
        label: "Harden",
        title: "Move from prototype to governed system",
        description:
          "We add monitoring, audit trail, user feedback, fallback paths, and the operating model for continued improvement.",
      },
    ],
    proofKicker: "Proof",
    proofTitle: "Representative work",
    proof: [
      {
        sector: "Compliance",
        title: "Policy knowledge engine",
        description:
          "A secure assistant for policies, controls, and review questions with source-backed answers.",
        outcome: "Reduced search time and clearer review evidence.",
      },
      {
        sector: "Customer operations",
        title: "Support workflow agent",
        description:
          "An agent prepares case summaries, recommends actions, and escalates sensitive cases to staff.",
        outcome: "More consistent handling across repetitive workflows.",
      },
    ],
    ctaKicker: "Next step",
    ctaTitle: "Want to see the system architecture?",
    ctaBody:
      "The technology page explains private deployment, retrieval, agent runtime, observability, and evaluation.",
    ctaHref: "/technology",
    ctaLabel: "View technology",
  },
  technology: {
    slug: "technology",
    kicker: "Technology",
    title: "A private AI architecture for governed enterprise workflows.",
    description:
      "The stack combines retrieval, agent orchestration, model routing, evaluation, observability, and deployment controls.",
    stats: [
      { value: "VPC", label: "Private cloud and controlled deployment patterns" },
      { value: "Audit", label: "Logs and review paths for business-critical flows" },
      { value: "Scorecards", label: "Behavior measured before and after launch" },
    ],
    cardsTitle: "System layers",
    cards: [
      {
        eyebrow: "Data",
        title: "Retrieval and permission layer",
        description:
          "Connect documents, databases, tickets, and knowledge stores while preserving access rules and source traceability.",
      },
      {
        eyebrow: "Runtime",
        title: "Agent orchestration",
        description:
          "Plan tasks, call tools, validate outputs, request approval, and hand off when the workflow requires a person.",
      },
      {
        eyebrow: "Models",
        title: "Model routing and adaptation",
        description:
          "Choose the right model path for cost, latency, accuracy, privacy, and domain-specific behavior.",
      },
      {
        eyebrow: "Control",
        title: "Monitoring and evaluation",
        description:
          "Track quality, latency, hallucination patterns, escalation events, feedback, and regression risk.",
      },
    ],
    rowsKicker: "Method",
    rowsTitle: "Security and governance",
    rows: [
      {
        label: "Private",
        title: "Deployment where the data already lives",
        description:
          "Systems can be designed for VPC, private cloud, or on-premise patterns depending on security and compliance needs.",
      },
      {
        label: "Controlled",
        title: "Human approvals for sensitive actions",
        description:
          "Agent autonomy is bounded by policy, confidence, workflow risk, and explicit approval points.",
      },
      {
        label: "Measured",
        title: "Evaluation before and after launch",
        description:
          "We create test sets, failure taxonomies, and regression checks so production behavior is observable.",
      },
    ],
    proofKicker: "Proof",
    proofTitle: "Architecture patterns",
    proof: [
      {
        sector: "Secure search",
        title: "Permission-aware retrieval",
        description:
          "Users only retrieve content they are allowed to access, while answers keep source context visible.",
        outcome: "Better knowledge access without bypassing governance.",
      },
      {
        sector: "Agent control",
        title: "Approval-gated automation",
        description:
          "Agents can prepare and recommend work while people approve final actions in sensitive workflows.",
        outcome: "Automation speed with operational control.",
      },
    ],
    ctaKicker: "Next step",
    ctaTitle: "Need proof patterns?",
    ctaBody:
      "Explore representative case studies for compliance, operations, research, and commerce teams.",
    ctaHref: "/case-studies",
    ctaLabel: "View case studies",
  },
  "case-studies": {
    slug: "case-studies",
    kicker: "Case studies",
    title: "Representative AI system engagements for real company workflows.",
    description:
      "These patterns show the type of work NativeLab AI is built for: private knowledge, controlled agents, document intelligence, and operational decision support.",
    stats: [
      { value: "4", label: "Representative engagement patterns" },
      { value: "Human review", label: "Approval points kept inside the workflow" },
      { value: "Traceable", label: "Outputs connected to source context and logs" },
    ],
    cardsTitle: "Work examples",
    cards: [
      {
        eyebrow: "Compliance",
        title: "Policy knowledge engine",
        description:
          "A secure search and answer system for controls, policy documents, review notes, and internal guidance.",
      },
      {
        eyebrow: "Operations",
        title: "Customer operations agent",
        description:
          "An agent workflow that prepares case summaries, suggests next actions, and escalates sensitive situations.",
      },
      {
        eyebrow: "Research",
        title: "Document intelligence pipeline",
        description:
          "A pipeline that extracts, compares, summarizes, and routes information from long technical document sets.",
      },
      {
        eyebrow: "Commerce",
        title: "Inventory reasoning copilot",
        description:
          "A decision-support layer that combines product, demand, and operations signals for planning teams.",
      },
    ],
    rowsKicker: "Method",
    rowsTitle: "How every study is evaluated",
    rows: [
      {
        label: "Fit",
        title: "Does AI belong in this workflow?",
        description:
          "We validate that the work has repeatable patterns, useful data, clear users, and measurable value.",
      },
      {
        label: "Risk",
        title: "What can go wrong?",
        description:
          "We document hallucination risk, bad retrieval, over-automation, privacy boundaries, and review requirements.",
      },
      {
        label: "Scale",
        title: "How does it run after launch?",
        description:
          "We define monitoring, ownership, feedback loops, and operating processes before scaling usage.",
      },
    ],
    proofKicker: "Proof",
    proofTitle: "Selected outcomes",
    proof: [
      {
        sector: "Compliance",
        title: "Faster evidence discovery",
        description:
          "Policy answers remain connected to source context, so reviewers can verify instead of starting from scratch.",
        outcome: "Less manual searching during review cycles.",
      },
      {
        sector: "Operations",
        title: "More consistent case preparation",
        description:
          "Agents prepare summaries and recommended next steps using the same business rules across teams.",
        outcome: "Reduced variance in repetitive operational work.",
      },
      {
        sector: "Research",
        title: "Structured document review",
        description:
          "Long documents are extracted into consistent fields, compared, and routed for expert review.",
        outcome: "Specialists spend more time judging, less time sorting.",
      },
    ],
    ctaKicker: "Next step",
    ctaTitle: "Have a workflow that looks similar?",
    ctaBody:
      "Send the process, data sources, users, and risk constraints. We can map the first AI system path.",
    ctaHref: "/contact",
    ctaLabel: "Start a discussion",
  },
  contact: {
    slug: "contact",
    kicker: "Contact",
    title: "Start with the workflow, data boundary, and decision you want to improve.",
    description:
      "The best first conversation is specific: what team owns the process, what data is involved, what decisions need support, and what risk controls are required.",
    stats: [
      { value: "24-48h", label: "Typical response window for new inquiries" },
      { value: "30 min", label: "Initial fit discussion" },
      { value: "4-8 wks", label: "Prototype window for qualified workflows" },
    ],
    cardsTitle: "Contact paths",
    cards: [
      {
        eyebrow: "New project",
        title: "Discuss an AI system",
        description:
          "Share the workflow, users, data sources, current tools, and what a useful first prototype would prove.",
      },
      {
        eyebrow: "Technical review",
        title: "Assess an existing AI initiative",
        description:
          "Bring an existing prototype, RAG system, or agent workflow for evaluation, risk review, and production planning.",
      },
      {
        eyebrow: "Partnership",
        title: "Build with NativeLab AI",
        description:
          "For product teams, consultancies, and operators that need a specialist AI systems partner.",
      },
    ],
    rowsKicker: "Method",
    rowsTitle: "What to include",
    rows: [
      {
        label: "Context",
        title: "The business workflow",
        description:
          "Describe the process, team, user roles, decision points, and where the current work is slow or inconsistent.",
      },
      {
        label: "Data",
        title: "The information boundary",
        description:
          "List the documents, systems, databases, APIs, and privacy constraints the AI system would need to respect.",
      },
      {
        label: "Outcome",
        title: "The first measurable result",
        description:
          "Define what a successful prototype should demonstrate before production planning begins.",
      },
    ],
    proofKicker: "Proof",
    proofTitle: "Engagement fit",
    proof: [
      {
        sector: "Best fit",
        title: "Workflow-specific AI systems",
        description:
          "Private knowledge systems, controlled agents, model evaluation, document intelligence, and operational copilots.",
        outcome: "Strong fit for teams with real data and a clear owner.",
      },
      {
        sector: "Poor fit",
        title: "Generic chatbot requests",
        description:
          "Broad, demo-only chatbot projects without data ownership, workflow context, or production requirements.",
        outcome: "We will narrow the scope before building.",
      },
    ],
    ctaKicker: "Next step",
    ctaTitle: "Send the workflow brief",
    ctaBody:
      "Email the process, data sources, team, and intended outcome. We will respond with the best next step.",
    ctaHref: "mailto:studio@nativelab.ai",
    ctaLabel: "Email NativeLab AI",
  },
};

const th: ProfilePageMap = {
  company: {
    ...en.company,
    kicker: "โปรไฟล์บริษัท",
    title: "บริษัทระบบ AI ไฮเทคที่สร้างขึ้นบนความจริงของโปรดักชัน",
    description:
      "NativeLab AI ออกแบบระบบ AI ส่วนตัวสำหรับองค์กรที่ต้องการ automation ที่วัดผลได้ ระบบค้นคืนความรู้ที่เชื่อถือได้ และ decision support ที่ควบคุมได้",
    stats: [
      { value: "AI-native", label: "ระบบที่ออกแบบจากพฤติกรรมโมเดลและการปฏิบัติงานจริง" },
      { value: "Private", label: "ตัวเลือกติดตั้งสำหรับข้อมูลองค์กรที่ต้องมี governance" },
      { value: "Eval-first", label: "ประตูคุณภาพก่อนขยายการใช้งาน" },
    ],
    cardsTitle: "สิ่งที่นิยามบริษัท",
    cards: [
      {
        eyebrow: "ภารกิจ",
        title: "ทำให้ AI มีประโยชน์ในงานจริง",
        description:
          "เราสร้างระบบรอบงานที่คนทำอยู่แล้ว: ค้นหาความรู้ เตรียมการตัดสินใจ ตรวจข้อยกเว้น และส่งงานผ่าน workflow ที่ปลอดภัย",
      },
      {
        eyebrow: "Studio model",
        title: "ทีมผู้เชี่ยวชาญขนาดเล็ก ใกล้กับ workflow",
        description:
          "กลยุทธ์ product design, model engineering และ deployment planning ทำไปพร้อมกัน เพื่อให้ระบบรู้สึกเป็นส่วนหนึ่งของบริษัทที่ใช้งาน",
      },
      {
        eyebrow: "มาตรฐาน",
        title: "ไม่สร้างระบบที่ดีแค่ตอนเดโม",
        description:
          "ทุกโปรเจกต์ถูกวางรอบ evaluation, data boundaries, escalation paths, monitoring และ ownership หลัง launch",
      },
    ],
    rowsKicker: "วิธีทำงาน",
    rowsTitle: "โมเดลการทำงานของบริษัท",
    rows: [
      {
        label: "01",
        title: "เริ่มจากกระบวนการธุรกิจ",
        description:
          "เราวางแผนเส้นทางการตัดสินใจ ผู้ใช้ สิทธิ์ข้อมูล การจัดการข้อยกเว้น และตัวชี้วัดก่อนเลือกโมเดลหรือรูปแบบ agent",
      },
      {
        label: "02",
        title: "Prototype ด้วยเงื่อนไขของโปรดักชัน",
        description:
          "เวอร์ชันแรกคำนึงถึง access control, retrieval quality, logs, feedback และ human review ตั้งแต่ต้น",
      },
      {
        label: "03",
        title: "Deploy พร้อม ownership ชัดเจน",
        description:
          "เรากำหนดเจ้าของ prompts, datasets, approvals, monitoring และรอบการปรับปรุงหลังระบบใช้งานจริง",
      },
    ],
    proofKicker: "หลักฐาน",
    proofTitle: "สัญญาณของโปรไฟล์บริษัท",
    proof: [
      {
        sector: "Knowledge work",
        title: "ความจำของบริษัทในรูปแบบระบบ AI",
        description:
          "เชื่อมนโยบาย SOPs, tickets, เอกสาร และ operational data เข้าสู่ชั้นความรู้ส่วนตัว",
        outcome: "ค้นหาข้อมูลภายในได้เร็วขึ้นพร้อมคำตอบที่ตรวจแหล่งที่มาได้",
      },
      {
        sector: "Operations",
        title: "AI ช่วยเตรียมงานปฏิบัติการ",
        description:
          "Agents เตรียมงาน สรุปข้อมูล จัดเส้นทางข้อยกเว้น และให้คนควบคุมการตัดสินใจสุดท้าย",
        outcome: "ลดงาน manual โดยไม่เสีย oversight",
      },
    ],
    ctaKicker: "ขั้นต่อไป",
    ctaTitle: "ต้องการดูแผนความสามารถแบบละเอียด?",
    ctaBody:
      "ดูระบบ AI ที่เราออกแบบ ตั้งแต่ knowledge engines ไปจนถึง agent operations และ evaluation pipelines",
    ctaLabel: "ดูความสามารถ",
  },
  capabilities: {
    ...en.capabilities,
    kicker: "ความสามารถ",
    title: "ระบบ AI สำหรับความรู้ automation, evaluation และงาน multimodal",
    description:
      "Capability stack ถูกออกแบบสำหรับทีมที่ต้องการให้ AI เชื่อมกับ tools, data, policies และ operator review",
    stats: [
      { value: "RAG", label: "การค้นคืนความรู้ส่วนตัวพร้อมคำตอบที่อ้างอิงแหล่งที่มา" },
      { value: "Agents", label: "Workflow ที่เรียกใช้เครื่องมือพร้อมจุดอนุมัติจากคน" },
      { value: "Evals", label: "Test sets และ scorecards สำหรับพฤติกรรมใน production" },
    ],
    cardsTitle: "บริการหลัก",
    cards: [
      {
        eyebrow: "Knowledge",
        title: "Enterprise RAG systems",
        description:
          "Document ingestion, chunking strategy, embeddings, search quality, source citations, permissions และ feedback loops",
      },
      {
        eyebrow: "Automation",
        title: "Agentic workflow systems",
        description:
          "Agents วิเคราะห์งาน เรียกใช้ tools ที่อนุมัติ เตรียมงาน และขออนุมัติจากคนเมื่อความเสี่ยงสูงขึ้น",
      },
      {
        eyebrow: "Model layer",
        title: "Customization และ prompt systems",
        description:
          "Prompt architecture, domain adaptation, fine-tuning strategy, model routing และ evaluation datasets ที่นำกลับมาใช้ได้",
      },
      {
        eyebrow: "Multimodal",
        title: "Document, image และ audio intelligence",
        description:
          "ระบบที่จำแนก ดึงข้อมูล สรุป และส่งต่อข้อมูลจาก operational content ที่ซับซ้อน",
      },
    ],
    rowsKicker: "วิธีทำงาน",
    rowsTitle: "รูปแบบการส่งมอบ",
    rows: [
      {
        label: "Scope",
        title: "กำหนด workflow มูลค่าสูงให้แคบและชัด",
        description:
          "เราหากระบวนการที่ AI ลดเวลา เพิ่มความสม่ำเสมอ หรือเปิดความรู้ที่ซ่อนอยู่ในหลายระบบได้จริง",
      },
      {
        label: "Build",
        title: "สร้าง prototype ที่มีรูปทรงของ production",
        description:
          "Prototype มี interface, retrieval หรือ agent core, evaluation path, permissions และ handoff behavior",
      },
      {
        label: "Harden",
        title: "ย้ายจาก prototype สู่ระบบที่มี governance",
        description:
          "เราเพิ่ม monitoring, audit trail, user feedback, fallback paths และ operating model สำหรับการปรับปรุงต่อเนื่อง",
      },
    ],
    proofKicker: "หลักฐาน",
    proofTitle: "งานตัวอย่าง",
    proof: [
      {
        sector: "Compliance",
        title: "Policy knowledge engine",
        description:
          "ผู้ช่วยที่ปลอดภัยสำหรับ policies, controls และคำถามตรวจทาน พร้อมคำตอบที่มีแหล่งอ้างอิง",
        outcome: "ลดเวลาค้นหาและทำให้หลักฐานการตรวจทานชัดขึ้น",
      },
      {
        sector: "Customer operations",
        title: "Support workflow agent",
        description:
          "Agent ที่เตรียม case summaries แนะนำ actions และ escalate เคสละเอียดอ่อนไปยังทีมงาน",
        outcome: "จัดการงานซ้ำได้สม่ำเสมอขึ้น",
      },
    ],
    ctaKicker: "ขั้นต่อไป",
    ctaTitle: "อยากเห็น architecture ของระบบ?",
    ctaBody:
      "หน้าเทคโนโลยีอธิบาย private deployment, retrieval, agent runtime, observability และ evaluation",
    ctaLabel: "ดูเทคโนโลยี",
  },
  technology: {
    ...en.technology,
    kicker: "เทคโนโลยี",
    title: "สถาปัตยกรรม AI ส่วนตัวสำหรับ enterprise workflows ที่มี governance",
    description:
      "Stack รวม retrieval, agent orchestration, model routing, evaluation, observability และ deployment controls",
    stats: [
      { value: "VPC", label: "รูปแบบ private cloud และ controlled deployment" },
      { value: "Audit", label: "Logs และ review paths สำหรับ workflow สำคัญ" },
      { value: "Scorecards", label: "วัดพฤติกรรมก่อนและหลัง launch" },
    ],
    cardsTitle: "ชั้นของระบบ",
    cards: [
      {
        eyebrow: "Data",
        title: "Retrieval และ permission layer",
        description:
          "เชื่อมเอกสาร ฐานข้อมูล tickets และ knowledge stores โดยรักษา access rules และ source traceability",
      },
      {
        eyebrow: "Runtime",
        title: "Agent orchestration",
        description:
          "วางแผนงาน เรียก tools ตรวจผลลัพธ์ ขออนุมัติ และ handoff เมื่อ workflow ต้องใช้คน",
      },
      {
        eyebrow: "Models",
        title: "Model routing และ adaptation",
        description:
          "เลือกเส้นทางโมเดลที่เหมาะกับ cost, latency, accuracy, privacy และพฤติกรรมเฉพาะ domain",
      },
      {
        eyebrow: "Control",
        title: "Monitoring และ evaluation",
        description:
          "ติดตาม quality, latency, hallucination patterns, escalation events, feedback และ regression risk",
      },
    ],
    rowsKicker: "วิธีทำงาน",
    rowsTitle: "Security และ governance",
    rows: [
      {
        label: "Private",
        title: "Deploy ในที่ที่ข้อมูลอยู่แล้ว",
        description:
          "ระบบออกแบบได้สำหรับ VPC, private cloud หรือ on-premise ตามข้อกำหนด security และ compliance",
      },
      {
        label: "Controlled",
        title: "Human approvals สำหรับ actions ที่ละเอียดอ่อน",
        description:
          "Autonomy ของ agent ถูกจำกัดด้วย policy, confidence, workflow risk และ approval points ที่ชัดเจน",
      },
      {
        label: "Measured",
        title: "Evaluation ก่อนและหลัง launch",
        description:
          "เราสร้าง test sets, failure taxonomies และ regression checks เพื่อให้พฤติกรรม production มองเห็นได้",
      },
    ],
    proofKicker: "หลักฐาน",
    proofTitle: "รูปแบบ architecture",
    proof: [
      {
        sector: "Secure search",
        title: "Permission-aware retrieval",
        description:
          "ผู้ใช้ค้นได้เฉพาะ content ที่มีสิทธิ์เข้าถึง และคำตอบยังคงแสดง context ของแหล่งข้อมูล",
        outcome: "เข้าถึงความรู้ได้ดีขึ้นโดยไม่ข้าม governance",
      },
      {
        sector: "Agent control",
        title: "Approval-gated automation",
        description:
          "Agents เตรียมและแนะนำงานได้ ขณะที่คนอนุมัติ actions สุดท้ายใน workflow ที่ละเอียดอ่อน",
        outcome: "ได้ความเร็วของ automation พร้อมการควบคุม",
      },
    ],
    ctaKicker: "ขั้นต่อไป",
    ctaTitle: "ต้องการดู proof patterns?",
    ctaBody:
      "ดู case studies สำหรับ compliance, operations, research และ commerce teams",
    ctaLabel: "ดู case studies",
  },
  "case-studies": {
    ...en["case-studies"],
    kicker: "ผลงาน",
    title: "ตัวอย่างงานระบบ AI สำหรับ workflow จริงของบริษัท",
    description:
      "Patterns เหล่านี้แสดงงานที่ NativeLab AI ถูกสร้างมาเพื่อทำ: private knowledge, controlled agents, document intelligence และ operational decision support",
    stats: [
      { value: "4", label: "รูปแบบ engagement ตัวอย่าง" },
      { value: "Human review", label: "จุดอนุมัติยังอยู่ใน workflow" },
      { value: "Traceable", label: "Outputs เชื่อมกับ source context และ logs" },
    ],
    cardsTitle: "ตัวอย่างงาน",
    cards: [
      {
        eyebrow: "Compliance",
        title: "Policy knowledge engine",
        description:
          "ระบบค้นหาและตอบคำถามที่ปลอดภัยสำหรับ controls, policy documents, review notes และ internal guidance",
      },
      {
        eyebrow: "Operations",
        title: "Customer operations agent",
        description:
          "Agent workflow ที่เตรียม case summaries แนะนำ next actions และ escalate สถานการณ์ละเอียดอ่อน",
      },
      {
        eyebrow: "Research",
        title: "Document intelligence pipeline",
        description:
          "Pipeline ที่ดึงข้อมูล เปรียบเทียบ สรุป และ route ข้อมูลจากเอกสารเทคนิคขนาดยาว",
      },
      {
        eyebrow: "Commerce",
        title: "Inventory reasoning copilot",
        description:
          "ชั้น decision-support ที่รวมสัญญาณ product, demand และ operations สำหรับ planning teams",
      },
    ],
    rowsKicker: "วิธีทำงาน",
    rowsTitle: "วิธีประเมินทุก case study",
    rows: [
      {
        label: "Fit",
        title: "AI ควรอยู่ใน workflow นี้หรือไม่",
        description:
          "เราตรวจว่างานมี pattern ซ้ำ ข้อมูลที่ใช้ได้ ผู้ใช้ชัด และมูลค่าที่วัดผลได้",
      },
      {
        label: "Risk",
        title: "อะไรอาจผิดพลาด",
        description:
          "เราบันทึก hallucination risk, bad retrieval, over-automation, privacy boundaries และ review requirements",
      },
      {
        label: "Scale",
        title: "หลัง launch ระบบทำงานอย่างไร",
        description:
          "เรากำหนด monitoring, ownership, feedback loops และ operating processes ก่อน scale usage",
      },
    ],
    proofKicker: "หลักฐาน",
    proofTitle: "ผลลัพธ์ที่เลือก",
    proof: [
      {
        sector: "Compliance",
        title: "ค้นหาหลักฐานได้เร็วขึ้น",
        description:
          "คำตอบด้าน policy เชื่อมกับ source context ทำให้ reviewer ตรวจสอบแทนการเริ่มค้นใหม่",
        outcome: "ลด manual searching ระหว่าง review cycles",
      },
      {
        sector: "Operations",
        title: "เตรียม case ได้สม่ำเสมอขึ้น",
        description:
          "Agents เตรียม summaries และ next steps ด้วย business rules เดียวกันข้ามทีม",
        outcome: "ลดความต่างของงานปฏิบัติการซ้ำ",
      },
      {
        sector: "Research",
        title: "Structured document review",
        description:
          "เอกสารยาวถูกดึงเป็น fields ที่สม่ำเสมอ เปรียบเทียบ และ route ให้ผู้เชี่ยวชาญตรวจ",
        outcome: "ผู้เชี่ยวชาญใช้เวลาตัดสินมากขึ้น และจัดเรียงน้อยลง",
      },
    ],
    ctaKicker: "ขั้นต่อไป",
    ctaTitle: "มี workflow ที่คล้ายกันไหม?",
    ctaBody:
      "ส่ง process, data sources, users และ risk constraints มา เราจะช่วย map เส้นทางระบบ AI แรก",
    ctaLabel: "เริ่มคุย",
  },
  contact: {
    ...en.contact,
    kicker: "ติดต่อ",
    title: "เริ่มจาก workflow, data boundary และ decision ที่ต้องการปรับปรุง",
    description:
      "บทสนทนาแรกที่ดีที่สุดควรเฉพาะเจาะจง: ทีมใดเป็นเจ้าของ process, ข้อมูลใดเกี่ยวข้อง, decision ใดต้องการ support และต้องมี risk controls อะไร",
    stats: [
      { value: "24-48 ชม.", label: "ช่วงเวลาตอบกลับทั่วไปสำหรับ inquiry ใหม่" },
      { value: "30 นาที", label: "คุย initial fit" },
      { value: "4-8 สัปดาห์", label: "ช่วง prototype สำหรับ workflow ที่เหมาะสม" },
    ],
    cardsTitle: "ช่องทางติดต่อ",
    cards: [
      {
        eyebrow: "โปรเจกต์ใหม่",
        title: "คุยเรื่องระบบ AI",
        description:
          "แชร์ workflow, users, data sources, tools ปัจจุบัน และสิ่งที่ prototype แรกควรพิสูจน์",
      },
      {
        eyebrow: "Technical review",
        title: "ประเมิน AI initiative ที่มีอยู่",
        description:
          "นำ prototype, RAG system หรือ agent workflow ที่มีอยู่มา review ด้าน evaluation, risk และ production planning",
      },
      {
        eyebrow: "Partnership",
        title: "สร้างร่วมกับ NativeLab AI",
        description:
          "สำหรับ product teams, consultancies และ operators ที่ต้องการ partner ด้าน AI systems โดยเฉพาะ",
      },
    ],
    rowsKicker: "วิธีทำงาน",
    rowsTitle: "ควรใส่อะไรมา",
    rows: [
      {
        label: "Context",
        title: "Business workflow",
        description:
          "อธิบาย process, team, user roles, decision points และจุดที่งานปัจจุบันช้าหรือไม่สม่ำเสมอ",
      },
      {
        label: "Data",
        title: "Information boundary",
        description:
          "ระบุ documents, systems, databases, APIs และ privacy constraints ที่ระบบ AI ต้องเคารพ",
      },
      {
        label: "Outcome",
        title: "ผลลัพธ์แรกที่วัดได้",
        description:
          "กำหนดว่า prototype ที่สำเร็จต้องพิสูจน์อะไร ก่อนเริ่ม production planning",
      },
    ],
    proofKicker: "หลักฐาน",
    proofTitle: "Engagement fit",
    proof: [
      {
        sector: "เหมาะที่สุด",
        title: "Workflow-specific AI systems",
        description:
          "Private knowledge systems, controlled agents, model evaluation, document intelligence และ operational copilots",
        outcome: "เหมาะกับทีมที่มีข้อมูลจริงและ owner ชัดเจน",
      },
      {
        sector: "ไม่เหมาะ",
        title: "Generic chatbot requests",
        description:
          "โปรเจกต์ chatbot กว้างๆ ที่ไม่มี data ownership, workflow context หรือ production requirements",
        outcome: "เราจะช่วยจำกัด scope ก่อนสร้าง",
      },
    ],
    ctaKicker: "ขั้นต่อไป",
    ctaTitle: "ส่ง workflow brief",
    ctaBody:
      "อีเมล process, data sources, team และ intended outcome มา เราจะตอบกลับพร้อม next step ที่เหมาะสม",
    ctaLabel: "อีเมล NativeLab AI",
  },
};

const vi: ProfilePageMap = {
  company: {
    ...en.company,
    kicker: "Hồ sơ công ty",
    title: "Công ty hệ thống AI công nghệ cao được xây quanh thực tế production.",
    description:
      "NativeLab AI thiết kế hệ thống AI riêng tư cho doanh nghiệp cần automation đo được, truy xuất tri thức đáng tin cậy và hỗ trợ quyết định có kiểm soát.",
    stats: [
      { value: "AI-native", label: "Hệ thống thiết kế theo hành vi mô hình và vận hành thực tế" },
      { value: "Private", label: "Tùy chọn triển khai cho dữ liệu doanh nghiệp có governance" },
      { value: "Eval-first", label: "Cổng chất lượng trước khi mở rộng sử dụng" },
    ],
    cardsTitle: "Điều định nghĩa công ty",
    cards: [
      {
        eyebrow: "Sứ mệnh",
        title: "Làm AI hữu ích trong vận hành",
        description:
          "Chúng tôi xây quanh công việc con người đang làm: tìm tri thức, chuẩn bị quyết định, rà soát ngoại lệ và chuyển việc qua workflow an toàn.",
      },
      {
        eyebrow: "Studio model",
        title: "Đội ngũ chuyên gia nhỏ, sát workflow",
        description:
          "Chiến lược, product design, model engineering và deployment planning diễn ra cùng nhau để hệ thống trở thành một phần tự nhiên của công ty.",
      },
      {
        eyebrow: "Tiêu chuẩn",
        title: "Không xây hệ thống chỉ tốt khi demo",
        description:
          "Mỗi dự án được định hình quanh evaluation, data boundaries, escalation paths, monitoring và ownership sau launch.",
      },
    ],
    rowsKicker: "Phương pháp",
    rowsTitle: "Mô hình vận hành của công ty",
    rows: [
      {
        label: "01",
        title: "Business process trước tiên",
        description:
          "Chúng tôi map đường quyết định, người dùng, quyền dữ liệu, xử lý ngoại lệ và chỉ số giá trị trước khi chọn mô hình hoặc agent pattern.",
      },
      {
        label: "02",
        title: "Prototype với ràng buộc production",
        description:
          "Phiên bản đầu đã tính đến access control, retrieval quality, logs, feedback và human review.",
      },
      {
        label: "03",
        title: "Deploy với ownership rõ ràng",
        description:
          "Chúng tôi xác định ai sở hữu prompts, datasets, approvals, monitoring và chu kỳ cải tiến sau khi hệ thống go live.",
      },
    ],
    proofKicker: "Bằng chứng",
    proofTitle: "Tín hiệu hồ sơ",
    proof: [
      {
        sector: "Knowledge work",
        title: "Company memory như một hệ thống AI",
        description:
          "Kết nối policies, SOPs, tickets, documents và operational data vào một lớp tri thức riêng tư.",
        outcome: "Tìm kiếm nội bộ nhanh hơn với câu trả lời truy nguồn được.",
      },
      {
        sector: "Operations",
        title: "AI hỗ trợ chuẩn bị công việc",
        description:
          "Agents chuẩn bị tasks, draft summaries, route exceptions và giữ con người kiểm soát quyết định cuối.",
        outcome: "Giảm thao tác thủ công mà không mất oversight.",
      },
    ],
    ctaKicker: "Bước tiếp theo",
    ctaTitle: "Cần bản đồ năng lực chi tiết?",
    ctaBody:
      "Xem các hệ thống AI chúng tôi thiết kế, từ knowledge engines đến agent operations và evaluation pipelines.",
    ctaLabel: "Xem năng lực",
  },
  capabilities: {
    ...en.capabilities,
    kicker: "Năng lực",
    title: "Hệ thống AI cho tri thức, automation, evaluation và multimodal work.",
    description:
      "Capability stack dành cho đội ngũ cần AI tích hợp với tools, data, policies và operator review.",
    stats: [
      { value: "RAG", label: "Truy xuất tri thức riêng tư với câu trả lời có dẫn nguồn" },
      { value: "Agents", label: "Workflow gọi công cụ với điểm phê duyệt từ con người" },
      { value: "Evals", label: "Test sets và scorecards cho hành vi production" },
    ],
    cardsTitle: "Dịch vụ cốt lõi",
    cards: [
      {
        eyebrow: "Knowledge",
        title: "Enterprise RAG systems",
        description:
          "Document ingestion, chunking strategy, embeddings, search quality, source citations, permissions và feedback loops.",
      },
      {
        eyebrow: "Automation",
        title: "Agentic workflow systems",
        description:
          "Agents suy luận trên tasks, gọi approved tools, chuẩn bị công việc và yêu cầu human approval khi rủi ro tăng.",
      },
      {
        eyebrow: "Model layer",
        title: "Customization và prompt systems",
        description:
          "Prompt architecture, domain adaptation, fine-tuning strategy, model routing và reusable evaluation datasets.",
      },
      {
        eyebrow: "Multimodal",
        title: "Document, image và audio intelligence",
        description:
          "Hệ thống classify, extract, summarize và route thông tin từ operational content phức tạp.",
      },
    ],
    rowsKicker: "Phương pháp",
    rowsTitle: "Mẫu triển khai",
    rows: [
      {
        label: "Scope",
        title: "Xác định workflow giá trị cao thật hẹp",
        description:
          "Chúng tôi tìm quy trình nơi AI có thể giảm thời gian, tăng nhất quán hoặc mở tri thức đang ẩn trong nhiều hệ thống.",
      },
      {
        label: "Build",
        title: "Tạo prototype có dáng production",
        description:
          "Prototype gồm interface, retrieval hoặc agent core, evaluation path, permissions và handoff behavior.",
      },
      {
        label: "Harden",
        title: "Chuyển từ prototype sang hệ thống có governance",
        description:
          "Chúng tôi thêm monitoring, audit trail, user feedback, fallback paths và operating model để cải tiến liên tục.",
      },
    ],
    proofKicker: "Bằng chứng",
    proofTitle: "Công việc đại diện",
    proof: [
      {
        sector: "Compliance",
        title: "Policy knowledge engine",
        description:
          "Trợ lý bảo mật cho policies, controls và câu hỏi review với câu trả lời có nguồn.",
        outcome: "Giảm thời gian tìm kiếm và làm rõ bằng chứng review.",
      },
      {
        sector: "Customer operations",
        title: "Support workflow agent",
        description:
          "Agent chuẩn bị case summaries, đề xuất actions và escalate ca nhạy cảm cho nhân sự.",
        outcome: "Xử lý công việc lặp lại nhất quán hơn.",
      },
    ],
    ctaKicker: "Bước tiếp theo",
    ctaTitle: "Muốn xem architecture của hệ thống?",
    ctaBody:
      "Trang công nghệ giải thích private deployment, retrieval, agent runtime, observability và evaluation.",
    ctaLabel: "Xem công nghệ",
  },
  technology: {
    ...en.technology,
    kicker: "Công nghệ",
    title: "Kiến trúc AI riêng tư cho enterprise workflows có governance.",
    description:
      "Stack kết hợp retrieval, agent orchestration, model routing, evaluation, observability và deployment controls.",
    stats: [
      { value: "VPC", label: "Private cloud và controlled deployment patterns" },
      { value: "Audit", label: "Logs và review paths cho workflow quan trọng" },
      { value: "Scorecards", label: "Hành vi được đo trước và sau launch" },
    ],
    cardsTitle: "Các lớp hệ thống",
    cards: [
      {
        eyebrow: "Data",
        title: "Retrieval và permission layer",
        description:
          "Kết nối documents, databases, tickets và knowledge stores trong khi giữ access rules và source traceability.",
      },
      {
        eyebrow: "Runtime",
        title: "Agent orchestration",
        description:
          "Lập kế hoạch tasks, gọi tools, validate outputs, yêu cầu approval và handoff khi workflow cần con người.",
      },
      {
        eyebrow: "Models",
        title: "Model routing và adaptation",
        description:
          "Chọn đường mô hình phù hợp với cost, latency, accuracy, privacy và hành vi theo domain.",
      },
      {
        eyebrow: "Control",
        title: "Monitoring và evaluation",
        description:
          "Theo dõi quality, latency, hallucination patterns, escalation events, feedback và regression risk.",
      },
    ],
    rowsKicker: "Phương pháp",
    rowsTitle: "Security và governance",
    rows: [
      {
        label: "Private",
        title: "Deploy nơi dữ liệu đang nằm",
        description:
          "Hệ thống có thể thiết kế cho VPC, private cloud hoặc on-premise tùy nhu cầu security và compliance.",
      },
      {
        label: "Controlled",
        title: "Human approvals cho actions nhạy cảm",
        description:
          "Agent autonomy bị giới hạn bởi policy, confidence, workflow risk và approval points rõ ràng.",
      },
      {
        label: "Measured",
        title: "Evaluation trước và sau launch",
        description:
          "Chúng tôi tạo test sets, failure taxonomies và regression checks để hành vi production quan sát được.",
      },
    ],
    proofKicker: "Bằng chứng",
    proofTitle: "Mẫu architecture",
    proof: [
      {
        sector: "Secure search",
        title: "Permission-aware retrieval",
        description:
          "Người dùng chỉ retrieve nội dung họ được phép truy cập, trong khi câu trả lời vẫn giữ source context.",
        outcome: "Truy cập tri thức tốt hơn mà không vượt governance.",
      },
      {
        sector: "Agent control",
        title: "Approval-gated automation",
        description:
          "Agents có thể chuẩn bị và đề xuất công việc, còn con người approve final actions trong workflow nhạy cảm.",
        outcome: "Tốc độ automation cùng kiểm soát vận hành.",
      },
    ],
    ctaKicker: "Bước tiếp theo",
    ctaTitle: "Cần proof patterns?",
    ctaBody:
      "Xem case studies đại diện cho compliance, operations, research và commerce teams.",
    ctaLabel: "Xem case studies",
  },
  "case-studies": {
    ...en["case-studies"],
    kicker: "Case studies",
    title: "Các engagement hệ thống AI đại diện cho workflow thực tế.",
    description:
      "Những pattern này thể hiện loại công việc NativeLab AI được xây để làm: private knowledge, controlled agents, document intelligence và operational decision support.",
    stats: [
      { value: "4", label: "Mẫu engagement đại diện" },
      { value: "Human review", label: "Điểm phê duyệt nằm trong workflow" },
      { value: "Traceable", label: "Outputs kết nối với source context và logs" },
    ],
    cardsTitle: "Ví dụ công việc",
    cards: [
      {
        eyebrow: "Compliance",
        title: "Policy knowledge engine",
        description:
          "Hệ thống search và answer bảo mật cho controls, policy documents, review notes và internal guidance.",
      },
      {
        eyebrow: "Operations",
        title: "Customer operations agent",
        description:
          "Agent workflow chuẩn bị case summaries, đề xuất next actions và escalate tình huống nhạy cảm.",
      },
      {
        eyebrow: "Research",
        title: "Document intelligence pipeline",
        description:
          "Pipeline extract, compare, summarize và route thông tin từ bộ tài liệu kỹ thuật dài.",
      },
      {
        eyebrow: "Commerce",
        title: "Inventory reasoning copilot",
        description:
          "Lớp decision-support kết hợp tín hiệu product, demand và operations cho planning teams.",
      },
    ],
    rowsKicker: "Phương pháp",
    rowsTitle: "Cách mỗi study được đánh giá",
    rows: [
      {
        label: "Fit",
        title: "AI có nên ở trong workflow này không?",
        description:
          "Chúng tôi xác thực công việc có pattern lặp, dữ liệu hữu ích, người dùng rõ và giá trị đo được.",
      },
      {
        label: "Risk",
        title: "Điều gì có thể sai?",
        description:
          "Chúng tôi ghi lại hallucination risk, bad retrieval, over-automation, privacy boundaries và review requirements.",
      },
      {
        label: "Scale",
        title: "Hệ thống chạy thế nào sau launch?",
        description:
          "Chúng tôi định nghĩa monitoring, ownership, feedback loops và operating processes trước khi scale usage.",
      },
    ],
    proofKicker: "Bằng chứng",
    proofTitle: "Kết quả chọn lọc",
    proof: [
      {
        sector: "Compliance",
        title: "Tìm bằng chứng nhanh hơn",
        description:
          "Policy answers vẫn kết nối với source context, để reviewer xác minh thay vì bắt đầu tìm từ đầu.",
        outcome: "Ít manual searching hơn trong review cycles.",
      },
      {
        sector: "Operations",
        title: "Chuẩn bị case nhất quán hơn",
        description:
          "Agents chuẩn bị summaries và next steps bằng cùng business rules trên nhiều teams.",
        outcome: "Giảm variance trong operational work lặp lại.",
      },
      {
        sector: "Research",
        title: "Structured document review",
        description:
          "Tài liệu dài được extract thành fields nhất quán, so sánh và route cho expert review.",
        outcome: "Chuyên gia dành nhiều thời gian đánh giá hơn, ít thời gian phân loại hơn.",
      },
    ],
    ctaKicker: "Bước tiếp theo",
    ctaTitle: "Có workflow tương tự?",
    ctaBody:
      "Gửi process, data sources, users và risk constraints. Chúng tôi có thể map đường hệ thống AI đầu tiên.",
    ctaLabel: "Bắt đầu trao đổi",
  },
  contact: {
    ...en.contact,
    kicker: "Liên hệ",
    title: "Bắt đầu với workflow, data boundary và decision bạn muốn cải thiện.",
    description:
      "Cuộc trao đổi đầu tiên tốt nhất cần cụ thể: team nào sở hữu process, dữ liệu nào liên quan, decision nào cần support và risk controls nào bắt buộc.",
    stats: [
      { value: "24-48h", label: "Thời gian phản hồi thông thường cho inquiry mới" },
      { value: "30 phút", label: "Trao đổi initial fit" },
      { value: "4-8 tuần", label: "Prototype window cho workflow phù hợp" },
    ],
    cardsTitle: "Đường liên hệ",
    cards: [
      {
        eyebrow: "Dự án mới",
        title: "Trao đổi về hệ thống AI",
        description:
          "Chia sẻ workflow, users, data sources, current tools và điều prototype đầu tiên cần chứng minh.",
      },
      {
        eyebrow: "Technical review",
        title: "Đánh giá AI initiative hiện có",
        description:
          "Mang prototype, RAG system hoặc agent workflow hiện có để review evaluation, risk và production planning.",
      },
      {
        eyebrow: "Partnership",
        title: "Xây dựng cùng NativeLab AI",
        description:
          "Dành cho product teams, consultancies và operators cần đối tác chuyên về AI systems.",
      },
    ],
    rowsKicker: "Phương pháp",
    rowsTitle: "Nên gửi kèm gì",
    rows: [
      {
        label: "Context",
        title: "Business workflow",
        description:
          "Mô tả process, team, user roles, decision points và nơi công việc hiện tại chậm hoặc không nhất quán.",
      },
      {
        label: "Data",
        title: "Information boundary",
        description:
          "Liệt kê documents, systems, databases, APIs và privacy constraints mà hệ thống AI phải tôn trọng.",
      },
      {
        label: "Outcome",
        title: "Kết quả đo được đầu tiên",
        description:
          "Xác định prototype thành công cần chứng minh điều gì trước khi bắt đầu production planning.",
      },
    ],
    proofKicker: "Bằng chứng",
    proofTitle: "Engagement fit",
    proof: [
      {
        sector: "Phù hợp nhất",
        title: "Workflow-specific AI systems",
        description:
          "Private knowledge systems, controlled agents, model evaluation, document intelligence và operational copilots.",
        outcome: "Phù hợp với teams có dữ liệu thật và owner rõ.",
      },
      {
        sector: "Không phù hợp",
        title: "Generic chatbot requests",
        description:
          "Dự án chatbot rộng, chỉ để demo, thiếu data ownership, workflow context hoặc production requirements.",
        outcome: "Chúng tôi sẽ thu hẹp scope trước khi build.",
      },
    ],
    ctaKicker: "Bước tiếp theo",
    ctaTitle: "Gửi workflow brief",
    ctaBody:
      "Email process, data sources, team và intended outcome. Chúng tôi sẽ phản hồi với bước tiếp theo phù hợp.",
    ctaLabel: "Email NativeLab AI",
  },
};

const zh: ProfilePageMap = {
  company: {
    ...en.company,
    kicker: "公司简介",
    title: "围绕生产现实构建的高科技 AI 系统公司。",
    description:
      "NativeLab AI 为需要可衡量自动化、可信知识检索和可控决策支持的企业设计私有 AI 系统。",
    stats: [
      { value: "AI-native", label: "围绕模型行为和真实运营设计的系统" },
      { value: "Private", label: "适用于受治理企业数据的部署选项" },
      { value: "Eval-first", label: "大规模推广前的质量门禁" },
    ],
    cardsTitle: "公司特征",
    cards: [
      {
        eyebrow: "使命",
        title: "让 AI 在运营中真正有用",
        description:
          "我们围绕人们已经在做的工作构建系统：搜索知识、准备决策、审查异常，并通过安全 workflow 推进任务。",
      },
      {
        eyebrow: "Studio model",
        title: "小型专家团队，贴近 workflow",
        description:
          "战略、产品设计、模型工程和部署规划同步推进，让系统成为企业内部自然的一部分。",
      },
      {
        eyebrow: "标准",
        title: "不做只适合演示的系统",
        description:
          "每个项目都围绕 evaluation、data boundaries、escalation paths、monitoring 和上线后的 ownership 设计。",
      },
    ],
    rowsKicker: "方法",
    rowsTitle: "公司运营模型",
    rows: [
      {
        label: "01",
        title: "业务流程优先",
        description:
          "在选择模型或 agent pattern 前，我们先梳理决策路径、用户、数据权限、异常处理和价值衡量。",
      },
      {
        label: "02",
        title: "带着生产约束做 prototype",
        description:
          "第一个版本就考虑 access control、retrieval quality、logs、feedback 和 human review。",
      },
      {
        label: "03",
        title: "带着清晰 ownership 部署",
        description:
          "系统上线后，我们定义 prompts、datasets、approvals、monitoring 和改进周期的负责人。",
      },
    ],
    proofKicker: "证明",
    proofTitle: "公司能力信号",
    proof: [
      {
        sector: "Knowledge work",
        title: "作为 AI 系统的公司记忆",
        description:
          "把 policies、SOPs、tickets、documents 和 operational data 连接成私有知识层。",
        outcome: "内部搜索更快，答案可追溯。",
      },
      {
        sector: "Operations",
        title: "AI 辅助工作准备",
        description:
          "Agents 准备任务、起草摘要、路由异常，并让人控制最终决策。",
        outcome: "降低手工处理，同时保留 oversight。",
      },
    ],
    ctaKicker: "下一步",
    ctaTitle: "需要详细能力地图？",
    ctaBody:
      "查看我们设计的 AI 系统，从 knowledge engines 到 agent operations 和 evaluation pipelines。",
    ctaLabel: "查看能力",
  },
  capabilities: {
    ...en.capabilities,
    kicker: "能力",
    title: "面向知识、自动化、评估和多模态工作的 AI 系统。",
    description:
      "Capability stack 面向需要 AI 与 tools、data、policies 和 operator review 集成的团队。",
    stats: [
      { value: "RAG", label: "私有知识检索与可引用来源的回答" },
      { value: "Agents", label: "带人工审批点的工具调用 workflow" },
      { value: "Evals", label: "面向生产行为的 test sets 和 scorecards" },
    ],
    cardsTitle: "核心服务",
    cards: [
      {
        eyebrow: "Knowledge",
        title: "Enterprise RAG systems",
        description:
          "Document ingestion、chunking strategy、embeddings、search quality、source citations、permissions 和 feedback loops。",
      },
      {
        eyebrow: "Automation",
        title: "Agentic workflow systems",
        description:
          "Agents 根据任务推理、调用 approved tools、准备工作，并在风险升高时请求 human approval。",
      },
      {
        eyebrow: "Model layer",
        title: "Customization 和 prompt systems",
        description:
          "Prompt architecture、domain adaptation、fine-tuning strategy、model routing 和 reusable evaluation datasets。",
      },
      {
        eyebrow: "Multimodal",
        title: "Document, image 和 audio intelligence",
        description:
          "对复杂运营内容进行 classify、extract、summarize 和 route 的系统。",
      },
    ],
    rowsKicker: "方法",
    rowsTitle: "交付模式",
    rows: [
      {
        label: "Scope",
        title: "定义窄而高价值的 workflow",
        description:
          "我们识别 AI 能减少时间、提高一致性，或打开隐藏在多个系统中的知识的流程。",
      },
      {
        label: "Build",
        title: "创建具备生产形态的 prototype",
        description:
          "Prototype 包含 interface、retrieval 或 agent core、evaluation path、permissions 和 handoff behavior。",
      },
      {
        label: "Harden",
        title: "从 prototype 走向受治理系统",
        description:
          "我们加入 monitoring、audit trail、user feedback、fallback paths 和持续改进的 operating model。",
      },
    ],
    proofKicker: "证明",
    proofTitle: "代表性工作",
    proof: [
      {
        sector: "Compliance",
        title: "Policy knowledge engine",
        description:
          "面向 policies、controls 和 review questions 的安全助手，回答带来源上下文。",
        outcome: "减少搜索时间，让审查证据更清晰。",
      },
      {
        sector: "Customer operations",
        title: "Support workflow agent",
        description:
          "Agent 准备 case summaries，推荐 actions，并把敏感 cases 升级给人员处理。",
        outcome: "重复 workflow 的处理更一致。",
      },
    ],
    ctaKicker: "下一步",
    ctaTitle: "想看系统 architecture？",
    ctaBody:
      "技术页面说明 private deployment、retrieval、agent runtime、observability 和 evaluation。",
    ctaLabel: "查看技术",
  },
  technology: {
    ...en.technology,
    kicker: "技术",
    title: "面向受治理企业 workflow 的私有 AI 架构。",
    description:
      "该 stack 结合 retrieval、agent orchestration、model routing、evaluation、observability 和 deployment controls。",
    stats: [
      { value: "VPC", label: "Private cloud 和 controlled deployment patterns" },
      { value: "Audit", label: "面向关键业务流程的 logs 和 review paths" },
      { value: "Scorecards", label: "上线前后都衡量系统行为" },
    ],
    cardsTitle: "系统层",
    cards: [
      {
        eyebrow: "Data",
        title: "Retrieval 和 permission layer",
        description:
          "连接 documents、databases、tickets 和 knowledge stores，同时保留 access rules 和 source traceability。",
      },
      {
        eyebrow: "Runtime",
        title: "Agent orchestration",
        description:
          "规划 tasks、调用 tools、验证 outputs、请求 approval，并在 workflow 需要人时 handoff。",
      },
      {
        eyebrow: "Models",
        title: "Model routing 和 adaptation",
        description:
          "根据 cost、latency、accuracy、privacy 和 domain-specific behavior 选择合适模型路径。",
      },
      {
        eyebrow: "Control",
        title: "Monitoring 和 evaluation",
        description:
          "跟踪 quality、latency、hallucination patterns、escalation events、feedback 和 regression risk。",
      },
    ],
    rowsKicker: "方法",
    rowsTitle: "Security 和 governance",
    rows: [
      {
        label: "Private",
        title: "在数据所在位置部署",
        description:
          "系统可根据 security 和 compliance 需求设计为 VPC、private cloud 或 on-premise 模式。",
      },
      {
        label: "Controlled",
        title: "敏感 actions 需要人工审批",
        description:
          "Agent autonomy 由 policy、confidence、workflow risk 和明确 approval points 限制。",
      },
      {
        label: "Measured",
        title: "上线前后都做 evaluation",
        description:
          "我们创建 test sets、failure taxonomies 和 regression checks，让生产行为可观察。",
      },
    ],
    proofKicker: "证明",
    proofTitle: "Architecture patterns",
    proof: [
      {
        sector: "Secure search",
        title: "Permission-aware retrieval",
        description:
          "用户只能 retrieve 有权访问的内容，同时答案保留 source context。",
        outcome: "在不绕过 governance 的情况下改善知识访问。",
      },
      {
        sector: "Agent control",
        title: "Approval-gated automation",
        description:
          "Agents 可准备并推荐工作，而人在敏感 workflow 中审批 final actions。",
        outcome: "兼顾 automation speed 和 operational control。",
      },
    ],
    ctaKicker: "下一步",
    ctaTitle: "需要 proof patterns？",
    ctaBody:
      "查看 compliance、operations、research 和 commerce teams 的代表性 case studies。",
    ctaLabel: "查看案例",
  },
  "case-studies": {
    ...en["case-studies"],
    kicker: "案例",
    title: "面向真实公司 workflow 的代表性 AI 系统项目。",
    description:
      "这些 patterns 展示 NativeLab AI 擅长的工作：private knowledge、controlled agents、document intelligence 和 operational decision support。",
    stats: [
      { value: "4", label: "代表性 engagement patterns" },
      { value: "Human review", label: "审批点保留在 workflow 内" },
      { value: "Traceable", label: "Outputs 连接 source context 和 logs" },
    ],
    cardsTitle: "工作示例",
    cards: [
      {
        eyebrow: "Compliance",
        title: "Policy knowledge engine",
        description:
          "面向 controls、policy documents、review notes 和 internal guidance 的安全搜索与回答系统。",
      },
      {
        eyebrow: "Operations",
        title: "Customer operations agent",
        description:
          "Agent workflow 准备 case summaries、建议 next actions，并升级敏感情况。",
      },
      {
        eyebrow: "Research",
        title: "Document intelligence pipeline",
        description:
          "从长技术文档集中 extract、compare、summarize 和 route 信息的 pipeline。",
      },
      {
        eyebrow: "Commerce",
        title: "Inventory reasoning copilot",
        description:
          "为 planning teams 结合 product、demand 和 operations 信号的 decision-support 层。",
      },
    ],
    rowsKicker: "方法",
    rowsTitle: "每个 study 的评估方式",
    rows: [
      {
        label: "Fit",
        title: "AI 是否适合这个 workflow？",
        description:
          "我们验证工作是否有重复模式、可用数据、清晰用户和可衡量价值。",
      },
      {
        label: "Risk",
        title: "可能出什么问题？",
        description:
          "我们记录 hallucination risk、bad retrieval、over-automation、privacy boundaries 和 review requirements。",
      },
      {
        label: "Scale",
        title: "上线后如何运行？",
        description:
          "扩展使用前，我们定义 monitoring、ownership、feedback loops 和 operating processes。",
      },
    ],
    proofKicker: "证明",
    proofTitle: "精选结果",
    proof: [
      {
        sector: "Compliance",
        title: "更快发现证据",
        description:
          "Policy answers 保持与 source context 的连接，reviewers 可以验证而不是从零开始搜索。",
        outcome: "减少 review cycles 中的 manual searching。",
      },
      {
        sector: "Operations",
        title: "Case preparation 更一致",
        description:
          "Agents 使用同一套 business rules 跨团队准备 summaries 和 next steps。",
        outcome: "降低重复运营工作中的差异。",
      },
      {
        sector: "Research",
        title: "Structured document review",
        description:
          "长文档被 extract 成一致字段、比较，并 route 给专家 review。",
        outcome: "专家花更多时间判断，少花时间整理。",
      },
    ],
    ctaKicker: "下一步",
    ctaTitle: "有类似 workflow？",
    ctaBody:
      "发送 process、data sources、users 和 risk constraints。我们可以 map 第一条 AI 系统路径。",
    ctaLabel: "开始讨论",
  },
  contact: {
    ...en.contact,
    kicker: "联系",
    title: "从你想改善的 workflow、data boundary 和 decision 开始。",
    description:
      "最好的第一次沟通要具体：哪个团队拥有 process，涉及什么数据，需要支持什么 decisions，以及需要哪些 risk controls。",
    stats: [
      { value: "24-48h", label: "新 inquiry 的常见回复窗口" },
      { value: "30 分钟", label: "Initial fit discussion" },
      { value: "4-8 周", label: "合适 workflow 的 prototype 周期" },
    ],
    cardsTitle: "联系方式",
    cards: [
      {
        eyebrow: "新项目",
        title: "讨论 AI 系统",
        description:
          "分享 workflow、users、data sources、current tools，以及第一个 prototype 应证明什么。",
      },
      {
        eyebrow: "Technical review",
        title: "评估现有 AI initiative",
        description:
          "带上现有 prototype、RAG system 或 agent workflow，进行 evaluation、risk 和 production planning review。",
      },
      {
        eyebrow: "Partnership",
        title: "与 NativeLab AI 一起构建",
        description:
          "适用于需要专业 AI systems partner 的 product teams、consultancies 和 operators。",
      },
    ],
    rowsKicker: "方法",
    rowsTitle: "建议包含的信息",
    rows: [
      {
        label: "Context",
        title: "Business workflow",
        description:
          "描述 process、team、user roles、decision points，以及当前工作慢或不一致的位置。",
      },
      {
        label: "Data",
        title: "Information boundary",
        description:
          "列出系统需要遵守的 documents、systems、databases、APIs 和 privacy constraints。",
      },
      {
        label: "Outcome",
        title: "第一个可衡量结果",
        description:
          "定义成功的 prototype 在 production planning 前需要证明什么。",
      },
    ],
    proofKicker: "证明",
    proofTitle: "Engagement fit",
    proof: [
      {
        sector: "最佳匹配",
        title: "Workflow-specific AI systems",
        description:
          "Private knowledge systems、controlled agents、model evaluation、document intelligence 和 operational copilots。",
        outcome: "适合有真实数据和明确 owner 的团队。",
      },
      {
        sector: "不适合",
        title: "Generic chatbot requests",
        description:
          "缺少 data ownership、workflow context 或 production requirements 的宽泛 demo-only chatbot 项目。",
        outcome: "我们会先收窄 scope 再构建。",
      },
    ],
    ctaKicker: "下一步",
    ctaTitle: "发送 workflow brief",
    ctaBody:
      "通过邮件发送 process、data sources、team 和 intended outcome。我们会回复最合适的下一步。",
    ctaLabel: "Email NativeLab AI",
  },
};

const lo: ProfilePageMap = {
  company: {
    ...en.company,
    kicker: "ໂປຣໄຟລ໌ບໍລິສັດ",
    title: "ບໍລິສັດລະບົບ AI ໄຮເທັກທີ່ສ້າງຂຶ້ນເພື່ອ production ຈິງ",
    description:
      "NativeLab AI ອອກແບບລະບົບ AI ສ່ວນຕົວສຳລັບອົງກອນທີ່ຕ້ອງການ automation ທີ່ວັດຜົນໄດ້, knowledge retrieval ທີ່ໄວ້ໃຈໄດ້ ແລະ decision support ທີ່ຄວບຄຸມໄດ້.",
    stats: [
      { value: "AI-native", label: "ລະບົບທີ່ອອກແບບຈາກພຶດຕິກຳໂມເດວ ແລະ ການປະຕິບັດງານຈິງ" },
      { value: "Private", label: "ຮູບແບບຕິດຕັ້ງສຳລັບຂໍ້ມູນອົງກອນທີ່ຕ້ອງມີ governance" },
      { value: "Eval-first", label: "ປະຕູກວດຄຸນນະພາບກ່ອນຂະຫຍາຍການໃຊ້ງານ" },
    ],
    cardsTitle: "ສິ່ງທີ່ນິຍາມບໍລິສັດ",
    cards: [
      {
        eyebrow: "ພາລະກິດ",
        title: "ເຮັດໃຫ້ AI ມີປະໂຫຍດໃນວຽກຈິງ",
        description:
          "ພວກເຮົາສ້າງລະບົບອ້ອມວຽກທີ່ຄົນເຮັດຢູ່ແລ້ວ: ຄົ້ນຫາຄວາມຮູ້, ກະກຽມການຕັດສິນໃຈ, ກວດຂໍ້ຍົກເວັ້ນ ແລະ ສົ່ງວຽກຜ່ານ workflow ທີ່ປອດໄພ.",
      },
      {
        eyebrow: "Studio model",
        title: "ທີມຜູ້ຊ່ຽວຊານຂະໜາດນ້ອຍ ໃກ້ກັບ workflow",
        description:
          "ກົນລະຍຸດ, product design, model engineering ແລະ deployment planning ເຮັດໄປພ້ອມກັນ ເພື່ອໃຫ້ລະບົບເປັນສ່ວນໜຶ່ງຂອງບໍລິສັດທີ່ນຳໃຊ້.",
      },
      {
        eyebrow: "ມາດຕະຖານ",
        title: "ບໍ່ສ້າງລະບົບທີ່ດີແຕ່ເວລາ demo",
        description:
          "ທຸກໂຄງການຖືກວາງຮູບແບບຮອບ evaluation, data boundaries, escalation paths, monitoring ແລະ ownership ຫຼັງ launch.",
      },
    ],
    rowsKicker: "ວິທີເຮັດວຽກ",
    rowsTitle: "ຮູບແບບການດຳເນີນງານຂອງບໍລິສັດ",
    rows: [
      {
        label: "01",
        title: "ເລີ່ມຈາກຂະບວນການທຸລະກິດ",
        description:
          "ພວກເຮົາວາງເສັ້ນທາງການຕັດສິນໃຈ, ຜູ້ໃຊ້, ສິດຂໍ້ມູນ, ການຈັດການຂໍ້ຍົກເວັ້ນ ແລະ ຕົວຊີ້ວັດກ່ອນເລືອກໂມເດວ ຫຼື agent pattern.",
      },
      {
        label: "02",
        title: "Prototype ດ້ວຍຂໍ້ຈຳກັດຂອງ production",
        description:
          "ເວີຊັນທຳອິດຄຳນຶງເຖິງ access control, retrieval quality, logs, feedback ແລະ human review ຕັ້ງແຕ່ຕົ້ນ.",
      },
      {
        label: "03",
        title: "Deploy ພ້ອມ ownership ຊັດເຈນ",
        description:
          "ພວກເຮົາກຳນົດເຈົ້າຂອງ prompts, datasets, approvals, monitoring ແລະ ຮອບການປັບປຸງຫຼັງລະບົບໃຊ້ງານຈິງ.",
      },
    ],
    proofKicker: "ຫຼັກຖານ",
    proofTitle: "ສັນຍານຂອງໂປຣໄຟລ໌ບໍລິສັດ",
    proof: [
      {
        sector: "Knowledge work",
        title: "ຄວາມຈຳຂອງບໍລິສັດໃນຮູບແບບລະບົບ AI",
        description:
          "ເຊື່ອມ policies, SOPs, tickets, ເອກະສານ ແລະ operational data ເຂົ້າສູ່ຊັ້ນຄວາມຮູ້ສ່ວນຕົວ.",
        outcome: "ຄົ້ນຫາພາຍໃນໄດ້ໄວຂຶ້ນ ພ້ອມຄຳຕອບທີ່ກວດແຫຼ່ງທີ່ມາໄດ້.",
      },
      {
        sector: "Operations",
        title: "AI ຊ່ວຍກະກຽມວຽກປະຕິບັດການ",
        description:
          "Agents ກະກຽມວຽກ, ຮ່າງສະຫຼຸບ, ຈັດເສັ້ນທາງຂໍ້ຍົກເວັ້ນ ແລະ ໃຫ້ຄົນຄວບຄຸມການຕັດສິນໃຈສຸດທ້າຍ.",
        outcome: "ຫຼຸດວຽກ manual ໂດຍບໍ່ເສຍ oversight.",
      },
    ],
    ctaKicker: "ຂັ້ນຕໍ່ໄປ",
    ctaTitle: "ຕ້ອງການເບິ່ງແຜນຄວາມສາມາດແບບລະອຽດ?",
    ctaBody:
      "ເບິ່ງລະບົບ AI ທີ່ພວກເຮົາອອກແບບ ຕັ້ງແຕ່ knowledge engines ໄປຈົນເຖິງ agent operations ແລະ evaluation pipelines.",
    ctaHref: "/capabilities",
    ctaLabel: "ເບິ່ງຄວາມສາມາດ",
  },
  capabilities: {
    ...en.capabilities,
    kicker: "ຄວາມສາມາດ",
    title: "ລະບົບ AI ສຳລັບຄວາມຮູ້, automation, evaluation ແລະ multimodal work",
    description:
      "Capability stack ຖືກອອກແບບສຳລັບທີມທີ່ຕ້ອງການໃຫ້ AI ເຊື່ອມກັບ tools, data, policies ແລະ operator review.",
    stats: [
      { value: "RAG", label: "ການຄົ້ນຄືນຄວາມຮູ້ສ່ວນຕົວພ້ອມຄຳຕອບທີ່ອ້າງອີງໄດ້" },
      { value: "Agents", label: "Workflow ທີ່ເອີ້ນໃຊ້ tools ພ້ອມຈຸດອະນຸມັດຈາກຄົນ" },
      { value: "Evals", label: "Test sets ແລະ scorecards ສຳລັບພຶດຕິກຳໃນ production" },
    ],
    cardsTitle: "ບໍລິການຫຼັກ",
    cards: [
      {
        eyebrow: "Knowledge",
        title: "Enterprise RAG systems",
        description:
          "Document ingestion, chunking strategy, embeddings, search quality, source citations, permissions ແລະ feedback loops.",
      },
      {
        eyebrow: "Automation",
        title: "Agentic workflow systems",
        description:
          "Agents ວິເຄາະວຽກ, ເອີ້ນໃຊ້ tools ທີ່ອະນຸມັດ, ກະກຽມວຽກ ແລະ ຂໍ human approval ເມື່ອຄວາມສ່ຽງເພີ່ມຂຶ້ນ.",
      },
      {
        eyebrow: "Model layer",
        title: "Customization ແລະ prompt systems",
        description:
          "Prompt architecture, domain adaptation, fine-tuning strategy, model routing ແລະ reusable evaluation datasets.",
      },
      {
        eyebrow: "Multimodal",
        title: "Document, image ແລະ audio intelligence",
        description:
          "ລະບົບທີ່ຈຳແນກ, ດຶງຂໍ້ມູນ, ສະຫຼຸບ ແລະ route ຂໍ້ມູນຈາກ operational content ທີ່ຊັບຊ້ອນ.",
      },
    ],
    rowsKicker: "ວິທີເຮັດວຽກ",
    rowsTitle: "ຮູບແບບການສົ່ງມອບ",
    rows: [
      {
        label: "Scope",
        title: "ກຳນົດ workflow ມູນຄ່າສູງໃຫ້ແຄບ ແລະ ຊັດເຈນ",
        description:
          "ພວກເຮົາຫາຂະບວນການທີ່ AI ຊ່ວຍຫຼຸດເວລາ, ເພີ່ມຄວາມສະໝ່ຳສະເໝີ ຫຼື ເປີດຄວາມຮູ້ທີ່ຊ່ອນຢູ່ໃນຫຼາຍລະບົບ.",
      },
      {
        label: "Build",
        title: "ສ້າງ prototype ທີ່ມີຮູບຊົງຂອງ production",
        description:
          "Prototype ມີ interface, retrieval ຫຼື agent core, evaluation path, permissions ແລະ handoff behavior.",
      },
      {
        label: "Harden",
        title: "ຍ້າຍຈາກ prototype ໄປສູ່ລະບົບທີ່ມີ governance",
        description:
          "ພວກເຮົາເພີ່ມ monitoring, audit trail, user feedback, fallback paths ແລະ operating model ສຳລັບການປັບປຸງຕໍ່ເນື່ອງ.",
      },
    ],
    proofKicker: "ຫຼັກຖານ",
    proofTitle: "ງານຕົວຢ່າງ",
    proof: [
      {
        sector: "Compliance",
        title: "Policy knowledge engine",
        description:
          "ຜູ້ຊ່ວຍທີ່ປອດໄພສຳລັບ policies, controls ແລະ ຄຳຖາມ review ພ້ອມຄຳຕອບທີ່ມີແຫຼ່ງອ້າງອີງ.",
        outcome: "ຫຼຸດເວລາຄົ້ນຫາ ແລະ ເຮັດໃຫ້ຫຼັກຖານ review ຊັດເຈນຂຶ້ນ.",
      },
      {
        sector: "Customer operations",
        title: "Support workflow agent",
        description:
          "Agent ທີ່ກະກຽມ case summaries, ແນະນຳ actions ແລະ escalate ເຄສທີ່ອ່ອນໄຫວໄປຫາທີມງານ.",
        outcome: "ຈັດການວຽກຊ້ຳໄດ້ສະໝ່ຳສະເໝີຂຶ້ນ.",
      },
    ],
    ctaKicker: "ຂັ້ນຕໍ່ໄປ",
    ctaTitle: "ຢາກເຫັນ architecture ຂອງລະບົບບໍ?",
    ctaBody:
      "ໜ້າເທັກໂນໂລຊີອະທິບາຍ private deployment, retrieval, agent runtime, observability ແລະ evaluation.",
    ctaHref: "/technology",
    ctaLabel: "ເບິ່ງເທັກໂນໂລຊີ",
  },
  technology: {
    ...en.technology,
    kicker: "ເທັກໂນໂລຊີ",
    title: "ສະຖາປັດຕະຍະກຳ AI ສ່ວນຕົວສຳລັບ enterprise workflows ທີ່ມີ governance",
    description:
      "Stack ລວມ retrieval, agent orchestration, model routing, evaluation, observability ແລະ deployment controls.",
    stats: [
      { value: "VPC", label: "Private cloud ແລະ controlled deployment patterns" },
      { value: "Audit", label: "Logs ແລະ review paths ສຳລັບ workflow ສຳຄັນ" },
      { value: "Scorecards", label: "ວັດພຶດຕິກຳກ່ອນ ແລະ ຫຼັງ launch" },
    ],
    cardsTitle: "ຊັ້ນຂອງລະບົບ",
    cards: [
      {
        eyebrow: "Data",
        title: "Retrieval ແລະ permission layer",
        description:
          "ເຊື່ອມ documents, databases, tickets ແລະ knowledge stores ໂດຍຮັກສາ access rules ແລະ source traceability.",
      },
      {
        eyebrow: "Runtime",
        title: "Agent orchestration",
        description:
          "ວາງແຜນ tasks, ເອີ້ນ tools, validate outputs, ຂໍ approval ແລະ handoff ເມື່ອ workflow ຕ້ອງໃຊ້ຄົນ.",
      },
      {
        eyebrow: "Models",
        title: "Model routing ແລະ adaptation",
        description:
          "ເລືອກເສັ້ນທາງໂມເດວທີ່ເໝາະກັບ cost, latency, accuracy, privacy ແລະ behavior ຕາມ domain.",
      },
      {
        eyebrow: "Control",
        title: "Monitoring ແລະ evaluation",
        description:
          "ຕິດຕາມ quality, latency, hallucination patterns, escalation events, feedback ແລະ regression risk.",
      },
    ],
    rowsKicker: "ວິທີເຮັດວຽກ",
    rowsTitle: "Security ແລະ governance",
    rows: [
      {
        label: "Private",
        title: "Deploy ໃນບ່ອນທີ່ຂໍ້ມູນຢູ່ແລ້ວ",
        description:
          "ລະບົບສາມາດອອກແບບສຳລັບ VPC, private cloud ຫຼື on-premise ຕາມຄວາມຕ້ອງການ security ແລະ compliance.",
      },
      {
        label: "Controlled",
        title: "Human approvals ສຳລັບ actions ທີ່ອ່ອນໄຫວ",
        description:
          "Agent autonomy ຖືກຈຳກັດດ້ວຍ policy, confidence, workflow risk ແລະ approval points ທີ່ຊັດເຈນ.",
      },
      {
        label: "Measured",
        title: "Evaluation ກ່ອນ ແລະ ຫຼັງ launch",
        description:
          "ພວກເຮົາສ້າງ test sets, failure taxonomies ແລະ regression checks ເພື່ອໃຫ້ພຶດຕິກຳ production ມອງເຫັນໄດ້.",
      },
    ],
    proofKicker: "ຫຼັກຖານ",
    proofTitle: "ຮູບແບບ architecture",
    proof: [
      {
        sector: "Secure search",
        title: "Permission-aware retrieval",
        description:
          "ຜູ້ໃຊ້ຄົ້ນໄດ້ແຕ່ content ທີ່ມີສິດເຂົ້າເຖິງ ແລະ ຄຳຕອບຍັງຮັກສາ source context.",
        outcome: "ເຂົ້າເຖິງຄວາມຮູ້ໄດ້ດີຂຶ້ນໂດຍບໍ່ຂ້າມ governance.",
      },
      {
        sector: "Agent control",
        title: "Approval-gated automation",
        description:
          "Agents ກະກຽມ ແລະ ແນະນຳວຽກໄດ້ ໃນຂະນະທີ່ຄົນອະນຸມັດ final actions ໃນ workflow ທີ່ອ່ອນໄຫວ.",
        outcome: "ໄດ້ຄວາມໄວຂອງ automation ພ້ອມການຄວບຄຸມ.",
      },
    ],
    ctaKicker: "ຂັ້ນຕໍ່ໄປ",
    ctaTitle: "ຕ້ອງການເບິ່ງ proof patterns ບໍ?",
    ctaBody:
      "ເບິ່ງ case studies ສຳລັບ compliance, operations, research ແລະ commerce teams.",
    ctaHref: "/case-studies",
    ctaLabel: "ເບິ່ງ case studies",
  },
  "case-studies": {
    ...en["case-studies"],
    kicker: "ຜົນງານ",
    title: "ຕົວຢ່າງງານລະບົບ AI ສຳລັບ workflow ຈິງຂອງບໍລິສັດ",
    description:
      "Patterns ເຫຼົ່ານີ້ສະແດງວຽກທີ່ NativeLab AI ຖືກສ້າງມາເພື່ອເຮັດ: private knowledge, controlled agents, document intelligence ແລະ operational decision support.",
    stats: [
      { value: "4", label: "ຮູບແບບ engagement ຕົວຢ່າງ" },
      { value: "Human review", label: "ຈຸດອະນຸມັດຍັງຢູ່ໃນ workflow" },
      { value: "Traceable", label: "Outputs ເຊື່ອມກັບ source context ແລະ logs" },
    ],
    cardsTitle: "ຕົວຢ່າງງານ",
    cards: [
      {
        eyebrow: "Compliance",
        title: "Policy knowledge engine",
        description:
          "ລະບົບຄົ້ນຫາ ແລະ ຕອບຄຳຖາມທີ່ປອດໄພສຳລັບ controls, policy documents, review notes ແລະ internal guidance.",
      },
      {
        eyebrow: "Operations",
        title: "Customer operations agent",
        description:
          "Agent workflow ທີ່ກະກຽມ case summaries, ແນະນຳ next actions ແລະ escalate ສະຖານະການອ່ອນໄຫວ.",
      },
      {
        eyebrow: "Research",
        title: "Document intelligence pipeline",
        description:
          "Pipeline ທີ່ດຶງຂໍ້ມູນ, ປຽບທຽບ, ສະຫຼຸບ ແລະ route ຂໍ້ມູນຈາກເອກະສານເຕັກນິກຂະໜາດຍາວ.",
      },
      {
        eyebrow: "Commerce",
        title: "Inventory reasoning copilot",
        description:
          "ຊັ້ນ decision-support ທີ່ລວມສັນຍານ product, demand ແລະ operations ສຳລັບ planning teams.",
      },
    ],
    rowsKicker: "ວິທີເຮັດວຽກ",
    rowsTitle: "ວິທີປະເມີນທຸກ case study",
    rows: [
      {
        label: "Fit",
        title: "AI ຄວນຢູ່ໃນ workflow ນີ້ບໍ?",
        description:
          "ພວກເຮົາກວດວ່າວຽກມີ pattern ຊ້ຳ, ຂໍ້ມູນທີ່ໃຊ້ໄດ້, ຜູ້ໃຊ້ຊັດເຈນ ແລະ ມູນຄ່າທີ່ວັດໄດ້.",
      },
      {
        label: "Risk",
        title: "ມີຫຍັງອາດຜິດພາດ?",
        description:
          "ພວກເຮົາບັນທຶກ hallucination risk, bad retrieval, over-automation, privacy boundaries ແລະ review requirements.",
      },
      {
        label: "Scale",
        title: "ຫຼັງ launch ລະບົບເຮັດວຽກແນວໃດ?",
        description:
          "ພວກເຮົາກຳນົດ monitoring, ownership, feedback loops ແລະ operating processes ກ່ອນ scale usage.",
      },
    ],
    proofKicker: "ຫຼັກຖານ",
    proofTitle: "ຜົນລັບທີ່ເລືອກ",
    proof: [
      {
        sector: "Compliance",
        title: "ຄົ້ນຫາຫຼັກຖານໄດ້ໄວຂຶ້ນ",
        description:
          "ຄຳຕອບດ້ານ policy ເຊື່ອມກັບ source context ເຮັດໃຫ້ reviewer ກວດສອບໄດ້ແທນການເລີ່ມຄົ້ນໃໝ່.",
        outcome: "ຫຼຸດ manual searching ໃນ review cycles.",
      },
      {
        sector: "Operations",
        title: "ກະກຽມ case ໄດ້ສະໝ່ຳສະເໝີຂຶ້ນ",
        description:
          "Agents ກະກຽມ summaries ແລະ next steps ດ້ວຍ business rules ດຽວກັນຂ້າມທີມ.",
        outcome: "ຫຼຸດຄວາມແຕກຕ່າງຂອງວຽກປະຕິບັດການຊ້ຳ.",
      },
      {
        sector: "Research",
        title: "Structured document review",
        description:
          "ເອກະສານຍາວຖືກດຶງເປັນ fields ທີ່ສະໝ່ຳສະເໝີ, ປຽບທຽບ ແລະ route ໃຫ້ຜູ້ຊ່ຽວຊານກວດ.",
        outcome: "ຜູ້ຊ່ຽວຊານໃຊ້ເວລາຕັດສິນຫຼາຍຂຶ້ນ ແລະ ຈັດຮຽງນ້ອຍລົງ.",
      },
    ],
    ctaKicker: "ຂັ້ນຕໍ່ໄປ",
    ctaTitle: "ມີ workflow ທີ່ຄ້າຍກັນບໍ?",
    ctaBody:
      "ສົ່ງ process, data sources, users ແລະ risk constraints ມາ ພວກເຮົາຈະຊ່ວຍ map ເສັ້ນທາງລະບົບ AI ທຳອິດ.",
    ctaHref: "/contact",
    ctaLabel: "ເລີ່ມລົມກັນ",
  },
  contact: {
    ...en.contact,
    kicker: "ຕິດຕໍ່",
    title: "ເລີ່ມຈາກ workflow, data boundary ແລະ decision ທີ່ທ່ານຕ້ອງການປັບປຸງ",
    description:
      "ການສົນທະນາທຳອິດທີ່ດີຄວນຊັດເຈນ: ທີມໃດເປັນເຈົ້າຂອງ process, ຂໍ້ມູນໃດເກີ່ຍວຂ້ອງ, decision ໃດຕ້ອງການ support ແລະ risk controls ໃດຈຳເປັນ.",
    stats: [
      { value: "24-48 ຊົ່ວໂມງ", label: "ເວລາຕອບກັບທົ່ວໄປສຳລັບ inquiry ໃໝ່" },
      { value: "30 ນາທີ", label: "ຄຸຍ initial fit" },
      { value: "4-8 ອາທິດ", label: "ຊ່ວງ prototype ສຳລັບ workflow ທີ່ເໝາະສົມ" },
    ],
    cardsTitle: "ຊ່ອງທາງຕິດຕໍ່",
    cards: [
      {
        eyebrow: "ໂຄງການໃໝ່",
        title: "ຄຸຍເລື່ອງລະບົບ AI",
        description:
          "ແບ່ງປັນ workflow, users, data sources, tools ປັດຈຸບັນ ແລະ ສິ່ງທີ່ prototype ທຳອິດຄວນພິສູດ.",
      },
      {
        eyebrow: "Technical review",
        title: "ປະເມີນ AI initiative ທີ່ມີຢູ່",
        description:
          "ນຳ prototype, RAG system ຫຼື agent workflow ທີ່ມີຢູ່ມາ review ດ້ານ evaluation, risk ແລະ production planning.",
      },
      {
        eyebrow: "Partnership",
        title: "ສ້າງຮ່ວມກັບ NativeLab AI",
        description:
          "ສຳລັບ product teams, consultancies ແລະ operators ທີ່ຕ້ອງການ partner ດ້ານ AI systems ໂດຍສະເພາະ.",
      },
    ],
    rowsKicker: "ວິທີເຮັດວຽກ",
    rowsTitle: "ຄວນໃສ່ຫຍັງມາ",
    rows: [
      {
        label: "Context",
        title: "Business workflow",
        description:
          "ອະທິບາຍ process, team, user roles, decision points ແລະ ຈຸດທີ່ວຽກປັດຈຸບັນຊ້າ ຫຼື ບໍ່ສະໝ່ຳສະເໝີ.",
      },
      {
        label: "Data",
        title: "Information boundary",
        description:
          "ລະບຸ documents, systems, databases, APIs ແລະ privacy constraints ທີ່ລະບົບ AI ຕ້ອງເຄົາລົບ.",
      },
      {
        label: "Outcome",
        title: "ຜົນລັບທຳອິດທີ່ວັດໄດ້",
        description:
          "ກຳນົດວ່າ prototype ທີ່ສຳເລັດຕ້ອງພິສູດຫຍັງກ່ອນເລີ່ມ production planning.",
      },
    ],
    proofKicker: "ຫຼັກຖານ",
    proofTitle: "Engagement fit",
    proof: [
      {
        sector: "ເໝາະທີ່ສຸດ",
        title: "Workflow-specific AI systems",
        description:
          "Private knowledge systems, controlled agents, model evaluation, document intelligence ແລະ operational copilots.",
        outcome: "ເໝາະກັບທີມທີ່ມີຂໍ້ມູນຈິງ ແລະ owner ຊັດເຈນ.",
      },
      {
        sector: "ບໍ່ເໝາະ",
        title: "Generic chatbot requests",
        description:
          "ໂຄງການ chatbot ກວ້າງໆ ທີ່ເປັນ demo-only ແລະ ຂາດ data ownership, workflow context ຫຼື production requirements.",
        outcome: "ພວກເຮົາຈະຊ່ວຍຈຳກັດ scope ກ່ອນສ້າງ.",
      },
    ],
    ctaKicker: "ຂັ້ນຕໍ່ໄປ",
    ctaTitle: "ສົ່ງ workflow brief",
    ctaBody:
      "ອີເມວ process, data sources, team ແລະ intended outcome ມາ ພວກເຮົາຈະຕອບກັບພ້ອມ next step ທີ່ເໝາະສົມ.",
    ctaHref: "mailto:studio@nativelab.ai",
    ctaLabel: "ອີເມວ NativeLab AI",
  },
};

const profilePagesByLocale: Record<Locale, ProfilePageMap> = {
  en,
  th,
  lo,
  vi,
  zh,
};

export function getProfilePageContent(
  locale: Locale,
  slug: ProfilePageSlug,
): ProfilePageContent {
  return profilePagesByLocale[locale][slug];
}
