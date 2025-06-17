import { configureStore } from "@reduxjs/toolkit";
import { ModalReducer, SessionReducer } from "../slices";

const store = configureStore({
  reducer: {
    expired: ModalReducer,
    session: SessionReducer,
  },
});

export default store;
