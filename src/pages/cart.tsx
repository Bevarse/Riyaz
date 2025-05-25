import React from 'react';
import styles from './cart.module.css';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.heading}>Your Cart</h1>
      <div className={styles.cartList}>
        {cart.length === 0 ? (
          <div className={styles.empty}>Your cart is empty.</div>
        ) : (
          cart.map((item, idx) => (
            <div className={styles.cartItem} key={item.slug}>
              <Link href={`/products/${item.slug}`}>
                <img src={item.image} alt={item.name} className={styles.cartImg} />
              </Link>
              <div className={styles.cartInfo}>
                <div className={styles.cartName}>{item.name}</div>
                <div className={styles.cartPrice}>${item.price}</div>
                <div className={styles.cartQty}>
                  Qty:
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >-</button>
                  <span className={styles.qtyNum}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                  >+</button>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.slug)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className={styles.cartFooter}>
          <div className={styles.total}>Total: <span>${total}</span></div>
          <button className={styles.checkout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;