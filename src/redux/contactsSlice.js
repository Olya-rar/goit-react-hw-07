import { createSelector, createSlice } from '@reduxjs/toolkit';

import { selectContacts } from './contactsSelectors';
import { selectFilter } from './filterSelectors';
import {
  apiAddContacts,
  apiDeleteContacts,
  apiGetContacts,
} from './contactsOps';

const INITIAL_STATE = {
  contacts: null,
  isLoading: false,
  error: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(apiGetContacts.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isLoading = false;
      })
      .addCase(apiGetContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(apiAddContacts.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(apiAddContacts.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.isLoading = false;
      })
      .addCase(apiAddContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(apiDeleteContacts.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(apiDeleteContacts.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        );
        state.isLoading = false;
        state.error = false;
      })
      .addCase(apiDeleteContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const data = Array.isArray(contacts)
      ? contacts.filter((contact) =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      : [];
    return data;
  }
);

export const contactsReducer = contactsSlice.reducer;