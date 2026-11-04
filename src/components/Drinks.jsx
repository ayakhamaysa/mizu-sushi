import { section } from "../data/menu";
import Price from "./Price";
import DishPhoto from "./DishPhoto";

export default function Drinks({ lang }) {
  const drinks = section("drinks");
  return (
    <section className="texture-dark border-t border-paper/10">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-title font-bold text-3xl uppercase tracking-[0.06em]">{lang === "ar" ? drinks.titleAr : drinks.title}</h2>
          <DishPhoto src={drinks.image} alt={drinks.title} size="w-24 h-24 md:w-32 md:h-32" />
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 mt-6">
          {drinks.items.map((item) => (
            <li key={item.name} className="flex items-baseline gap-3 border-b border-paper/10 pb-3">
              <span>{lang === "ar" ? item.name : item.nameEn}</span>
              <span className="flex-1" />
              <Price value={item.price} lang={lang} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
