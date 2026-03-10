import { notFound } from "next/navigation";
import { ItemPageTemplate } from "@/components/content-pages";
import { getItem, items, buildMetadata } from "@/lib/content";

export async function generateStaticParams() {
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getItem(params.slug);
  if (!item) return {};
  return buildMetadata(item, `/items/${params.slug}`);
}

export default function ItemPage({ params }: { params: { slug: string } }) {
  const item = getItem(params.slug);
  if (!item) notFound();
  return <ItemPageTemplate item={item} />;
}
