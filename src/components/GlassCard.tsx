'use client';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle';
  onClick?: () => void;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  onClick,
  hover = false,
}: GlassCardProps) {
  const variants = {
    default: 'glass-card',
    strong: 'glass-strong',
    subtle: 'glass-subtle',
  };

  return (
    <div
      className={`${variants[variant]} p-6 ${
        hover
          ? 'transition-all duration-200 hover:bg-[rgba(250,244,236,0.7)] hover:shadow-glass-md cursor-pointer'
          : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
