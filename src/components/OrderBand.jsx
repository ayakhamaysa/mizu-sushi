import { restaurant, ui } from "../data/menu";

export default function OrderBand({ lang }) {
  const t = ui[lang];
  const message = lang === "ar" ? "مرحبا، بدي أحجز طاولة بـ MIZU" : "Hi, I'd like to book a table at MIZU";

  return (
    <footer className="texture-dark border-t border-paper/10 text-center">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <p className="font-title font-bold uppercase tracking-[0.25em] text-xl">{t.order}</p>
        <a
          href={`https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(message)}`}
          target="_blank"
          className="block font-title font-bold text-5xl md:text-6xl tracking-[0.08em] mt-3 hover:text-gold transition-colors"
          dir="ltr"
        >
          {restaurant.phone}
        </a>
        <p className="inline-block bg-paper/10 rounded-full px-5 py-1.5 text-sm mt-4" dir="ltr">
          {restaurant[lang].hours}
        </p>
        <p className="text-stone text-sm mt-4">{restaurant[lang].address}</p>
      </div>

      <p className="border-t border-paper/10 py-5 text-xs text-stone">
        {t.madeBy}{" "}
        <a href="https://www.instagram.com/oneclick.ps" target="_blank" className="font-bold text-paper">
          One Click
        </a>
      </p>
    </footer>
  );
}
