import { notFound } from "next/navigation";
import { CategoryPageTemplate } from "@/components/content-pages";
import { getCategory, categories, buildMetadata } from "@/lib/content";

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return buildMetadata(category, `/categories/${slug}`);
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  return <CategoryPageTemplate category={category} />;
}
