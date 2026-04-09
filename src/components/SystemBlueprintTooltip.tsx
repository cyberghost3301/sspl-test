import React, { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";

interface SystemBlueprintTooltipProps {
  children: React.ReactNode;
  title: string;
  specs: string[];
}

export default function SystemBlueprintTooltip({
  children,
  title,
  specs,
}: SystemBlueprintTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    whileElementsMounted: autoUpdate,
    middleware: [offset(15), flip(), shift({ padding: 8 })],
  });

  const hover = useHover(context);
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className="relative w-full h-full flex flex-col cursor-crosshair"
      >
        {children}
      </div>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-[99999] bg-[#0A0F1A]/95 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] rounded-lg p-4 min-w-[240px]"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
                {title}
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {specs.map((spec, index) => (
                <li
                  key={index}
                  className="text-[11px] text-gray-300 font-mono tracking-wide flex items-start gap-2 before:content-['>'] before:text-cyan-500/50 before:mt-[1px]"
                >
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
