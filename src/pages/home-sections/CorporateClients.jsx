import { clients } from '../../data/clients'

export default function CorporateClients() {
  return (
    <section className="section-py bg-primary relative overflow-hidden">
      {/* Background ambient glow accents */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="container-xl relative z-10 text-center" data-aos="fade-up">

        <h2 className="mt-2 font-display text-xl sm:text-3xl font-bold text-white">
          Our Collaborative Partners
        </h2>

        {/* Centered Logo Cards Grid - Single line on mobile */}
        <div className="mt-6 sm:mt-8 flex flex-row items-center justify-center gap-3 sm:gap-10">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group flex h-16 sm:h-24 w-1/2 max-w-[170px] sm:max-w-none sm:w-72 items-center justify-center rounded-xl sm:rounded-2xl bg-white px-3 sm:px-6 py-2 sm:py-4 shadow-xl border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-9 sm:max-h-14 max-w-[130px] sm:max-w-[200px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
