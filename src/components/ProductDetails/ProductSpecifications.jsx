import { FiSliders, FiCpu, FiThermometer, FiWind, FiBox, FiLayers } from 'react-icons/fi'

export default function ProductSpecifications({
  techSpecs = [],
  materials = '',
  operatingPressure = '',
  operatingTemperature = '',
  sizesModels = []
}) {
  return (
    <div className="space-y-8">
      {/* Technical Specifications Table */}
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <div className="border-b border-line bg-surface-light px-6 py-4 flex items-center gap-2">
          <FiSliders className="text-primary" size={20} />
          <h3 className="font-display text-lg font-semibold text-ink">Technical Specifications</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-accent/40 font-mono-tag text-xs uppercase tracking-wider text-primary">
                <th className="px-6 py-3.5 font-semibold">Parameter / Feature</th>
                <th className="px-6 py-3.5 font-semibold">Specification Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {techSpecs.map((spec, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors hover:bg-accent/20 ${idx % 2 === 0 ? 'bg-white' : 'bg-surface-light/50'
                    }`}
                >
                  <td className="px-6 py-4 font-semibold text-ink sm:w-1/3">
                    {spec.label || spec.parameter || `Spec #${idx + 1}`}
                  </td>
                  <td className="px-6 py-4 text-ink/80 font-mono-tag text-xs sm:text-sm">
                    {spec.value || spec.specification || spec}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
