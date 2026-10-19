import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | V.V Properties",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#0B1F3A]">
      {children}
    </div>
  );
}
