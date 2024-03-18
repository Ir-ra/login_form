import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export default function Logo() {
  return (
    <div className='logo'>
      <NavLink to='/'>
        <img src={logo} alt="logo Qencode" />
      </NavLink>
    </div>
  )
}
