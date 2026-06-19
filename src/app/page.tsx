"use client";

import React, { useState, useMemo } from "react";
import { 
  MessageSquare, 
  BookOpen, 
  Users, 
  Bell, 
  Briefcase, 
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
  Sparkles,
  ExternalLink,
  ChevronDown
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
    category: "Corporate Compliance",
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
    title: "Recent RBI circular discussion on overseas investment disclosures under FEMA",
    author: "Adv. Suresh Nair",
    role: "Corporate Legal Advisor",
    excerpt: "Key reconciliation formats under Table D are scrutinized heavily during reviews. Make sure materials transfers are recorded at cost, avoiding margin markups. Here is my 5-step validation plan...",
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
    role: "SME Advisory Services",
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
            <div className="w-10 h-10 border-2 border-charcoal flex items-center justify-center font-bold tracking-tighter text-lg bg-charcoal text-white relative overflow-hidden">
              <span className="relative z-10">A</span>
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-accent-red"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-widest text-sm text-charcoal">Apex Forum</span>
              <span className="text-[10px] text-secondary tracking-wider -mt-1 font-semibold">PROFESSIONAL NETWORK</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-secondary">
            <a href="#forum" className="hover:text-charcoal transition-colors">Discussion Forum</a>
            <a href="#features" className="hover:text-charcoal transition-colors">Features</a>
            <a href="#publications" className="hover:text-charcoal transition-colors">Publications</a>
            <a href="#trending" className="hover:text-charcoal transition-colors">Trending</a>
            <a href="#showcase" className="hover:text-charcoal transition-colors">Mobile App</a>
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <a 
              href="#contact" 
              className="text-sm font-semibold text-secondary hover:text-charcoal px-3 py-2 transition-colors hidden sm:block"
            >
              Sign In
            </a>
            <a 
              href="#contact" 
              className="text-xs sm:text-sm font-bold bg-charcoal text-white px-5 py-2.5 border border-charcoal hover:bg-white hover:text-charcoal transition-premium shadow-sm"
            >
              Join Community
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative w-full overflow-hidden pt-12 md:pt-20 pb-28 border-b border-border-light grid-pattern">
        {/* Subtle grid fade */}
        <div className="absolute inset-0 radial-fade pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border-light bg-white/80 rounded-full text-xs font-bold text-secondary mb-6 tracking-wider shadow-sm uppercase">
            <Sparkles className="w-3.5 h-3.5 text-accent-red" />
            <span>India's Trusted Professional Network</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-light text-center leading-tight tracking-tight text-charcoal max-w-4xl font-sans">
            India's Largest Community for <span className="font-extrabold block sm:inline">CA, CS & Corporate Legal</span> Professionals
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-secondary text-center max-w-2xl mt-6 font-normal leading-relaxed">
          Connect with Chartered Accountants, Company Secretaries, Legal Advisors and Compliance Professionals. Participate in discussions, access expert insights and stay ahead of regulatory developments.
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
          <div className="w-full max-w-5xl mt-16 border border-border-light bg-white shadow-2xl relative">
            {/* Top Chrome window bar */}
            <div className="h-12 border-b border-border-light px-4 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-xs font-semibold text-secondary ml-4 tracking-wider">app.apexledger.in/community</span>
              </div>
              <div className="relative max-w-xs w-48 sm:w-64">
                <Search className="w-3.5 h-3.5 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter queries..." 
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

                <div className="mt-8 pt-4 border-t border-border-light">
                  <span className="text-[10px] font-bold text-secondary tracking-widest uppercase block mb-3">Live Network</span>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-semibold text-charcoal">CA Arvind R. <span className="text-secondary font-normal">(Direct Tax)</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-semibold text-charcoal">CS Priyal S. <span className="text-secondary font-normal">(Corporate Compliance)</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                      <span className="text-xs font-semibold text-charcoal">Adv. Neha M. <span className="text-secondary font-normal">(Corporate Law)</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="p-6 md:col-span-3 flex flex-col justify-between bg-white max-h-[550px] overflow-y-auto">
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-border-light">
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                      <span>{selectedCategory} discussions</span>
                      <span className="text-xs text-secondary font-semibold">({filteredDiscussions.length})</span>
                    </h3>
                    <span className="text-xs text-secondary">Updated real-time</span>
                  </div>

                  {/* Feed Items */}
                  {filteredDiscussions.length > 0 ? (
                    filteredDiscussions.map((disc) => (
                      <div key={disc.id} className="group border border-border-light p-4 hover:border-charcoal transition-premium relative bg-white">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            {/* Author Metadata */}
                            <div className="flex items-center gap-2 text-xs text-secondary font-semibold mb-2">
                              <span className="text-charcoal font-bold">{disc.author}</span>
                              <span>•</span>
                              <span>{disc.role}</span>
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
                              <span className="text-[10px] font-bold text-accent-red border border-red-200 bg-red-50/50 px-2.5 py-0.5 uppercase tracking-wider">
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
                            className={`p-2 border transition-colors ${
                              likedDiscussions[disc.id] 
                                ? "bg-red-50 border-red-200 text-accent-red" 
                                : "border-border-light text-secondary hover:border-charcoal hover:text-charcoal"
                            }`}
                            title="Save Discussion"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                          </button>
                        </div>

                        {/* Interactive replies feature in mockup */}
                        {dashboardMessages[disc.id] && dashboardMessages[disc.id].map((msg, i) => (
                          <div key={i} className="mt-3 pl-4 border-l-2 border-accent-red bg-gray-50 py-2 pr-2 text-xs flex flex-col gap-1">
                            <span className="font-bold text-[10px] text-charcoal">You (Verification Pending) • Just now</span>
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
                            className="w-full text-xs py-1 px-2.5 border border-border-light focus:outline-none focus:border-charcoal"
                          />
                          <button 
                            onClick={() => handleSendMessage(disc.id)}
                            className="p-1 text-secondary hover:text-accent-red transition-colors"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 border border-dashed border-border-light">
                      <span className="text-secondary text-sm font-semibold">No discussions found. Try searching for GST, Corporate Law, FEMA, Compliance or Direct Tax.</span>
                    </div>
                  )}
                </div>

                <div className="mt-8 text-center pt-4 border-t border-border-light/80">
                  <a href="#contact" className="inline-flex items-center gap-2 text-xs font-bold text-charcoal hover:text-accent-red transition-colors uppercase tracking-wider">
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

      {/* 4. FEATURES GRID SECTION */}
      <section id="features" className="w-full py-28 border-b border-border-light bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold text-accent-red uppercase tracking-widest">Engineered for Finance Minds</span>
            <h2 className="text-3xl md:text-4xl font-light text-charcoal tracking-tight mt-3">
              One unified network for peer-to-peer advisory and advisory intelligence.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-border-light divide-y md:divide-y-0 md:divide-x divide-border-light">
            
            {/* Feature 1 */}
            <div className="p-8 hover:bg-gray-50/50 transition-premium flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="w-10 h-10 border border-border-light flex items-center justify-center text-charcoal mb-6 bg-white">
                  <MessageSquare className="w-5 h-5 text-accent-red" />
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-2">Discussion Forum</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Collaborate on complex tax audit, company law, and regulatory matters. Access search-indexed discussions categorized by compliance domains.
                </p>
              </div>
              <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal mt-6 uppercase tracking-wider hover:text-accent-red transition-colors">
                <span>Explore threads</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>

            {/* Feature 2 */}
            <div className="p-8 hover:bg-gray-50/50 transition-premium flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="w-10 h-10 border border-border-light flex items-center justify-center text-charcoal mb-6 bg-white">
                  <BookOpen className="w-5 h-5 text-accent-red" />
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-2">Expert Publications</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Deep-dive technical articles written by certified professionals. Straight to the point, analyzing amendments, case laws, and tax rules.
                </p>
              </div>
              <a href="#publications" className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal mt-6 uppercase tracking-wider hover:text-accent-red transition-colors">
                <span>Read journals</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>

            {/* Feature 3 */}
            <div className="p-8 hover:bg-gray-50/50 transition-premium flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="w-10 h-10 border border-border-light flex items-center justify-center text-charcoal mb-6 bg-white">
                  <Users className="w-5 h-5 text-accent-red" />
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-2">Professional Network</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Find and connect with fellow practitioners, cost accountants, and secretarial experts nationwide. Filter by experience level and location.
                </p>
              </div>
              <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal mt-6 uppercase tracking-wider hover:text-accent-red transition-colors">
                <span>Browse directory</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-x border-b border-border-light divide-y md:divide-y-0 md:divide-x divide-border-light">
            
            {/* Feature 4 */}
            <div className="p-8 hover:bg-gray-50/50 transition-premium flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="w-10 h-10 border border-border-light flex items-center justify-center text-charcoal mb-6 bg-white">
                  <Bell className="w-5 h-5 text-accent-red" />
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-2">Regulatory Feed</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Consolidated feed mapping MCA, CBDT, CBIC, SEBI, and RBI notifications. Curated alerts showing immediate impact summaries on key filings.
                </p>
              </div>
              <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal mt-6 uppercase tracking-wider hover:text-accent-red transition-colors">
                <span>View live feed</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>

            {/* Feature 5 */}
            <div className="p-8 hover:bg-gray-50/50 transition-premium flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="w-10 h-10 border border-border-light flex items-center justify-center text-charcoal mb-6 bg-white">
                  <Briefcase className="w-5 h-5 text-accent-red" />
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-2">Job Opportunities</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Exclusive placements in corporate governance, taxation, cost valuation, and audit. Direct applications to Big 4 and corporate houses.
                </p>
              </div>
              <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal mt-6 uppercase tracking-wider hover:text-accent-red transition-colors">
                <span>Browse jobs</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>

            {/* Feature 6 */}
            <div className="p-8 hover:bg-gray-50/50 transition-premium flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="w-10 h-10 border border-border-light flex items-center justify-center text-charcoal mb-6 bg-white">
                  <Share2 className="w-5 h-5 text-accent-red" />
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-2">Knowledge Vault</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Share, download, and review standard audit programs, secretarial checklists, draft resolutions, and presentation slides verified by panels.
                </p>
              </div>
              <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal mt-6 uppercase tracking-wider hover:text-accent-red transition-colors">
                <span>Access vault</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 5. RECENT ARTICLES SECTION */}
      <section id="publications" className="w-full py-28 border-b border-border-light bg-gray-50/25">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="max-w-xl">
              <span className="text-xs font-bold text-accent-red uppercase tracking-widest">Technical Publications</span>
              <h2 className="text-3xl md:text-4xl font-light text-charcoal tracking-tight mt-3">
                Peer-reviewed analysis on complex statutory amendments.
              </h2>
            </div>
            <a 
              href="#contact" 
              className="font-bold text-sm text-charcoal border-b-2 border-charcoal hover:border-accent-red hover:text-accent-red pb-1 flex items-center gap-1.5 self-start md:self-auto transition-colors"
            >
              <span>Explore all publications</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Article 1 */}
            <article className="bg-white border border-border-light hover:border-charcoal transition-premium flex flex-col justify-between">
              <div className="p-8">
                <span className="text-[10px] font-bold text-accent-red border border-red-200 bg-red-50/50 px-2 py-0.5 uppercase tracking-wider block w-fit mb-6">
                  INCOME TAX ACT
                </span>
                <h3 className="text-xl font-bold text-charcoal mb-3 leading-snug">
                  Deciphering Section 43B(h) of the Income Tax Act: Impact on Micro and Small Enterprises Payments
                </h3>
                <p className="text-xs text-secondary leading-relaxed mb-6 line-clamp-3">
                  The introduction of clause (h) in Section 43B has sent waves across MSMEs and corporate buyers. We break down the absolute deadline criteria, the definitions of enterprises, and tax audit reporting requirements.
                </p>
              </div>
              <div className="px-8 py-4 bg-gray-50/50 border-t border-border-light flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-charcoal">CA Meera Sharma</span>
                  <span className="text-[10px] text-secondary">Partner, Sharma & Co.</span>
                </div>
                <span className="text-[10px] font-semibold text-secondary">8 Min Read</span>
              </div>
            </article>

            {/* Article 2 */}
            <article className="bg-white border border-border-light hover:border-charcoal transition-premium flex flex-col justify-between">
              <div className="p-8">
                <span className="text-[10px] font-bold text-accent-red border border-red-200 bg-red-50/50 px-2 py-0.5 uppercase tracking-wider block w-fit mb-6">
                  CORPORATE LAW
                </span>
                <h3 className="text-xl font-bold text-charcoal mb-3 leading-snug">
                  SBO Rules under Companies Act, 2013: A Practical Compliance Checklist for Filings
                </h3>
                <p className="text-xs text-secondary leading-relaxed mb-6 line-clamp-3">
                  Identifying Significant Beneficial Owners (SBO) remains a corporate challenge. This article provides a structured flow diagram and compliance check-list to verify reporting correctness under Section 90 of Companies Act.
                </p>
              </div>
              <div className="px-8 py-4 bg-gray-50/50 border-t border-border-light flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-charcoal">CS Vikram Sen</span>
                  <span className="text-[10px] text-secondary">Compliance Head, Apex Group</span>
                </div>
                <span className="text-[10px] font-semibold text-secondary">12 Min Read</span>
              </div>
            </article>

            {/* Article 3 */}
            <article className="bg-white border border-border-light hover:border-charcoal transition-premium flex flex-col justify-between">
              <div className="p-8">
                <span className="text-[10px] font-bold text-accent-red border border-red-200 bg-red-50/50 px-2 py-0.5 uppercase tracking-wider block w-fit mb-6">
                  COST ACCOUNTING
                </span>
                <h3 className="text-xl font-bold text-charcoal mb-3 leading-snug">
                  Cost Audit Rules: Mandatory Annexures and Reconciliation Strategy for FY 2025-26
                </h3>
                <p className="text-xs text-secondary leading-relaxed mb-6 line-clamp-3">
                  An outline of key reconciliation formats required for CRA-3 reporting, focusing on material cost allocations and overhead absorption rates. Learn to avoid common audit revision notices.
                </p>
              </div>
              <div className="px-8 py-4 bg-gray-50/50 border-t border-border-light flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-charcoal">CMA Rajesh Kumar</span>
                  <span className="text-[10px] text-secondary">Practicing Cost Auditor</span>
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
            <span className="text-xs font-bold text-accent-red uppercase tracking-widest">Live Forum Activity</span>
            <h2 className="text-3xl md:text-4xl font-light text-charcoal tracking-tight mt-3">
              Trending questions currently resolving on the platform.
            </h2>
          </div>

          <div className="border border-border-light divide-y divide-border-light">
            
            {/* Thread 1 */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/30 transition-premium">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2.5 shrink-0"></div>
                <div>
                  <h3 className="text-base font-bold text-charcoal hover:text-accent-red transition-colors cursor-pointer">
                    Is anyone else facing GST Portal error "Access Denied" while logging into SEZ Developer profile?
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
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/30 transition-premium">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2.5 shrink-0"></div>
                <div>
                  <h3 className="text-base font-bold text-charcoal hover:text-accent-red transition-colors cursor-pointer">
                    Interpretation of "Related Party Transaction" definition under Listing Regulations vs. Companies Act
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-secondary font-semibold">
                    <span className="text-accent-red font-bold">CORPORATE LAW</span>
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
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/30 transition-premium">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 shrink-0"></div>
                <div>
                  <h3 className="text-base font-bold text-charcoal hover:text-accent-red transition-colors cursor-pointer">
                    Transition of deferred tax assets from old regime to new regime under Ind AS 12 rules
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-secondary font-semibold">
                    <span className="text-accent-red font-bold">ACCOUNTING STANDARDS</span>
                    <span>•</span>
                    <span>Started by CA Amit Patel</span>
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
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/30 transition-premium">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 shrink-0"></div>
                <div>
                  <h3 className="text-base font-bold text-charcoal hover:text-accent-red transition-colors cursor-pointer">
                    CMA certification requirements for bank credit audits: Recent RBI circular discussion
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-secondary font-semibold">
                    <span className="text-accent-red font-bold">BANKING & FINANCE</span>
                    <span>•</span>
                    <span>Started by CMA Nalin Mehta</span>
                    <span>•</span>
                    <span>3d ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 self-end sm:self-auto text-xs font-semibold text-secondary shrink-0">
                <span>6 Replies</span>
                <span>94 Views</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. MOBILE APP SHOWCASE */}
      <section id="showcase" className="w-full py-28 border-b border-border-light bg-gray-50/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left text panel */}
            <div>
              <span className="text-xs font-bold text-accent-red uppercase tracking-widest">Apex Ledger Mobile</span>
              <h2 className="text-4xl md:text-5xl font-light text-charcoal tracking-tight mt-4 leading-tight">
                A premium professional network in your pocket.
              </h2>
              <p className="text-base text-secondary mt-6 leading-relaxed">
                Connect and consult securely. The Apex Ledger app allows verified members to chat, coordinate in regional chapters, and receive push notifications on statutory circulars.
              </p>

              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-white border border-border-light text-accent-red mt-1">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal">Encrypted Communication</h4>
                    <p className="text-xs text-secondary mt-0.5">Peer-to-peer secure messaging for sensitive professional consultations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-white border border-border-light text-accent-red mt-1">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal">Instant Circular Alerts</h4>
                    <p className="text-xs text-secondary mt-0.5">Summaries of notifications from ICAI, ICSI, MCA and CBDT pushed immediately.</p>
                  </div>
                </div>
              </div>

              {/* Store acquisition badges (Premium minimalist style) */}
              <div className="flex flex-wrap gap-4 mt-10">
                <div className="cursor-pointer border border-charcoal bg-charcoal text-white hover:bg-white hover:text-charcoal px-5 py-2.5 flex items-center gap-3 transition-premium select-none">
                  <Smartphone className="w-5 h-5 shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] uppercase tracking-wider text-secondary leading-none">Download on the</span>
                    <span className="text-xs font-bold leading-tight mt-0.5">App Store</span>
                  </div>
                </div>

                <div className="cursor-pointer border border-charcoal bg-charcoal text-white hover:bg-white hover:text-charcoal px-5 py-2.5 flex items-center gap-3 transition-premium select-none">
                  <Smartphone className="w-5 h-5 shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] uppercase tracking-wider text-secondary leading-none">Get it on</span>
                    <span className="text-xs font-bold leading-tight mt-0.5">Google Play</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Phone Mockup Panel */}
            <div className="flex justify-center lg:justify-end">
              {/* Phone Frame container */}
              <div className="w-[300px] h-[600px] border-[6px] border-charcoal rounded-[40px] bg-white relative overflow-hidden shadow-2xl shrink-0">
                
                {/* Speaker Grill / Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-charcoal rounded-full z-20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 ml-12"></div>
                </div>

                {/* Internal App View */}
                <div className="w-full h-full pt-9 flex flex-col justify-between bg-white text-charcoal z-10 relative">
                  
                  {/* Internal App Header */}
                  <div className="px-4 py-3 border-b border-border-light flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-charcoal flex items-center justify-center font-bold text-[9px] bg-charcoal text-white">
                        A
                      </div>
                      <span className="text-xs font-extrabold tracking-widest text-charcoal">APEX LEDGER</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  </div>

                  {/* App Message Feed */}
                  <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[440px]">
                    <div className="text-[10px] text-center text-secondary font-semibold my-2">
                      Secured Direct Consultation
                    </div>

                    {/* Incoming Msg */}
                    <div className="flex flex-col gap-1 items-start max-w-[85%]">
                      <div className="bg-gray-100 p-2.5 text-xs text-charcoal font-medium">
                        Hi, regarding the cost auditing checklists for the pharmaceutical division, should we absorbed secondary packing as direct material?
                      </div>
                      <span className="text-[9px] text-secondary font-semibold pl-1">CMA Suresh N. • 3:12 PM</span>
                    </div>

                    {/* Outgoing Msg */}
                    <div className="flex flex-col gap-1 items-end max-w-[85%] ml-auto">
                      <div className="bg-accent-red text-white p-2.5 text-xs font-medium">
                        As per CAS-4 standards, secondary packing should be treated as packaging cost under administrative overheads, not direct material, unless specifically contractually billable.
                      </div>
                      <span className="text-[9px] text-secondary font-semibold pr-1">CA Arvind R. • 3:14 PM</span>
                    </div>

                    {/* Incoming Msg 2 */}
                    <div className="flex flex-col gap-1 items-start max-w-[85%]">
                      <div className="bg-gray-100 p-2.5 text-xs text-charcoal font-medium">
                        Understood. That confirms my calculations. I will adjust the absorption rates in Form CRA-3. Thank you!
                      </div>
                      <span className="text-[9px] text-secondary font-semibold pl-1">CMA Suresh N. • 3:15 PM</span>
                    </div>
                  </div>

                  {/* App Input Area */}
                  <div className="p-3 border-t border-border-light flex items-center gap-2 bg-gray-50/40">
                    <input 
                      type="text" 
                      placeholder="Type reply..." 
                      className="w-full text-xs py-1.5 px-3 border border-border-light focus:outline-none focus:border-charcoal bg-white"
                      disabled
                    />
                    <div className="p-1.5 border border-charcoal bg-charcoal text-white shrink-0">
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
              <span className="text-xs font-bold text-accent-red uppercase tracking-widest">Verification Standards</span>
              <h2 className="text-4xl font-light text-charcoal tracking-tight mt-4">
                Strict credentials validation to maintain professional integrity.
              </h2>
              <p className="text-sm text-secondary mt-6 leading-relaxed">
                To keep our community high-value, spam-free and authoritative, we verify the credentials of every registering professional.
              </p>

              <div className="space-y-6 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full border border-border-light flex items-center justify-center shrink-0 text-accent-red text-xs font-bold mt-1 bg-gray-50">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal">Membership Registration Number (MRN)</h4>
                    <p className="text-xs text-secondary mt-1 leading-relaxed">
                      All CA, CS, and CMA applicants must provide their official Membership Number or Certificate of Practice (COP) code.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full border border-border-light flex items-center justify-center shrink-0 text-accent-red text-xs font-bold mt-1 bg-gray-50">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal">Database Cross-Referencing</h4>
                    <p className="text-xs text-secondary mt-1 leading-relaxed">
                      Registration inputs are cross-referenced with the public registries of the Institute of Chartered Accountants of India (ICAI), the Institute of Company Secretaries of India (ICSI), and the Institute of Cost Accountants of India (ICMAI).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full border border-border-light flex items-center justify-center shrink-0 text-accent-red text-xs font-bold mt-1 bg-gray-50">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal">Active COP Validation</h4>
                    <p className="text-xs text-secondary mt-1 leading-relaxed">
                      Practice areas are updated dynamically, categorizing members as either in practice (holding active COP) or in industry placement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form Panel */}
            <div className="border border-border-light p-8 md:p-10 bg-gray-50/20">
              <h3 className="text-lg font-bold text-charcoal mb-6">Request Access / Apply for Membership</h3>
              
              {formSubmitted ? (
                <div className="text-center py-16">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                  <h4 className="text-base font-bold text-charcoal mb-2">Membership Application Logged</h4>
                  <p className="text-xs text-secondary max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.name}. Our moderation panel is cross-referencing your MRN with the database registry. You will receive an invitation link on <strong>{formData.email}</strong> once verified.
                  </p>
                  <button 
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", membershipNo: "", email: "", phone: "", consent: false });
                    }} 
                    className="mt-6 text-xs font-bold text-accent-red border-b border-accent-red hover:text-charcoal hover:border-charcoal transition-colors"
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
                    <div className="grid grid-cols-4 border border-border-light divide-x divide-border-light">
                      {[
                        { key: "CA", label: "Chartered Accountant" },
                        { key: "CS", label: "Company Secretary" },
                        { key: "CMA", label: "Cost Auditor" },
                        { key: "Other", label: "Corporate Compliance" }
                      ].map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setProfessionalType(item.key)}
                          className={`py-2 text-[10px] sm:text-xs font-bold transition-colors truncate px-1 ${
                            professionalType === item.key 
                              ? "bg-charcoal text-white" 
                              : "text-secondary hover:text-charcoal hover:bg-gray-50"
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
                      className="w-full border border-border-light px-3.5 py-2 text-xs focus:outline-none focus:border-charcoal bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">
                      {professionalType === "CA" && "ICAI Membership Number (MRN)"}
                      {professionalType === "CS" && "ICSI Membership Number (FCS / ACS)"}
                      {professionalType === "CMA" && "ICMAI Membership Number"}
                      {professionalType === "Other" && "Membership Number / Corporate Designation"}
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={
                        professionalType === "CA" ? "e.g. 123456" :
                        professionalType === "CS" ? "e.g. ACS-78901" :
                        professionalType === "CMA" ? "e.g. 23456" : "e.g. Head of Compliance"
                      }
                      value={formData.membershipNo}
                      onChange={(e) => setFormData(prev => ({ ...prev, membershipNo: e.target.value }))}
                      className="w-full border border-border-light px-3.5 py-2 text-xs focus:outline-none focus:border-charcoal bg-white transition-colors"
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
                        className="w-full border border-border-light px-3.5 py-2 text-xs focus:outline-none focus:border-charcoal bg-white transition-colors"
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
                        className="w-full border border-border-light px-3.5 py-2 text-xs focus:outline-none focus:border-charcoal bg-white transition-colors"
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
                      I declare that the information provided is accurate. I authorize Apex Ledger to cross-reference my details with the corresponding professional institute registry.
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full text-center font-bold bg-charcoal text-white py-3 border border-charcoal hover:bg-white hover:text-charcoal transition-premium text-xs uppercase tracking-wider"
                  >
                    Submit Application
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
                <div className="w-8 h-8 border border-charcoal flex items-center justify-center font-bold tracking-tighter text-sm bg-charcoal text-white relative">
                  <span>A</span>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-accent-red"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold tracking-widest text-xs text-charcoal">APEX LEDGER</span>
                  <span className="text-[9px] text-secondary font-semibold">CA, CS & CMA PLATFORM</span>
                </div>
              </div>
              <p className="text-xs text-secondary mt-4 max-w-sm leading-relaxed">
                The premier verified network for professional advisory, corporate secretarial compliance, cost audits, and peer intelligence in India.
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
              <span className="text-[10px] font-bold text-charcoal tracking-widest uppercase block mb-4">Community</span>
              <ul className="space-y-2.5 text-xs text-secondary font-semibold">
                <li><a href="#contact" className="hover:text-charcoal transition-colors">CA Directory</a></li>
                <li><a href="#contact" className="hover:text-charcoal transition-colors">CS Directory</a></li>
                <li><a href="#contact" className="hover:text-charcoal transition-colors">CMA Directory</a></li>
                <li><a href="#contact" className="hover:text-charcoal transition-colors">Corporate Placements</a></li>
              </ul>
            </div>

            {/* Links column 3 */}
            <div>
              <span className="text-[10px] font-bold text-charcoal tracking-widest uppercase block mb-4">Regulatory Bodies</span>
              <ul className="space-y-2.5 text-xs text-secondary font-semibold">
                <li><a href="https://www.icai.org" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors flex items-center gap-1"><span>ICAI</span> <ExternalLink className="w-2.5 h-2.5" /></a></li>
                <li><a href="https://www.icsi.edu" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors flex items-center gap-1"><span>ICSI</span> <ExternalLink className="w-2.5 h-2.5" /></a></li>
                <li><a href="https://icmai.in" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors flex items-center gap-1"><span>ICMAI</span> <ExternalLink className="w-2.5 h-2.5" /></a></li>
                <li><a href="https://www.mca.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors flex items-center gap-1"><span>Ministry of Corporate Affairs</span> <ExternalLink className="w-2.5 h-2.5" /></a></li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-12 gap-4">
            <span className="text-[10px] text-secondary font-semibold">
              © {new Date().getFullYear()} Apex Ledger. All rights reserved. 
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
