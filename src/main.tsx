import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MobileProvider } from "./components/contexts/mobile-context.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
export { Provider } from "react-redux";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StrictMode>
          <MobileProvider>
            <App />
          </MobileProvider>
        </StrictMode>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>,
);
