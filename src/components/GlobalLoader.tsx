import React from 'react';

export default function GlobalLoader() {
  return (
    <div
      className="flex items-center justify-center m-0 p-0"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: '#0f172a'
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1540.02 2549.12"
        className="w-24 md:w-32 h-auto spirecrest-logo-trace drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]"
      >
        <g>
          <path
            fill="none"
            stroke="#06b6d4"
            strokeWidth="35"
            strokeMiterlimit="2.61313"
            d="M771.87 2546.64l-768.4 -751.98 0 -332.81 201.65 200.26 2.12 51.14 0 0 565.29 549.96m-2.5 280.55l766.52 -773.2 0 -454.79m0 0l-1.01 -452.2m1.11 -2.06l-201.74 206.19 -2.13 621.46 -562.76 571.63"
          />
          <polygon
            fill="none"
            stroke="#06b6d4"
            strokeWidth="35"
            strokeMiterlimit="2.61313"
            points="219.59,1167.8 470.76,1418.98 319.76,1569.98 3.47,1253.69 3.47,810.1 657.67,155.91 808.67,4.91 959.66,155.91 1347.04,543.29 1498.04,694.29 1347.04,845.29 1066.94,1125.37 915.95,974.37 826.28,884.7 677.36,1033.63 1213.89,1570.17 1062.89,1721.17 810.68,1971.32 810.68,1971.32 765.89,2016.1 415.24,1665.44 566.24,1514.45 766.93,1715.14 911.89,1570.17 375.36,1033.63 526.36,882.63 675.28,733.71 826.28,582.71 944.54,700.96 1066.94,823.37 1196.04,694.29 808.67,306.91 219.59,895.99"
          />
        </g>
      </svg>
    </div>
  );
}