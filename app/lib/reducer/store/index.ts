import { configureStore } from "@reduxjs/toolkit";
import reducer from "@/app/lib/reducer";

export const store = configureStore({
    reducer: {},
});

store.subscribe(() => console.log(store));

