import Logos from './Logos';

const Logo = ({ id, team }) => {
  const logo = Logos.filter((logo) => logo.id === id).pop();
  return <img src={logo.src} alt={team} className='logo' />;
};

export default Logo;
