import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "en" | "te" | "hi" | "ta";

export interface T {
  lang: Lang;
  setLang: (l: Lang) => void;
  // Nav
  nav_features: string;
  nav_howItWorks: string;
  nav_successStories: string;
  nav_faq: string;
  nav_signIn: string;
  nav_getStarted: string;
  // Hero
  hero_badge: string;
  hero_heading: string;
  hero_headingAccent: string;
  hero_desc: string;
  hero_cta1: string;
  hero_cta2: string;
  // Stats
  stat_successRate: string;
  stat_mentored: string;
  stat_mockInterviews: string;
  stat_roadmaps: string;
  // Features section
  feat_heading: string;
  feat_subheading: string;
  feat_0_title: string; feat_0_desc: string;
  feat_1_title: string; feat_1_desc: string;
  feat_2_title: string; feat_2_desc: string;
  feat_3_title: string; feat_3_desc: string;
  feat_4_title: string; feat_4_desc: string;
  feat_5_title: string; feat_5_desc: string;
  feat_6_title: string; feat_6_desc: string;
  feat_7_title: string; feat_7_desc: string;
  // How it works
  hiw_heading: string;
  hiw_subheading: string;
  hiw_0_title: string; hiw_0_desc: string; hiw_0_cta: string;
  hiw_1_title: string; hiw_1_desc: string; hiw_1_cta: string;
  hiw_2_title: string; hiw_2_desc: string; hiw_2_cta: string;
  hiw_3_title: string; hiw_3_desc: string; hiw_3_cta: string;
  hiw_4_title: string; hiw_4_desc: string; hiw_4_cta: string;
  hiw_5_title: string; hiw_5_desc: string; hiw_5_cta: string;
  // Success stories
  success_heading: string;
  // FAQ
  faq_heading: string;
  faq_0_q: string; faq_0_a: string;
  faq_1_q: string; faq_1_a: string;
  faq_2_q: string; faq_2_a: string;
  faq_3_q: string; faq_3_a: string;
  faq_4_q: string; faq_4_a: string;
  faq_5_q: string; faq_5_a: string;
  // CTA banner
  cta_heading: string;
  cta_desc: string;
  cta_btn: string;
  // Footer
  footer_tagline: string;
  footer_product: string;
  footer_company: string;
  // Common
  common_back: string;
  common_next: string;
  common_submit: string;
  common_skip: string;
  common_getStarted: string;
  common_retake: string;
  common_dashboard: string;
  common_seeResults: string;
  // Assessment
  assess_title: string;
  assess_desc: string;
  assess_6q: string;
  assess_estTime: string;
  assess_start: string;
  assess_question: string;
  assess_of: string;
  assess_nextQ: string;
  assess_complete: string;
  assess_correct: string;
  assess_out_of: string;
  assess_retake: string;
  assess_viewRoadmap: string;
  assess_roadmapReady: string;
  assess_roadmapDesc: string;
  // Mock interview
  mock_title: string;
  mock_desc: string;
  mock_perRound: string;
  mock_randomised: string;
  mock_hint: string;
  mock_yourAnswer: string;
  mock_words: string;
  mock_idealAnswer: string;
  mock_score: string;
  mock_complete: string;
  mock_tryAnother: string;
  // Dashboard
  dash_welcome: string;
  dash_roadmap: string;
  dash_interviews: string;
  dash_assessment: string;
  dash_projects: string;
  dash_resume: string;
  dash_leaderboard: string;
  dash_logout: string;
  // Onboarding
  onb_welcome: string;
  onb_sub: string;
  onb_name: string;
  onb_college: string;
  onb_branch: string;
  onb_year: string;
  onb_targetRole: string;
  onb_continue: string;
  onb_back: string;
  onb_chooseAvatar: string;
  onb_finish: string;
}

const translations: Record<Lang, T> = {
  en: {
    lang: "en", setLang: () => {},
    nav_features: "Features", nav_howItWorks: "How It Works", nav_successStories: "Success Stories",
    nav_faq: "FAQ", nav_signIn: "Sign In", nav_getStarted: "Get Started Free",
    hero_badge: "1,200+ students placed this year",
    hero_heading: "Your AI Placement Mentor for",
    hero_headingAccent: "Career Success",
    hero_desc: "From Tier-2 college to top tech company — get a personalized roadmap, AI mock interviews, and real mentorship to become placement-ready in 90 days.",
    hero_cta1: "Get Started Free", hero_cta2: "Take Skill Assessment",
    stat_successRate: "Placement Success Rate", stat_mentored: "Students Mentored",
    stat_mockInterviews: "Mock Interviews", stat_roadmaps: "Roadmaps Generated",
    feat_heading: "Everything you need to crack top companies",
    feat_subheading: "Stop guessing what to learn. Get a structured path designed specifically for your current skill level.",
    feat_0_title: "Personalized Placement Roadmap", feat_0_desc: "AI builds your 90-day plan based on your skills",
    feat_1_title: "AI Mock Interviews", feat_1_desc: "Practice with AI-powered interviewers, get instant feedback",
    feat_2_title: "Skill Gap Analysis", feat_2_desc: "Know exactly what to learn and in what order",
    feat_3_title: "Resume Review", feat_3_desc: "AI reviews and scores your resume, suggests improvements",
    feat_4_title: "Project Recommendations", feat_4_desc: "Get project ideas matched to your target companies",
    feat_5_title: "Aptitude Preparation", feat_5_desc: "Quantitative, logical reasoning, verbal ability practice",
    feat_6_title: "Telugu Language Support", feat_6_desc: "Learn in your native language, no barriers",
    feat_7_title: "Daily Progress Tracking", feat_7_desc: "Streak system, daily goals, leaderboard",
    hiw_heading: "Your Path to Placement",
    hiw_subheading: "Six simple steps from where you are to where you want to be — in 90 days.",
    hiw_0_title: "Create Profile", hiw_0_desc: "Share your background, branch, year, and target role so we can personalise everything.", hiw_0_cta: "Create Profile",
    hiw_1_title: "Take Assessment", hiw_1_desc: "Evaluate your current DSA, aptitude, and communication skills in 25 minutes.", hiw_1_cta: "Start Assessment",
    hiw_2_title: "Get Your Roadmap", hiw_2_desc: "Receive a custom week-by-week 90-day learning path built around your gaps.", hiw_2_cta: "View Roadmap",
    hiw_3_title: "Practice Interviews", hiw_3_desc: "Do AI-powered mock interviews and get instant feedback on every answer.", hiw_3_cta: "Practice Now",
    hiw_4_title: "Track Progress", hiw_4_desc: "Maintain daily streaks, hit weekly goals, and watch your readiness score climb.", hiw_4_cta: "View Dashboard",
    hiw_5_title: "Get Placed!", hiw_5_desc: "Walk into interviews confident, prepared, and ready to land your dream job.", hiw_5_cta: "Get Started",
    success_heading: "From Tier-2 to Top Tech",
    faq_heading: "Frequently Asked Questions",
    faq_0_q: "Is this free to use?", faq_0_a: "Yes, core features including the basic roadmap and limited mock interviews are free. We offer a premium tier for unlimited AI interviews and advanced resume reviews.",
    faq_1_q: "How is this different from YouTube tutorials?", faq_1_a: "YouTube gives you generic information. PlacementAI tests your actual skills and builds a personalized plan just for you, tracks your progress, and simulates real interview environments.",
    faq_2_q: "Does it work for non-CS students?", faq_2_a: "Absolutely. We have specific roadmaps for ECE, EEE, and Mechanical students looking to transition into software roles.",
    faq_3_q: "How long until I see results?", faq_3_a: "Most students who stick to their personalized daily goals see significant improvement in mock interview scores within 3-4 weeks.",
    faq_4_q: "What companies have students been placed in?", faq_4_a: "Our students have secured offers from Amazon, TCS, Infosys, Wipro, Accenture, Cognizant, and various high-growth startups.",
    faq_5_q: "Is there Telugu language support?", faq_5_a: "Yes! You can choose to have technical concepts explained in Telugu, Hindi, or English.",
    cta_heading: "Ready to Start Your Placement Journey?",
    cta_desc: "Join thousands of students who have already secured their dream jobs using PlacementAI.",
    cta_btn: "Get Started Free — No Credit Card Required",
    footer_tagline: "The career mentor that Tier-2/Tier-3 engineering students never had. Built with ❤️ for Indian students.",
    footer_product: "Product", footer_company: "Company",
    common_back: "Back", common_next: "Next", common_submit: "Submit", common_skip: "Skip",
    common_getStarted: "Get Started", common_retake: "Retake", common_dashboard: "Dashboard",
    common_seeResults: "See Results",
    assess_title: "Skill Assessment", assess_desc: "Pick the areas to test. Each session gives you fresh, randomised questions — no two tests are the same.",
    assess_6q: "6 questions", assess_estTime: "mins", assess_start: "Start Assessment",
    assess_question: "Question", assess_of: "of", assess_nextQ: "Next Question",
    assess_complete: "Assessment Complete!", assess_correct: "correct", assess_out_of: "of",
    assess_retake: "Retake with New Questions", assess_viewRoadmap: "View My Roadmap",
    assess_roadmapReady: "Your Personalised Roadmap is Ready! 🗺️",
    assess_roadmapDesc: "Based on your results, we've generated a 90-day plan.",
    mock_title: "AI Mock Interview", mock_desc: "Pick a round — get fresh random questions every time.",
    mock_perRound: "questions per round", mock_randomised: "Randomised every session",
    mock_hint: "Hint", mock_yourAnswer: "Your Answer", mock_words: "words",
    mock_idealAnswer: "Ideal Answer", mock_score: "Score", mock_complete: "Interview Complete!",
    mock_tryAnother: "Try Another Round",
    dash_welcome: "Welcome back", dash_roadmap: "My Roadmap", dash_interviews: "Practice Interviews",
    dash_assessment: "Skill Assessment", dash_projects: "Projects", dash_resume: "Resume",
    dash_leaderboard: "Leaderboard", dash_logout: "Log Out",
    onb_welcome: "Welcome! Let's get started", onb_sub: "Tell us a bit about yourself so we can personalise your experience.",
    onb_name: "Full Name", onb_college: "College / University", onb_branch: "Branch / Stream",
    onb_year: "Year of Study", onb_targetRole: "Target Role", onb_continue: "Continue",
    onb_back: "Back", onb_chooseAvatar: "Choose your avatar", onb_finish: "Finish Setup",
  },

  te: {
    lang: "te", setLang: () => {},
    nav_features: "ఫీచర్లు", nav_howItWorks: "ఇది ఎలా పనిచేస్తుంది", nav_successStories: "విజయ గాథలు",
    nav_faq: "తరచుగా అడిగే ప్రశ్నలు", nav_signIn: "లాగిన్", nav_getStarted: "ఉచితంగా ప్రారంభించండి",
    hero_badge: "ఈ సంవత్సరం 1,200+ విద్యార్థులకు ఉద్యోగం",
    hero_heading: "మీ కెరీర్ విజయానికి AI ప్లేస్‌మెంట్ మెంటర్",
    hero_headingAccent: "కెరీర్ విజయం",
    hero_desc: "టైర్-2 కళాశాల నుండి టాప్ టెక్ కంపెనీ వరకు — వ్యక్తిగతీకరించిన రోడ్‌మ్యాప్, AI మాక్ ఇంటర్వ్యూలు మరియు నిజమైన మెంటర్‌షిప్ పొందండి. 90 రోజుల్లో ప్లేస్‌మెంట్ రెడీ అవ్వండి.",
    hero_cta1: "ఉచితంగా ప్రారంభించండి", hero_cta2: "స్కిల్ టెస్ట్ తీసుకోండి",
    stat_successRate: "ప్లేస్‌మెంట్ విజయ రేటు", stat_mentored: "మెంటర్ చేయబడిన విద్యార్థులు",
    stat_mockInterviews: "మాక్ ఇంటర్వ్యూలు", stat_roadmaps: "రోడ్‌మ్యాప్‌లు తయారుచేయబడ్డాయి",
    feat_heading: "టాప్ కంపెనీలను క్రాక్ చేయడానికి అన్నీ ఇక్కడే",
    feat_subheading: "ఏం నేర్చుకోవాలో అంచనా వేయడం ఆపండి. మీ ప్రస్తుత నైపుణ్య స్థాయికి అనుగుణంగా నిర్మించబడిన మార్గాన్ని పొందండి.",
    feat_0_title: "వ్యక్తిగత ప్లేస్‌మెంట్ రోడ్‌మ్యాప్", feat_0_desc: "మీ నైపుణ్యాల ఆధారంగా AI మీ 90-రోజుల ప్లాన్ తయారుచేస్తుంది",
    feat_1_title: "AI మాక్ ఇంటర్వ్యూలు", feat_1_desc: "AI ఇంటర్వ్యూయర్లతో ప్రాక్టీస్ చేయండి, తక్షణ ఫీడ్‌బ్యాక్ పొందండి",
    feat_2_title: "స్కిల్ గ్యాప్ విశ్లేషణ", feat_2_desc: "ఏమి నేర్చుకోవాలో మరియు ఏ క్రమంలో నేర్చుకోవాలో ఖచ్చితంగా తెలుసుకోండి",
    feat_3_title: "రెజ్యూమ్ సమీక్ష", feat_3_desc: "AI మీ రెజ్యూమ్‌ను సమీక్షించి మెరుగుదలలను సూచిస్తుంది",
    feat_4_title: "ప్రాజెక్ట్ సిఫార్సులు", feat_4_desc: "మీ టార్గెట్ కంపెనీలకు అనుగుణమైన ప్రాజెక్ట్ ఆలోచనలు పొందండి",
    feat_5_title: "ఆప్టిట్యూడ్ సన్నద్ధత", feat_5_desc: "పరిమాణాత్మక, తార్కిక వివేచన, శాబ్దిక సామర్థ్య అభ్యాసం",
    feat_6_title: "తెలుగు భాష మద్దతు", feat_6_desc: "మీ మాతృభాషలో నేర్చుకోండి, అడ్డంకులు లేవు",
    feat_7_title: "రోజువారీ పురోగతి ట్రాకింగ్", feat_7_desc: "స్ట్రీక్ సిస్టమ్, రోజువారీ లక్ష్యాలు, లీడర్‌బోర్డ్",
    hiw_heading: "ప్లేస్‌మెంట్ వైపు మీ మార్గం",
    hiw_subheading: "మీరు ఉన్న చోటు నుండి మీరు వెళ్ళాలనుకున్న చోటికి — 90 రోజుల్లో ఆరు సులభమైన అడుగులు.",
    hiw_0_title: "ప్రొఫైల్ రూపొందించండి", hiw_0_desc: "మీ నేపథ్యం, శాఖ, సంవత్సరం మరియు టార్గెట్ రోల్ పంచుకోండి.", hiw_0_cta: "ప్రొఫైల్ రూపొందించండి",
    hiw_1_title: "అసెస్‌మెంట్ తీసుకోండి", hiw_1_desc: "25 నిమిషాల్లో DSA, ఆప్టిట్యూడ్ నైపుణ్యాలను అంచనా వేయండి.", hiw_1_cta: "అసెస్‌మెంట్ ప్రారంభించండి",
    hiw_2_title: "మీ రోడ్‌మ్యాప్ పొందండి", hiw_2_desc: "మీ గ్యాప్‌ల చుట్టూ నిర్మించిన 90-రోజుల లెర్నింగ్ పాత్ పొందండి.", hiw_2_cta: "రోడ్‌మ్యాప్ చూడండి",
    hiw_3_title: "ఇంటర్వ్యూ ప్రాక్టీస్", hiw_3_desc: "AI మాక్ ఇంటర్వ్యూలు చేసి ప్రతి సమాధానంపై తక్షణ ఫీడ్‌బ్యాక్ పొందండి.", hiw_3_cta: "ఇప్పుడే ప్రాక్టీస్ చేయండి",
    hiw_4_title: "పురోగతి ట్రాక్ చేయండి", hiw_4_desc: "రోజువారీ స్ట్రీక్‌లు కొనసాగించండి, వారపు లక్ష్యాలు సాధించండి.", hiw_4_cta: "డాష్‌బోర్డ్ చూడండి",
    hiw_5_title: "ఉద్యోగం పొందండి!", hiw_5_desc: "ధైర్యంగా, సిద్ధంగా ఇంటర్వ్యూకు వెళ్ళండి.", hiw_5_cta: "ప్రారంభించండి",
    success_heading: "టైర్-2 నుండి టాప్ టెక్ వరకు",
    faq_heading: "తరచుగా అడిగే ప్రశ్నలు",
    faq_0_q: "ఇది ఉచితంగా వాడవచ్చా?", faq_0_a: "అవును, ప్రాథమిక రోడ్‌మ్యాప్ మరియు పరిమిత మాక్ ఇంటర్వ్యూలు ఉచితం.",
    faq_1_q: "ఇది YouTube ట్యుటోరియల్స్ కంటే ఎలా భిన్నంగా ఉంటుంది?", faq_1_a: "YouTube జనరిక్ సమాచారం ఇస్తుంది. PlacementAI మీ నైపుణ్యాలను పరీక్షించి వ్యక్తిగతమైన ప్లాన్ తయారుచేస్తుంది.",
    faq_2_q: "CS కానివారికి పని చేస్తుందా?", faq_2_a: "తప్పకుండా. ECE, EEE, మెకానికల్ విద్యార్థులకు నిర్దిష్ట రోడ్‌మ్యాప్‌లు ఉన్నాయి.",
    faq_3_q: "ఫలితాలు ఎంత తొందరగా వస్తాయి?", faq_3_a: "రోజువారీ లక్ష్యాలను పాటించే చాలా మంది విద్యార్థులు 3-4 వారాల్లో మెరుగుదల చూస్తారు.",
    faq_4_q: "విద్యార్థులకు ఏ కంపెనీల్లో ఉద్యోగాలు వచ్చాయి?", faq_4_a: "Amazon, TCS, Infosys, Wipro, Accenture మొదలైన కంపెనీల్లో మా విద్యార్థులకు ఆఫర్లు వచ్చాయి.",
    faq_5_q: "తెలుగు భాష మద్దతు ఉందా?", faq_5_a: "అవును! తెలుగు, హిందీ లేదా ఇంగ్లీష్‌లో టెక్నికల్ కాన్సెప్ట్‌లు నేర్చుకోవచ్చు.",
    cta_heading: "మీ ప్లేస్‌మెంట్ ప్రయాణం ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?",
    cta_desc: "PlacementAI ఉపయోగించి ఇప్పటికే కలల ఉద్యోగాలు పొందిన వేలాది విద్యార్థులలో చేరండి.",
    cta_btn: "ఉచితంగా ప్రారంభించండి — క్రెడిట్ కార్డ్ అవసరం లేదు",
    footer_tagline: "టైర్-2/టైర్-3 ఇంజినీరింగ్ విద్యార్థులకు ఎప్పుడూ లేని కెరీర్ మెంటర్. భారతీయ విద్యార్థుల కోసం ❤️తో నిర్మించబడింది.",
    footer_product: "ప్రొడక్ట్", footer_company: "కంపెనీ",
    common_back: "వెనుకకు", common_next: "తదుపరి", common_submit: "సమర్పించండి", common_skip: "దాటవేయండి",
    common_getStarted: "ప్రారంభించండి", common_retake: "మళ్ళీ తీసుకోండి", common_dashboard: "డాష్‌బోర్డ్",
    common_seeResults: "ఫలితాలు చూడండి",
    assess_title: "స్కిల్ అసెస్‌మెంట్", assess_desc: "పరీక్షించాల్సిన ప్రాంతాలను ఎంచుకోండి. ప్రతి సెషన్‌లో కొత్త, యాదృచ్ఛిక ప్రశ్నలు ఇవ్వబడతాయి.",
    assess_6q: "6 ప్రశ్నలు", assess_estTime: "నిమిషాలు", assess_start: "అసెస్‌మెంట్ ప్రారంభించండి",
    assess_question: "ప్రశ్న", assess_of: "లో", assess_nextQ: "తదుపరి ప్రశ్న",
    assess_complete: "అసెస్‌మెంట్ పూర్తయింది!", assess_correct: "సరైనవి", assess_out_of: "లో",
    assess_retake: "కొత్త ప్రశ్నలతో మళ్ళీ తీసుకోండి", assess_viewRoadmap: "నా రోడ్‌మ్యాప్ చూడండి",
    assess_roadmapReady: "మీ వ్యక్తిగత రోడ్‌మ్యాప్ సిద్ధంగా ఉంది! 🗺️",
    assess_roadmapDesc: "మీ ఫలితాల ఆధారంగా మేము 90-రోజుల ప్లాన్ తయారుచేశాము.",
    mock_title: "AI మాక్ ఇంటర్వ్యూ", mock_desc: "రౌండ్ ఎంచుకోండి — ప్రతిసారీ కొత్త ప్రశ్నలు పొందండి.",
    mock_perRound: "ప్రతి రౌండ్‌లో ప్రశ్నలు", mock_randomised: "ప్రతి సెషన్‌లో యాదృచ్ఛికంగా",
    mock_hint: "సూచన", mock_yourAnswer: "మీ సమాధానం", mock_words: "పదాలు",
    mock_idealAnswer: "ఆదర్శ సమాధానం", mock_score: "స్కోర్", mock_complete: "ఇంటర్వ్యూ పూర్తయింది!",
    mock_tryAnother: "మరొక రౌండ్ ప్రయత్నించండి",
    dash_welcome: "తిరిగి స్వాగతం", dash_roadmap: "నా రోడ్‌మ్యాప్", dash_interviews: "ఇంటర్వ్యూ ప్రాక్టీస్",
    dash_assessment: "స్కిల్ అసెస్‌మెంట్", dash_projects: "ప్రాజెక్ట్‌లు", dash_resume: "రెజ్యూమ్",
    dash_leaderboard: "లీడర్‌బోర్డ్", dash_logout: "లాగ్ అవుట్",
    onb_welcome: "స్వాగతం! ప్రారంభిద్దాం", onb_sub: "మీ అనుభవాన్ని వ్యక్తిగతీకరించడానికి మీ గురించి కొంచెం చెప్పండి.",
    onb_name: "పూర్తి పేరు", onb_college: "కళాశాల / విశ్వవిద్యాలయం", onb_branch: "శాఖ / స్ట్రీమ్",
    onb_year: "చదువు సంవత్సరం", onb_targetRole: "లక్ష్య పాత్ర", onb_continue: "కొనసాగించండి",
    onb_back: "వెనుకకు", onb_chooseAvatar: "మీ అవతార్ ఎంచుకోండి", onb_finish: "సెటప్ పూర్తిచేయండి",
  },

  hi: {
    lang: "hi", setLang: () => {},
    nav_features: "विशेषताएं", nav_howItWorks: "यह कैसे काम करता है", nav_successStories: "सफलता की कहानियाँ",
    nav_faq: "अक्सर पूछे जाने वाले प्रश्न", nav_signIn: "साइन इन", nav_getStarted: "मुफ़्त शुरू करें",
    hero_badge: "इस साल 1,200+ छात्रों को नौकरी मिली",
    hero_heading: "करियर सफलता के लिए आपका AI प्लेसमेंट मेंटर",
    hero_headingAccent: "करियर सफलता",
    hero_desc: "Tier-2 कॉलेज से टॉप टेक कंपनी तक — व्यक्तिगत रोडमैप, AI मॉक इंटरव्यू और असली मेंटरशिप पाएं। 90 दिनों में प्लेसमेंट-रेडी बनें।",
    hero_cta1: "मुफ़्त शुरू करें", hero_cta2: "स्किल असेसमेंट लें",
    stat_successRate: "प्लेसमेंट सफलता दर", stat_mentored: "मेंटर किए गए छात्र",
    stat_mockInterviews: "मॉक इंटरव्यू", stat_roadmaps: "रोडमैप बनाए गए",
    feat_heading: "टॉप कंपनियाँ क्रैक करने के लिए सब कुछ यहाँ है",
    feat_subheading: "क्या सीखना है इसका अनुमान लगाना बंद करें। अपने वर्तमान स्तर के अनुसार एक संरचित मार्ग पाएं।",
    feat_0_title: "व्यक्तिगत प्लेसमेंट रोडमैप", feat_0_desc: "AI आपकी स्किल्स के आधार पर 90-दिन का प्लान बनाता है",
    feat_1_title: "AI मॉक इंटरव्यू", feat_1_desc: "AI इंटरव्यूअर्स के साथ अभ्यास करें, तुरंत फीडबैक पाएं",
    feat_2_title: "स्किल गैप एनालिसिस", feat_2_desc: "जानें कि क्या और किस क्रम में सीखना है",
    feat_3_title: "रेज़्यूमे समीक्षा", feat_3_desc: "AI आपके रेज़्यूमे को रिव्यू करता है और सुझाव देता है",
    feat_4_title: "प्रोजेक्ट सिफारिशें", feat_4_desc: "टार्गेट कंपनियों के अनुकूल प्रोजेक्ट आइडियाज़ पाएं",
    feat_5_title: "एप्टीट्यूड तैयारी", feat_5_desc: "मात्रात्मक, तार्किक और मौखिक अभ्यास",
    feat_6_title: "हिंदी भाषा सहायता", feat_6_desc: "अपनी मातृभाषा में सीखें, कोई बाधा नहीं",
    feat_7_title: "दैनिक प्रगति ट्रैकिंग", feat_7_desc: "स्ट्रीक सिस्टम, दैनिक लक्ष्य, लीडरबोर्ड",
    hiw_heading: "प्लेसमेंट की राह",
    hiw_subheading: "जहाँ आप हैं वहाँ से जहाँ आप जाना चाहते हैं — 90 दिनों में छह आसान कदम।",
    hiw_0_title: "प्रोफ़ाइल बनाएं", hiw_0_desc: "अपनी पृष्ठभूमि, शाखा, वर्ष और टार्गेट रोल साझा करें।", hiw_0_cta: "प्रोफ़ाइल बनाएं",
    hiw_1_title: "असेसमेंट लें", hiw_1_desc: "25 मिनट में DSA, एप्टीट्यूड और संचार कौशल का मूल्यांकन करें।", hiw_1_cta: "असेसमेंट शुरू करें",
    hiw_2_title: "रोडमैप पाएं", hiw_2_desc: "आपकी कमियों के आधार पर 90-दिन का कस्टम लर्निंग पाथ पाएं।", hiw_2_cta: "रोडमैप देखें",
    hiw_3_title: "इंटरव्यू प्रैक्टिस", hiw_3_desc: "AI मॉक इंटरव्यू करें और हर उत्तर पर तुरंत फीडबैक पाएं।", hiw_3_cta: "अभी प्रैक्टिस करें",
    hiw_4_title: "प्रगति ट्रैक करें", hiw_4_desc: "रोज़ स्ट्रीक बनाए रखें, साप्ताहिक लक्ष्य हासिल करें।", hiw_4_cta: "डैशबोर्ड देखें",
    hiw_5_title: "नौकरी पाएं!", hiw_5_desc: "आत्मविश्वास और तैयारी के साथ इंटरव्यू में जाएं।", hiw_5_cta: "शुरू करें",
    success_heading: "Tier-2 से टॉप टेक तक",
    faq_heading: "अक्सर पूछे जाने वाले प्रश्न",
    faq_0_q: "क्या यह मुफ़्त है?", faq_0_a: "हाँ, बेसिक रोडमैप और सीमित मॉक इंटरव्यू मुफ़्त हैं।",
    faq_1_q: "यह YouTube से कैसे अलग है?", faq_1_a: "YouTube सामान्य जानकारी देता है। PlacementAI आपकी असली स्किल्स परखता है और व्यक्तिगत प्लान बनाता है।",
    faq_2_q: "क्या यह non-CS छात्रों के लिए भी काम करता है?", faq_2_a: "बिल्कुल। ECE, EEE और Mechanical छात्रों के लिए भी रोडमैप हैं।",
    faq_3_q: "परिणाम कब दिखेंगे?", faq_3_a: "जो छात्र रोज़ लक्ष्यों पर काम करते हैं वे 3-4 हफ्तों में सुधार देखते हैं।",
    faq_4_q: "किन कंपनियों में प्लेसमेंट हुई?", faq_4_a: "Amazon, TCS, Infosys, Wipro, Accenture और कई स्टार्टअप्स में।",
    faq_5_q: "क्या हिंदी भाषा सहायता है?", faq_5_a: "हाँ! हिंदी, तेलुगु या अंग्रेज़ी में टेक्निकल कॉन्सेप्ट सीख सकते हैं।",
    cta_heading: "अपनी प्लेसमेंट यात्रा शुरू करने के लिए तैयार हैं?",
    cta_desc: "हज़ारों छात्रों में शामिल हों जिन्होंने PlacementAI से अपनी ड्रीम जॉब पाई।",
    cta_btn: "मुफ़्त शुरू करें — क्रेडिट कार्ड की ज़रूरत नहीं",
    footer_tagline: "वो करियर मेंटर जो Tier-2/Tier-3 छात्रों को कभी नहीं मिला। भारतीय छात्रों के लिए ❤️ से बनाया गया।",
    footer_product: "प्रोडक्ट", footer_company: "कंपनी",
    common_back: "वापस", common_next: "अगला", common_submit: "सबमिट करें", common_skip: "छोड़ें",
    common_getStarted: "शुरू करें", common_retake: "दोबारा लें", common_dashboard: "डैशबोर्ड",
    common_seeResults: "परिणाम देखें",
    assess_title: "स्किल असेसमेंट", assess_desc: "परीक्षण के लिए क्षेत्र चुनें। हर सेशन में नए, यादृच्छिक प्रश्न मिलते हैं।",
    assess_6q: "6 प्रश्न", assess_estTime: "मिनट", assess_start: "असेसमेंट शुरू करें",
    assess_question: "प्रश्न", assess_of: "में से", assess_nextQ: "अगला प्रश्न",
    assess_complete: "असेसमेंट पूरा हुआ!", assess_correct: "सही", assess_out_of: "में से",
    assess_retake: "नए प्रश्नों के साथ दोबारा लें", assess_viewRoadmap: "मेरा रोडमैप देखें",
    assess_roadmapReady: "आपका व्यक्तिगत रोडमैप तैयार है! 🗺️",
    assess_roadmapDesc: "आपके परिणामों के आधार पर हमने 90-दिन का प्लान बनाया है।",
    mock_title: "AI मॉक इंटरव्यू", mock_desc: "राउंड चुनें — हर बार ताज़े प्रश्न पाएं।",
    mock_perRound: "प्रति राउंड प्रश्न", mock_randomised: "हर सेशन में यादृच्छिक",
    mock_hint: "संकेत", mock_yourAnswer: "आपका उत्तर", mock_words: "शब्द",
    mock_idealAnswer: "आदर्श उत्तर", mock_score: "स्कोर", mock_complete: "इंटरव्यू पूरा हुआ!",
    mock_tryAnother: "दूसरा राउंड आज़माएं",
    dash_welcome: "वापस स्वागत है", dash_roadmap: "मेरा रोडमैप", dash_interviews: "इंटरव्यू प्रैक्टिस",
    dash_assessment: "स्किल असेसमेंट", dash_projects: "प्रोजेक्ट्स", dash_resume: "रेज़्यूमे",
    dash_leaderboard: "लीडरबोर्ड", dash_logout: "लॉग आउट",
    onb_welcome: "स्वागत है! शुरू करते हैं", onb_sub: "अपना अनुभव व्यक्तिगत बनाने के लिए अपने बारे में बताएं।",
    onb_name: "पूरा नाम", onb_college: "कॉलेज / विश्वविद्यालय", onb_branch: "शाखा / स्ट्रीम",
    onb_year: "अध्ययन का वर्ष", onb_targetRole: "टार्गेट रोल", onb_continue: "जारी रखें",
    onb_back: "वापस", onb_chooseAvatar: "अपना अवतार चुनें", onb_finish: "सेटअप पूरा करें",
  },

  ta: {
    lang: "ta", setLang: () => {},
    nav_features: "அம்சங்கள்", nav_howItWorks: "இது எவ்வாறு செயல்படுகிறது", nav_successStories: "வெற்றிக் கதைகள்",
    nav_faq: "அடிக்கடி கேட்கப்படும் கேள்விகள்", nav_signIn: "உள்நுழைய", nav_getStarted: "இலவசமாக தொடங்குங்கள்",
    hero_badge: "இந்த ஆண்டு 1,200+ மாணவர்களுக்கு வேலை கிடைத்தது",
    hero_heading: "உங்கள் தொழில் வெற்றிக்கு AI பிளேஸ்மெண்ட் மெண்டர்",
    hero_headingAccent: "தொழில் வெற்றி",
    hero_desc: "Tier-2 கல்லூரியிலிருந்து முன்னணி தொழில்நுட்ப நிறுவனம் வரை — தனிப்பயன் ரோட்மேப், AI மாக் இண்டர்வியூ மற்றும் வழிகாட்டுதல் பெறுங்கள். 90 நாட்களில் தயாராகுங்கள்.",
    hero_cta1: "இலவசமாக தொடங்குங்கள்", hero_cta2: "திறன் மதிப்பீடு எடுங்கள்",
    stat_successRate: "வேலைவாய்ப்பு வெற்றி விகிதம்", stat_mentored: "வழிகாட்டப்பட்ட மாணவர்கள்",
    stat_mockInterviews: "மாக் இண்டர்வியூக்கள்", stat_roadmaps: "ரோட்மேப்கள் உருவாக்கப்பட்டன",
    feat_heading: "சிறந்த நிறுவனங்களை வெல்ல தேவையான அனைத்தும்",
    feat_subheading: "என்ன கற்க வேண்டும் என்று யூகிப்பதை நிறுத்துங்கள். உங்கள் தற்போதைய நிலைக்கு வடிவமைக்கப்பட்ட பாதையைப் பெறுங்கள்.",
    feat_0_title: "தனிப்பயன் பிளேஸ்மெண்ட் ரோட்மேப்", feat_0_desc: "AI உங்கள் திறன்களின் அடிப்படையில் 90 நாள் திட்டம் உருவாக்குகிறது",
    feat_1_title: "AI மாக் இண்டர்வியூக்கள்", feat_1_desc: "AI நேர்காணல் செய்பவர்களுடன் பயிற்சி செய்யுங்கள், உடனடி கருத்து பெறுங்கள்",
    feat_2_title: "திறன் இடைவெளி பகுப்பாய்வு", feat_2_desc: "என்ன கற்க வேண்டும், எந்த வரிசையில் என்று தெரிந்துகொள்ளுங்கள்",
    feat_3_title: "ரெஸ்யூம் மதிப்பாய்வு", feat_3_desc: "AI உங்கள் ரெஸ்யூமை மதிப்பீடு செய்து மேம்பாடுகளை பரிந்துரைக்கிறது",
    feat_4_title: "திட்ட பரிந்துரைகள்", feat_4_desc: "இலக்கு நிறுவனங்களுக்கு ஏற்ற திட்ட யோசனைகளைப் பெறுங்கள்",
    feat_5_title: "தகுதி தயாரிப்பு", feat_5_desc: "கணிதம், தர்க்கம், வாய்மொழி திறன் பயிற்சி",
    feat_6_title: "தமிழ் மொழி ஆதரவு", feat_6_desc: "உங்கள் தாய்மொழியில் கற்றுக்கொள்ளுங்கள், தடைகள் இல்லை",
    feat_7_title: "தினசரி முன்னேற்ற கண்காணிப்பு", feat_7_desc: "ஸ்ட்ரீக் சிஸ்டம், தினசரி இலக்குகள், லீடர்போர்டு",
    hiw_heading: "பிளேஸ்மெண்டிற்கான உங்கள் பாதை",
    hiw_subheading: "நீங்கள் இருக்கும் இடத்திலிருந்து செல்ல விரும்பும் இடம் வரை — 90 நாட்களில் ஆறு எளிய படிகள்.",
    hiw_0_title: "சுயவிவரம் உருவாக்குங்கள்", hiw_0_desc: "உங்கள் பின்னணி, கிளை, ஆண்டு மற்றும் இலக்கு பதவியைப் பகிருங்கள்.", hiw_0_cta: "சுயவிவரம் உருவாக்குங்கள்",
    hiw_1_title: "மதிப்பீடு எடுங்கள்", hiw_1_desc: "25 நிமிடங்களில் DSA, தகுதி திறன்களை மதிப்பிடுங்கள்.", hiw_1_cta: "மதிப்பீடு தொடங்குங்கள்",
    hiw_2_title: "ரோட்மேப் பெறுங்கள்", hiw_2_desc: "உங்கள் இடைவெளிகளுக்கு ஏற்ப 90 நாள் கற்றல் பாதை பெறுங்கள்.", hiw_2_cta: "ரோட்மேப் பாருங்கள்",
    hiw_3_title: "நேர்காணல் பயிற்சி", hiw_3_desc: "AI மாக் நேர்காணல்கள் செய்து உடனடி கருத்து பெறுங்கள்.", hiw_3_cta: "இப்போது பயிற்சி செய்யுங்கள்",
    hiw_4_title: "முன்னேற்றம் கண்காணியுங்கள்", hiw_4_desc: "தினசரி ஸ்ட்ரீக்குகளை பராமரியுங்கள், வாராந்திர இலக்குகளை அடையுங்கள்.", hiw_4_cta: "டாஷ்போர்டு பாருங்கள்",
    hiw_5_title: "வேலை பெறுங்கள்!", hiw_5_desc: "நம்பிக்கையுடன், தயாராக நேர்காணலுக்குச் செல்லுங்கள்.", hiw_5_cta: "தொடங்குங்கள்",
    success_heading: "Tier-2 முதல் முன்னணி தொழில்நுட்பம் வரை",
    faq_heading: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    faq_0_q: "இது இலவசமா?", faq_0_a: "ஆம், அடிப்படை ரோட்மேப் மற்றும் குறைந்த மாக் இண்டர்வியூக்கள் இலவசம்.",
    faq_1_q: "இது YouTube டுட்டோரியல்களிலிருந்து எவ்வாறு வேறுபடுகிறது?", faq_1_a: "YouTube பொதுவான தகவல்கள் தருகிறது. PlacementAI உங்கள் உண்மையான திறன்களை சோதித்து தனிப்பயன் திட்டம் தருகிறது.",
    faq_2_q: "CS அல்லாத மாணவர்களுக்கும் வேலை செய்யுமா?", faq_2_a: "நிச்சயமாக. ECE, EEE, மெக்கானிக்கல் மாணவர்களுக்கும் ரோட்மேப்கள் உள்ளன.",
    faq_3_q: "முடிவுகள் எப்போது தெரியும்?", faq_3_a: "தினசரி இலக்குகளை பின்பற்றும் மாணவர்கள் 3-4 வாரங்களில் முன்னேற்றம் காண்கின்றனர்.",
    faq_4_q: "எந்த நிறுவனங்களில் வேலை கிடைத்தது?", faq_4_a: "Amazon, TCS, Infosys, Wipro, Accenture மற்றும் பல ஸ்டார்ட்அப்களில்.",
    faq_5_q: "தமிழ் மொழி ஆதரவு உள்ளதா?", faq_5_a: "ஆம்! தமிழ், தெலுங்கு, இந்தி அல்லது ஆங்கிலத்தில் கற்றுக்கொள்ளலாம்.",
    cta_heading: "உங்கள் பிளேஸ்மெண்ட் பயணத்தை தொடங்க தயாரா?",
    cta_desc: "PlacementAI மூலம் கனவு வேலை பெற்ற ஆயிரக்கணக்கான மாணவர்களுடன் சேருங்கள்.",
    cta_btn: "இலவசமாக தொடங்குங்கள் — கிரெடிட் கார்டு தேவையில்லை",
    footer_tagline: "Tier-2/Tier-3 பொறியியல் மாணவர்களுக்கு என்றும் கிடைக்காத தொழில் வழிகாட்டி. இந்திய மாணவர்களுக்காக ❤️உடன் உருவாக்கப்பட்டது.",
    footer_product: "தயாரிப்பு", footer_company: "நிறுவனம்",
    common_back: "திரும்பு", common_next: "அடுத்து", common_submit: "சமர்பிக்கவும்", common_skip: "தவிர்க்கவும்",
    common_getStarted: "தொடங்குங்கள்", common_retake: "மீண்டும் எடுங்கள்", common_dashboard: "டாஷ்போர்டு",
    common_seeResults: "முடிவுகள் பாருங்கள்",
    assess_title: "திறன் மதிப்பீடு", assess_desc: "சோதிக்க வேண்டிய பகுதிகளைத் தேர்ந்தெடுங்கள். ஒவ்வொரு அமர்விலும் புதிய கேள்விகள் வரும்.",
    assess_6q: "6 கேள்விகள்", assess_estTime: "நிமிடங்கள்", assess_start: "மதிப்பீடு தொடங்குங்கள்",
    assess_question: "கேள்வி", assess_of: "இல்", assess_nextQ: "அடுத்த கேள்வி",
    assess_complete: "மதிப்பீடு முடிந்தது!", assess_correct: "சரியான", assess_out_of: "இல்",
    assess_retake: "புதிய கேள்விகளுடன் மீண்டும் எடுங்கள்", assess_viewRoadmap: "என் ரோட்மேப் பாருங்கள்",
    assess_roadmapReady: "உங்கள் தனிப்பயன் ரோட்மேப் தயார்! 🗺️",
    assess_roadmapDesc: "உங்கள் முடிவுகளின் அடிப்படையில் 90 நாள் திட்டம் உருவாக்கியுள்ளோம்.",
    mock_title: "AI மாக் இண்டர்வியூ", mock_desc: "சுற்றை தேர்வு செய்யுங்கள் — ஒவ்வொரு முறையும் புதிய கேள்விகள் பெறுங்கள்.",
    mock_perRound: "ஒரு சுற்றுக்கு கேள்விகள்", mock_randomised: "ஒவ்வொரு அமர்விலும் சீரற்றது",
    mock_hint: "குறிப்பு", mock_yourAnswer: "உங்கள் பதில்", mock_words: "வார்த்தைகள்",
    mock_idealAnswer: "சிறந்த பதில்", mock_score: "மதிப்பெண்", mock_complete: "இண்டர்வியூ முடிந்தது!",
    mock_tryAnother: "மற்றொரு சுற்றை முயற்சிக்கவும்",
    dash_welcome: "மீண்டும் வருக", dash_roadmap: "என் ரோட்மேப்", dash_interviews: "நேர்காணல் பயிற்சி",
    dash_assessment: "திறன் மதிப்பீடு", dash_projects: "திட்டங்கள்", dash_resume: "ரெஸ்யூம்",
    dash_leaderboard: "லீடர்போர்டு", dash_logout: "வெளியேறு",
    onb_welcome: "வருக! தொடங்கலாம்", onb_sub: "உங்கள் அனுபவத்தை தனிப்பயனாக்க உங்களைப் பற்றி சொல்லுங்கள்.",
    onb_name: "முழு பெயர்", onb_college: "கல்லூரி / பல்கலைக்கழகம்", onb_branch: "கிளை / ஸ்ட்ரீம்",
    onb_year: "படிப்பு ஆண்டு", onb_targetRole: "இலக்கு பதவி", onb_continue: "தொடரவும்",
    onb_back: "திரும்பு", onb_chooseAvatar: "உங்கள் அவதாரை தேர்வு செய்யுங்கள்", onb_finish: "அமைப்பை முடிக்கவும்",
  },
};

const LanguageContext = createContext<T>(translations.en);

const LANG_KEY = "placement_ai_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem(LANG_KEY) as Lang | null;
    return stored && ["en", "te", "hi", "ta"].includes(stored) ? stored : "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
  };

  const t = { ...translations[lang], lang, setLang };
  return <LanguageContext.Provider value={t}>{children}</LanguageContext.Provider>;
}

export function useT() {
  return useContext(LanguageContext);
}

export const LANG_OPTIONS: { code: Lang; label: string; flag: string; native: string }[] = [
  { code: "en", label: "English",  flag: "🇬🇧", native: "English" },
  { code: "te", label: "Telugu",   flag: "🇮🇳", native: "తెలుగు" },
  { code: "hi", label: "Hindi",    flag: "🇮🇳", native: "हिंदी" },
  { code: "ta", label: "Tamil",    flag: "🇮🇳", native: "தமிழ்" },
];
