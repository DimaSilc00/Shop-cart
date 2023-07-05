import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Headroom from 'react-headroom';
import {
  addScrollableSelector,
  disablePageScroll,
} from 'scroll-lock';
import {
  RiReactjsLine,
  RiShoppingBag2Line,
} from 'react-icons/ri';
import SearchBar from './SearchBar';
import Transition from './Transition';
import Button from './Button';
import { Game } from '../types/Game.types';
import { useTranslation } from 'react-i18next';

interface Props {
  cartItems: Game[],
  setIsCartOpen: (isCartOpen: boolean) => void,
}

function Header(props: Props) {
  const { cartItems, setIsCartOpen } = props;
  const navigate = useNavigate();
  const navigateToHome = () => navigate('/');
  const openCart = () => {
    setIsCartOpen(true);
    addScrollableSelector('.Items');
    disablePageScroll();
  };

  const { t, i18n } = useTranslation();

  const  onClickLanguageChange = (e:any) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
  };

  return (
    <Headroom upTolerance={1}>
      <Transition
        className="Header"
        direction="down"
        distance={20}
      >
        <Button
          className="Logo"
          handleClick={navigateToHome}
        >
          <RiReactjsLine /> GameStore
        </Button>
        
        <SearchBar />
        <div className = "box">
          <select className="select-box" style={{width:200}} onClick={onClickLanguageChange}>
            <option value="en"> English</option>
            <option value="ru"> Русский </option>
          </select>
        </div>
        <Button
          className="Cart"
          handleClick={openCart}
        >
          <RiShoppingBag2Line />
          {t('cart')}
          <div>{cartItems.length}</div>
        </Button>
      </Transition>
    </Headroom>
  );
}

export default memo(Header);
