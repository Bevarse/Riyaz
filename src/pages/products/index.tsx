import React from 'react';
import styles from './products.module.css';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../components/toast/ToastContext';
import { products } from '../../data/products';

const ProductsPage: React.FC = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (product: typeof products[number]) => {
    addToCart({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
    });
    showToast('Added to the cart');
  };

  return (
    <div className={styles.productsPage}>
      <h1 className={styles.heading}>Our Products</h1>
      <div className={styles.grid}>
        {products.map(product => (
          <div className={styles.card} key={product.slug}>
            <div className={styles.productName}>{product.name}</div>
            <Link href={`/products/${product.slug}`}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
                style={{ cursor: 'pointer' }}
              />
            </Link>
            <div className={styles.productInfo}>
              <div className={styles.productPrice}>${product.price}</div>
              <button
                className={styles.addToCart}
                type="button"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;