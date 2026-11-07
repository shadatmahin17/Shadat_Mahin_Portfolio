import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  X, 
  CornerDownRight, 
  Loader2, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Copy, 
  Check, 
  ArrowRight, 
  FileText, 
  Mail, 
  Briefcase, 
  GraduationCap, 
  Target, 
  FlaskConical, 
  Cpu, 
  Code, 
  Languages, 
  Award, 
  Workflow, 
  Settings,
  HelpCircle
} from "lucide-react";
import { ChatMessage, ChatAction } from "../types";
import { getAssistantResponse, QUICK_PROMPTS } from "../lib/assistantEngine";
import { assetPaths } from "../lib/assets";
import icon3dAiTwin from "../assets/images/ai_twin_3d_icon_1787775262349.jpg";

// Markdown-like text formatter with bolding, bullets, tags, code chips
function FormattedMessageText({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-2 text-[13px] leading-relaxed">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} className="h-1.5" />;
        }

        // Bullet line
        if (trimmed.startsWith("• ") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const content = trimmed.substring(2);
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-0.5 my-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA] shrink-0 mt-2" />
              <div className="flex-1 text-[#161A1D]">
                {renderInlineFormatting(content)}
              </div>
            </div>
          );
        }

        // Numbered list items (e.g. 1. 2. 3.)
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-0.5 my-1">
              <span className="font-bold text-[#1769AA] text-xs shrink-0 min-w-[14px] mt-0.5">
                {numMatch[1]}.
              </span>
              <div className="flex-1 text-[#161A1D]">
                {renderInlineFormatting(numMatch[2])}
              </div>
            </div>
          );
        }

        return (
          <p key={lineIdx} className="text-[#161A1D]">
            {renderInlineFormatting(line)}
          </p>
        );
      })}
    </div>
  );
}

// Inline formatting helper for **bold** and `code`
function renderInlineFormatting(str: string) {
  // Split by code blocks first `code`
  const codeParts = str.split(/(`[^`]+`)/g);

  return codeParts.map((codePart, i) => {
    if (codePart.startsWith("`") && codePart.endsWith("`")) {
      const codeText = codePart.slice(1, -1);
      return (
        <span
          key={i}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-[#E8F3FA] text-[#1769AA] border border-[#D9DEE2] font-mono text-[11px] font-semibold"
        >
          {codeText}
        </span>
      );
    }

    // Split by **bold**
    const boldParts = codePart.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((boldPart, j) => {
      if (boldPart.startsWith("**") && boldPart.endsWith("**")) {
        return (
          <strong key={`${i}-${j}`} className="font-bold text-[#161A1D]">
            {boldPart.slice(2, -2)}
          </strong>
        );
      }
      return <span key={`${i}-${j}`}>{boldPart}</span>;
    });
  });
}

export default function AIAssistant() {
  const initialBotMsg: ChatMessage = {
    id: "welcome",
    sender: "bot",
    text: "👋 **Hi! I am Shadat Hossain Mahin's AI Assistant.**\n\nAsk me anything about my **Textile Engineering & Wet Processing specialization**, **Composite & Bio-based Materials research**, **Bacterial Cellulose experiments**, or **computational tools & MATLAB**!",
    timestamp: new Date(),
    suggestions: [
      "Who is Shadat Hossain Mahin?",
      "What is your Wet Processing specialization?",
      "Tell me about your research in Bio-based Materials & Bacterial Cellulose",
      "How are you transitioning toward Aerospace Materials?"
    ],
    actions: [
      { label: "View Experience", action: "scroll_experience", icon: "Briefcase" },
      { label: "View Projects", action: "scroll_projects", icon: "Workflow" }
    ]
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotMsg]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [showTeaser, setShowTeaser] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const placeholderHints = [
    "Ask about Wet Processing & Dyeing chemistry...",
    "Ask about Composite Materials & Simulation...",
    "Ask about Bacterial Cellulose & Bio-based materials...",
    "Ask about Aerospace materials pathway...",
    "Ask about MATLAB & computational tools..."
  ];

  // Cycle animated placeholder hints
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderHints.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setShowTeaser(false);
    }
  }, [isOpen]);

  const handleActionClick = (action: ChatAction) => {
    if (action.action === "scroll_contact") {
      const el = document.getElementById("contact");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (action.action === "scroll_projects") {
      const el = document.getElementById("projects");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (action.action === "scroll_experience") {
      const el = document.getElementById("experience");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (action.action === "scroll_skills") {
      const el = document.getElementById("skills");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (action.action === "view_certificate") {
      const el = document.getElementById("certifications") || document.getElementById("experience");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (action.action === "download_cv") {
      const link = document.createElement("a");
      link.href = assetPaths.resume;
      link.download = "shadat_mahin_resume.pdf";
      link.click();
    } else if (action.action === "copy_email") {
      const email = action.payload || "info@shadatmahin.site";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email);
      }
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-copied-${Date.now()}`,
          sender: "bot",
          text: `📋 Copied **${email}** to your clipboard! Feel free to send your inquiry or paste it into your email client.`,
          timestamp: new Date()
        }
      ]);
    } else if (action.action === "suggest_query" && action.payload) {
      sendMessage(action.payload);
    }
  };

  const copyToClipboard = (text: string, msgId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const restartChat = () => {
    setMessages([initialBotMsg]);
  };

  const sendMessage = async (presetText?: string) => {
    const queryText = presetText || input;
    if (!queryText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText.trim(),
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMsg]);
    if (!presetText) setInput("");
    setIsLoading(true);

    // Natural responsive simulation
    setTimeout(() => {
      try {
        const botResponse = getAssistantResponse(queryText);
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: botResponse.text,
          timestamp: new Date(),
          suggestions: botResponse.suggestions,
          actions: botResponse.actions
        };

        setMessages((prev) => [...prev, botMsg]);
      } catch (error) {
        console.error("Assistant Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            sender: "bot",
            text: "I experienced a minor latency. You can contact Shadat directly at `info@shadatmahin.site`!",
            timestamp: new Date(),
            isError: true,
            actions: [
              { label: "Send Direct Inquiry", action: "scroll_contact", icon: "Mail" }
            ]
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    }, 650);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const getActionIcon = (iconName?: string) => {
    switch (iconName) {
      case "Briefcase": return <Briefcase className="w-3 h-3 text-[#1769AA]" />;
      case "Workflow": return <Workflow className="w-3 h-3 text-[#1769AA]" />;
      case "FlaskConical": return <FlaskConical className="w-3 h-3 text-[#1769AA]" />;
      case "FileText": return <FileText className="w-3 h-3 text-[#1769AA]" />;
      case "Mail": return <Mail className="w-3 h-3 text-[#1769AA]" />;
      case "Cpu": return <Cpu className="w-3 h-3 text-[#1769AA]" />;
      case "Target": return <Target className="w-3 h-3 text-[#1769AA]" />;
      case "GraduationCap": return <GraduationCap className="w-3 h-3 text-[#1769AA]" />;
      case "Languages": return <Languages className="w-3 h-3 text-[#1769AA]" />;
      case "Award": return <Award className="w-3 h-3 text-[#1769AA]" />;
      case "Copy": return <Copy className="w-3 h-3 text-[#1769AA]" />;
      default: return <ArrowRight className="w-3 h-3 text-[#1769AA]" />;
    }
  };

  return (
    <>
      {/* Floating activation button & teaser prompt */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[4000] flex flex-col items-end gap-2.5 select-none">
          
          {/* Teaser prompt banner */}
          {showTeaser && (
            <div className="relative bg-white/95 backdrop-blur-md border border-[#D9DEE2] p-3 rounded-2xl shadow-xl max-w-xs flex items-start gap-2.5 animate-fade-in group cursor-pointer hover:border-[#1769AA]/60 transition-all"
              onClick={() => setIsOpen(true)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTeaser(false);
                }}
                className="absolute -top-1.5 -left-1.5 p-1 rounded-full bg-[#D9DEE2] hover:bg-[#C2C9D0] text-[#161A1D] transition-colors shadow-xs cursor-pointer"
                title="Dismiss hint"
              >
                <X className="w-3 h-3" />
              </button>

              <div className="p-1.5 rounded-xl bg-[#E8F3FA] text-[#1769AA] shrink-0 mt-0.5 border border-[#D9DEE2]">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <div className="text-left space-y-0.5 pr-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#1769AA]">
                  AI Portfolio Twin
                </p>
                <p className="text-xs font-semibold text-[#161A1D] leading-snug">
                  Have questions on textile engineering, composites, or research? Ask me!
                </p>
              </div>
            </div>
          )}

          {/* Main Floating Trigger Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 sm:py-2.5 sm:px-4 rounded-full bg-[#0D1114] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 group border border-[#D9DEE2] hover:border-[#1769AA] cursor-pointer"
            aria-label="Open AI Assistant"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[#1769AA]/30 animate-ping opacity-75" />
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D9DEE2] shadow-[0_0_12px_rgba(23,105,170,0.3)] bg-[#0D1114] flex items-center justify-center shrink-0">
                <img 
                  src={icon3dAiTwin} 
                  alt="3D AI Twin" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <span className="text-xs font-bold tracking-wider text-white uppercase hidden sm:inline-block">
              Chat with AI Twin
            </span>

            {/* Glowing online dot */}
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-neutral-900 shadow-[0_0_8px_#10B981]" />
          </button>
        </div>
      )}

      {/* Main chat modal layout */}
      {isOpen && (
        <div 
          className={`fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[4900] bg-[#FFFFFF] rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)] border border-[#D9DEE2] flex flex-col overflow-hidden transition-all duration-300 max-w-[95vw] ${
            isExpanded 
              ? "w-[calc(100vw-24px)] sm:w-[620px] md:w-[700px] h-[calc(100vh-32px)] sm:h-[720px]" 
              : "w-[calc(100vw-24px)] sm:w-[460px] md:w-[490px] h-[580px] sm:h-[630px]"
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-[#0D1114] via-[#161A1D] to-[#0D1114] text-white flex items-center justify-between border-b border-[#2B3238] shrink-0 gap-2">
            {/* Left: Avatar & Info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="relative shrink-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl overflow-hidden border border-[#D9DEE2]/40 bg-[#0D1114] flex items-center justify-center">
                  <img 
                    src={icon3dAiTwin} 
                    alt="3D AI Twin Avatar" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-neutral-900 rounded-full" />
              </div>
              
              <div className="text-left min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs sm:text-sm tracking-tight text-white truncate">
                    Shadat Mahin
                  </h4>
                  <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#1769AA] text-white rounded-md shrink-0">
                    AI Twin
                  </span>
                </div>
                <p className="text-[11px] text-[#D9DEE2] flex items-center gap-1.5 truncate mt-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shrink-0" />
                  <span>Online &bull; Textile Engineering &amp; Research Assistant</span>
                </p>
              </div>
            </div>
            
            {/* Right: Header controls */}
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={restartChat}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-[#2B3238] transition-colors cursor-pointer"
                title="Restart conversation"
                aria-label="Restart chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:inline-flex p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-[#2B3238] transition-colors cursor-pointer"
                title={isExpanded ? "Collapse window" : "Expand window"}
                aria-label="Toggle expand"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-[#2B3238] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Category prompt carousel */}
          <div className="px-3.5 py-2.5 bg-[#F7F9FA] border-b border-[#D9DEE2] flex gap-2 overflow-x-auto shrink-0 scrollbar-none">
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(qp.prompt)}
                disabled={isLoading}
                className="text-[11px] font-semibold text-[#161A1D] bg-[#FFFFFF] border border-[#D9DEE2] px-3 py-1.5 rounded-full hover:border-[#1769AA] hover:text-[#1769AA] hover:bg-[#E8F3FA] transition-all shrink-0 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-95 shadow-2xs whitespace-nowrap"
              >
                <Sparkles className="w-3 h-3 text-[#1769AA]" />
                {qp.category}
              </button>
            ))}
          </div>

          {/* Messages layout */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F7F9FA]">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-1.5 ${
                    isUser ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`flex gap-2.5 max-w-[94%] sm:max-w-[88%] ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`p-1.5 rounded-xl h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center shrink-0 shadow-xs ${
                        isUser
                          ? "bg-[#161A1D] text-white"
                          : "bg-[#1769AA] text-white"
                      }`}
                    >
                      {isUser ? <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />}
                    </div>

                    {/* Bubble */}
                    <div className="relative group/bubble">
                      <div
                        className={`p-3.5 sm:p-4 rounded-2xl text-left shadow-xs transition-all ${
                          isUser
                            ? "bg-[#161A1D] text-white rounded-tr-none"
                            : "bg-[#FFFFFF] text-[#161A1D] border border-[#D9DEE2] rounded-tl-none shadow-xs"
                        }`}
                      >
                        {isUser ? (
                          <p className="text-[13px] leading-relaxed font-medium text-white">{msg.text}</p>
                        ) : (
                          <FormattedMessageText text={msg.text} />
                        )}

                        {/* Interactive Action Buttons inside Bot Message */}
                        {msg.actions && msg.actions.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-[#D9DEE2] flex flex-wrap gap-1.5">
                            {msg.actions.map((act, aIdx) => (
                              <button
                                key={aIdx}
                                onClick={() => handleActionClick(act)}
                                className="px-2.5 py-1 rounded-lg bg-[#F7F9FA] hover:bg-[#1769AA] hover:text-white border border-[#D9DEE2] text-[10px] font-bold text-[#161A1D] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                              >
                                {getActionIcon(act.icon)}
                                {act.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Copy message button on bot bubble */}
                      {!isUser && (
                        <button
                          onClick={() => copyToClipboard(msg.text, msg.id)}
                          className="absolute top-2 right-2 opacity-0 group-hover/bubble:opacity-100 p-1.5 rounded-md bg-[#F7F9FA] hover:bg-[#E8F3FA] text-[#5C6670] hover:text-[#161A1D] transition-all cursor-pointer text-[10px] border border-[#D9DEE2]"
                          title="Copy response"
                        >
                          {copiedMsgId === msg.id ? (
                            <span className="flex items-center gap-1 text-emerald-600 font-bold px-1">
                              <Check className="w-3 h-3" /> Copied
                            </span>
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Contextual Follow-up Suggestions under bot message */}
                  {!isUser && msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="pl-10 flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestions.map((suggest, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => sendMessage(suggest)}
                          disabled={isLoading}
                          className="text-[11px] font-semibold text-[#5C6670] bg-[#FFFFFF] border border-[#D9DEE2] hover:border-[#1769AA] hover:text-[#1769AA] hover:bg-[#E8F3FA] px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 shadow-2xs active:scale-95"
                        >
                          <CornerDownRight className="w-3 h-3 text-[#1769AA] shrink-0" />
                          {suggest}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Timestamp */}
                  <span className={`text-[9px] text-[#5C6670] px-1 ${isUser ? "pr-10" : "pl-10"}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })}

            {/* Thinking / Loading Animation */}
            {isLoading && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto items-center animate-fade-in">
                <div className="p-1.5 rounded-xl h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center shrink-0 bg-[#1769AA] text-white">
                  <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <div className="p-3 bg-[#FFFFFF] text-[#5C6670] border border-[#D9DEE2] rounded-2xl rounded-tl-none font-medium text-xs flex items-center gap-2 shadow-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1769AA]" /> 
                  <span>Consulting Mahin's portfolio knowledge base...</span>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Chat input box */}
          <div className="p-3 bg-[#FFFFFF] border-t border-[#D9DEE2] flex flex-col gap-2 shrink-0">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
                placeholder={placeholderHints[placeholderIndex]}
                className="flex-1 text-xs sm:text-[13px] border border-[#D9DEE2] px-3.5 py-2.5 rounded-xl focus:border-[#1769AA] focus:ring-1 focus:ring-[#1769AA]/20 focus:outline-none placeholder:text-[#5C6670]/70 text-[#161A1D] transition-all truncate bg-[#F7F9FA]"
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="p-2.5 sm:p-3 rounded-xl bg-[#161A1D] hover:bg-[#1769AA] text-white disabled:opacity-30 disabled:hover:bg-[#161A1D] transition-all shrink-0 cursor-pointer active:scale-95 shadow-xs group"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#5C6670] px-1">
              <span>Press <kbd className="px-1 py-0.5 bg-[#F7F9FA] rounded text-[9px] border border-[#D9DEE2] text-[#161A1D]">Enter ↵</kbd> to ask</span>
              <span className="flex items-center gap-1 text-[#5C6670]">
                <HelpCircle className="w-3 h-3 text-[#1769AA]" /> Tailored from CV &amp; Project data
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
