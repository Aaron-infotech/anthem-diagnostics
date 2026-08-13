export default function ClientSlider({ items }) {
  const track = [...items, ...items]

  return (
    <div className="overflow-hidden py-2">
      <div className="marquee-track" style={{ animationDirection: 'reverse', animationDuration: '34s' }}>
        {track.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="mx-3.5 flex h-20 w-48 shrink-0 items-center justify-center rounded-2xl bg-white px-4 py-3 shadow-md border border-white/20 transition-all hover:scale-105"
          >
            {item.logo ? (
              <img
                src={item.logo}
                alt={item.name}
                className="max-h-12 max-w-[140px] w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none'
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'block'
                  }
                }}
              />
            ) : null}
            <span
              className="font-display text-xs font-semibold text-ink/80"
              style={{ display: item.logo ? 'none' : 'block' }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
