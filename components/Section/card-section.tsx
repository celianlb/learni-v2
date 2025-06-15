export default function CardSection({
  children,
  className,
  ref,
}: {
  children: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
}) {
  return (
    <section
      className={`p-6 lg:p-16 relative z-10 bg-white rounded-3xl md:rounded-[42px] shadow-[inset_0px_0px_6px_0px_rgba(18,10,78,0.2)] outline-offset-[-2px] ${className}`}
      ref={ref}
    >
      {children}
    </section>
  );
}
