import { MotionConfig } from "framer-motion";
import { useLanguage } from "./useLanguage";
import Header from "./components/Header";
import Featured from "./components/Featured";
import Panels from "./components/Panels";
import Drinks from "./components/Drinks";
import OrderBand from "./components/OrderBand";
import Assistant from "./components/Assistant";

export default function App() {
  const { lang, toggle } = useLanguage();

  return (
    // reducedMotion="user": no animations for visitors who turned motion off
    <MotionConfig reducedMotion="user">
      <Header lang={lang} onToggle={toggle} />
      <Featured lang={lang} />

      <main>
        {/* Each row: dark side with photos + light side with price lists */}
        <Panels photos="rolls" lists={["nigiri", "sashimi", "starters"]} lang={lang} />
        <Panels photos="bowls" lists={["boxes", "desserts"]} flip lang={lang} />
      </main>

      <Drinks lang={lang} />
      <OrderBand lang={lang} />
      {/* key={lang}: switching the language starts a fresh chat in that language */}
      <Assistant key={lang} lang={lang} />
    </MotionConfig>
  );
}
