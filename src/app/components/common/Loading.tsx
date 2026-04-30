import React from 'react';

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "로딩중..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-xl font-bold text-gray-600">{message}</p>
    </div>
  );
}