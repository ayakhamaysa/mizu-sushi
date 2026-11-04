// A photo in a circle with a thin gold ring, like a plate
export default function DishPhoto({ src, alt = "", size = "w-24 h-24" }) {
  return (
    <div className={`${size} shrink-0 rounded-full p-1 ring-1 ring-gold/50 bg-coal`}>
      <img src={src} alt={alt} loading="lazy" width="340" height="340" className="w-full h-full rounded-full object-cover" />
    </div>
  );
}
