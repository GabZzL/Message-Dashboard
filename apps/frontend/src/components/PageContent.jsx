export default function PageContent({ title, children }) {
  return (
    <div className='content'>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
