import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'col-span-1 row-span-1',
  md: 'col-span-2 row-span-1', 
  lg: 'col-span-2 row-span-2',
  xl: 'col-span-3 row-span-2'
};

export default function BentoCard({ 
  children, 
  className, 
  size = 'md' 
}: BentoCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border bg-card p-6',
        'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        'border-border/50 hover:border-border',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}