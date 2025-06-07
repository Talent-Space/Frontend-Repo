import { configureStore } from '@reduxjs/toolkit';
import offersReducer from './slices/offersSlice';

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    // auth: authReducer,
    // notifications: notificationsReducer,
  },
}); 