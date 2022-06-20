import FilterPlays from 'common/search/FilterPlays';
import SearchPlays from 'common/search/SearchPlays';
import HeaderNav from './HeaderNav';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

const Header = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const [showHideBits, setShowHideBits] = useState({
    showSearch: true,
    showBrowse: false,
    setHeaderStyle: true
  });

  useEffect(() => {
    if (pathName === '/') {
      setShowHideBits({
        ...showHideBits,
        showSearch: false,
        showBrowse: true,
        setHeaderStyle: false
      });
    } else if (pathName === '/ideas') {
      setShowHideBits({
        ...showHideBits,
        showSearch: false,
        showBrowse: true,
        setHeaderStyle: true
      });
    } else {
      setShowHideBits({
        ...showHideBits,
        showSearch: true,
        showBrowse: false,
        setHeaderStyle: true
      });
    }
  }, [pathName]);

  return (
    <header className={showHideBits.setHeaderStyle ? 'app-header' : 'app-header app-header-home'}>
      <span>
        <Link to="/" className="app-logo">
          <span className="sr-only">React Play</span>
        </Link>
      </span>
      <div className="app-header-search">
        {showHideBits.showSearch && (
          <>
            <SearchPlays />
            <FilterPlays />
          </>
        )}
      </div>
      <HeaderNav showBrowse={showHideBits.showBrowse} />
    </header>
  );
};

export default Header;
