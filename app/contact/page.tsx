import type { Metadata } from "next";
import { PAGE_META } from "@/lib/constants";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: PAGE_META.contact.title,
  description: PAGE_META.contact.description,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
