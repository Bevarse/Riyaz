import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import styles from './floatingcart.module.css';

const FloatingCart: React.FC = () => {
  const { cart } = useCart();
  const [hovered, setHovered] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className={`${styles.floatingCart} ${hovered ? styles.expanded : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.cartCircle}>
        {!hovered && (
          <>
            <img src="/icons/cart.png" alt="Cart" className={styles.cartIcon} />
            {totalItems > 0 && (
              <span className={styles.cartCount}>{totalItems}</span>
            )}
          </>
        )}
        {hovered && (
          <div className={styles.cartDetails}>
            <div className={styles.cartTitle}>Cart</div>
            {cart.length === 0 ? (
              <div className={styles.empty}>No items added.</div>
            ) : (
              <div className={styles.itemsList}>
                {cart.map(item => (
                  <div className={styles.item} key={item.slug}>
                    <img src={item.image} alt={item.name} className={styles.itemImg} />
                    <div className={styles.itemInfo}>
                      <div className={styles.itemName}>{item.name}</div>
                      <div className={styles.itemQty}>Qty: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Link href="/cart" className={styles.gotoCart}>
              Go to Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingCart;