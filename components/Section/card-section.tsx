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
      className={`p-6 lg:p-16 relative z-10 border-[1px] border-blue-900 bg-white rounded-3xl md:rounded-[32px] shadow-[0px_0px_6px_0px_rgba(18,10,78,0.2)]  ${className}`}
      ref={ref}
    >
      {children}
    </section>
  );
}
