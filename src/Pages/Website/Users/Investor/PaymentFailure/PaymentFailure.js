import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './paymentFailure.module.css';

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const offerId = searchParams.get('offer_id');

  const handleRetry = () => {
    navigate(`/profile/investments?offer_id=${offerId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.failureCard}>
        <div className={styles.icon}>✕</div>
        <h1>Payment Failed</h1>
        <p>There was an error processing your payment.</p>
        <button onClick={handleRetry} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure; 