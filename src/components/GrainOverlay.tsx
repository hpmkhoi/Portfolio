import React from 'react';

const GrainOverlay: React.FC = () => {
  return (
    <>
      {/* Dynamic Animated Grain Overlay */}
      <div className="grain-overlay pointer-events-none" aria-hidden="true" />

      {/* Ambient Lighting Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div
          className="absolute -top-[15%] -right-[10%] w-[550px] h-[550px] rounded-full blur-[140px] opacity-25"
          style={{ background: 'radial-gradient(circle, #DFC9A6 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[650px] h-[650px] rounded-full blur-[160px] opacity-40"
          style={{ background: 'radial-gradient(circle, #31241A 0%, #523622 50%, transparent 75%)' }}
        />
        <div
          className="absolute top-[40%] left-[25%] w-[450px] h-[450px] rounded-full blur-[150px] opacity-15"
          style={{ background: 'radial-gradient(circle, #7A181D 0%, transparent 70%)' }}
        />
      </div>
    </>
  );
};

export default GrainOverlay;
