import React from 'react';
import styles from './Register.module.css';

const Register: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Registration submitted!');
  };

  return (
    <section className={styles.registerSection}>
      <div className={styles.registerContainer}>
        <h1 className={styles.registerTitle}>Create Your Account</h1>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className={styles.input}
          />
          <button type="submit" className={styles.registerButton}>
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;