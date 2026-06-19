export default function Waveform({ className = "", color = "#3b82f6" }) {
  const bars = [
    14, 22, 30, 18, 38, 26, 44, 30, 50, 34, 46, 28, 8, 6, 8, 32, 44, 28, 38,
    20, 30, 16, 24, 14,
  ];
  return (
    <svg
      viewBox="0 0 480 60"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 20}
          y={30 - h / 2}
          width="6"
          height={h}
          rx="3"
          fill={color}
          opacity={0.45 + (h / 50) * 0.55}
        />
      ))}
    </svg>
  );
}
