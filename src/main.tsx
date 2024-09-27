import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
import AppRouter from "./routes/AppRouter";

import "@styles/global.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
