"use client";

import React from "react";
import { Mail, MessagesSquare, FolderKanban, Cloud, FileSpreadsheet, Database, Network, Zap } from "lucide-react";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";

const orbits = [
  {
    size: "w-110 h-110 md:w-180 md:h-180",
    duration: 18,
    icons: [
      { Icon: Mail, alt: "Outlook", angle: -60, color: "text-sky-400" },
      { Icon: MessagesSquare, alt: "Teams", angle: 0, color: "text-violet-400" },
      { Icon: FolderKanban, alt: "SharePoint", angle: 60, color: "text-teal-400" },
    ],
  },
  {
    size: "w-150 h-150 md:w-220 md:h-220",
    duration: 24,
    icons: [
      { Icon: Cloud, alt: "OneDrive", angle: 0, color: "text-blue-400" },
      { Icon: FileSpreadsheet, alt: "Hojas de cálculo", angle: -90, color: "text-emerald-400" },
    ],
  },
  {
    size: "w-180 h-180 md:w-265 md:h-265",
    duration: 30,
    icons: [
      { Icon: Database, alt: "Datos centralizados", angle: -60, color: "text-indigo-400" },
      { Icon: Network, alt: "Conectividad", angle: 0, color: "text-blue-300" },
      { Icon: Zap, alt: "Rendimiento", angle: 60, color: "text-amber-300" },
    ],
  },
];

export default function OrbitingCirclesGlobeDemo() {
  return (
    <div aria-hidden="true" className="relative w-full h-110 md:h-160 overflow-hidden flex justify-center">
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)) }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) - 360deg)) }
        }
        @keyframes counter-cw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) }
        }
        @keyframes counter-ccw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) }
        }
      `}</style>

      {/* Center particle globe: represents Collectionat as the unifying hub */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 aspect-square pointer-events-none w-75 md:w-145 z-10">
        <ParticleSphereAnimation />
      </div>

      {/* Orbiting rings: the tools and data Collectionat centralizes */}
      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        const allIcons = [
          ...orbit.icons,
          ...orbit.icons.map((ic) => ({
            ...ic,
            angle: ic.angle + 180,
            alt: `${ic.alt}-mirror`,
          })),
        ];

        return (
          <div
            key={index}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-border ${orbit.size}`}
          >
            {allIcons.map((iconData, iconIndex) => (
              <div
                key={iconIndex}
                className="absolute top-0 left-1/2 h-1/2 -ml-8 origin-bottom flex flex-col justify-start items-center"
                style={
                  {
                    "--start-angle": `${iconData.angle}deg`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="p-3 sm:p-4 border border-border rounded-full bg-background -mt-8 relative z-10"
                  style={
                    {
                      "--counter-offset": `${-iconData.angle}deg`,
                      animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                >
                  <iconData.Icon aria-label={iconData.alt} className={`w-6 h-6 md:w-8 md:h-8 ${iconData.color}`} />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
