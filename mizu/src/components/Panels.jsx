import { motion } from "framer-motion";
import { section, tags } from "../data/menu";
import DishPhoto from "./DishPhoto";
import Price from "./Price";

function Title({ category, lang }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        <h2 className="font-title font-bold text-3xl uppercase tracking-[0.06em]">{lang === "ar" ? category.titleAr : category.title}</h2>
        {(category.note || category.noteAr) && <p className="text-sm opacity-60 mt-1">{lang === "ar" ? category.noteAr : category.note}</p>}
      </div>
      {/* Photo that shows what kind of food this section is */}
      <DishPhoto src={category.image} alt={category.title} size="w-24 h-24 md:w-32 md:h-32" />
    </div>
  );
}

function Tags({ item, lang }) {
  return (
    <p className="flex flex-wrap gap-3 text-xs opacity-70 mt-1.5">
      {item.tags.map((t) => (
        <span key={t}>
          {tags[t].icon} {tags[t][lang]}
        </span>
      ))}
    </p>
  );
}

// Dark side: dishes with round photos
function PhotoList({ id, lang }) {
  const category = section(id);
  return (
    <div className="texture-dark h-full px-6 md:px-10 py-12">
      <Title category={category} lang={lang} />
      <ul className="space-y-7">
        {category.items.map((item) => (
          <li key={item.name} className="flex items-center gap-5">
            <div className="flex-1 border-b border-paper/15 pb-4">
              <h3 className="font-title font-bold text-lg">{lang === "ar" ? item.name : item.nameEn}</h3>
              <p className="text-sm text-stone leading-relaxed">{lang === "ar" ? item.description : item.descriptionEn}</p>
              <Tags item={item} lang={lang} />
              <Price value={item.price} lang={lang} className="text-lg mt-2 inline-block" />
            </div>
            <DishPhoto src={item.image || category.image} alt={item.nameEn} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Light side: price lists without photos
function PriceLists({ ids, lang }) {
  return (
    <div className="texture-light px-6 md:px-10 py-12 space-y-12">
      {ids.map((id) => {
        const category = section(id);
        return (
          <div key={id}>
            <Title category={category} lang={lang} />
            <ul className="space-y-4">
              {category.items.map((item) => (
                <li key={item.name}>
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-title font-bold">{lang === "ar" ? item.name : item.nameEn}</h3>
                    <span className="flex-1 border-b border-dotted border-ink/25" />
                    <Price value={item.price} lang={lang} className="!text-shu" />
                  </div>
                  {item.description && <p className="text-sm text-ink/60">{lang === "ar" ? item.description : item.descriptionEn}</p>}
                  <Tags item={item} lang={lang} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

// One row of the menu: a dark photo side and a light list side.
// flip: true puts the dark side on the other end, so rows alternate.
export default function Panels({ photos, lists, flip, lang }) {
  return (
    <motion.section
      id={photos}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="grid lg:grid-cols-2"
    >
      <div className={flip ? "lg:order-2" : ""}>
        <PhotoList id={photos} lang={lang} />
      </div>
      <PriceLists ids={lists} lang={lang} />
    </motion.section>
  );
}
