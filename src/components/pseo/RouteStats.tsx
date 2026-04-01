import type { Location } from '@/data/locations'

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 border border-white/10">
      <p className="font-body text-xs text-silver/40 uppercase tracking-wider mb-2">{label}</p>
      <p className="font-display text-xl text-cream font-medium">{value}</p>
    </div>
  )
}

export function RouteStats({ location }: { location: Location }) {
  return (
    <section className="bg-navy section-padding py-16">
      <p className="label-sm mb-8">Your Route at a Glance</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Distance to Logan" value={`${location.distanceToLogan} miles`} />
        <StatCard label="Estimated Drive Time" value={location.driveTimeToLogan} />
        <StatCard label="Complimentary Wait" value="60 minutes" />
        <StatCard label="Flight Tracking" value="Real-time, included" />
      </div>

      {(location.distanceToMHT || location.distanceToPVD) && (
        <div className="space-y-2 font-body text-sm text-silver/60">
          {location.distanceToMHT && (
            <p>
              Also serving Manchester-Boston Regional Airport (MHT) from {location.name} —
              approximately {location.driveTimeToMHT} drive.
            </p>
          )}
          {location.distanceToPVD && (
            <p>
              T.F. Green Airport (PVD) in Warwick, RI is also an option from {location.name} —
              approximately {location.driveTimeToPVD} drive.
            </p>
          )}
        </div>
      )}
    </section>
  )
}
