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
  size = 'md',
  ...props 
}: BentoCardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border backdrop-blur-sm',
        'transition-all duration-500 hover:shadow-2xl hover:-translate-y-2',
        'border-border/50 hover:border-primary/30',
        'bg-card/50 hover:bg-card/70',
        'p-6',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}