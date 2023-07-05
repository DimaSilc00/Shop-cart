import { AnimatePresence, motion } from 'framer-motion';
import { enablePageScroll } from 'scroll-lock';
import { RiArrowRightLine } from 'react-icons/ri';
import { CartGame, Game } from '../types/Game.types';
import Transition from './Transition';
import CartItem from './CartItem';
import Button from './Button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
//import { Item } from 'framer-motion/types/components/Reorder/Item';

interface Props {
  cartItems: CartGame[],
  setIsCartOpen: (isCartOpen: boolean) => void,
  removeFromCart: (ids: number[]) => void,
  setCartItems: (cartItems: CartGame[]) => void,
  addToCart: (game: Game) => void
}

function Cart(props: Props) {
  const { t } = useTranslation();
  const {
    cartItems,
    setIsCartOpen,
    removeFromCart,
    addToCart,
  } = props;
  const clearCart = () => {
    removeFromCart(cartItems.map(item => item.id));
    clearTotalPrice();
  };
  const closeCart = () => {
    setIsCartOpen(false);
    enablePageScroll();
  };
  let gamesCount;
  if (cartItems.length > 1) {
    gamesCount = `${cartItems.length} ${t('game')}`;
  } else if (cartItems.length === 1) {
    gamesCount = '1 ' +  t('game');
  } else {
    gamesCount = t('nogames');
  }

  const price = +cartItems.reduce((acc, {price, count }) => acc + price * count, 0).toFixed(2);

  const [totalPrice, setTotalPrice] = useState(price || 0);

  function handleMinus(price:number){
  setTotalPrice (prevState => prevState - price);
  }  

  function handlePluse(price:number){
    setTotalPrice (prevState => prevState + price);
    }  

  function clearTotalPrice(){
    setTotalPrice(0);
  }

  return (
    <>
      <Transition className="Background">
        <div onClick={closeCart} />
      </Transition>
      <motion.div
        className="CartModal"
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0, x: '100%',
          transition: { duration: 0.25 },
        }}
        transition={{
          type: 'spring',
          duration: 0.5,
        }}
      >
        <div className="CartHeader">
          <h3>{gamesCount}</h3>
          {cartItems.length > 0 && (
            <Button handleClick={clearCart}>{t('clear')}</Button>
          )}
        </div>
        <div className="Items">
          <AnimatePresence>
            {cartItems.map((game) => (
              <CartItem
                key={`cart-${game.id}`}
                game={game}
                closeCart={closeCart}
                removeFromCart={removeFromCart} 
                cartItems={cartItems}
                addToCart={addToCart}
                handleMinus={handleMinus}
                handlePluse={handlePluse}
                clearTotalPrice={clearTotalPrice}
                />
            ))}
          </AnimatePresence>
        </div>
        <div className="Checkout">
          <div>{t('total')}: ${+totalPrice.toFixed(2)}</div>
          <Button> {t('checkout')} <RiArrowRightLine /></Button>
        </div>
      </motion.div>
    </>
  );
}

export default Cart;
