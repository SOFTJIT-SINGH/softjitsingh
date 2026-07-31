import type { Metadata } from "next";
import { PAGE_META } from "@/lib/constants";
import About from "@/app/components/about";

export const metadata: Metadata = {
  title: PAGE_META.about.title,
  description: PAGE_META.about.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <About />;
}
