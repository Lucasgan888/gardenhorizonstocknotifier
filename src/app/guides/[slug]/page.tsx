import { notFound } from "next/navigation";
import { GuidePageTemplate } from "@/components/content-pages";
import { getGuide, guides, buildMetadata } from "@/lib/content";

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return buildMetadata(guide, `/guides/${slug}`);
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return <GuidePageTemplate guide={guide} />;
}
