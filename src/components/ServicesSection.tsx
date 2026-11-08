import React, { useState, useEffect } from 'react';
import { SERVICES, type Service } from '../data/agencyData';
import { fetchWebsiteContent } from '../services/content';
import {
  ArrowUpRight,
  Check,
  Code2,
  Cpu,
  MonitorPlay,
  MessageSquare,
  Palette,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* High-Fidelity Custom SVG Graphics for Each Service Domain                  */
/* -------------------------------------------------------------------------- */

const WebsiteGraphic: React.FC = () => (
  <svg
    viewBox="0 0 380 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="webGlow" x1="0" y1="0" x2="380" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF1053" stopOpacity="0.3" />
        <stop offset="0.5" stopColor="#E6004C" stopOpacity="0.15" />
        <stop offset="1" stopColor="#080104" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="webBorder" x1="0" y1="0" x2="380" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF1053" stopOpacity="0.6" />
        <stop offset="0.5" stopColor="#E6004C" stopOpacity="0.2" />
        <stop offset="1" stopColor="#FF1053" stopOpacity="0.4" />
      </linearGradient>
      <pattern id="webGrid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      </pattern>
    </defs>

    {/* Background & grid */}
    <rect width="380" height="200" rx="16" fill="url(#webGlow)" />
    <rect width="380" height="200" rx="16" fill="url(#webGrid)" />

    {/* Browser Window Frame */}
    <g transform="translate(24, 20)">
      <rect width="332" height="158" rx="12" fill="#0c0207" stroke="url(#webBorder)" strokeWidth="1.2" />
      
      {/* Browser Top Bar */}
      <rect width="332" height="28" rx="12" fill="rgba(255,255,255,0.03)" />
      <circle cx="16" cy="14" r="3.5" fill="#FF1053" />
      <circle cx="28" cy="14" r="3.5" fill="#f59e0b" />
      <circle cx="40" cy="14" r="3.5" fill="#10b981" />
      
      {/* URL Pill */}
      <rect x="60" y="7" width="160" height="14" rx="7" fill="rgba(255,255,255,0.06)" />
      <text x="70" y="17.5" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">eclipto.in/experience</text>

      {/* Hero Canvas Wireframe */}
      <rect x="14" y="38" width="190" height="58" rx="8" fill="rgba(230,0,76,0.08)" stroke="rgba(255,16,83,0.3)" strokeDasharray="3 3" />
      
      {/* 3D Isometric Mesh Wireframe */}
      <path d="M 30 78 L 105 48 L 180 78 L 105 88 Z" fill="none" stroke="#FF1053" strokeWidth="1.2" opacity="0.8" />
      <path d="M 30 78 L 105 88 L 105 92 L 30 82 Z" fill="rgba(230,0,76,0.3)" stroke="#E6004C" strokeWidth="0.8" />
      <path d="M 180 78 L 105 88 L 105 92 L 180 82 Z" fill="rgba(255,16,83,0.2)" stroke="#FF1053" strokeWidth="0.8" />
      <circle cx="105" cy="48" r="3" fill="#fff" filter="drop-shadow(0 0 4px #FF1053)" />

      {/* Floating 60 FPS Badge */}
      <g transform="translate(216, 38)">
        <rect width="102" height="32" rx="6" fill="#14020a" stroke="rgba(255,16,83,0.4)" strokeWidth="1" />
        <circle cx="12" cy="16" r="3" fill="#10b981" />
        <text x="22" y="19" fill="#fff" fontSize="9" fontWeight="bold" fontFamily="monospace">60 FPS WEBGL</text>
      </g>

      {/* Mini Cards Grid */}
      <g transform="translate(216, 76)">
        <rect width="48" height="20" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
        <rect x="54" y="0" width="48" height="20" rx="4" fill="rgba(255,16,83,0.15)" stroke="rgba(255,16,83,0.3)" />
      </g>

      {/* Lower Wireframe Sections */}
      <rect x="14" y="104" width="70" height="42" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
      <rect x="92" y="104" width="112" height="42" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
      <rect x="212" y="104" width="106" height="42" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
    </g>

    {/* Ambient Glow */}
    <circle cx="340" cy="40" r="30" fill="#FF1053" opacity="0.25" filter="blur(20px)" />
  </svg>
);

const SoftwareGraphic: React.FC = () => (
  <svg
    viewBox="0 0 380 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="softGlow" x1="0" y1="0" x2="380" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E6004C" stopOpacity="0.25" />
        <stop offset="0.6" stopColor="#1e020c" stopOpacity="0.4" />
        <stop offset="1" stopColor="#080104" stopOpacity="0.9" />
      </linearGradient>
      <pattern id="softHex" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="12" cy="12" r="1" fill="rgba(255,255,255,0.06)" />
      </pattern>
    </defs>

    <rect width="380" height="200" rx="16" fill="url(#softGlow)" />
    <rect width="380" height="200" rx="16" fill="url(#softHex)" />

    {/* Terminal / System Architecture Canvas */}
    <g transform="translate(24, 20)">
      <rect width="332" height="158" rx="12" fill="#0b0206" stroke="rgba(230,0,76,0.35)" strokeWidth="1.2" />

      {/* Terminal Title Bar */}
      <rect width="332" height="26" rx="12" fill="rgba(255,255,255,0.03)" />
      <text x="16" y="17" fill="#FF1053" fontSize="9" fontWeight="bold" fontFamily="monospace">SYSTEM ARCHITECTURE // EDGE RUNTIME</text>

      {/* Microservice Topology Nodes */}
      {/* Node 1: Client Gateway */}
      <rect x="20" y="42" width="76" height="42" rx="8" fill="#14020a" stroke="rgba(255,16,83,0.5)" strokeWidth="1" />
      <text x="30" y="58" fill="#fff" fontSize="8.5" fontWeight="bold" fontFamily="monospace">API Gateway</text>
      <text x="30" y="72" fill="#10b981" fontSize="7.5" fontFamily="monospace">● 18ms latency</text>

      {/* Connection Bus Lines */}
      <path d="M 96 63 L 132 63" stroke="#FF1053" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="114" cy="63" r="2.5" fill="#FF1053" />

      {/* Node 2: Core Microservice Cluster */}
      <rect x="132" y="38" width="94" height="52" rx="8" fill="#1b030d" stroke="#FF1053" strokeWidth="1.2" />
      <text x="142" y="56" fill="#fff" fontSize="8.5" fontWeight="bold" fontFamily="monospace">Compute Cluster</text>
      <text x="142" y="69" fill="rgba(255,255,255,0.6)" fontSize="7.5" fontFamily="monospace">Rust + Go Engine</text>
      <text x="142" y="80" fill="#FF1053" fontSize="7" fontFamily="monospace">TPS: 42,000 req/s</text>

      {/* Connection to DB */}
      <path d="M 226 63 L 260 63" stroke="#FF1053" strokeWidth="1.5" strokeDasharray="2 2" />

      {/* Node 3: Distributed DB */}
      <rect x="260" y="42" width="56" height="42" rx="8" fill="#14020a" stroke="rgba(255,16,83,0.4)" strokeWidth="1" />
      <text x="270" y="58" fill="#fff" fontSize="8.5" fontWeight="bold" fontFamily="monospace">Postgres</text>
      <text x="270" y="72" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">Zero-Lag</text>

      {/* Terminal Command Stream below */}
      <g transform="translate(20, 104)">
        <rect width="296" height="42" rx="6" fill="#060103" stroke="rgba(255,255,255,0.06)" />
        <text x="12" y="17" fill="rgba(255,255,255,0.7)" fontSize="8.5" fontFamily="monospace">
          <tspan fill="#FF1053">$</tspan> deploy --target=edge --replicas=global
        </text>
        <text x="12" y="31" fill="#10b981" fontSize="8" fontFamily="monospace">
          ✓ 100% HEALTHY • 0 DOWNTIME ROLLING UPGRADE
        </text>
      </g>
    </g>
  </svg>
);

const AiGraphic: React.FC = () => (
  <svg
    viewBox="0 0 380 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="aiGlow" x1="0" y1="0" x2="380" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF1053" stopOpacity="0.25" />
        <stop offset="0.5" stopColor="#670220" stopOpacity="0.2" />
        <stop offset="1" stopColor="#080104" stopOpacity="0.9" />
      </linearGradient>
      <radialGradient id="neuralCore" cx="50%" cy="50%" r="50%">
        <stop stopColor="#FF1053" stopOpacity="0.9" />
        <stop offset="0.6" stopColor="#E6004C" stopOpacity="0.4" />
        <stop offset="1" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="380" height="200" rx="16" fill="url(#aiGlow)" />

    {/* Neural Network Visualization */}
    <g transform="translate(24, 20)">
      <rect width="332" height="158" rx="12" fill="#0b0105" stroke="rgba(255,16,83,0.3)" strokeWidth="1.2" />

      {/* Top Banner */}
      <rect width="332" height="26" rx="12" fill="rgba(255,255,255,0.03)" />
      <circle cx="16" cy="13" r="3" fill="#FF1053" />
      <text x="26" y="16.5" fill="#fff" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
        AI AGENT PIPELINE // AUTONOMOUS REASONING
      </text>
      <rect x="254" y="6" width="66" height="14" rx="7" fill="rgba(255,16,83,0.18)" />
      <text x="262" y="16" fill="#FF1053" fontSize="7.5" fontWeight="bold" fontFamily="monospace">RAG ACTIVE</text>

      {/* Neural Synapses & Network Nodes */}
      {/* Central Glowing Core */}
      <circle cx="166" cy="90" r="38" fill="url(#neuralCore)" />
      <circle cx="166" cy="90" r="8" fill="#fff" stroke="#FF1053" strokeWidth="2" filter="drop-shadow(0 0 8px #FF1053)" />

      {/* Layer 1 Nodes (Input) */}
      <circle cx="60" cy="55" r="5" fill="#1e020b" stroke="#FF1053" strokeWidth="1.5" />
      <circle cx="50" cy="90" r="6" fill="#1e020b" stroke="#FF1053" strokeWidth="1.5" />
      <circle cx="60" cy="125" r="5" fill="#1e020b" stroke="#FF1053" strokeWidth="1.5" />

      {/* Layer 2 Nodes (Hidden / Transformer) */}
      <circle cx="115" cy="65" r="5" fill="#1e020b" stroke="#fff" strokeWidth="1.5" />
      <circle cx="115" cy="115" r="5" fill="#1e020b" stroke="#fff" strokeWidth="1.5" />

      {/* Layer 3 Nodes (Output / Tool Calls) */}
      <circle cx="220" cy="65" r="5" fill="#1e020b" stroke="#fff" strokeWidth="1.5" />
      <circle cx="220" cy="115" r="5" fill="#1e020b" stroke="#fff" strokeWidth="1.5" />
      <circle cx="275" cy="55" r="5" fill="#1e020b" stroke="#FF1053" strokeWidth="1.5" />
      <circle cx="285" cy="90" r="6" fill="#1e020b" stroke="#FF1053" strokeWidth="1.5" />
      <circle cx="275" cy="125" r="5" fill="#1e020b" stroke="#FF1053" strokeWidth="1.5" />

      {/* Synaptic Connecting Beams */}
      <path d="M 60 55 L 115 65 M 50 90 L 115 65 M 50 90 L 115 115 M 60 125 L 115 115" stroke="rgba(255,16,83,0.35)" strokeWidth="1" />
      <path d="M 115 65 L 166 90 M 115 115 L 166 90" stroke="#FF1053" strokeWidth="1.5" />
      <path d="M 166 90 L 220 65 M 166 90 L 220 115" stroke="#FF1053" strokeWidth="1.5" />
      <path d="M 220 65 L 275 55 M 220 65 L 285 90 M 220 115 L 285 90 M 220 115 L 275 125" stroke="rgba(255,16,83,0.35)" strokeWidth="1" />

      {/* Dynamic Data Packet Pulses */}
      <circle cx="140" cy="78" r="2.5" fill="#fff" />
      <circle cx="193" cy="78" r="2.5" fill="#fff" />

      {/* Bottom Status Pill */}
      <rect x="96" y="138" width="140" height="14" rx="7" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
      <text x="110" y="148.5" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="monospace">
        Sub-45ms Edge Inference
      </text>
    </g>
  </svg>
);

const WhatsAppGraphic: React.FC = () => (
  <svg
    viewBox="0 0 380 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="waGlow" x1="0" y1="0" x2="380" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#25D366" stopOpacity="0.2" />
        <stop offset="0.5" stopColor="#E6004C" stopOpacity="0.1" />
        <stop offset="1" stopColor="#080104" stopOpacity="0.9" />
      </linearGradient>
    </defs>

    <rect width="380" height="200" rx="16" fill="url(#waGlow)" />

    {/* Chat Interface Canvas */}
    <g transform="translate(24, 20)">
      <rect width="332" height="158" rx="12" fill="#070c08" stroke="rgba(37,211,102,0.35)" strokeWidth="1.2" />

      {/* Header */}
      <rect width="332" height="28" rx="12" fill="rgba(37,211,102,0.08)" />
      <circle cx="18" cy="14" r="6" fill="#25D366" />
      <path d="M 16 14 L 17.5 15.5 L 20 12.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
      <text x="32" y="17.5" fill="#fff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
        EclipTo Concierge Bot
      </text>
      <rect x="250" y="7" width="70" height="14" rx="7" fill="rgba(37,211,102,0.18)" />
      <text x="258" y="17" fill="#25D366" fontSize="7.5" fontWeight="bold" fontFamily="monospace">API VERIFIED</text>

      {/* Incoming Message Bubble 1 (User) */}
      <g transform="translate(16, 38)">
        <rect width="210" height="30" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" />
        <text x="12" y="15" fill="#fff" fontSize="8.5" fontFamily="sans-serif">
          Looking for a custom web app & marketing funnel.
        </text>
        <text x="180" y="24" fill="rgba(255,255,255,0.4)" fontSize="6.5" fontFamily="sans-serif">10:42 AM</text>
      </g>

      {/* Automated Response Bubble 2 (AI Bot) */}
      <g transform="translate(100, 76)">
        <rect width="216" height="42" rx="10" fill="#0d2615" stroke="rgba(37,211,102,0.4)" />
        <text x="12" y="16" fill="#25D366" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
          ● INSTANT QUALIFICATION ENGINE
        </text>
        <text x="12" y="28" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">
          Proposal generated! Slot reserved for sprint kickoff.
        </text>
        <text x="182" y="36" fill="rgba(37,211,102,0.6)" fontSize="6.5" fontFamily="sans-serif">10:42 AM ✓✓</text>
      </g>

      {/* CRM Synchronized Badge at Bottom */}
      <g transform="translate(16, 126)">
        <rect width="300" height="22" rx="6" fill="#0c190f" stroke="rgba(37,211,102,0.25)" />
        <circle cx="14" cy="11" r="3" fill="#25D366" />
        <text x="24" y="14" fill="#a7f3d0" fontSize="7.5" fontFamily="monospace">
          CRM SYNCHRONIZED: HubSpot, Salesforce & Sheets (Zero Data Loss)
        </text>
      </g>
    </g>
  </svg>
);

const BrandingGraphic: React.FC = () => (
  <svg
    viewBox="0 0 380 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="brandGlow" x1="0" y1="0" x2="380" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF1053" stopOpacity="0.28" />
        <stop offset="0.6" stopColor="#300315" stopOpacity="0.3" />
        <stop offset="1" stopColor="#080104" stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="cubeGradient" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#FF1053" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>

    <rect width="380" height="200" rx="16" fill="url(#brandGlow)" />

    {/* Brand Design Canvas */}
    <g transform="translate(24, 20)">
      <rect width="332" height="158" rx="12" fill="#0b0207" stroke="rgba(255,16,83,0.3)" strokeWidth="1.2" />

      {/* Header */}
      <rect width="332" height="26" rx="12" fill="rgba(255,255,255,0.03)" />
      <text x="16" y="17" fill="#FF1053" fontSize="9" fontWeight="bold" fontFamily="monospace">
        VISUAL IDENTITY // KINETIC DESIGN SYSTEM
      </text>

      {/* Isometric Design Element / Golden Ratio Emblem */}
      <g transform="translate(48, 42)">
        {/* Isometric Cube */}
        {/* Top Face */}
        <polygon points="40,12 80,32 40,52 0,32" fill="url(#cubeGradient)" opacity="0.8" />
        {/* Left Face */}
        <polygon points="0,32 40,52 40,96 0,76" fill="#800028" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
        {/* Right Face */}
        <polygon points="40,52 80,32 80,76 40,96" fill="#FF1053" opacity="0.75" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />

        {/* Vector Pen Tool Handles */}
        <line x1="40" y1="12" x2="10" y2="0" stroke="#FF1053" strokeWidth="1.2" />
        <circle cx="10" cy="0" r="2.5" fill="#fff" />
        <line x1="80" y1="32" x2="110" y2="20" stroke="#FF1053" strokeWidth="1.2" />
        <circle cx="110" cy="20" r="2.5" fill="#fff" />
      </g>

      {/* Design System Tokens Column */}
      <g transform="translate(180, 42)">
        <text x="0" y="10" fill="#fff" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">Brand Token Hierarchy</text>
        
        {/* Color Palette Swatches */}
        <g transform="translate(0, 20)">
          <rect x="0" y="0" width="24" height="24" rx="6" fill="#FF1053" stroke="rgba(255,255,255,0.2)" />
          <rect x="30" y="0" width="24" height="24" rx="6" fill="#E6004C" stroke="rgba(255,255,255,0.2)" />
          <rect x="60" y="0" width="24" height="24" rx="6" fill="#8B5CF6" stroke="rgba(255,255,255,0.2)" />
          <rect x="90" y="0" width="24" height="24" rx="6" fill="#080104" stroke="rgba(255,255,255,0.3)" />
        </g>

        {/* Typography Scale Preview */}
        <g transform="translate(0, 56)">
          <rect width="130" height="24" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
          <text x="10" y="16" fill="#fff" fontSize="10" fontWeight="900" fontFamily="sans-serif">Aa</text>
          <text x="32" y="16" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace">Space Grotesk 900</text>
        </g>
      </g>

      {/* Bottom Guideline Bar */}
      <rect x="16" y="136" width="300" height="14" rx="4" fill="rgba(255,16,83,0.08)" stroke="rgba(255,16,83,0.2)" />
      <text x="24" y="146.5" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="monospace">
        DESIGN TOKENS // CSS VARIABLES // MOTION SPECS
      </text>
    </g>
  </svg>
);

const MarketingGraphic: React.FC = () => (
  <svg
    viewBox="0 0 380 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="mktGlow" x1="0" y1="0" x2="380" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF1053" stopOpacity="0.25" />
        <stop offset="0.6" stopColor="#280312" stopOpacity="0.3" />
        <stop offset="1" stopColor="#080104" stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#FF1053" stopOpacity="0.45" />
        <stop offset="1" stopColor="#E6004C" stopOpacity="0.0" />
      </linearGradient>
    </defs>

    <rect width="380" height="200" rx="16" fill="url(#mktGlow)" />

    {/* Analytics & Growth Engine Canvas */}
    <g transform="translate(24, 20)">
      <rect width="332" height="158" rx="12" fill="#090105" stroke="rgba(255,16,83,0.3)" strokeWidth="1.2" />

      {/* Header */}
      <rect width="332" height="26" rx="12" fill="rgba(255,255,255,0.03)" />
      <text x="16" y="17" fill="#FF1053" fontSize="9" fontWeight="bold" fontFamily="monospace">
        GROWTH TELEMETRY // FULL-FUNNEL ATTRIBUTION
      </text>
      <rect x="250" y="6" width="70" height="14" rx="7" fill="rgba(16,185,129,0.18)" />
      <text x="258" y="16" fill="#10b981" fontSize="7.5" fontWeight="bold" fontFamily="monospace">+310% REVENUE</text>

      {/* Exponential Growth Chart Area */}
      <path
        d="M 20 120 Q 80 115 130 90 T 230 48 T 305 28 L 305 130 L 20 130 Z"
        fill="url(#areaGradient)"
      />
      {/* High-Contrast Trend Line */}
      <path
        d="M 20 120 Q 80 115 130 90 T 230 48 T 305 28"
        stroke="#FF1053"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Highlight Points on Curve */}
      <circle cx="130" cy="90" r="3.5" fill="#fff" stroke="#FF1053" strokeWidth="1.5" />
      <circle cx="230" cy="48" r="3.5" fill="#fff" stroke="#FF1053" strokeWidth="1.5" />
      <circle cx="305" cy="28" r="5" fill="#fff" stroke="#FF1053" strokeWidth="2" filter="drop-shadow(0 0 6px #FF1053)" />

      {/* Metric Cards Overlay */}
      <g transform="translate(20, 42)">
        <rect width="84" height="28" rx="6" fill="#14020a" stroke="rgba(255,16,83,0.4)" />
        <text x="8" y="12" fill="rgba(255,255,255,0.5)" fontSize="6.5" fontFamily="monospace">CONVERSION RATE</text>
        <text x="8" y="22" fill="#fff" fontSize="9" fontWeight="bold" fontFamily="monospace">14.8% (+4.2x)</text>
      </g>

      {/* Bottom Funnel Stages */}
      <g transform="translate(20, 136)">
        <rect width="66" height="14" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x="6" y="10.5" fill="rgba(255,255,255,0.6)" fontSize="6.5" fontFamily="monospace">AQUISITION</text>

        <rect x="74" y="0" width="66" height="14" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x="84" y="10.5" fill="rgba(255,255,255,0.6)" fontSize="6.5" fontFamily="monospace">ACTIVATION</text>

        <rect x="148" y="0" width="70" height="14" rx="4" fill="rgba(255,16,83,0.15)" stroke="rgba(255,16,83,0.3)" />
        <text x="156" y="10.5" fill="#FF1053" fontSize="6.5" fontWeight="bold" fontFamily="monospace">RETENTION</text>

        <rect x="226" y="0" width="70" height="14" rx="4" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.3)" />
        <text x="236" y="10.5" fill="#10b981" fontSize="6.5" fontWeight="bold" fontFamily="monospace">REVENUE</text>
      </g>
    </g>
  </svg>
);

/* -------------------------------------------------------------------------- */
/* Main Services Section Component                                            */
/* -------------------------------------------------------------------------- */

export const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);

  useEffect(() => {
    let mounted = true;
    fetchWebsiteContent().then((data) => {
      if (mounted && data?.services?.services_list) {
        try {
          const parsed = JSON.parse(data.services.services_list);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setServices(parsed);
          }
        } catch {
          // Fall back gracefully to static SERVICES
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const getServiceGraphic = (id: string) => {
    switch (id) {
      case 'website-development':
        return <WebsiteGraphic />;
      case 'custom-software':
        return <SoftwareGraphic />;
      case 'ai-automation':
        return <AiGraphic />;
      case 'whatsapp-automation':
        return <WhatsAppGraphic />;
      case 'branding-design':
        return <BrandingGraphic />;
      case 'digital-marketing':
        return <MarketingGraphic />;
      default:
        return <WebsiteGraphic />;
    }
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'website-development':
        return <MonitorPlay className="w-4 h-4 text-[#FF1053]" />;
      case 'custom-software':
        return <Code2 className="w-4 h-4 text-[#FF1053]" />;
      case 'ai-automation':
        return <Cpu className="w-4 h-4 text-[#FF1053]" />;
      case 'whatsapp-automation':
        return <MessageSquare className="w-4 h-4 text-[#25D366]" />;
      case 'branding-design':
        return <Palette className="w-4 h-4 text-[#FF1053]" />;
      case 'digital-marketing':
        return <TrendingUp className="w-4 h-4 text-[#FF1053]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#FF1053]" />;
    }
  };

  const activeService =
    services.find((s) => s.id === activeServiceId) || services[0] || SERVICES[0];

  return (
    <section
      id="services"
      className="relative py-16 sm:py-20 md:py-24 bg-[#080104] z-10 border-t border-white/10"
      aria-label="Eclipto Agency Services and Capabilities"
    >
      {/* Background radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#E6004C]/08 blur-[180px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#E6004C]/30 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6004C] animate-pulse" />
            <span className="font-tech text-[#E6004C] text-[11px] uppercase tracking-[0.25em] font-bold">
              01 / WHAT WE DO
            </span>
          </div>

          <h2 className="section-headline uppercase text-white font-display font-black tracking-[-0.03em] leading-tight">
            <span className="block text-white">BIG IDEAS.</span>
            <span className="block font-editorial font-normal tracking-[-0.015em] bg-gradient-to-r from-[#FF1053] via-[#E6004C] to-[#ff4d79] bg-clip-text text-transparent text-glow-pink">
              BEAUTIFULLY BUILT.
            </span>
          </h2>

          <p className="mt-4 text-white/75 font-body text-sm sm:text-base leading-relaxed max-w-2xl">
            We partner with ambitious founders and established enterprises to
            engineer custom digital ecosystems that accelerate market leadership.
          </p>
        </div>

        {/* 6 Services Grid with Bespoke Domain Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 sm:mb-14">
          {services.map((service) => {
            const isActive = activeServiceId === service.id;
            return (
              <div
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={`group relative rounded-2xl glass-panel transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden border ${
                  isActive
                    ? 'border-[#FF1053] bg-white/[0.06] shadow-[0_12px_40px_rgba(230,0,76,0.3)] -translate-y-1'
                    : 'border-white/10 hover:border-[#E6004C]/60 hover:bg-white/[0.03] hover:-translate-y-1.5'
                }`}
              >
                {/* Visual Graphic Header */}
                <div className="relative w-full aspect-[16/9] sm:aspect-[16/9.5] overflow-hidden bg-black/40 border-b border-white/10">
                  {getServiceGraphic(service.id)}

                  {/* Corner Number Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 font-tech text-[11px] font-bold text-white shadow-sm">
                      {service.num}
                    </span>
                  </div>

                  {/* Top-Right Action Link / Selected Indicator */}
                  <div className="absolute top-3.5 right-3.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-[#FF1053] text-white shadow-[0_0_15px_#FF1053]'
                          : 'bg-black/60 backdrop-blur-md border border-white/20 text-white/70 group-hover:text-white group-hover:border-[#FF1053] group-hover:bg-[#FF1053]/20'
                      }`}
                      title="View service details"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Icon + Title */}
                    <div className="flex items-center space-x-2.5 mb-3">
                      <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 group-hover:border-[#E6004C]/40 group-hover:scale-105 transition-all">
                        {getServiceIcon(service.id)}
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-white transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    {/* Concise Description */}
                    <p className="font-body text-xs sm:text-sm text-white/70 leading-relaxed font-normal mb-5 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Tech Stack Pills */}
                    {service.techStack && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {service.techStack.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] font-tech tracking-wider bg-white/[0.04] border border-white/10 text-white/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom: Metric Highlight */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="font-tech text-[10px] uppercase tracking-wider text-white/50">
                      BENCHMARK
                    </span>
                    <span className="font-tech text-xs font-semibold text-[#FF1053]">
                      {service.metrics}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Service Detailed Feature Deep-Dive */}
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl glass-panel border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div
            className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-[#E6004C]/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10 mb-6">
            <div className="flex items-center space-x-3.5">
              <div className="p-3.5 rounded-2xl bg-[#E6004C]/15 border border-[#E6004C]/30 text-[#FF1053]">
                {getServiceIcon(activeService.id)}
              </div>
              <div>
                <span className="font-tech text-xs text-[#E6004C] tracking-widest uppercase font-bold">
                  ACTIVE SPECIFICATION // {activeService.num}
                </span>
                <h4 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeService.title}
                </h4>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-tech tracking-wider uppercase bg-[#FF1053]/15 text-[#FF1053] border border-[#FF1053]/30 font-bold">
                {activeService.metrics}
              </span>

              <a
                href="#contact"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-display text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#E6004C] to-[#FF1053] text-white shadow-[0_0_20px_rgba(230,0,76,0.4)] hover:shadow-[0_0_30px_rgba(230,0,76,0.6)] transition-all"
              >
                <span>REQUEST BRIEF</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <p className="font-editorial text-base sm:text-lg text-white/90 mb-6 font-normal max-w-4xl">
            "{activeService.headline}"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {activeService.deliverables.map((deliv, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start space-x-2.5 hover:border-white/20 transition-all"
              >
                <div className="mt-0.5 p-1 rounded-full bg-[#E6004C]/20 text-[#FF1053] shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="font-body text-xs sm:text-sm text-white/85 font-medium leading-snug">
                  {deliv}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
