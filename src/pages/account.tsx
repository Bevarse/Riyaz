import React, { useState } from 'react';
import styles from './account.module.css';

const Account: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Dummy user data for demonstration
  const [user, setUser] = useState({
    name: 'Alex Doe',
    email: 'alex@email.com',
  });

  const [form, setForm] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditing(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(form);
    setEditing(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <main className={styles.accountMain}>
      <section className={styles.hero}>
        <h1 className={styles.title}>My Account</h1>
        <p className={styles.subtitle}>
          Manage your profile and view your order history.
        </p>
      </section>
      <section className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.heading}>Profile</h2>
          {!editing ? (
            <div className={styles.profileView}>
              <div className={styles.profileRow}>
                <span className={styles.label}>Name:</span>
                <span>{user.name}</span>
              </div>
              <div className={styles.profileRow}>
                <span className={styles.label}>Email:</span>
                <span>{user.email}</span>
              </div>
              <button className={styles.button} onClick={handleEdit}>
                Edit Profile
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
              <input
                className={styles.input}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
              />
              <button className={styles.button} type="submit">
                Save Changes
              </button>
            </form>
          )}
          {submitted && (
            <div className={styles.success}>Profile updated successfully!</div>
          )}
        </div>
        <div className={styles.card}>
          <h2 className={styles.heading}>Order History</h2>
          <div className={styles.ordersEmpty}>
            <span className={styles.orderIcon}>🛒</span>
            <p>No orders yet. Start shopping and your orders will appear here!</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Account;