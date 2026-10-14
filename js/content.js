/* =========================================================================
   ✏️  EDIT YOUR CONTENT HERE  —  this is the only file you need to touch
   =========================================================================

   TEXT      Change anything inside "quotes".
   IMAGES    Each project has  images: ["images/a.webp", "images/b.webp"].
             The first image is the cover; extra images become a slideshow
             with arrows. Files live in the "images" folder, or paste a full
             https:// link. Use [] to show a coloured placeholder that tells
             you which field to fill.
   HIDE      Add  show: false  to a project to hide it without deleting it.
   ADD/REMOVE  Copy a whole { ... }, block inside projects / experience /
             impact and paste it where you want it. Delete a block to remove.
   COLOURS & FONT  See "theme". Any Google Font name works for `font`.
   MOTION & GAME   See "effects" and "game" near the bottom of this file.

   Other files:  index.html (page shell) · css/style.css (look and feel)
                 js/theme.js (light/dark mode) · js/main.js (builds the page)
                 js/play.js (interactions and the progress game)
                 README.md (full guide)
   ========================================================================= */

const SITE = {

  meta: {
    title: "Eseosasere Efe — Senior Product Designer",
    description: "Senior product designer with 3+ years designing web and mobile products across healthcare, AI, fintech, SaaS, marketplace and mobility."
  },

  theme: {
    font: "Geist",                 // any Google Font, e.g. "Inter Tight", "Instrument Sans"
    fontWeights: "400;500;600;700",
    paper:   "#ffffff",            // page background
    surface: "#f3f4f8",            // cards and placeholders
    ink:     "#10131f",            // main text
    muted:   "#6b6f7b",            // secondary text
    line:    "#e6e7ec",            // borders and dividers
    accent:  "#2f4bff",            // hover and focus colour

    darkMode: true,                // false removes dark mode and the toggle button
    defaultMode: "system",         // "system" (follow the visitor's device), "light" or "dark"
    dark: {                        // colours used in dark mode
      paper:   "#0c0e16",
      surface: "#161926",
      ink:     "#eef0f7",
      muted:   "#9aa0b4",
      line:    "#262b3c",
      accent:  "#8b9bff"
    }
  },

  person: {
    name: "Eseosasere Efe",
    nickname: "Exhosah",           // shown as the logo in the top bar
    title: "Senior Product Designer",
    email: "exhosah@gmail.com",
    portrait: "images/portrait.webp",  // photo for the About section (4:5 frame)
    links: [
      { label: "Behance",  url: "https://be.net/exhosahefe1" },
      { label: "LinkedIn", url: "https://linkedin.com/in/exhosah-e-985487235/" }
    ]
  },

  hero: {
    headline: "I design clear, human-centered products for complex problems.",
    intro: "Senior product designer with 3+ years across healthcare, AI, fintech, SaaS, marketplace and mobility. I lead design from discovery and UX research to prototyping, design systems and developer handoff.",
    primaryCta: "See my work",
    secondaryCta: "Email me",
    // Small draggable stickers floating beside the headline (desktop only).
    // Add, remove or rename them. Leave [] for none.
    stickers: ["Figma", "User research", "Prototyping", "Design systems"]
  },

  work: {
    heading: "Selected work",
    intro: "Landing pages, dashboards and AI products I've designed.",
    slideSeconds: 4.5,   // seconds each image stays up in a project slideshow
    projects: [
      {
        name: "EaseDrive",
        kind: "Ride-hailing shuttle booking platform",
        year: "Mar 2025 – Aug 2025",
        tags: ["Mobile", "Web", "Marketplace"],
        images: ["images/easedrive.webp"],
        summary: "End-to-end design of a responsive shuttle booking platform: 70+ high-fidelity screens across passenger, driver, admin and marketing experiences. A multi-driver offer flow lets passengers compare offers before confirming a ride.",
        link: "", linkLabel: ""
      },
      {
        name: "VitaLink",
        kind: "Healthcare equipment marketplace with an AI assistant",
        year: "Sep 8 – 10, 2026",
        tags: ["Healthcare", "Marketplace", "AI"],
        images: ["images/vitalink-landing.webp", "images/vitalink-ai-chat.webp"],
        summary: "A marketplace for finding healthcare equipment from verified sellers. The landing page leads with a search and AI discovery prompt, and the signed-in experience is a chat where VitaLink AI recommends products with price, stock and verification details. Designed in a three-day sprint.",
        link: "", linkLabel: ""
      },
      {
        name: "Xpress Learner AI",
        kind: "AI video response generator",
        year: "Jan 2025 – Mar 2025",
        tags: ["AI", "EdTech", "Desktop app", "Landing page"],
        images: ["images/xpress-learner-ai.webp"],
        summary: "An AI-powered video response generator that makes educational content more accessible and interactive, with video and text feedback formats users can choose between. Covers the desktop app, landing page and features.",
        link: "https://xpress-ai.netlify.app/login", linkLabel: "Open the product"
      },
      {
        name: "Mycaban",
        kind: "Housing marketplace and agent dashboard",
        year: "Oct 2024 – Dec 2024",
        tags: ["Real estate", "Web", "Dashboard"],
        images: ["images/mycaban-landing.webp", "images/mycaban-schedule.webp"],
        summary: "A housing platform that connects property owners with buyers and renters. The landing page centres on property search by location, type and price, and the agent dashboard includes a weekly schedule for site inspections.",
        link: "", linkLabel: ""
      },
      {
        name: "SurePlugs",
        kind: "Electronics e-commerce platform",
        year: "Aug 2026 – Present",
        tags: ["E-commerce", "Web", "Rewards"],
        images: ["images/sureplugs-home.webp", "images/sureplugs-benefits.webp"],
        summary: "An electronics store with a category-led home page and a rewards layer: shoppers earn points by completing tasks and can share a birthday wishlist with friends.",
        link: "", linkLabel: ""
      },
      {
        name: "Flex Living",
        kind: "Landing page for Base360.AI, short-term rental automation",
        year: "May 2025",
        tags: ["AI", "SaaS", "Landing page"],
        images: ["images/flex-living.webp"],
        summary: "A landing page for an AI platform that automates short-term rentals, covering bookings, pricing, guest communication, compliance and analytics in one dashboard.",
        link: "", linkLabel: ""
      },
      {
        name: "Bclics",
        kind: "Marketplace: mobile app, landing page and admin dashboard",
        year: "Feb 2025 – Jan 2026",
        tags: ["Mobile app", "Landing page", "Dashboard"],
        images: ["images/bclics-admin.webp"],
        summary: "A full project for the Bclics marketplace, covering a mobile app, a landing page and an admin dashboard. The dashboard shown here is dark, with key totals, an adverts chart and a quick-action panel for reviewing reports, approving payouts, verifying sellers and handling scam alerts.",
        link: "", linkLabel: ""
      },
      {
        name: "BeckyShops",
        kind: "Full website for a social-selling platform",
        year: "Mar 2025",
        tags: ["E-commerce", "Website", "Landing page"],
        images: ["images/beckyshops.webp"],
        summary: "I designed the full website for BeckyShops, a platform that gives sellers one shareable store link so buyers can order through WhatsApp, Instagram DM or email. The landing page leads with that promise and previews the seller dashboard.",
        link: "", linkLabel: ""
      },
      {
        name: "Prepora",
        kind: "Exam question practice platform",
        year: "Aug 2026 – Present",
        tags: ["EdTech", "Web", "Dark mode"],
        images: ["images/prepora.webp"],
        summary: "A question bank for exam practice. This screen shows the wrong-answer state: the chosen option is flagged, and an explanation with a worked example appears below, next to a discussion thread.",
        link: "", linkLabel: ""
      },
      {
        name: "AIIS",
        kind: "AI document verification landing page",
        year: "Apr 2025 – May 2025",
        tags: ["AI", "Landing page", "Bold type"],
        images: ["images/ai-document-verification.webp"],
        summary: "A bold, high-contrast landing page for an AI service that verifies visa applications, passports and immigration paperwork, with two clear actions: upload documents or view a sample report.",
        link: "", linkLabel: ""
      },

      /* ---- Hidden for now (no images yet). Remove "show: false" to bring one back. ---- */
      {
        show: false,
        name: "Medical consultation platform", kind: "UX audit and redesign", year: "2026",
        tags: ["Healthcare", "Web", "UX audit"], images: [],
        summary: "A UX audit and redesign of a healthcare platform that connects patients, doctors, pharmacies, HMOs and laboratories. The audit's prioritized recommendations shaped the redesign of key journeys.",
        link: "", linkLabel: ""
      },
      {
        show: false,
        name: "Artivio", kind: "Artisan marketplace", year: "Mar 2026 – Aug 2026",
        tags: ["Marketplace", "Web", "Mobile"], images: [],
        summary: "A digital marketplace connecting customers with skilled artisans across web and mobile. I designed the client and artisan journeys, from discovery and negotiation to payments, job progress, completion and wallet, including an escrow-based payment workflow that holds funds until the customer confirms the job is done.",
        link: "https://artivios.com/", linkLabel: "Visit Artivio"
      },
      {
        show: false,
        name: "AI Interview Preparation Platform", kind: "Don-Clem Technology", year: "2025",
        tags: ["AI", "Web", "User research"], images: [],
        summary: "Research-led design of an AI interview preparation platform with curated learning paths, which reached a 15% completion rate.",
        link: "https://donclemtech.com/", linkLabel: "Visit Don-Clem Technology"
      },
      {
        show: false,
        name: "PalsConnect", kind: "Website, waitlist, chat app UI and CRM dashboard", year: "2024",
        tags: ["Web", "Mobile", "Dashboard"], images: [],
        summary: "Redesigned the website and waitlist to lift engagement by 20%, and designed a CRM dashboard for transactions, affiliate payments and user support.",
        link: "https://palsconnects.com/", linkLabel: "Visit PalsConnect"
      },
      {
        show: false,
        name: "Orello Tracker", kind: "Task management plugin and marketing website", year: "2025",
        tags: ["SaaS", "Plugin", "Design system"], images: [],
        summary: "A task management dashboard and analytics workflows for designers and teams, backed by a reusable component library shared across the plugin and the marketing site.",
        link: "", linkLabel: ""
      }
    ]
  },

  impact: {
    heading: "Results from the work",
    items: [
      { text: "70+ high-fidelity screens designed across passenger, driver, admin and marketing experiences.", source: "EaseDrive" },
      { text: "Development timelines sped up by 25% by working closely with developers on design changes.", source: "Don-Clem Technology" },
      { text: "Engagement up 20% after redesigning the website and waitlist.", source: "PalConnects" },
      { text: "User satisfaction up 30% after research-led refinements to the interface.", source: "Orello Tracker" },
      { text: "User engagement up 25% with an AI-powered video response generator.", source: "Xpress Learner AI" },
      { text: "Task completion time down 20% after usability testing and workflow refinements.", source: "Xpress Learner AI" },
      { text: "Revision cycles cut by 25% through close collaboration with developers and stakeholders.", source: "PalConnects" }
    ]
  },

  about: {
    heading: "About",
    lead: "I'm a product designer who enjoys untangling complex problems. I work with cross-functional teams to deliver scalable digital experiences that improve usability, engagement and business outcomes.",
    // Numbers count up when they scroll into view. value = number, suffix = "+" or "%".
    stats: [
      { value: 3,  suffix: "+", label: "Years of product design" },
      { value: 70, suffix: "+", label: "High-fidelity screens on EaseDrive" },
      { value: 7,  suffix: "",  label: "Teams and products worked on" },
      { value: 30, suffix: "%", label: "Satisfaction lift from research and usability testing" }
    ],
    details: [
      { label: "Expertise", items: [
        "User research and analysis", "UI and UX design", "Prototyping and wireframing",
        "Responsive design", "Design system implementation", "Minimalistic UI design",
        "User-centered design", "Agile workflow" ] },
      { label: "Skills", items: [
        "Communication", "Collaboration", "Design-to-dev handoff",
        "Interactive prototyping", "WCAG 2.1 accessibility compliance" ] },
      { label: "Certifications", items: [
        "Genesys Upskill", "UI/UX design course, Dreamaxhq", "HNG11 Internship",
        "Claude Code", "McKinsey Forward Program" ] },
      { label: "Education", items: [
        "B.Eng Civil Engineering, University of Benin, 2019–2024 (Second Class Upper)",
        "Maritime studies and ICT, University of Benin, 2017–2019 (Second Class Upper)" ] }
    ]
  },

  experience: {
    heading: "More Experience",
    items: [
      {
        company: "Artivio", role: "UI/UX Designer", location: "Artisan App",
        dates: "Mar 2026 – Aug 2026", logo: "", link: "https://artivios.com/",
        bullets: [
          "Designed a digital marketplace connecting customers with skilled artisans across web and mobile experiences.",
          "Designed client and artisan journeys covering discovery, negotiation, payments, job progress, completion, and wallet management.",
          "Designed an escrow-based payment workflow where funds are held by the platform until the customer confirms job completion.",
          "Created distinct experiences for clients and artisans while maintaining consistency through reusable components and design patterns.",
          "Developed responsive interfaces and interactive prototypes to communicate product behavior and workflows to stakeholders and developers."
        ]
      },
      {
        company: "Medical Consultation Platform", role: "Design Auditor", location: "",
        dates: "Jan 2026 – Mar 2026", logo: "",
        bullets: [
          "Collaborated with stakeholders to understand business goals and user pain points before starting the redesign.",
          "Conducted a comprehensive UX audit that identified usability issues, inconsistencies and workflow bottlenecks.",
          "Produced actionable recommendations that shaped the redesign strategy and prioritized high-impact improvements.",
          "Redesigned key journeys and components for a more intuitive, accessible and efficient healthcare experience."
        ]
      },
      {
        company: "EaseDrive", role: "Product Designer", location: "Enugu (Remote)",
        dates: "Mar 2025 – Aug 2025", logo: "",
        bullets: [
          "Led end-to-end design of a responsive shuttle booking platform: 70+ high-fidelity Figma screens across passenger, driver, admin and marketing experiences.",
          "Designed journeys for three user roles covering onboarding, ride booking, driver bidding, payments, earnings, support and verification.",
          "Introduced a multi-driver offer workflow so passengers can compare offers before confirming, increasing transparency and control.",
          "Designed loading, empty, success, error and 404 states, email templates and onboarding, and produced developer-ready specs, annotations and flows."
        ]
      },
      {
        company: "Don-Clem Technology", role: "Product Designer", location: "UK (Remote)",
        dates: "Feb 2025 – Oct 2025", logo: "",
        bullets: [
          "Led design on two major projects, including an AI Interview Preparation Platform, grounded in in-depth user research.",
          "Directed a team of interns, improving project delivery efficiency by 15%.",
          "Worked with developers to implement design changes, shortening feedback loops and speeding development timelines by 25%.",
          "Curated learning paths reached a 15% completion rate."
        ]
      },
      {
        company: "Xpress Learner AI", role: "Product Designer", location: "Enugu (Remote)",
        dates: "Jan 2025 – Mar 2025", logo: "",
        bullets: [
          "Designed an AI-powered video response generator, increasing user engagement by 25%.",
          "Built the UI for video and text-based feedback so users can receive responses in the format they prefer.",
          "Refined workflows through usability testing, cutting task completion time by 20%.",
          "Worked with engineers on video processing speed, improving response delivery time by 15%."
        ]
      },
      {
        company: "Orello Tracker", role: "Product Designer", location: "UK (Remote)",
        dates: "Jan 2025 – Feb 2025", logo: "",
        bullets: [
          "Led end-to-end design of the plugin and its marketing website, including a task management dashboard and analytics workflows.",
          "Ran user research and usability testing, which raised user satisfaction by 30%.",
          "Created a scalable design system and reusable component library for consistency across the plugin and the website."
        ]
      },
      {
        company: "PalConnects", role: "Product Designer", location: "UK (Remote)",
        dates: "Nov 2024 – Feb 2025", logo: "",
        bullets: [
          "Redesigned the PalsConnect website and waitlist, increasing engagement by 20% through streamlined navigation and responsive design.",
          "Designed the CRM dashboard for transaction management, affiliate payments and user support.",
          "Used research and usability testing to find pain points, improving efficiency and satisfaction by 30%.",
          "Collaborated with developers and stakeholders, reducing revision cycles by 25%."
        ]
      }
    ]
  },

  /* -----------------------------------------------------------------------
     RESEARCH AND USER FLOWS  (built from the working boards)
     Each product has: a summary, stats, findings, and diagrams.
       type "flow": nodes { id: ["Label", "s" | "e" | "d"] }  (s start, e end, d decision)
                    edges "a>b b>c:Yes b>d:No"  (use _ for spaces in an edge label)
       type "tree": a sitemap, ["Root", [ "Leaf", ["Section", ["Leaf", "Leaf"]] ]]
     Add  board: "https://www.figma.com/board/..."  to show an "Open the full board" link
     (only do this if the board is shared publicly).
     ----------------------------------------------------------------------- */
  research: {
    heading: "Research and user flows",
    intro: "The thinking behind the interfaces: competitor research, the problems users face, sitemaps and user flows from my working boards.",
    products: [

      /* ============================== ARTISAN ============================== */
      {
        name: "Artivio",
        kind: "Artisan marketplace connecting artisans and clients",
        summary: "Research for Artivio, a platform that connects artisans such as electricians and plumbers with clients who need them. I compared seven competing services, mapped the problems both sides face, and turned them into an MVP feature set, four sitemaps and two user flows.",
        stats: [["7", "competitors reviewed"], ["11", "user problems mapped"], ["4", "sitemaps"], ["2", "user flows"]],
        competitors: ["Fixit.ng", "Thumbtack", "TaskRabbit", "CheckArtisan", "Jiji Services", "Wrkman", "Power Now"],
        findings: [
          { group: "Artisans", rows: [
            ["Inconsistent job flow, with work coming from word of mouth", "Task matching with job-frequency tracking and a visibility boost for active artisans"],
            ["No digital portfolio to show their work", "Profiles with media uploads, client reviews and skill tags"],
            ["Late or missing payments", "In-app escrow and milestone-based payment releases"],
            ["Hard to stand out or prove credibility", "Verified badge, ratings from past clients and tiered profile levels"],
            ["Limited access to digital tools, often basic phones", "Mobile-first design that works on low-end devices, with simple UX"]
          ] },
          { group: "Clients", rows: [
            ["Trust issues: fear of theft, poor work and scams", "Vetting, ID verification, reviews and ratings"],
            ["Poor communication and no updates", "In-app chat, job status updates and automated reminders"],
            ["No pricing transparency", "Pricing estimator, average rate ranges and a quote request system"],
            ["Unpredictable service quality", "Portfolio view, reviews, skill tiers and a verification badge"],
            ["Overwhelmed by unfiltered listings", "Smart filters for location, rating, price, availability and skills"],
            ["No protection when a job goes badly", "A platform-backed resolution process or guarantee"]
          ] }
        ],
        mvp: { title: "MVP features", groups: [
          { label: "For artisans", items: ["Simple registration and verification", "Profile with skills, service area and portfolio", "Job notifications and acceptance", "In-app chat with clients", "Wallet and payment integration", "Task history and ratings"] },
          { label: "For clients", items: ["Service search and filters", "Job request history", "Artisan profiles", "Booking and scheduling", "Chat with the artisan", "Payment system"] }
        ] },
        diagrams: [
          {
            title: "Artisan user flow", type: "flow",
            nodes: {
              s: ["Start", "s"], su: ["Sign up and verification"], pr: ["Profile and bio setup: location, contact"], li: ["Log in"],
              db: ["Dashboard overview"], nt: ["Notifications: job requests"], ac: ["Accept booking?", "d"],
              ch: ["Chat with the client"], cp: ["Confirm payment"], rs: ["Render the service"],
              er: ["Earnings"], ps: ["Payment setup"], we: ["Withdraw earnings"],
              st: ["Settings and verification"], id: ["Profile settings and ID upload"],
              hs: ["Help and support"], mq: ["Report an issue and get feedback"], e: ["End", "e"]
            },
            edges: "s>su s>li su>pr pr>li li>db li>nt li>er li>st li>hs nt>ac ac>ch:Yes ac>e:No ch>cp cp>rs rs>e er>ps ps>we we>e st>id id>e hs>mq mq>e db>e"
          },
          {
            title: "Client user flow", type: "flow",
            nodes: {
              s: ["Start", "s"], su: ["Sign up and verification"], pr: ["Profile and bio setup: location, contact"], li: ["Log in"],
              db: ["Dashboard overview"], sv: ["Search services and view profiles"], bk: ["Book service?", "d"],
              ch: ["Chat with the artisan"], pay: ["Pay before the service is rendered"], rv: ["Leave a review and rate the service"],
              bn: ["Bookings and notifications"], ck: ["Check booking updates and confirmations"], tr: ["Track service progress"],
              py: ["Payments"], sp: ["Set up payment"], est: ["View artisan charges?", "d"], hist: ["Payment and invoice history"],
              stg: ["Settings and verification"], ps: ["Profile settings, delete or deactivate account"],
              hs: ["Help and support"], mq: ["Report an issue and get feedback"], e: ["End", "e"]
            },
            edges: "s>su s>li su>pr pr>li li>db li>sv li>bn li>py li>stg li>hs sv>bk bk>ch:Yes bk>e:No ch>pay pay>rv rv>e bn>ck ck>tr tr>e py>sp sp>est est>bk:Yes est>hist:No hist>e stg>ps ps>e hs>mq mq>e db>e"
          },
          {
            title: "Landing page sitemap", type: "tree",
            tree: ["Landing page", [
              ["Header (sticky)", ["Logo", "Menu: home, browse, categories, about, support", "Sign in, Join as artisan, Hire an artisan"]],
              ["Hero section", ["Headline and subtext", "Search bar: service and location", "Get started button", "Popular services and View all categories"]],
              ["How it works", ["Search and browse", "Book and schedule", "Get the job done", "Testimonials and call to action"]],
              ["Why choose us", ["Verified artisans, secure payments, real reviews", "Featured artisans with rating and Hire button"]],
              ["Footer", ["Quick links", "Terms of use and privacy policy", "Social media icons"]]
            ]]
          },
          {
            title: "Artisan app sitemap", type: "tree",
            tree: ["Artisan app", [
              ["Authentication", ["Sign up with skill selection, or log in", "Phone or email, password and country", "ID upload for verification (can be skipped)", "Forgotten password"]],
              ["Home and dashboard", ["Quick stats: earnings today, jobs in progress", "New job opportunities", "Go online or offline toggle"]],
              ["Job requests", ["Incoming requests: accept or reject", "Active jobs", "Completed jobs", "Cancelled jobs"]],
              ["My profile", ["Photo, bio and skills", "ID and certification upload", "Experience and portfolio", "Ratings and reviews summary", "Availability and working hours"]],
              ["Earnings", ["Wallet balance, earnings, pending payment", "Withdraw funds"]],
              ["Messages", ["Chat with clients", "Job-related messages"]],
              ["Notifications", ["Job offers, reviews and system alerts"]],
              ["Settings", ["Account info", "Change password", "Notification preferences", "Delete or deactivate account"]]
            ]]
          },
          {
            title: "Client app sitemap", type: "tree",
            tree: ["Client app", [
              ["Authentication", ["Sign up with optional preferences, or log in", "Forgot password", "Phone or email verification"]],
              ["Home", ["Featured artisans: top rated nearby", "Quick categories", "Search with location filter", "Promotions and offers"]],
              ["Search and booking", ["Filter by skill, location, rating, availability, price", "Artisan profile cards: reviews, skills, portfolio", "Save artisan to favourites", "Book now or schedule a job"]],
              ["Booked services", ["Ongoing jobs: track, chat, rate, cancel", "Past jobs: history and rating"]],
              ["Chat and notifications", ["In-app messaging with the artisan", "Booking updates and confirmations"]],
              ["Payments", ["Set payment method", "Pay through escrow, release on completion", "Invoices, receipts and history"]],
              ["Settings", ["Account info and address book", "Notification preferences", "Log out or deactivate"]],
              ["Support and help", ["FAQ", "Report an issue", "Request a refund or escalate", "Contact support by chat or call"]]
            ]]
          },
          {
            title: "Admin dashboard sitemap", type: "tree",
            tree: ["Admin dashboard", [
              ["Authentication", ["Admin login with 2FA and role-based access", "Forgot password"]],
              ["Dashboard overview", ["KPIs: users, active bookings, revenue, disputes", "Real-time activity feed", "Pending approvals: artisans, payments, escalations"]],
              ["User management", ["View all clients, suspend or reactivate", "All artisans: approve and verify documents", "Activity logs, warnings and system messages"]],
              ["Bookings management", ["View bookings filtered by status", "Assign or reassign an artisan", "Cancel or edit bookings", "Resolve conflicts and disputes"]],
              ["Service categories", ["Add, edit or delete categories", "Set suggested prices", "Tag skill-level requirements"]],
              ["Payments and transactions", ["Monitor in-app payments and payouts", "Manage wallets and refunds", "Commission reports and payment log export", "Payment gateway integration"]],
              ["Reports and analytics", ["Revenue reports", "Popular services and regions", "User growth and retention", "Engagement metrics and exportable charts"]],
              ["Promotions and notifications", ["Push notification manager", "Offers and referral bonuses", "SMS and email campaign tools"]],
              ["Settings", ["General platform settings", "Roles and permissions", "Notification settings"]]
            ]]
          }
        ]
      },

      /* ============================== wiGo MARKET ============================== */
      {
        name: "wiGo Market",
        kind: "Campus marketplace for students, vendors and riders",
        summary: "Research for a student-only marketplace with three kinds of user: buyers, sellers and delivery riders. I compared five competitors on audience, features, weaknesses and brand colour, then designed a separate flow for each role.",
        stats: [["5", "competitors reviewed"], ["3", "user roles"], ["3", "user flows"]],
        competitors: ["Jumia", "Konga", "Sabi by Rensource", "CampusMall NG", "Glovo and Bolt Food"],
        cols: ["Gap in the market", "Design response"],
        findings: [
          { group: "What competitors miss and how wiGo answers it", rows: [
            ["Jumia and Konga are not student-specific, and delivery to campuses is slow", "A campus-only delivery network that uses verified riders"],
            ["Konga gives little focus to student affordability or small vendors", "Affordable pricing for student budgets"],
            ["Sabi serves informal vendors but is not designed for students", "An on-campus marketplace that supports student entrepreneurs and local vendors"],
            ["CampusMall NG has limited product variety and few logistics integrations", "Buyers, sellers and riders connected in one flow"],
            ["Glovo and Bolt Food deliver fast but are not tailored to campus life", "Student verification with a matric number or student ID, plus real-time order tracking"]
          ] }
        ],
        diagrams: [
          {
            title: "Buyer flow", type: "flow",
            nodes: {
              s: ["Start", "s"], su: ["Sign up as a student: email, phone, matric number"], li: ["Log in with email or matric number"],
              vf: ["Verify with school ID or a selfie (optional)"], br: ["Browse or search products, view details and delivery time"],
              po: ["Place order", "d"], sp: ["Self pickup: confirm and pay"], loc: ["Courier: select delivery location and details"],
              fee: ["Delivery fee added to the total"], cp: ["Confirm delivery and pay"], td: ["Track or cancel delivery?", "d"],
              vg: ["Verify goods received from the rider"], st: ["Settings, profile and payment method setup"],
              nt: ["Notifications and delivery tracking"], e: ["End", "e"]
            },
            edges: "s>su s>li su>vf su>li vf>br li>br li>st li>nt br>po po>sp:Self po>loc:Courier sp>e loc>fee fee>cp cp>td td>vg:Track vg>e st>e nt>e"
          },
          {
            title: "Seller flow", type: "flow",
            nodes: {
              s: ["Start", "s"], su: ["Sign up as a seller: verification, email, phone"], li: ["Log in with email and password"],
              vf: ["Selfie (optional) and store location setup"], db: ["Seller dashboard"],
              pm: ["Product management: add, edit, remove, set pricing, stock and delivery options"],
              oh: ["Order handling: get notified, mark ready for pickup"], cf: ["Confirm buyer payment?", "d"],
              tk: ["Track the order until the buyer verifies delivery"], td: ["Track deliveries: assign a rider, resolve issues"],
              sa: ["Sales analytics: earnings and reviews"], stg: ["Settings, profile and payment method setup"], e: ["End", "e"]
            },
            edges: "s>su s>li su>vf su>li vf>db li>db db>pm db>oh db>td db>sa db>stg oh>cf cf>tk:Yes cf>e:No tk>e pm>e td>e sa>e stg>e"
          },
          {
            title: "Rider flow", type: "flow",
            nodes: {
              s: ["Start", "s"], su: ["Sign up: email, phone, bike and licence info"], li: ["Log in with email and password"],
              vf: ["Verify with OTP or a selfie (optional)"], er: ["Earnings and reviews: daily earnings, trips, reviews"],
              nb: ["Notified of nearby pickups"], ord: ["Accept the order?", "d"],
              pk: ["Pick up from the vendor and navigate to the student"], dl: ["Deliver and confirm in the app: photo or OTP"],
              rp: ["Receive payment"], wd: ["Set up withdrawal: bank or wallet"], stg: ["Settings, profile and payment method setup"], e: ["End", "e"]
            },
            edges: "s>su s>li su>vf su>li vf>er li>er er>nb er>wd er>stg nb>ord ord>pk:Accept ord>e:Reject pk>dl dl>rp rp>e wd>e stg>e"
          }
        ]
      },

      /* ============================== PALSCONNECT ============================== */
      {
        name: "PalsConnect",
        kind: "Admin and affiliate CRM dashboard for a VoIP app",
        summary: "Information architecture for the admin and affiliate sides of PalsConnect, a VoIP app with an affiliate programme. The work covers sitemaps for admins and affiliates, separate admin views for accountants, configuration officers and technical support, and a user flow for each side.",
        stats: [["5", "sitemaps"], ["3", "role-based admin views"], ["2", "user flows"]],
        cols: ["Need", "Design decision"],
        findings: [
          { group: "How the structure answers each need", rows: [
            ["One admin area, several jobs", "Role-based admin sitemaps for an accountant, a configuration officer and technical support"],
            ["Admins need the whole picture at a glance", "A dashboard with total revenue, top affiliates by clicks, active and inactive users, in-app purchase earnings and engagement"],
            ["Affiliates need to see what they have earned", "An affiliate dashboard with current earnings, referral link, commission, referrals and clicks, plus payment requests"],
            ["Money movements need a clear trail", "Payment history that can be filtered by name and date, with payment methods and invoices"],
            ["The team needs to understand growth", "Analytics for revenue trend, sign-up traffic, app and affiliate performance, location heatmaps and PDF or CSV export"],
            ["Affiliates should stay motivated and informed", "Notifications for payments received, new sub-affiliates and milestones, and alerts for overdue payouts"]
          ] }
        ],
        diagrams: [
          {
            title: "Admin user flow", type: "tree",
            tree: ["Sign up and log in", [
              ["Dashboard", ["Total earnings", "Total app downloads", "Affiliate clicks and referrals", "App users: active and inactive", "General app trend and progress"]],
              ["Affiliates", ["Total, active and inactive affiliates", "Affiliate data with filters", "Sub-affiliates and their earnings"]],
              ["Analysis", ["App earnings analysis", "Sign-up traffic", "App download metrics", "Affiliate performance data"]],
              ["Payments", ["Payment history of affiliates", "Filter by name, date and more"]],
              ["Notification", ["View CRM notifications", "Delete a notification"]],
              ["Settings", ["Set commission rates", "Update payout methods", "Toggle notifications on or off", "Assign permissions to affiliates", "Personal settings, then save changes"]]
            ]]
          },
          {
            title: "Affiliate user flow", type: "tree",
            tree: ["Sign up and log in", [
              ["Dashboard", ["Current earnings", "Affiliate link", "Commission", "Referrals", "Clicks"]],
              ["Sub-affiliate", ["Active sub-affiliates", "Inactive sub-affiliates", "Sub-affiliate data"]],
              ["Payment", ["Recent payment request", "Payment history", "Manage payment method"]],
              ["Notification", ["Payment received", "Sub-affiliate registered", "Milestone achieved"]],
              ["Settings", ["Personal settings", "Log out"]]
            ]]
          },
          {
            title: "Admin sitemap", type: "tree",
            tree: ["Admin interface", [
              "Sign up or log in",
              ["Dashboard", ["Total revenue from the VoIP app", "Top affiliates by clicks", "Active and inactive users", "In-app purchase earnings", "User engagement"]],
              ["Affiliate", ["Total, active and inactive affiliates", "Sub-affiliates and their earnings", "Affiliate data table with filters", "Affiliate profile and referrals", "Assign referral codes and links"]],
              ["Analytics", ["Revenue trend and sign-up traffic", "App performance and transaction success rate", "Affiliate performance and earnings charts", "Location heatmaps", "Export to PDF or CSV"]],
              ["In-app purchase", ["Track VoIP credit, utilities, data, TV and airtime", "Set discount offers", "Monitor failed payments"]],
              ["Payments", ["Total payments", "Payment history to affiliates, filterable", "Payment method and invoices"]],
              ["Notification", ["Targeted notifications to users", "Alerts for pending or overdue payouts", "Milestone and commission updates"]],
              ["Settings", ["Commission rates and rules", "Roles and permissions", "Notification toggles", "Personal settings and logout"]],
              ["Help center", ["Contact access link", "Chat support", "FAQs"]]
            ]]
          },
          {
            title: "Affiliate sitemap", type: "tree",
            tree: ["Affiliate interface", [
              "Sign up or log in",
              ["Dashboard", ["Current earnings and request payment", "Affiliate link", "Commission", "Referrals", "Clicks"]],
              ["Sub-affiliate", ["Active sub-affiliates", "Sub-affiliate data: name, ID, email, earnings, status"]],
              ["Payments", ["Recent payment request", "Payment history", "Manage payment method"]],
              ["Notification", ["Payment received", "Sub-affiliate registered", "Milestone achieved: time to cash out"]],
              ["Settings", ["Personal settings: account, profile", "Log out"]]
            ]]
          }
        ]
      },

      /* ============================== XPRESS LEARNER AI ============================== */
      {
        name: "Xpress Learner AI",
        kind: "AI learning companion with real-time video responses",
        summary: "Research for an AI assistant that answers in real-time video as well as text. I reviewed twelve AI video, chat and learning tools, then mapped the sitemap and the path from sign-up to the chat workspace.",
        stats: [["12", "products reviewed"], ["1", "sitemap"], ["1", "user flow"]],
        competitors: ["Synthesia", "Pictory", "Replika", "Runway ML", "DeepBrain AI", "Perplexity", "Claude", "ChatGPT", "GoReact", "Sibme", "Hyperspace", "StudyFetch"],
        cols: ["Gap in the market", "Design response"],
        findings: [
          { group: "What existing tools miss and how Xpress answers it", rows: [
            ["Text-first AI tools like Perplexity, ChatGPT and Claude lack video interaction and structured learning feedback", "Conversational AI with real-time video responses, alongside text"],
            ["Video feedback tools like GoReact and Sibme are built for educators and higher education, and can feel complex", "A chat-style workspace where learners write a prompt and watch the answer"],
            ["Immersive tools like Hyperspace need specialised hardware", "A product that works without extra hardware"],
            ["Study aids like StudyFetch focus on flashcards and quizzes", "Help beyond revision: writing, code, brainstorming and knowledge retrieval"],
            ["Learners need to revisit what they have learned", "Saved responses and the ability to pause, play and replay videos"]
          ] }
        ],
        diagrams: [
          {
            title: "User flow", type: "flow",
            nodes: {
              s: ["Start", "s"], su: ["Sign up"], li: ["Log in: name, email, password"], wt: ["Show welcome tutorial?", "d"],
              wd: ["Watch the dashboard overview"], db: ["Dashboard: chat interface"],
              ip: ["Input a prompt: text, video, .docx or csv"], fb: ["Feedback, depending on the query"],
              sr: ["Previous and saved responses"], sub: ["Subscription management"], vp: ["View pricing and make payment"],
              ps: ["Profile settings"], pe: ["Set up or edit profile"], lo: ["Delete account or log out"], e: ["End", "e"]
            },
            edges: "s>su s>li su>li li>wt wt>wd:Yes wt>db:Skip wd>db db>ip db>sr db>sub db>ps sr>ip ip>fb sub>vp ps>pe pe>lo fb>e vp>e lo>e"
          },
          {
            title: "Sitemap", type: "tree",
            tree: ["Xpress Learner AI", [
              ["Login and sign up", ["Registration form: name, email, password", "Other sign-up methods", "Link to create an account", "Forgot account and recovery"]],
              ["Website", ["Hero section with a short description", "Calls to action: get started, try for free", "Key features overview", "Pricing plan: free trial, upgrades, comparison"]],
              ["Dashboard", ["Chat interface with real-time video responses", "Previous and saved responses", "Subscription management", "Profile settings and personalisation"]]
            ]]
          }
        ]
      },

      /* ============================== ORELLO TRACKER ============================== */
      {
        name: "Orello Tracker",
        kind: "Activity-tracking plug-in for teams",
        summary: "Flows for a plug-in that tracks active time. One covers an individual joining with an invitation link. The other covers a team, from sending invites to analytics, projects and settings.",
        stats: [["2", "user flows"]],
        cols: ["Need", "Design response"],
        findings: [
          { group: "How the flows answer each need", rows: [
            ["Tracking should start with almost no setup", "Paste an invitation link and Orello starts tracking active time"],
            ["Teams need to see who is active", "Send invites; once accepted, the plug-in tracks each member's activity and active time"],
            ["Data is only useful when it is readable", "A dedicated Tracking Analytics area with reports and trends"],
            ["Day-to-day work should live in one place", "A workspace for projects and teams, with search, home, Orello AI and saved items, and integrations in settings"]
          ] }
        ],
        diagrams: [
          {
            title: "Individual flow", type: "flow",
            nodes: {
              s: ["Start", "s"], su: ["Sign up"], li: ["Log in: name, email, password"], pi: ["Paste the invitation link"],
              tr: ["Orello starts tracking the user's active time"], e: ["End", "e"]
            },
            edges: "s>su s>li su>pi li>pi pi>tr tr>e"
          },
          {
            title: "Team flow", type: "flow",
            nodes: {
              s: ["Start", "s"], su: ["Sign up"], li: ["Log in: name, email, password"], inv: ["Send invite?", "d"],
              ac: ["Users accept the invite"], trk: ["Plug-in tracks users' activity and active time"],
              gen: ["General: search, home, Orello AI, saved"], ws: ["Workspace: projects, teams"],
              an: ["Tracking analytics: reports, trends"], se: ["Settings: integration, profile, logout"], e: ["End", "e"]
            },
            edges: "s>su s>li su>li li>inv inv>ac:Yes inv>gen inv>ws inv>se ac>trk trk>an gen>e ws>e an>e se>e"
          }
        ]
      }
    ]
  },

  contact: {
    heading: "Have a product to design? Let's talk."
  },

  /* Turn any effect off with false. Effects switch themselves off on touch
     screens and for visitors who prefer reduced motion. */
  effects: {
    progressBar: true,   // thin bar at the top that fills as you scroll
    cursor: true,        // trailing ring cursor that grows over links
    magnetic: true,      // buttons lean toward the cursor
    tilt: true,          // project covers tilt with a light glare
    stickers: true,      // draggable stickers in the hero
    scrollSpeed: true,   // marquees speed up while you scroll
    countUp: true,       // stats count up
    game: true,          // XP, levels, achievements, rewards (bottom-left)
    stars: true,         // 8 hidden stars to find and collect
    hunt: true,          // the Pixel Hunt mini-game in the progress panel
    coverMotion: true    // project images drift and auto-advance like a video
  },

  /* ---------------------------------------------------------------------
     THE GAME. Visitors earn XP, level up, unlock accent colours, find hidden
     stars and play a 20-second mini-game. Edit any text or number below.
     --------------------------------------------------------------------- */
  game: {
    // XP needed to reach each level. Add or remove rows freely.
    levels: [
      { name: "Newcomer",     xp: 0 },
      { name: "Explorer",     xp: 40 },
      { name: "Insider",      xp: 110 },
      { name: "Regular",      xp: 200 },
      { name: "Collaborator", xp: 320 },
      { name: "Legend",       xp: 480 }
    ],

    // XP awarded for each kind of action.
    xp: { section: 10, achievement: 25, star: 15, huntPerPoint: 3 },

    huntTarget: 25,      // Pixel Hunt score needed for the "Sharpshooter" achievement

    completeMessage: "You've seen it all. Let's work together.",

    // Accent colours unlocked as visitors level up (level = level number needed).
    // "light" is used in light mode, "dark" in dark mode.
    accents: [
      { name: "Mint",   light: "#087f60", dark: "#4be3b4", level: 2 },
      { name: "Coral",  light: "#d63a3f", dark: "#ff8a8e", level: 3 },
      { name: "Violet", light: "#6d3df5", dark: "#b79cff", level: 4 },
      { name: "Amber",  light: "#a85a00", dark: "#ffc453", level: 5 }
    ],

    // title = name shown when unlocked, desc = what they did, quest = hint shown
    // while locked. secret: true hides everything until it is unlocked.
    achievements: {
      start:   { title: "First steps",      desc: "Scrolled past the intro",                    quest: "Scroll past the intro" },
      work:    { title: "Window shopper",   desc: "Found the selected work",                    quest: "Visit the selected work" },
      gallery: { title: "Gallery explorer", desc: "Flipped through a project's images",         quest: "Flip through a project's images" },
      fine:    { title: "Fine print",       desc: "Opened two experience entries",              quest: "Open two experience entries" },
      play:    { title: "Playful",          desc: "Dragged a sticker around",                   quest: "Drag a sticker in the hero" },
      hello:   { title: "Say hello",        desc: "Reached for the contact links",              quest: "Click an email or social link" },
      flow:    { title: "Flow state",      desc: "Explored the research and user flows",       quest: "Open a product in Research and user flows" },
      night:   { title: "Night owl",        desc: "Switched to dark mode",                      quest: "Switch to dark mode" },
      stars:   { title: "Star collector",   desc: "Found all 8 hidden stars",                   quest: "Find all 8 hidden stars" },
      hunt:    { title: "Sharpshooter",     desc: "Scored 25 or more in Pixel Hunt",            quest: "Score 25 in Pixel Hunt" },
      painter: { title: "Colour theory",    desc: "Tried a new accent colour",                  quest: "Try a new accent colour (unlock at level 2)" },
      all:     { title: "Completionist",    desc: "Explored every section",                     quest: "Explore every section" },
      return:  { title: "Welcome back",     desc: "Came back for a second visit",               quest: "Come back another day" },
      speed:   { title: "Speed reader",     desc: "Scrolled fast enough to rev up the marquees", secret: true },
      konami:  { title: "Secret code",      desc: "Found the hidden keyboard shortcut",         secret: true }
    }
  }
};
