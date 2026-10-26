import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PAGE_META } from "@/lib/constants";
import ContactClient from "./ContactClient";

export const metadata: Metadata = pageMetadata({
  title: PAGE_META.contact.title,
  description: PAGE_META.contact.description,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
