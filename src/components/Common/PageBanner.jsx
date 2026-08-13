import Breadcrumb from './Breadcrumb'

export default function PageBanner({ eyebrow, title, description, trail }) {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-white sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 64px), repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 64px)',
        }}
      />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="container-xl relative">
        {trail && (
          <div className="mb-5">
            {/* <Breadcrumb trail={trail} /> */}
          </div>
        )}
        {eyebrow && <p className="eyebrow mb-3 text-accent">{eyebrow}</p>}
        <h1 className="max-w-2xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl">{title}</h1>
        {/* {description && <p className="mt-4 max-w-xl text-white/85">{description}</p>} */}
      </div>
    </section>
  )
}
