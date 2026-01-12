
import React from 'react';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  color?: 'black' | 'white' | 'gray';
}

export const LoadingSpinner: React.FC<Props> = ({ size = 'md', color = 'black' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-[3px]'
  };

  const colorClasses = {
    black: 'border-black border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-300 border-t-transparent'
  };

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`} />
  );
};
