export default function PageContent({ title, children }) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
