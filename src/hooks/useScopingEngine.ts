import Swal from 'sweetalert2';

/* ─────────────────────────────────────────────────────────────
   Global dark-theme mixin
───────────────────────────────────────────────────────────── */
const ScopingSwal = Swal.mixin({
  background: '#0F1623',
  color: '#FFFFFF',
  confirmButtonColor: '#06B6D4',
  cancelButtonColor: 'transparent',
  customClass: {
    popup: 'swal-scoping-popup',
    confirmButton: 'swal-scoping-confirm',
    cancelButton: 'swal-scoping-cancel',
    title: 'swal-scoping-title',
    htmlContainer: 'swal-scoping-html',
    actions: 'swal-scoping-actions',
  },
});

/* ─────────────────────────────────────────────────────────────
   Inline global styles injected once
───────────────────────────────────────────────────────────── */
function injectScopingStyles() {
  const id = 'swal-scoping-styles';
  if (document.getElementById(id)) return;

  const style = document.createElement('style');
  style.id = id;
  style.textContent = `
    .swal-scoping-popup {
      border: 1px solid rgba(255,255,255,0.08) !important;
      border-radius: 1rem !important;
      backdrop-filter: blur(24px) !important;
      padding: 2rem !important;
      box-shadow: 0 0 60px rgba(6,182,212,0.08), 0 24px 60px rgba(0,0,0,0.6) !important;
    }
    .swal-scoping-title {
      font-size: 1.1rem !important;
      font-weight: 700 !important;
      color: #ffffff !important;
      letter-spacing: 0.02em !important;
    }
    .swal-scoping-html {
      color: rgba(255,255,255,0.6) !important;
      font-size: 0.875rem !important;
    }
    .swal-scoping-confirm {
      border-radius: 0.625rem !important;
      font-weight: 600 !important;
      font-size: 0.875rem !important;
      padding: 0.625rem 1.75rem !important;
      letter-spacing: 0.03em !important;
      box-shadow: 0 0 20px rgba(6,182,212,0.35) !important;
      transition: all 0.2s ease !important;
    }
    .swal-scoping-confirm:hover {
      box-shadow: 0 0 32px rgba(6,182,212,0.55) !important;
      background-color: #22d3ee !important;
    }
    .swal-scoping-cancel {
      border: 1px solid rgba(255,255,255,0.12) !important;
      border-radius: 0.625rem !important;
      color: rgba(255,255,255,0.55) !important;
      font-size: 0.875rem !important;
      padding: 0.625rem 1.5rem !important;
      transition: all 0.2s ease !important;
    }
    .swal-scoping-cancel:hover {
      background: rgba(255,255,255,0.05) !important;
      color: #ffffff !important;
    }
    .swal-scoping-actions {
      gap: 0.75rem !important;
      margin-top: 1.5rem !important;
    }
    .swal-option-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.625rem;
      margin-top: 1rem;
    }
    .swal-option-btn {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 0.625rem;
      color: rgba(255,255,255,0.7);
      font-size: 0.8125rem;
      font-weight: 500;
      padding: 0.75rem 0.5rem;
      cursor: pointer;
      transition: all 0.18s ease;
      text-align: center;
      letter-spacing: 0.01em;
    }
    .swal-option-btn:hover,
    .swal-option-btn.selected {
      background: rgba(6,182,212,0.12);
      border-color: rgba(6,182,212,0.45);
      color: #06B6D4;
      box-shadow: 0 0 16px rgba(6,182,212,0.15);
    }
    .swal-step-label {
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(6,182,212,0.7);
      margin-bottom: 0.5rem;
      display: block;
    }
    .swal-score-ring {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      border: 3px solid rgba(6,182,212,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      position: relative;
      box-shadow: 0 0 32px rgba(6,182,212,0.2);
    }
    .swal-score-value {
      font-size: 1.75rem;
      font-weight: 800;
      color: #06B6D4;
      line-height: 1;
    }
    .swal-score-max {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.35);
    }
    .swal-result-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 0.5rem;
      margin: 1rem 0;
    }
    .swal-result-chip {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 0.5rem;
      padding: 0.5rem;
      font-size: 0.7rem;
      color: rgba(255,255,255,0.5);
      text-align: center;
    }
    .swal-result-chip span {
      display: block;
      font-size: 0.65rem;
      color: rgba(255,255,255,0.3);
      margin-bottom: 0.2rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .swal-final-actions {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
      margin-top: 1.25rem;
    }
    .swal-final-btn-primary {
      background: #06B6D4;
      border: none;
      border-radius: 0.625rem;
      color: #000;
      font-size: 0.875rem;
      font-weight: 700;
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
      letter-spacing: 0.02em;
      box-shadow: 0 0 20px rgba(6,182,212,0.3);
    }
    .swal-final-btn-primary:hover {
      background: #22d3ee;
      box-shadow: 0 0 32px rgba(6,182,212,0.5);
    }
    .swal-final-btn-secondary {
      background: transparent;
      border: 1px solid rgba(6,182,212,0.35);
      border-radius: 0.625rem;
      color: #06B6D4;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
      letter-spacing: 0.02em;
    }
    .swal-final-btn-secondary:hover {
      background: rgba(6,182,212,0.08);
      border-color: rgba(6,182,212,0.6);
    }
  `;
  document.head.appendChild(style);
}

/* ─────────────────────────────────────────────────────────────
   Step helper: renders an option grid and resolves on click
───────────────────────────────────────────────────────────── */
function askWithGrid(
  stepLabel: string,
  title: string,
  subtitle: string,
  options: string[]
): Promise<string | null> {
  return new Promise((resolve) => {
    const optionButtons = options
      .map(
        (opt) =>
          `<button class="swal-option-btn" data-value="${opt}">${opt}</button>`
      )
      .join('');

    ScopingSwal.fire({
      title,
      html: `
        <span class="swal-step-label">${stepLabel}</span>
        <p style="margin-bottom:0.75rem;color:rgba(255,255,255,0.5);font-size:0.8125rem;">${subtitle}</p>
        <div class="swal-option-grid">${optionButtons}</div>
      `,
      showConfirmButton: false,
      showCancelButton: false,
      allowOutsideClick: false,
      didOpen: (popup) => {
        popup.querySelectorAll<HTMLButtonElement>('.swal-option-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            resolve(btn.dataset.value ?? null);
            Swal.close();
          });
        });
      },
      willClose: () => {
        // If closed without selection (e.g. ESC), resolve null
        resolve(null);
      },
    });
  });
}

/* ─────────────────────────────────────────────────────────────
   Score calculation logic
───────────────────────────────────────────────────────────── */
function calculateScore(
  focus: string,
  scale: string,
  risk: string
): { score: number; label: string; color: string } {
  const focusScore: Record<string, number> = {
    Infrastructure: 28,
    Cybersecurity: 30,
    'Software Systems': 25,
    Automation: 22,
  };
  const scaleScore: Record<string, number> = {
    '1-10 Employees': 15,
    '10-50': 22,
    '50-200': 28,
    '200+': 35,
  };
  const riskScore: Record<string, number> = {
    Downtime: 30,
    'Security Breach': 35,
    'Slow Execution': 20,
    'Scaling Issues': 25,
  };

  const raw =
    (focusScore[focus] ?? 20) +
    (scaleScore[scale] ?? 18) +
    (riskScore[risk] ?? 22);
  const score = Math.min(Math.round((raw / 100) * 100), 98);

  if (score >= 75) return { score, label: 'CRITICAL', color: '#ef4444' };
  if (score >= 50) return { score, label: 'ELEVATED', color: '#f59e0b' };
  return { score, label: 'MODERATE', color: '#06B6D4' };
}

/* ─────────────────────────────────────────────────────────────
   WhatsApp redirect
───────────────────────────────────────────────────────────── */
function buildWhatsAppLink(focus: string, scale: string, risk: string, score: number): string {
  const msg = encodeURIComponent(
    `Hi Spirecrest,\n\nI just completed the System Diagnostic and received a Resilience Score of ${score}/100.\n\nMy details:\n• Focus: ${focus}\n• Scale: ${scale}\n• Primary Risk: ${risk}\n\nI'd like to discuss a solution with a Lead Engineer.`
  );
  return `https://wa.me/919250974145?text=${msg}`;
}

/* ─────────────────────────────────────────────────────────────
   Final diagnostic result screen
───────────────────────────────────────────────────────────── */
function showDiagnosticResult(
  focus: string,
  scale: string,
  risk: string
): void {
  const { score, label, color } = calculateScore(focus, scale, risk);
  const waLink = buildWhatsAppLink(focus, scale, risk, score);

  ScopingSwal.fire({
    title: 'Diagnostic Complete',
    html: `
      <div class="swal-score-ring" style="border-color:${color}40;box-shadow:0 0 32px ${color}30;">
        <div>
          <div class="swal-score-value" style="color:${color};">${score}</div>
          <div class="swal-score-max">/100</div>
        </div>
      </div>

      <p style="font-size:0.7rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${color};margin-bottom:0.75rem;">
        RISK LEVEL: ${label}
      </p>

      <p style="font-size:0.8125rem;color:rgba(255,255,255,0.5);line-height:1.6;margin-bottom:0.75rem;">
        Based on your inputs, your operational stack carries a <strong style="color:#ffffff;">${label.toLowerCase()} exposure profile</strong>. 
        A tailored infrastructure blueprint can materially reduce this risk.
      </p>

      <div class="swal-result-grid">
        <div class="swal-result-chip"><span>Focus</span>${focus}</div>
        <div class="swal-result-chip"><span>Scale</span>${scale}</div>
        <div class="swal-result-chip"><span>Risk</span>${risk}</div>
      </div>

    `,
    showConfirmButton: true,
    confirmButtonText: 'Generate Final Parameters ↗',
    showCancelButton: false,
    allowOutsideClick: true,
  }).then((res) => {
    if (res.isConfirmed) {
      Swal.fire({
        ...({
          background: '#0F1623',
          color: '#FFFFFF',
          confirmButtonColor: '#06B6D4',
          customClass: { popup: 'swal-scoping-popup', confirmButton: 'swal-scoping-confirm' },
        } as object),
        icon: 'info',
        title: 'Parameters Captured',
        text: 'Your infrastructure parameters are ready. Click below to forward these details directly to our Lead Engineer via WhatsApp to generate your custom blueprint.',
        confirmButtonText: 'Talk to a Lead Engineer ↗',
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(waLink, '_blank', 'noopener,noreferrer');
        }
      });
    }
  });
}

/* ─────────────────────────────────────────────────────────────
   Main exported function
───────────────────────────────────────────────────────────── */
export async function triggerScopingEngine(): Promise<void> {
  injectScopingStyles();

  // Step 1 — Focus
  const focus = await askWithGrid(
    'Step 1 of 3 — Focus Area',
    'What is your primary operational focus?',
    'Select the domain that best describes your core business systems.',
    ['Infrastructure', 'Cybersecurity', 'Software Systems', 'Automation']
  );
  if (!focus) return;

  // Step 2 — Scale
  const scale = await askWithGrid(
    'Step 2 of 3 — Operational Scale',
    'Current scale of operations?',
    'This helps us calibrate the complexity of your recommended architecture.',
    ['1-10 Employees', '10-50', '50-200', '200+']
  );
  if (!scale) return;

  // Step 3 — Risk
  const risk = await askWithGrid(
    'Step 3 of 3 — Risk Profile',
    'Biggest technical risk your business faces?',
    'Be honest — this drives the accuracy of your resilience score.',
    ['Downtime', 'Security Breach', 'Slow Execution', 'Scaling Issues']
  );
  if (!risk) return;

  // Final result
  showDiagnosticResult(focus, scale, risk);
}

/* ─────────────────────────────────────────────────────────────
   React hook wrapper (optional convenience)
───────────────────────────────────────────────────────────── */
export function useScopingEngine() {
  return { triggerScopingEngine };
}

export default useScopingEngine;
