import { restaurant } from "../data/menu";

// A price with the currency of the chosen language (د.إ / AED)
export default function Price({ value, lang, className = "" }) {
  return (
    <span className={`font-title font-medium text-gold whitespace-nowrap ${className}`}>
      {value} {restaurant[lang].currency}
    </span>
  );
}
