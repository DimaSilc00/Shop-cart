import { useNavigate } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import Transition from './Transition';
import Button from './Button';
import { CartGame, Game } from '../types/Game.types';
import { useState } from 'react';

interface Props {
  game: CartGame,
  cartItems : CartGame[],
  closeCart: () => void,
  removeFromCart: (ids: number[]) => void,
  addToCart: (game: Game) => void
  handleMinus: (price:number) => void
  handlePluse: (price:number) => void
  clearTotalPrice: () => void
}

function CartItem({ game, closeCart, removeFromCart,addToCart, handleMinus, handlePluse, clearTotalPrice}: Props) {
  const [cartGame, setCartGame] = useState(game); 
  const { id, name, price } = game;
  const navigate = useNavigate();
  const navigateToGame = () => {
    navigate(`/games/${id}`);
    closeCart();
    
  };

  

  const removeItem = () => removeFromCart([id]);
  const addItem = () => { 
    setCartGame(prevState => ({...prevState, count: prevState.count + 1}));
    addToCart(cartGame);
    handlePluse(cartGame.price);
  };
  
  const substrItem = () => {
    if (cartGame.count - 1 === 0) {
      removeItem();
      clearTotalPrice();
    }
    else {
      setCartGame(prevState => ({...prevState, count: prevState.count - 1}));
      handleMinus(cartGame.price);

    }
  };

     
  console.log(game);
  return (
    <Transition
      key={`cart-${id}`}
      layout
      className="Item"
      direction="right"
      durationOut={0.15}
    >
      <Button handleClick={navigateToGame}>
        {name}
      </Button>
      <Button
      handleClick={substrItem}
      >-</Button>
      {cartGame.count}
      <Button
      handleClick={addItem}
      >+</Button>
      ${price}
      <Button
        className="Remove"
        title="Remove"
        handleClick={removeItem}
      >
        <RiCloseLine />
      </Button>
    </Transition>
  );
}

export default CartItem;
