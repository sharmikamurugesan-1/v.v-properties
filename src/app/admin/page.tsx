'use client';

import React, { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace('/index.html');
    }
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen z-[999999] bg-white overflow-hidden">
      <iframe
        src="/index.html"
        className="w-full h-full border-none outline-none"
        title="V.V Properties Executive Portal"
      />
    </div>
  );
}
