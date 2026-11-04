import { motion } from "framer-motion";
import { categories, ui } from "../data/menu";
import DishPhoto from "./DishPhoto";
import Price from "./Price";

// All dishes marked chefPick: true in menu.js
const picks = categories.flatMap((c) => c.items.filter((item) => item.chefPick).map((item) => ({ item, sectionImage: c.image })));

export default function Featured({ lang }) {
  return (
    <section className="texture-light">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <h2 className="font-title font-bold text-center text-2xl uppercase tracking-[0.2em]">{ui[lang].featured}</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mt-10">
          {picks.map(({ item, sectionImage }, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <DishPhoto src={item.image || sectionImage} alt={item.nameEn} size="w-32 h-32 md:w-40 md:h-40 mx-auto" />
              <h3 className="font-title font-bold text-lg mt-4">{lang === "ar" ? item.name : item.nameEn}</h3>
              <p className="text-sm text-ink/60 mt-1 leading-relaxed">{lang === "ar" ? item.description : item.descriptionEn}</p>
              <div className="h-px w-12 bg-ink/20 mx-auto mt-3" />
              <Price value={item.price} lang={lang} className="!text-shu text-lg mt-2 inline-block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
