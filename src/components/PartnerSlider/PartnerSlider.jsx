export default function PartnerSlider({ items }) {
  const half = Math.ceil(items.length / 2)
  const row1Items = items.slice(0, half)
  const row2Items = items.slice(half)

  const track1 = [...row1Items, ...row1Items, ...row1Items]
  const track2 = [...row2Items, ...row2Items, ...row2Items]

  return (
    <div className="flex flex-col gap-6 sm:gap-4 overflow-hidden py-2">
      {/* Row 1: Moves Left */}
      <div className="overflow-hidden">
        <div className="marquee-track flex items-center">
          {track1.map((item, i) => (
            <div
              key={`row1-${item.name}-${i}`}
              className="mx-2 sm:mx-3 flex h-16 w-36 sm:h-20 sm:w-44 shrink-0 items-center justify-center rounded-xl border border-line bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/40"
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.name || 'Partner logo'}
                  loading="lazy"
                  className="max-h-11 sm:max-h-14 max-w-full object-contain transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <span className="text-center font-display text-xs sm:text-sm font-semibold text-ink/70">{item.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Moves Right (Opposite Direction) */}
      <div className="overflow-hidden">
        <div className="marquee-track marquee-reverse flex items-center">
          {track2.map((item, i) => (
            <div
              key={`row2-${item.name}-${i}`}
              className="mx-2 sm:mx-3 flex h-16 w-36 sm:h-20 sm:w-44 shrink-0 items-center justify-center rounded-xl border border-line bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/40"
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.name || 'Partner logo'}
                  loading="lazy"
                  className="max-h-11 sm:max-h-14 max-w-full object-contain transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <span className="text-center font-display text-xs sm:text-sm font-semibold text-ink/70">{item.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
