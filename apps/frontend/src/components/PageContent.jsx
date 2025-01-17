import PropTypes from 'prop-types';

export default function PageContent({ title, children }) {
  return (
    <div className='content'>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

PageContent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
