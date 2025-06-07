import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Axios } from '../../Api/Axios';
import { OFFERS } from '../../Api/Api';

// Async thunks
export const fetchOffers = createAsyncThunk(
  'offers/fetchOffers',
  async () => {
    const response = await Axios.get(`${OFFERS}/sent`);
    return response.data.data;
  }
);

export const createPaymentSession = createAsyncThunk(
  'offers/createPaymentSession',
  async ({ offerId, amount }) => {
    const response = await Axios.post(`${OFFERS}/${offerId}/create-payment-session`, {
      amount,
      offer_id: offerId
    });
    return response.data;
  }
);

export const updatePaymentStatus = createAsyncThunk(
  'offers/updatePaymentStatus',
  async ({ offerId, sessionId }) => {
    const response = await Axios.post(`${OFFERS}/${offerId}/payment-success`, {
      session_id: sessionId
    });
    return response.data;
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState: {
    offers: [],
    loading: false,
    error: null,
    currentOffer: null,
  },
  reducers: {
    setCurrentOffer: (state, action) => {
      state.currentOffer = action.payload;
    },
    clearCurrentOffer: (state) => {
      state.currentOffer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch offers
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create payment session
      .addCase(createPaymentSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPaymentSession.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createPaymentSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update payment status
      .addCase(updatePaymentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOffer = action.payload;
        state.offers = state.offers.map(offer => 
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
      })
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentOffer, clearCurrentOffer } = offersSlice.actions;
export default offersSlice.reducer; 