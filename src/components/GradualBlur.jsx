export default function GradualBlur() {
  return (
    <div 
      className="pointer-events-none fixed bottom-0 left-0 z-40 w-full h-24 md:h-28"
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 80%, black 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 80%, black 100%)',
        background: 'linear-gradient(to bottom, transparent 0%, rgba(10, 10, 10, 0.4) 100%)'
      }}
    />
  );
}
