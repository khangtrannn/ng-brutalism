const MARKER_SVG = `
  <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="ms" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.3"/>
      </filter>
    </defs>
    <g filter="url(#ms)">
      <circle cx="18" cy="18" r="14" fill="#FFD700" stroke="#000000" stroke-width="2"/>
      <circle cx="18" cy="18" r="6" fill="#000000"/>
    </g>
  </svg>
`;

export const PORTFOLIO_JOURNEY_MARKER_URL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  MARKER_SVG
)}`;
