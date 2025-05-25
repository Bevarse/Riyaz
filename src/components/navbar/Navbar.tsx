import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';

const navItems = [
  { href: '/', label: 'Home', icon: '/icons/home.png' },
  { href: '/products', label: 'Products', icon: '/icons/product.png' },
  { href: '/cart', label: 'Cart', icon: '/icons/cart.png' },
  { href: '/about', label: 'About', icon: '/icons/about.png' },
  { href: '/contact', label: 'Contact', icon: '/icons/contact.png' },
  { href: '/account', label: 'Account', icon: '/icons/account.png' },
];

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img
          src="/bevarselogo.png"
          alt="BEVARSE Logo"
          className={styles.logoImg}
        />
      </div>
      <div className={styles.navLinks}>
        {navItems.map((item) => (
          <Link href={item.href} key={item.label} legacyBehavior>
            <a
              className={
                router.pathname === item.href
                  ? `${styles.navLink} ${styles.active}`
                  : styles.navLink
              }
              aria-current={router.pathname === item.href ? 'page' : undefined}
              tabIndex={router.pathname === item.href ? -1 : 0}
            >
              <img
                src={item.icon}
                alt=""
                className={styles.symbol}
                aria-hidden="true"
              />
              {item.label}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;