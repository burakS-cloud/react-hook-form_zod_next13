export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>;
}

type Category = {
  id: number;
  description: string;
  name: string;
};

// TARİF DETAY SAYFASI BUNU KULLANICAK,
//YARN BUILD YAPTIĞIMIZDA SADECE STATIC DEĞİL, SSG YAZICAK
// İÇİ DOLU DAİRE YANİ.
export async function generateStaticParams() {
  const categories = await fetch(
    "https://northwind.vercel.app/api/categories"
  ).then((res) => res.json());

  return categories.map((category: Category) => ({
    slug: category.id.toString(),
  }));
}
