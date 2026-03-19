import { notFound } from "next/navigation";
import { ItemPageTemplate } from "@/components/content-pages";
import { getItem, items, buildMetadata } from "@/lib/content";

export async function generateStaticParams() {
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) return {};
  return buildMetadata(item, `/items/${slug}`);
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) notFound();
  return <ItemPageTemplate item={item} />;
}
