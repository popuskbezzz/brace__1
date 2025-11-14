import { ProductGrid } from '@/widgets/catalog/ProductGrid';

export const CatalogPage = () => (
  <section className="space-y-4">
    <header className="space-y-1">
      <p className="text-sm text-slate-300 uppercase tracking-[0.3em]">Каталог</p>
      <h1 className="text-3xl font-semibold">Выбери свою модель</h1>
    </header>
    <ProductGrid />
  </section>
);
