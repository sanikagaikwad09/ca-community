"use client";

import React, { useState, useMemo } from "react";
import { 
  MessageSquare, 
  BookOpen, 
  Users, 
  Bell, 
  Share2, 
  ArrowRight, 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  Smartphone, 
  Mail, 
  Phone, 
  ArrowUpRight, 
  Lock, 
  Award,
  Hash,
  Send,
  ExternalLink,
  Shield
} from "lucide-react";

// Mock discussions data for the interactive Hero Mockup Feed
interface Discussion {
  id: string;
  category: string;
  title: string;
  author: string;
  role: string;
  excerpt: string;
  replies: number;
  views: number;
  time: string;
  tag: string;
}

const DISCUSSIONS_DATA: Discussion[] = [
  {
    id: "disc-1",
    category: "GST & Indirect Tax",
    title: "Input Tax Credit eligibility on CSR expenses post Finance Act amendment",
    author: "CA Arvind Ramaswamy",
    role: "Tax Partner, AR & Associates",
    excerpt: "Section 17(5) has been amended to block ITC on corporate social responsibility expenses. However, does this apply to mandatory CSR or voluntary expenses incurred prior to the amendment date? Let's discuss the transitional provisions...",
    replies: 18,
    views: 320,
    time: "2 hours ago",
    tag: "GST"
  },
  {
    id: "disc-2",
    category: "Corporate Law",
    title: "Significant Beneficial Ownership (SBO) disclosure rules under Section 90",
    author: "CS Priyal Shah",
    role: "Corporate Counsel, Zenith Advisory",
    excerpt: "Determining indirect holding layers in complex corporate structures remains challenging. Has anyone drafted the Form BEN-2 declaration for multi-layered trust ownerships? Looking for template reference...",
    replies: 12,
    views: 204,
    time: "5 hours ago",
    tag: "Companies Act"
  },
  {
    id: "disc-3",
    category: "FEMA & Regulatory",
    title: "FEMA compliance: RBI circular on late submission fees (LSF) for ODI reporting",
    author: "Adv. Suresh Nair",
    role: "FEMA & RBI Regulatory Counsel",
    excerpt: "The revised guidelines for late filings of Form ODI Part II have clarified LSF computations, but ambiguity remains regarding historical delays under the older compounding regime. Let's trace the compounding precedents...",
    replies: 9,
    views: 145,
    time: "1 day ago",
    tag: "FEMA"
  },
  {
    id: "disc-4",
    category: "Direct Taxation",
    title: "Section 43B(h) amendment impact on payments made to MSME traders",
    author: "CA Rahul Verma",
    role: "SME Tax Advisory Services",
    excerpt: "The definition of 'Enterprise' under the MSMED Act excludes retail/wholesale traders from credit benefits. Thus, payment delays to wholesale traders should not attract disallowance under 43B(h). Agree?",
    replies: 31,
    views: 512,
    time: "3 days ago",
    tag: "Income Tax"
  },
  {
    id: "disc-5",
    category: "SEBI Compliance",
    title: "SEBI Listing Regulations (LODR) amendments on board meeting disclosure timelines",
    author: "CS Vikramaditya",
    role: "Compliance Officer, Apex Group",
    excerpt: "The transition from 30 minutes to 15 minutes for disclosure of board decisions has caused operational hurdles. How are your secretarial teams managing board minutes approvals in real time?",
    replies: 24,
    views: 418,
    time: "4 days ago",
    tag: "SEBI LODR"
  }
];

export default function Home() {
  // States for Hero Mockup Dashboard
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [likedDiscussions, setLikedDiscussions] = useState<Record<string, boolean>>({});
  const [dashboardMessages, setDashboardMessages] = useState<Record<string, string[]>>({});
  const [currentMessageInput, setCurrentMessageInput] = useState<string>("");

  // States for Contact form
  const [professionalType, setProfessionalType] = useState<string>("CA");
  const [formData, setFormData] = useState({
    name: "",
    membershipNo: "",
    email: "",
    phone: "",
    consent: false
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Filtered discussions for Hero Mockup
  const filteredDiscussions = useMemo(() => {
    return DISCUSSIONS_DATA.filter(discussion => {
      const matchesCategory = selectedCategory === "All" || discussion.category === selectedCategory;
      const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            discussion.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            discussion.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle Discussion Like/Bookmark
  const toggleLike = (id: string) => {
    setLikedDiscussions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle Dashboard Message submit (interactive feedback)
  const handleSendMessage = (discussionId: string) => {
    if (!currentMessageInput.trim()) return;
    setDashboardMessages(prev => ({
      ...prev,
      [discussionId]: [...(prev[discussionId] || []), currentMessageInput]
    }));
    setCurrentMessageInput("");
  };

  // Handle contact form submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.membershipNo && formData.email) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white text-charcoal flex flex-col font-sans selection:bg-red-50 selection:text-accent-red">
      
      {/* 1. NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-border-light transition-premium">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-charcoal flex items-center justify-center font-serif font-bold text-lg bg-charcoal text-white relative overflow-hidden rounded-sm">
              <span className="relative z-10">A</span>
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-accent-red"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-widest text-sm text-charcoal">Apex Forum</span>
              <span className="text-[9px] text-secondary tracking-wider -mt-1 font-semibold uppercase">PROFESSIONAL NETWORK</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-secondary">
            <a href="#forum" className="hover:text-charcoal hover:underline decoration-accent-red decoration-2 underline-offset-4 transition-colors">Discussion Forum</a>
            <a href="#features" className="hover:text-charcoal hover:underline decoration-accent-red decoration-2 underline-offset-4 transition-colors">Features</a>
            <a href="#publications" className="hover:text-charcoal hover:underline decoration-accent-red decoration-2 underline-offset-4 transition-colors">Publications</a>
            <a href="#trending" className="hover:text-charcoal hover:underline decoration-accent-red decoration-2 underline-offset-4 transition-colors">Trending</a>
            <a href="#showcase" className="hover:text-charcoal hover:underline decoration-accent-red decoration-2 underline-offset-4 transition-colors">Mobile App</a>
          </nav>

          {/* CTAs with Auth cues */}
          <div className="flex items-center gap-4">
            <a 
              href="#contact" 
              className="text-xs font-bold uppercase tracking-wider text-secondary hover:text-charcoal py-2 transition-colors hidden sm:flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-secondary" />
              <span>Sign In</span>
            </a>
            <a 
              href="#contact" 
              className="text-xs font-bold uppercase tracking-widest bg-charcoal text-white px-5 py-2.5 border border-charcoal hover:bg-cream hover:text-charcoal transition-premium shadow-sm rounded-none"
            >
              Join Community
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative w-full overflow-hidden pt-16 md:pt-24 pb-28 border-b border-border-light grid-pattern">
        {/* Subtle grid fade */}
        <div className="absolute inset-0 radial-fade pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border-light bg-white/80 rounded-full text-xs font-bold text-secondary mb-6 tracking-wider shadow-sm uppercase">
            <Shield className="w-3.5 h-3.5 text-accent-red" />
            <span>A trusted network built by practitioners for practitioners</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-light text-center leading-tight tracking-tight text-charcoal max-w-4xl font-sans">
            India's Largest Community for <span className="font-extrabold block sm:inline">CA, CS & Corporate Legal</span> Professionals
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-secondary text-center max-w-3xl mt-6 font-normal leading-relaxed">
            Connect with verified Chartered Accountants, Company Secretaries, Corporate Lawyers, and Regulatory Officers. Collaborate on technical clarifications, resolve compliance hurdles, and share peer intelligence.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
            <a 
              href="#contact" 
              className="w-full sm:w-auto text-center font-bold bg-accent-red text-white px-8 py-3.5 border border-accent-red hover:bg-white hover:text-accent-red transition-premium text-base shadow-md"
            >
              Join Community
            </a>
            <a 
              href="#showcase" 
              className="w-full sm:w-auto text-center font-bold bg-white text-charcoal px-8 py-3.5 border border-border-light hover:border-charcoal transition-premium text-base flex items-center justify-center gap-2"
            >
              <span>Download App</span>
              <Smartphone className="w-4 h-4 text-secondary" />
            </a>
          </div>

          {/* INTERACTIVE COMMUNITY FEED DASHBOARD MOCKUP */}
          <div id="forum" className="w-full max-w-5xl mt-20 border border-border-light bg-white shadow-2xl relative rounded-none">
            {/* Top window bar */}
            <div className="h-14 border-b border-border-light px-4 flex items-center justify-between bg-cream">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neutral-300"></div>
                <div className="w-3 h-3 rounded-full bg-neutral-300"></div>
                <div className="w-3 h-3 rounded-full bg-neutral-300"></div>
                <span className="text-[11px] font-semibold text-secondary ml-4 tracking-wider font-mono">apexforum.in/advisory-feed</span>
              </div>
              <div className="relative max-w-xs w-48 sm:w-64">
                <Search className="w-3.5 h-3.5 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search compliance issues..." 
                  className="w-full h-8 pl-9 pr-3 text-xs border border-border-light focus:outline-none focus:border-charcoal bg-white transition-colors"
                />
              </div>
            </div>

            {/* Dashboard Inner Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 min-h-[500px]">
              
              {/* Sidebar */}
              <div className="border-r border-border-light p-4 bg-gray-50/30 flex flex-col justify-between md:col-span-1">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-secondary tracking-widest uppercase">Forums & Channels</span>
                  </div>
                  <div className="space-y-1">
                    {[
                      { name: "GST & Indirect Tax" },
                      { name: "Corporate Law" },
                      { name: "Compliance & Governance" },
                      { name: "Direct Taxation" },
                      { name: "FEMA & Regulatory" },
                      { name: "Legal Advisory" }
                     ].map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`w-full text-left px-3 py-2 text-xs font-bold transition-all flex items-center gap-2 ${
                          selectedCategory === cat.name 
                            ? "bg-charcoal text-white" 
                            : "text-secondary hover:text-charcoal hover:bg-gray-50"
                        }`}
                      >
                        <Hash className={`w-3.5 h-3.5 ${selectedCategory === cat.name ? "text-accent-red" : "text-gray-400"}`} />
                        <span className="truncate">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border-light">
                  <span className="text-[9px] font-bold text-secondary tracking-widest uppercase block mb-3">Live Practitioners</span>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                      <span className="text-xs font-bold text-charcoal">CA Arvind R. <span className="text-secondary font-normal font-serif italic">(Direct Tax)</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                      <span className="text-xs font-bold text-charcoal">CS Priyal S. <span className="text-secondary font-normal font-serif italic">(Companies Act)</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                      <span className="text-xs font-bold text-charcoal">Adv. Neha M. <span className="text-secondary font-normal font-serif italic">(Corporate Law)</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="p-6 md:col-span-3 flex flex-col justify-between bg-white max-h-[550px] overflow-y-auto">
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-border-light">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal flex items-center gap-1.5">
                      <span>{selectedCategory} discussions</span>
                      <span className="text-[11px] text-secondary font-normal">({filteredDiscussions.length})</span>
                    </h3>
                    <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider">SECURE ADVISORY CHANNEL</span>
                  </div>

                  {/* Feed Items */}
                  {filteredDiscussions.length > 0 ? (
                    filteredDiscussions.map((disc) => (
                      <div key={disc.id} className="group border border-border-light p-5 hover:border-charcoal transition-premium relative bg-white rounded-none">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            {/* Author Metadata */}
                            <div className="flex items-center gap-2 text-[11px] text-secondary font-semibold mb-2">
                              <span className="text-charcoal font-bold">{disc.author}</span>
                              <span>•</span>
                              <span className="font-serif italic">{disc.role}</span>
                              <span>•</span>
                              <span>{disc.time}</span>
                            </div>
                            
                            {/* Discussion Title */}
                            <h4 className="text-base font-bold text-charcoal group-hover:text-accent-red transition-colors mb-2">
                              {disc.title}
                            </h4>
                            
                            {/* Short excerpt */}
                            <p className="text-xs text-secondary leading-relaxed mb-4">
                              {disc.excerpt}
                            </p>

                            {/* Tags & Actions */}
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-[9px] font-bold text-accent-red border border-accent-red/20 bg-accent-red/5 px-2.5 py-0.5 uppercase tracking-wider rounded-none">
                                {disc.tag}
                              </span>
                              <span className="text-[10px] font-semibold text-secondary">
                                {disc.replies} Replies
                              </span>
                              <span className="text-[10px] font-semibold text-secondary">
                                {disc.views} Views
                              </span>
                            </div>
                          </div>

                          {/* Quick Interactive Like Button */}
                          <button 
                            onClick={() => toggleLike(disc.id)}
                            className={`p-2 border rounded-none transition-colors ${
                              likedDiscussions[disc.id] 
                                ? "bg-red-50/50 border-red-200 text-accent-red" 
                                : "border-border-light text-secondary hover:border-charcoal hover:text-charcoal"
                            }`}
                            title="Bookmark Thread"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                            </svg>
                          </button>
                        </div>

                        {/* Interactive replies feature in mockup */}
                        {dashboardMessages[disc.id] && dashboardMessages[disc.id].map((msg, i) => (
                          <div key={i} className="mt-3 pl-4 border-l-2 border-accent-red bg-cream/50 py-2.5 pr-2 text-xs flex flex-col gap-1">
                            <span className="font-bold text-[9px] text-charcoal">You (Verification Pending) • Just now</span>
                            <span className="text-secondary">{msg}</span>
                          </div>
                        ))}

                        {/* Interactive Reply Input */}
                        <div className="mt-4 pt-3 border-t border-border-light/60 flex items-center gap-2">
                          <input 
                            type="text" 
                            placeholder="Share your professional perspective..."
                            value={currentMessageInput}
                            onChange={(e) => setCurrentMessageInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSendMessage(disc.id);
                            }}
                            className="w-full text-xs py-2 px-3 border border-border-light focus:outline-none focus:border-charcoal rounded-none"
                          />
                          <button 
                            onClick={() => handleSendMessage(disc.id)}
                            className="p-2 border border-charcoal bg-charcoal text-white hover:bg-white hover:text-charcoal transition-colors rounded-none"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 border border-dashed border-border-light">
                      <span className="text-secondary text-xs font-semibold">No active threads in this category. Try searching for &quot;FEMA&quot;, &quot;LODR&quot;, or &quot;Companies Act&quot;.</span>
                    </div>
                  )}
                </div>

                <div className="mt-8 text-center pt-4 border-t border-border-light/80">
                  <a href="#contact" className="inline-flex items-center gap-2 text-xs font-bold text-charcoal hover:text-accent-red transition-colors uppercase tracking-widest">
                    <span>Access 50,000+ expert discussions, legal insights and compliance resources</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. COMMUNITY STATISTICS SECTION */}
      <section className="w-full py-16 border-b border-border-light bg-gray-50/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y-0 md:divide-x divide-border-light">
            
            <div className="flex flex-col items-center md:items-start md:px-8">
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-charcoal">45,000+</span>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest mt-2">Verified Professionals</span>
              <p className="text-xs text-secondary/80 mt-2 text-center md:text-left leading-relaxed">
                Chartered Accountants, Company Secretaries, and Cost Auditors.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start md:px-8">
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-charcoal">1.2M+</span>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest mt-2">Annual Queries</span>
              <p className="text-xs text-secondary/80 mt-2 text-center md:text-left leading-relaxed">
                Compliance case discussions, peer resolutions, and filings queries.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start md:px-8">
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-charcoal">200+</span>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest mt-2">Board Advisors</span>
              <p className="text-xs text-secondary/80 mt-2 text-center md:text-left leading-relaxed">
                Advisory board members vetting circular compliance summaries.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start md:px-8">
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-charcoal">18 Min</span>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest mt-2">Avg Resolution Time</span>
              <p className="text-xs text-secondary/80 mt-2 text-center md:text-left leading-relaxed">
                Unmatched peer-to-peer compliance advisory in real-time.
              </p>
            </div>

          </div>
        </div>
      </section>

{/* FEATURES GRID SECTION */}
{/* FEATURES GRID SECTION */}
<section id="features" className="w-full py-24 border-b border-border-light bg-white">
  <div className="max-w-7xl mx-auto px-6">

    {/* Header */}
    <div className="max-w-2xl mb-16">
      <span className="text-xs font-bold text-accent-red uppercase tracking-widest">
        Built for CA, CS & Legal Practitioners
      </span>
      <h2 className="text-3xl md:text-4xl font-light text-charcoal tracking-tight mt-3">
        A unified workspace for compliance, advisory, and peer validation.
      </h2>
    </div>

    {/* First Row */}
    <div className="grid grid-cols-1 md:grid-cols-3 border border-border-light divide-y md:divide-y-0 md:divide-x divide-border-light">
      
      {/* Feature 1 */}
      <div className="p-8 hover:bg-gray-50 transition flex flex-col justify-between min-h-[260px]">
        <div>
          <div className="w-10 h-10 border border-border-light flex items-center justify-center text-charcoal mb-6 bg-white">
            <MessageSquare className="w-5 h-5 text-accent-red" />
          </div>
          <h3 className="text-lg font-bold text-charcoal mb-2">Professional Forums</h3>
          <p className="text-sm text-secondary leading-relaxed">
            Collaborate on direct tax, FEMA, litigation, and company law matters in indexed, secure channels.
          </p>
        </div>
        <a href="#forum" className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal mt-6 uppercase tracking-wider hover:text-accent-red">
          <span>View channels</span>
          <ChevronRight className="w-3 h-3" />
        </a>
      </div>

      {/* Feature 2 */}
      <div className="p-8 hover:bg-gray-50 transition flex flex-col justify-between min-h-[260px]">
        <div>
          <div className="w-10 h-10 border border-border-light flex items-center justify-center text-charcoal mb-6 bg-white">
            <Bell className="w-5 h-5 text-accent-red" />
          </div>
          <h3 className="text-lg font-bold text-charcoal mb-2">Regulatory Updates</h3>
          <p className="text-sm text-secondary leading-relaxed">
            Consolidated feed mapping MCA circulars, CBDT/CBIC tax notifications, SEBI decisions, and RBI directions.
          </p>
        </div>
        <a href="#updates" className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal mt-6 uppercase tracking-wider hover:text-accent-red">
          <span>Configure alerts</span>
          <ChevronRight className="w-3 h-3" />
        </a>
      </div>

      {/* Feature 3 */}
      <div className="p-8 hover:bg-gray-50 transition flex flex-col justify-between min-h-[260px]">
        <div>
          <div className="w-10 h-10 border border-border-light flex items-center justify-center text-charcoal mb-6 bg-white">
            <BookOpen className="w-5 h-5 text-accent-red" />
          </div>
          <h3 className="text-lg font-bold text-charcoal mb-2">Expert Publications</h3>
          <p className="text-sm text-secondary leading-relaxed">
            Technical journals and articles by practicing advocates and senior partners with actionable insights.
          </p>
        </div>
        <a href="#publications" className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal mt-6 uppercase tracking-wider hover:text-accent-red">
          <span>Read papers</span>
          <ChevronRight className="w-3 h-3" />
        </a>
      </div>
    </div>

    {/* Second Row */}
    <div className="grid grid-cols-1 md:grid-cols-3 border-x border-b border-border-light divide-y md:divide-y-0 md:divide-x divide-border-light">
      
      {/* Feature 4 */}
      <div className="p-8 hover:bg-gray-50 transition flex flex-col justify-between min-h-[260px]">
        <div>
          <div className="w-10 h-10 border border-border-light flex items-center justify-center text-charcoal mb-6 bg-white">
            <Share2 className="w-5 h-5 text-accent-red" />
          </div>
          <h3 className="text-lg font-bold text-charcoal mb-2">Corporate Law Resources</h3>
          <p className="text-sm text-secondary leading-relaxed">
            Repository of vetted resolutions, JV contracts, audit checklists, and M&A scheme filings.
          </p>
        </div>
        <a href="#resources" className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal mt-6 uppercase tracking-wider hover:text-accent-red">
          <span>Browse resources</span>
          <ChevronRight className="w-3 h-3" />
        </a>
      </div>

      {/* Feature 5 */}
      <div className="p-8 hover:bg-gray-50 transition flex flex-col justify-between min-h-[260px]">
        <div>
          <div className="w-10 h-10 border border-border-light flex items-center justify-center text-charcoal mb-6 bg-white">
            <Award className="w-5 h-5 text-accent-red" />
          </div>
          <h3 className="text-lg font-bold text-charcoal mb-2">Compliance Hub</h3>
          <p className="text-sm text-secondary leading-relaxed">
            Interactive checklists mapping SEBI LODR declarations, MCA returns, and secretarial audit workflows.
          </p>
        </div>
        <a href="#compliance" className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal mt-6 uppercase tracking-wider hover:text-accent-red">
          <span>View checklists</span>
          <ChevronRight className="w-3 h-3" />
        </a>
      </div>

      {/* Feature 6 */}
      <div className="p-8 hover:bg-gray-50 transition flex flex-col justify-between min-h-[260px]">
        <div>
          <div className="w-10 h-10 border border-border-light flex items-center justify-center text-charcoal mb-6 bg-white">
            <Users className="w-5 h-5 text-accent-red" />
          </div>
          <h3 className="text-lg font-bold text-charcoal mb-2">Verified Network</h3>
          <p className="text-sm text-secondary leading-relaxed">
            Connect with attorneys, governance experts, and partners across industries. Searchable by enrollment or MRN.
          </p>
        </div>
        <a href="#directory" className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal mt-6 uppercase tracking-wider hover:text-accent-red">
          <span>Open directory</span>
          <ChevronRight className="w-3 h-3" />
        </a>
      </div>
    </div>
        </div>
      </section>

{/* 5. RECENT ARTICLES SECTION */}
<section id="publications" className="w-full py-28 border-b border-border-light bg-cream/10">
  <div className="max-w-7xl mx-auto px-6">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
      <div className="max-w-xl">
        <span className="text-xs font-bold text-accent-red uppercase tracking-widest">
          Technical Publications
        </span>
        <h2 className="text-3xl md:text-4xl font-light text-charcoal tracking-tight mt-3">
          Peer-reviewed analyses on statutory, tax & corporate law changes.
        </h2>
      </div>
      <a
        href="#contact"
        className="font-bold text-xs uppercase tracking-wider text-charcoal border-b border-charcoal hover:border-accent-red hover:text-accent-red pb-1 flex items-center gap-1.5 self-start md:self-auto transition-colors"
      >
        <span>View all publications</span>
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>

    {/* Articles Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Article 1 */}
      <article className="bg-white border border-border-light hover:border-charcoal transition flex flex-col justify-between shadow-sm">
        <div className="p-8">
          <span className="text-[9px] font-bold text-accent-red border border-accent-red/20 bg-accent-red/5 px-2 py-0.5 uppercase tracking-wider block w-fit mb-6">
            INCOME TAX ACT
          </span>
          <h3 className="text-xl font-bold text-charcoal mb-3 leading-snug">
            Section 43B(h): Impact on MSME Payment Compliance
          </h3>
          <p className="text-xs text-secondary leading-relaxed mb-6 line-clamp-3">
            Clause (h) in Section 43B has reshaped MSME payment timelines. This article decodes deadlines, enterprise definitions, and audit reporting requirements.
          </p>
        </div>
        <div className="px-8 py-4 bg-cream/30 border-t border-border-light flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-charcoal">CA Meera Sharma</span>
            <span className="text-[10px] text-secondary italic">Partner, Sharma & Co.</span>
          </div>
          <span className="text-[10px] font-semibold text-secondary">8 Min Read</span>
        </div>
      </article>

      {/* Article 2 */}
      <article className="bg-white border border-border-light hover:border-charcoal transition flex flex-col justify-between shadow-sm">
        <div className="p-8">
          <span className="text-[9px] font-bold text-accent-red border border-accent-red/20 bg-accent-red/5 px-2 py-0.5 uppercase tracking-wider block w-fit mb-6">
            COMPANIES ACT
          </span>
          <h3 className="text-xl font-bold text-charcoal mb-3 leading-snug">
            SBO Rules: Compliance Checklist under Section 90
          </h3>
          <p className="text-xs text-secondary leading-relaxed mb-6 line-clamp-3">
            Identifying Significant Beneficial Owners remains complex. This guide provides structured checklists and flow diagrams for accurate BEN-2 filings.
          </p>
        </div>
        <div className="px-8 py-4 bg-cream/30 border-t border-border-light flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-charcoal">CS Vikram Sen</span>
            <span className="text-[10px] text-secondary italic">Compliance Head, Apex Group</span>
          </div>
          <span className="text-[10px] font-semibold text-secondary">12 Min Read</span>
        </div>
      </article>

      {/* Article 3 */}
      <article className="bg-white border border-border-light hover:border-charcoal transition flex flex-col justify-between shadow-sm">
        <div className="p-8">
          <span className="text-[9px] font-bold text-accent-red border border-accent-red/20 bg-accent-red/5 px-2 py-0.5 uppercase tracking-wider block w-fit mb-6">
            COST ACCOUNTING
          </span>
          <h3 className="text-xl font-bold text-charcoal mb-3 leading-snug">
            Cost Audit Rules: Annexures & Reconciliation Strategy FY 2025-26
          </h3>
          <p className="text-xs text-secondary leading-relaxed mb-6 line-clamp-3">
            Key reconciliation formats for CRA-3 reporting, focusing on material cost allocations and overhead absorption. Avoid common audit revision pitfalls.
          </p>
        </div>
        <div className="px-8 py-4 bg-cream/30 border-t border-border-light flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-charcoal">CMA Rajesh Kumar</span>
            <span className="text-[10px] text-secondary italic">Practicing Cost Auditor</span>
          </div>
          <span className="text-[10px] font-semibold text-secondary">10 Min Read</span>
        </div>
      </article>

    </div>
  </div>
</section>

      {/* 6. TRENDING DISCUSSIONS SECTION */}
      <section id="trending" className="w-full py-28 border-b border-border-light bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-xl mb-16">
            <span className="text-xs font-bold text-accent-red uppercase tracking-widest">Active boardroom queries</span>
            <h2 className="text-3xl md:text-4xl font-light text-charcoal tracking-tight mt-3">
              Regulatory and litigation queries currently resolving.
            </h2>
          </div>

          <div className="border border-border-light divide-y divide-border-light">
            
            {/* Thread 1 */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-cream/15 transition-premium">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2.5 shrink-0"></div>
                <div>
                  <h3 className="text-base font-bold text-charcoal hover:text-accent-red transition-colors cursor-pointer ">
                    GST Portal error &apos;Access Denied&apos; while logging into SEZ Developer profile: Temporary workarounds
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-secondary font-semibold">
                    <span className="text-accent-red font-bold">GST & INDIRECT TAX</span>
                    <span>•</span>
                    <span>Started by CA Riya Gupta</span>
                    <span>•</span>
                    <span>1h ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 self-end sm:self-auto text-xs font-semibold text-secondary shrink-0">
                <span>12 Replies</span>
                <span>88 Views</span>
              </div>
            </div>

            {/* Thread 2 */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-cream/15 transition-premium">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2.5 shrink-0"></div>
                <div>
                  <h3 className="text-base font-bold text-charcoal hover:text-accent-red transition-colors cursor-pointer">
                    Interpretation of &apos;Related Party Transaction&apos; definition under SEBI LODR vs. Companies Act Section 188
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-secondary font-semibold">
                    <span className="text-accent-red font-bold">CORPORATE COMPLIANCE</span>
                    <span>•</span>
                    <span>Started by CS Rohan Dsouza</span>
                    <span>•</span>
                    <span>4h ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 self-end sm:self-auto text-xs font-semibold text-secondary shrink-0">
                <span>8 Replies</span>
                <span>154 Views</span>
              </div>
            </div>

            {/* Thread 3 */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-cream/15 transition-premium">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2.5 shrink-0"></div>
                <div>
                  <h3 className="text-base font-bold text-charcoal hover:text-accent-red transition-colors cursor-pointer">
                    Securing RBI approvals for write-off of overseas investments under FEMA Rules
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-secondary font-semibold">
                    <span className="text-accent-red font-bold">FEMA & RBI</span>
                    <span>•</span>
                    <span>Started by Adv. Neha Mukherji</span>
                    <span>•</span>
                    <span>1d ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 self-end sm:self-auto text-xs font-semibold text-secondary shrink-0">
                <span>19 Replies</span>
                <span>312 Views</span>
              </div>
            </div>

            {/* Thread 4 */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-cream/15 transition-premium">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2.5 shrink-0"></div>
                <div>
                  <h3 className="text-base font-bold text-charcoal hover:text-accent-red transition-colors cursor-pointer">
                    Challenges in drafting dispute resolution clauses post Supreme Court rulings on unilateral arbitrator appointments
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-secondary font-semibold">
                    <span className="text-accent-red font-bold">CORPORATE LITIGATION</span>
                    <span>•</span>
                    <span>Started by Adv. Nalin Mehta</span>
                    <span>•</span>
                    <span>3d ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 self-end sm:self-auto text-xs font-semibold text-secondary shrink-0">
                <span>14 Replies</span>
                <span>215 Views</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. MOBILE APP SHOWCASE */}
      <section id="showcase" className="w-full py-28 border-b border-border-light bg-cream/25 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left text panel */}
            <div>
              <span className="text-xs font-bold text-accent-red uppercase tracking-widest">Apex Forum Mobile</span>
              <h2 className="text-4xl md:text-5xl font-light text-charcoal tracking-tight mt-4 leading-tight ">
                A secure, verified network in your pocket.
              </h2>
              <p className="text-sm text-secondary mt-6 leading-relaxed">
                Consult and coordinate securely on the move. The Apex Forum mobile app allows verified practitioners to access private discussion boards, verify compliance updates, and chat with peers.
              </p>

              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-white border border-border-light text-accent-red mt-1 rounded-none">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal">Encrypted Consultations</h4>
                    <p className="text-xs text-secondary mt-0.5">Secure, peer-to-peer professional advisory messages protected by credential keys.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-white border border-border-light text-accent-red mt-1 rounded-none">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal">Statutory Alerts Push</h4>
                    <p className="text-xs text-secondary mt-0.5">Direct summaries of notifications from SEBI, RBI, MCA, CBDT, and CBIC pushed immediately.</p>
                  </div>
                </div>
              </div>

              {/* Store acquisition badges */}
              <div className="flex flex-wrap gap-4 mt-10">
                <div className="cursor-pointer border border-charcoal bg-charcoal text-white hover:bg-white hover:text-charcoal px-5 py-2.5 flex items-center gap-3 transition-premium select-none rounded-none">
                  <Smartphone className="w-5 h-5 shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] uppercase tracking-wider text-secondary leading-none">Download on the</span>
                    <span className="text-xs font-bold leading-tight mt-0.5">App Store</span>
                  </div>
                </div>

                <div className="cursor-pointer border border-charcoal bg-charcoal text-white hover:bg-white hover:text-charcoal px-5 py-2.5 flex items-center gap-3 transition-premium select-none rounded-none">
                  <Smartphone className="w-5 h-5 shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] uppercase tracking-wider text-secondary leading-none">Get it on</span>
                    <span className="text-xs font-bold leading-tight mt-0.5">Google Play</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Phone Mockup Panel */}
            <div className="flex justify-center lg:justify-end">
              {/* Phone Frame container */}
              <div className="w-[300px] h-[600px] border-[6px] border-charcoal rounded-[36px] bg-white relative overflow-hidden shadow-2xl shrink-0">
                
                {/* Speaker Grill / Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-charcoal rounded-full z-20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 ml-12"></div>
                </div>

                {/* Internal App View */}
                <div className="w-full h-full pt-9 flex flex-col justify-between bg-white text-charcoal z-10 relative">
                  
                  {/* Internal App Header */}
                  <div className="px-4 py-3 border-b border-border-light flex items-center justify-between bg-cream">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-charcoal flex items-center justify-center font-serif font-bold text-[9px] bg-charcoal text-white rounded-none">
                        A
                      </div>
                      <span className="text-[10px] font-extrabold tracking-widest text-charcoal">APEX FORUM</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                  </div>

                  {/* App Message Feed */}
                  <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[440px]">
                    <div className="text-[9px] text-center text-secondary font-semibold uppercase tracking-widest my-2">
                      Secured Direct Consultation
                    </div>

                    {/* Incoming Msg */}
                    <div className="flex flex-col gap-1 items-start max-w-[85%]">
                      <div className="bg-neutral-100 p-2.5 text-xs text-charcoal rounded-none border border-border-light leading-relaxed">
                        Hi, under the SEBI LODR rules, does the disclosure of a promoter group share pledge need to be submitted within 2 working days?
                      </div>
                      <span className="text-[8px] text-secondary font-semibold pl-1 font-serif italic">CS Suresh N. • 3:12 PM</span>
                    </div>

                    {/* Outgoing Msg */}
                    <div className="flex flex-col gap-1 items-end max-w-[85%] ml-auto">
                      <div className="bg-accent-red text-white p-2.5 text-xs rounded-none leading-relaxed">
                        Yes, under Regulation 31 of SEBI LODR, any pledge creation, invocation, or release by promoters must be reported to the stock exchange within two working days of the transaction.
                      </div>
                      <span className="text-[8px] text-secondary font-semibold pr-1 font-serif italic">CS Priyal S. • 3:14 PM</span>
                    </div>

                    {/* Incoming Msg 2 */}
                    <div className="flex flex-col gap-1 items-start max-w-[85%]">
                      <div className="bg-neutral-100 p-2.5 text-xs text-charcoal rounded-none border border-border-light leading-relaxed">
                        Got it. That aligns with our board calendar. I will coordinate the filing. Thanks!
                      </div>
                      <span className="text-[8px] text-secondary font-semibold pl-1 font-serif italic">CS Suresh N. • 3:15 PM</span>
                    </div>
                  </div>

                  {/* App Input Area */}
                  <div className="p-3 border-t border-border-light flex items-center gap-2 bg-cream">
                    <input 
                      type="text" 
                      placeholder="Type reply..." 
                      className="w-full text-xs py-1.5 px-3 border border-border-light focus:outline-none focus:border-charcoal bg-white rounded-none"
                      disabled
                    />
                    <div className="p-1.5 border border-charcoal bg-charcoal text-white shrink-0 cursor-not-allowed">
                      <Send className="w-3.5 h-3.5" />
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CONTACT & MEMBERSHIP REGISTRATION */}
      <section id="contact" className="w-full py-28 border-b border-border-light bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Trust and guidelines panel */}
            <div>
              <span className="text- font-bold text-accent-red uppercase tracking-widest">Verification Standards</span>
              <h2 className="text-4xl font-light text-charcoal tracking-tight mt-4">
                Strict credentials validation to maintain professional integrity.
              </h2>
              <p className="text-sm text-secondary mt-6 leading-relaxed">
                To keep our community high-value, spam-free and legally authoritative, we verify the credentials of every registering professional before granting access.
              </p>

              <div className="space-y-6 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-none border border-border-light flex items-center justify-center shrink-0 text-accent-red text-xs font-bold mt-1 bg-cream">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal">Professional Credentials Submission</h4>
                    <p className="text-xs text-secondary mt-1 leading-relaxed">
                      All CA, CS, and Legal applicants must provide their official Membership Number or Bar Council Enrollment Code.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-none border border-border-light flex items-center justify-center shrink-0 text-accent-red text-xs font-bold mt-1 bg-cream">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal">Database Cross-Referencing</h4>
                    <p className="text-xs text-secondary mt-1 leading-relaxed">
                      Registration inputs are cross-referenced with public registries of the Institute of Chartered Accountants of India (ICAI), the Institute of Company Secretaries of India (ICSI), and state Bar Councils.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-none border border-border-light flex items-center justify-center shrink-0 text-accent-red text-xs font-bold mt-1 bg-cream">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal">Secure Account Provisioning</h4>
                    <p className="text-xs text-secondary mt-1 leading-relaxed">
                      Upon validation of credentials, a unique, encrypted profile invitation link is emailed to the applicant to activate their platform membership.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form Panel */}
            <div className="border border-border-light p-8 md:p-10 bg-cream/15 relative rounded-none">
              
              {/* Lock and Shield Icons for trust */}
              <div className="absolute top-4 right-4 flex items-center gap-2 text-[10px] font-bold text-secondary tracking-widest uppercase">
                <Lock className="w-3.5 h-3.5 text-accent-red" />
                <span className="hidden sm:inline">Secure Submission</span>
              </div>

              <h3 className="text-xl font-bold text-charcoal font-serif mb-2">Verified Membership Application</h3>
              <p className="text-xs text-secondary mb-6 leading-relaxed border-b border-border-light pb-4">
                Access to discussions, publications, and professional networking is limited to verified professionals and approved members.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-2 mb-6 border border-border-light bg-white p-3.5">
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-4 h-4 text-emerald-600 mb-1" />
                  <span className="text-[9px] font-bold text-charcoal uppercase tracking-wider">Secure Verification</span>
                </div>
                <div className="flex flex-col items-center text-center border-x border-border-light">
                  <Lock className="w-4 h-4 text-accent-red mb-1" />
                  <span className="text-[9px] font-bold text-charcoal uppercase tracking-wider">Protected Access</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1" />
                  <span className="text-[9px] font-bold text-charcoal uppercase tracking-wider">Verified Profiles</span>
                </div>
              </div>

              {/* Verification Warning Card */}
              <div className="border-l-4 border-accent-red bg-white p-4 mb-6 shadow-sm flex items-start gap-3 rounded-none">
                <Lock className="w-5 h-5 text-accent-red shrink-0 mt-0.5" />
                <p className="text-[11px] text-secondary leading-relaxed font-semibold">
                  To maintain the quality and credibility of discussions, professional memberships and credentials are verified before access is granted.
                </p>
              </div>
              
              {formSubmitted ? (
                <div className="text-center py-16">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h4 className="text-base font-bold text-charcoal mb-2 font-serif">Membership Application Logged</h4>
                  <p className="text-xs text-secondary max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.name}. Our screening panel is cross-referencing your credentials with the database registry. You will receive an invitation link on <strong>{formData.email}</strong> once verified.
                  </p>
                  <button 
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", membershipNo: "", email: "", phone: "", consent: false });
                    }} 
                    className="mt-6 text-xs font-bold text-accent-red border-b border-accent-red hover:text-charcoal hover:border-charcoal transition-colors uppercase tracking-widest"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  
                  {/* Professional Category selector */}
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-2">
                      Professional Qualification
                    </label>
                    <div className="grid grid-cols-4 border border-border-light divide-x divide-border-light bg-white">
                      {[
                        { key: "CA", label: "Chartered Accountant" },
                        { key: "CS", label: "Company Secretary" },
                        { key: "Legal", label: "Legal Professional" },
                        { key: "Other", label: "Compliance Officer" }
                      ].map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setProfessionalType(item.key)}
                          className={`py-2.5 text-[10px] sm:text-xs font-bold transition-colors truncate px-1 rounded-none ${
                            professionalType === item.key 
                              ? "bg-charcoal text-white" 
                              : "text-secondary hover:text-charcoal hover:bg-cream"
                          }`}
                        >
                          {item.key}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Input fields */}
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. CA Meera Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full border border-border-light px-3.5 py-2.5 text-xs focus:outline-none focus:border-charcoal bg-white transition-colors rounded-none"
                    />
                  </div>

                  {/* Dynamic Credential Input Field */}
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">
                      {professionalType === "CA" && "ICAI Membership Number (MRN)"}
                      {professionalType === "CS" && "ICSI Membership Number (FCS / ACS)"}
                      {professionalType === "Legal" && "Bar Council Enrollment Number"}
                      {professionalType === "Other" && "Designation & Professional Credentials"}
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={
                        professionalType === "CA" ? "e.g. 123456" :
                        professionalType === "CS" ? "e.g. ACS-78901" :
                        professionalType === "Legal" ? "e.g. MAH/1234/2020" : "e.g. VP - Compliance & Legal"
                      }
                      value={formData.membershipNo}
                      onChange={(e) => setFormData(prev => ({ ...prev, membershipNo: e.target.value }))}
                      className="w-full border border-border-light px-3.5 py-2.5 text-xs focus:outline-none focus:border-charcoal bg-white transition-colors rounded-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">
                        Professional Email
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="meera.sharma@sharma.in"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full border border-border-light px-3.5 py-2.5 text-xs focus:outline-none focus:border-charcoal bg-white transition-colors rounded-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full border border-border-light px-3.5 py-2.5 text-xs focus:outline-none focus:border-charcoal bg-white transition-colors rounded-sm"
                            pattern="\d{10}"
                            title="Phone number must be exactly 10 digits"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input 
                      type="checkbox" 
                      id="consent" 
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                      className="mt-0.5 border border-border-light cursor-pointer rounded-none accent-charcoal"
                    />
                    <label htmlFor="consent" className="text-[10px] text-secondary cursor-pointer leading-relaxed">
                      I declare that the information provided is accurate. I authorize Apex Forum to cross-reference my details with the corresponding professional institute registry or bar council.
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full text-center font-bold bg-charcoal text-white py-3.5 border border-charcoal hover:bg-cream hover:text-charcoal transition-premium text-xs uppercase tracking-widest rounded-none"
                  >
                    Submit Application for Screening
                  </button>

                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 9. FOOTER SECTION */}
      <footer className="w-full bg-white border-t border-border-light py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-border-light pb-16">
            
            {/* Logo and Brand column */}
            <div className="col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-charcoal flex items-center justify-center font-serif font-bold text-sm bg-charcoal text-white relative rounded-none">
                  <span>A</span>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-accent-red"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold tracking-widest text-xs text-charcoal uppercase">APEX FORUM</span>
                  <span className="text-[9px] text-secondary font-semibold uppercase">Finance, Compliance & Legal Network</span>
                </div>
              </div>
              <p className="text-xs text-secondary mt-4 max-w-sm leading-relaxed">
                The premier verified network for professional advisory, secretarial compliance, FEMA regulatory affairs, and peer intelligence in India.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <a href="#" className="p-1 text-secondary hover:text-charcoal transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
                <a href="#" className="p-1 text-secondary hover:text-charcoal transition-colors">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Links column 1 */}
            <div>
              <span className="text-[10px] font-bold text-charcoal tracking-widest uppercase block mb-4">Platform</span>
              <ul className="space-y-2.5 text-xs text-secondary font-semibold">
                <li><a href="#forum" className="hover:text-charcoal transition-colors">Discussion Forums</a></li>
                <li><a href="#publications" className="hover:text-charcoal transition-colors">Technical Articles</a></li>
                <li><a href="#trending" className="hover:text-charcoal transition-colors">Trending Advisory</a></li>
                <li><a href="#showcase" className="hover:text-charcoal transition-colors">Mobile Applications</a></li>
              </ul>
            </div>

            {/* Links column 2 */}
            <div>
              <span className="text-[10px] font-bold text-charcoal tracking-widest uppercase block mb-4">Practitioners</span>
              <ul className="space-y-2.5 text-xs text-secondary font-semibold">
                <li><a href="#contact" className="hover:text-charcoal transition-colors">CA Directory</a></li>
                <li><a href="#contact" className="hover:text-charcoal transition-colors">CS Directory</a></li>
                <li><a href="#contact" className="hover:text-charcoal transition-colors">Corporate Attorneys</a></li>
                <li><a href="#contact" className="hover:text-charcoal transition-colors">Compliance Placements</a></li>
              </ul>
            </div>

            {/* Links column 3 */}
            <div>
              <span className="text-[10px] font-bold text-charcoal tracking-widest uppercase block mb-4">Regulatory Resources</span>
              <ul className="space-y-2.5 text-xs text-secondary font-semibold">
                <li><a href="https://www.icai.org" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors flex items-center gap-1"><span>ICAI</span> <ExternalLink className="w-2.5 h-2.5" /></a></li>
                <li><a href="https://www.icsi.edu" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors flex items-center gap-1"><span>ICSI</span> <ExternalLink className="w-2.5 h-2.5" /></a></li>
                <li><a href="https://www.mca.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors flex items-center gap-1"><span>Ministry of Corporate Affairs</span> <ExternalLink className="w-2.5 h-2.5" /></a></li>
                <li><a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors flex items-center gap-1"><span>Reserve Bank of India</span> <ExternalLink className="w-2.5 h-2.5" /></a></li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-12 gap-4">
            <span className="text-[10px] text-secondary font-semibold">
              © {new Date().getFullYear()} Apex Forum. All rights reserved. 
            </span>
            <div className="flex items-center gap-6 text-[10px] text-secondary font-semibold">
              <a href="#" className="hover:text-charcoal transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-charcoal transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-charcoal transition-colors">Verification Rules</a>
              <a href="#" className="hover:text-charcoal transition-colors">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
