import { motion } from "framer-motion";
import { restaurant, ui } from "../data/menu";

export default function Header({ lang, onToggle }) {
  const t = ui[lang];

  return (
    <header className="texture-dark relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 pt-6 pb-16 md:pb-20">
        {/* Top bar: badge and language button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/koi.png" alt="" width="48" height="48" className="w-12 h-12" />
            <span className="font-title tracking-[0.3em] text-lg" dir="ltr">
              {restaurant.name}
            </span>
          </div>
          <button onClick={onToggle} className="border border-paper/30 rounded-full px-5 py-2 text-sm hover:border-gold hover:text-gold transition-colors">
            {t.switchTo}
          </button>
        </div>

        {/* The big MENU title */}
        {/* Only a small slide (no fade), so the big title shows right away */}
        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mt-14"
        >
          {/* The koi from the logo, above the title */}
          <img src="/koi.png" alt="MIZU logo" width="256" height="256" className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-2" />
          <h1 className="font-title font-bold text-[5.5rem] md:text-[9rem] leading-none tracking-[0.06em]" dir="ltr">
            MENU
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="h-px w-12 md:w-24 bg-paper/40" />
            <p className="font-title tracking-[0.3em] text-xs md:text-sm uppercase">{t.services.join(" · ")}</p>
            <span className="h-px w-12 md:w-24 bg-paper/40" />
          </div>
          <p className="text-stone mt-4">{restaurant[lang].tagline}</p>
        </motion.div>
      </div>
    </header>
  );
}
