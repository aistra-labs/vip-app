// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers';

// const store = configureStore({
//   reducer: rootReducer,
//   // Add middleware or other configuration options if needed
// });

// export default store;
// import { createStore } from 'redux';
// import { configureStore } from "@reduxjs/toolkit";
// import vIP from "../redux/reducers";
// const store = configureStore({
//   reducer: {
//     vIP: vIP,
//     // Add other reducers here as needed
//   },
// });
// export default store;
import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./rootReducer";
import vIP from "../redux/reducers";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage"; // defaults to localStorage

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, vIP);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
