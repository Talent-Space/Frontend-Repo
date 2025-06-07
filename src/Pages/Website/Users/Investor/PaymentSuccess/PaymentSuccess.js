import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Axios } from '../../../../../Api/Axios';
import { OFFERS } from '../../../../../Api/Api';
import styles from './paymentSuccess.module.css';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const offerId = searchParams.get('offer_id');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const updateOfferStatus = async () => {
      try {
        await Axios.post(`${OFFERS}/${offerId}/payment-success`, {
          session_id: sessionId
        });
        // Redirect to investments page after 3 seconds
        setTimeout(() => {
          navigate('profile/my-investments');
        }, 3000);
      } catch (error) {
        console.error('Error updating offer status:', error);
      }
    };

    if (offerId && sessionId) {
      updateOfferStatus();
    }
  }, [offerId, sessionId, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.successCard}>
        <div className={styles.icon}>✓</div>
        <h1>Payment Successful!</h1>
        <p>Your investment has been processed successfully.</p>
        <p>Redirecting to investments page...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess; 