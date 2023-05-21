import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

// Панель в верхней части окна, отображается на каждой странице приложения
function Header() {
  const navButtons = [
    {
      title: 'Main',
      link: '/'
    },
    {
      title: 'Table',
      link: '/table'
    },
  ];

  return (
    <header className="header">
      <Navigation buttons={navButtons} />
      <Link to="/" className="header__title">Transactions</Link>
    </header>
  );
}

export default Header;
