export default function AppHeader({
  className,
  pageTitle,
}: {
  className?: string;
  pageTitle: string;
}) {
  return (
    <div className={`flex justify-between p-4 px-6 shadow-md w-full aa ${className}`}>
      <div className="text-3xl font-semibold font-serif">{pageTitle}</div>
      <div className="text-xl">User32</div>
    </div>
  );
}
