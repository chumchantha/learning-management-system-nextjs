import Navbar from "@/app/(public)/_components/Navbar";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default PublicLayout;
