import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4c1d95",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);
