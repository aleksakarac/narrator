import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

export function MainContent({ children, className = '' }: MainContentProps) {
  return (
    <main className={`flex-1 overflow-auto ${className}`}>
      <div className="p-6">
        {children}
      </div>
    </main>
  );
}