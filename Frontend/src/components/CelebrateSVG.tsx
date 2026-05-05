export default function CelebrateSVG() {
  return (
    <svg viewBox="0 0 200 200" className="celebrate-svg">
      {/* 🎆 radial burst */}
      <g className="burst">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <line
              key={i}
              x1="100"
              y1="100"
              x2="100"
              y2="40"
              className="burst-line"
              transform={`rotate(${angle} 100 100)`}
            />
          );
        })}
      </g>

      {/* 🎉 confetti */}
      <g>
        {[...Array(10)].map((_, i) => {
          const angle = (i * 360) / 10;
          return (
            <circle
              key={i}
              cx="100"
              cy="100"
              r="5"
              className="confetti"
              style={{
                transform: `rotate(${angle}deg) translateY(-60px)`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          );
        })}
      </g>

      {/* 💥 center pop */}
      <circle cx="100" cy="100" r="10" className="pop" />
    </svg>
  );
}