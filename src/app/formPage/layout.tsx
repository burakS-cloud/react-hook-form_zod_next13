export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3>This is the layout of formPage</h3>
      {children}
    </section>
  );
}
