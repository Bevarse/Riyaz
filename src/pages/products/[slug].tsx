import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../components/toast/ToastContext';
import { products } from '../../data/products';
import styles from './productpage.module.css';

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const product = products.find((p) => p.slug === slug);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (!product) {
    return <div className={styles.notFound}>Product not found.</div>;
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.productImageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className={styles.productDetails}>
        <h1 className={styles.productName}>{product.name}</h1>
        <p className={styles.productPrice}>{product.price}</p>
        <p className={styles.productDescription}>{product.description}</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className={styles.buyButton}>Buy Now</button>
          <button
            className={styles.addToCart}
            type="button"
            onClick={() => {
              addToCart({
                slug: typeof slug === 'string' ? slug : Array.isArray(slug) ? slug[0] : '',
                name: product.name,
                image: product.image,
                price: product.price, // Use directly if it's a number
              });
              showToast('Added to the cart');
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.modalImage}
            onClick={e => e.stopPropagation()}
          />
          <button
            className={styles.closeModal}
            onClick={() => setShowModal(false)}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}