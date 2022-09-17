export default function AppHeader({
  className,
  pageTitle,
}: {
  className?: string;
  pageTitle: string;
}) {
  return (
    <div className={`flex justify-between p-4 shadow-md w-full ${className}`}>
      <div>{pageTitle}</div>
      <div>User32</div>
    </div>
  );
}
