export default function LoadingSpinner() {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-accent border-t-primary" />
      </div>
    </div>
  )
}
