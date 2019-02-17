import React from 'react';

export default function Spinner({ inverse, className }) {
  return (
    <div className={`spinner ${inverse ? 'inverse' : ''} ${className || ''}`}>
      <div className="dot1" />
      <div className="dot2" />
    </div>
  );
}
