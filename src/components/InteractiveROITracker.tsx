import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const CountUp = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    const duration = 800;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // cinematic easing
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * (end - start) + start));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [value]);
  return <span>{prefix}{count.toLocaleString('en-IN')}{suffix}</span>;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const HOURLY_COST = 500;
const WORKING_DAYS = 22;
const IMPLEMENTATION_COST = 3_000_000;
const MAINTENANCE_PER_MONTH = 25_000;

function formatINR(value: number): string {
  if (value >= 10_000_000) return `₹${(value / 10_000_000).toFixed(1)}Cr`;
  if (value >= 100_000) return `₹${(value / 100_000).toFixed(1)}L`;
  if (value >= 1_000) return `₹${(value / 1_000).toFixed(0)}K`;
  return `₹${value.toFixed(0)}`;
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, unit, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-white/90 tracking-wide uppercase">{label}</span>
        <span className="text-sm font-bold text-cyan-400">
          {value} {unit}
        </span>
      </div>
      <div className="relative h-1.5 rounded-full bg-white/[0.06]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-150"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ WebkitAppearance: 'none' }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-[#05070A] shadow-[0_0_8px_rgba(6,182,212,0.7)] transition-all duration-150 pointer-events-none"
          style={{ left: `calc(${pct}% - 7px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-white/55">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

const InteractiveROITracker: React.FC = () => {
  const [teamSize, setTeamSize] = useState(5);
  const [manualHoursPerDay, setManualHoursPerDay] = useState(4);

  const { statusQuoData, engineeredData, crossoverMonth, annualSaving } = useMemo(() => {
    const monthlyManual = teamSize * manualHoursPerDay * HOURLY_COST * WORKING_DAYS;

    const sq = MONTHS.map((_, i) => monthlyManual * (i + 1));
    const eng = MONTHS.map((_, i) => IMPLEMENTATION_COST + MAINTENANCE_PER_MONTH * (i + 1));

    let cross = -1;
    for (let i = 0; i < 12; i++) {
      if (sq[i] >= eng[i]) { cross = i; break; }
    }

    const saving = sq[11] - eng[11];

    return { statusQuoData: sq, engineeredData: eng, crossoverMonth: cross, annualSaving: saving };
  }, [teamSize, manualHoursPerDay]);

  const chartData = {
    labels: MONTHS,
    datasets: [
      {
        label: 'Cost of Inaction',
        data: statusQuoData,
        borderColor: 'rgba(239, 68, 68, 0.9)',
        backgroundColor: (ctx: any) => {
          const chart = ctx.chart;
          const { ctx: c, chartArea } = chart;
          if (!chartArea) return 'transparent';
          const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(239, 68, 68, 0.20)');
          gradient.addColorStop(1, 'rgba(239, 68, 68, 0.00)');
          return gradient;
        },
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: 'rgba(239, 68, 68, 0.9)',
        pointBorderColor: 'transparent',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Spirecrest Infrastructure',
        data: engineeredData,
        borderColor: 'rgba(6, 182, 212, 0.9)',
        backgroundColor: (ctx: any) => {
          const chart = ctx.chart;
          const { ctx: c, chartArea } = chart;
          if (!chartArea) return 'transparent';
          const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0.00)');
          return gradient;
        },
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: 'rgba(6, 182, 212, 0.9)',
        pointBorderColor: 'transparent',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'rgba(255,255,255,0.45)',
          font: { size: 11, family: 'inherit' },
          boxWidth: 10,
          boxHeight: 10,
          useBorderRadius: true,
          borderRadius: 3,
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(9,14,27,0.95)',
        borderColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        titleColor: 'rgba(255,255,255,0.6)',
        bodyColor: 'rgba(255,255,255,0.85)',
        padding: 12,
        callbacks: {
          label: (ctx: any) => ` ${ctx.dataset.label}: ${formatINR(ctx.parsed.y)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
        ticks: { color: 'rgba(255,255,255,0.30)', font: { size: 11 } },
        border: { color: 'transparent' },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
        ticks: {
          color: 'rgba(255,255,255,0.75)',
          font: { size: 11 },
          callback: (v: any) => formatINR(v),
        },
        border: { color: 'transparent' },
      },
    },
  };

  const monthlyManual = teamSize * manualHoursPerDay * HOURLY_COST * WORKING_DAYS;

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <p className="text-xs font-bold tracking-widest text-cyan-500 uppercase text-center mb-2">
          ROI CALCULATOR
        </p>
        <h2 className="text-white text-center font-bold text-2xl md:text-3xl mb-12 leading-snug">
          What does operational inaction actually cost?
        </h2>

        <div className="mb-8 text-center md:text-left">
          <p className="text-sc-text-muted text-xs uppercase tracking-widest mb-2">YOUR CURRENT FRAGMENTATION COST</p>
          <motion.h3 
            animate={monthlyManual > 50000 ? { color: ['#F0F6FC', '#F5A623', '#F0F6FC'] } : {}} 
            transition={{ duration: 3, repeat: Infinity }}
            className="text-2xl md:text-3xl font-bold font-display text-sc-text-primary"
          >
            IT Sprawl Is Costing You More Than You Think.
          </motion.h3>
        </div>

        {/* Glass panel */}
        <motion.div 
          className="rounded-2xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-md p-6 shadow-2xl"
          animate={monthlyManual > 50000 ? { boxShadow: ['0 0 20px var(--sc-amber-glow)', '0 0 40px var(--sc-amber-glow)', '0 0 20px var(--sc-amber-glow)'] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >

          {/* Card Header */}
          <p className="text-white font-bold tracking-wide text-sm uppercase mb-6">
            Projected Operational ROI
          </p>

          <div className="flex flex-col lg:flex-row gap-8 min-w-0">

            {/* LEFT — Controls */}
            <div className="flex flex-col gap-8 lg:w-64 shrink-0">
              <Slider
                label="Team Size"
                value={teamSize}
                min={1}
                max={50}
                unit="people"
                onChange={setTeamSize}
              />
              <Slider
                label="Manual Hours / Day"
                value={manualHoursPerDay}
                min={1}
                max={10}
                unit="hrs"
                onChange={setManualHoursPerDay}
              />

              {/* Summary Stats */}
              <div className="flex flex-col gap-3 pt-4 border-t border-white/[0.04]">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-widest text-white/90">Monthly Waste</span>
                  <span className="text-lg font-bold text-red-400"><CountUp value={monthlyManual} prefix="₹" /></span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-widest text-white/90">12-Month Gap</span>
                  <span className="text-lg font-bold text-cyan-400">
                    {annualSaving > 0 ? (
                      <>Save <CountUp value={annualSaving} prefix="₹" /></>
                    ) : (
                      <><CountUp value={Math.abs(annualSaving)} prefix="₹" /> ahead</>
                    )}
                  </span>
                </div>
                {crossoverMonth >= 0 && (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase tracking-widest text-white/90">Break-even</span>
                    <span className="text-lg font-bold text-white">{MONTHS[crossoverMonth]}</span>
                  </div>
                )}
              </div>

              <div className="rounded-xl bg-cyan-500/[0.06] border border-cyan-500/[0.10] p-4">
                <p className="text-[10px] uppercase tracking-widest text-cyan-500/70 mb-1">Assumption</p>
                <p className="text-xs text-white/80 leading-relaxed">
                  ₹500/hr per employee · {WORKING_DAYS} working days/mo · ₹30L flat implementation
                </p>
              </div>
            </div>

            {/* RIGHT — Chart */}
            <div className="relative w-full h-[250px] sm:h-[350px] overflow-hidden">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveROITracker;
