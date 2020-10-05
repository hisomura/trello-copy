import "../src/styles/global.css";
import { Provider } from "react-redux";
import store from "../src/store/store";
import { AppPropsType } from "next/dist/next-server/lib/utils";

export default function App({ Component, pageProps }: AppPropsType) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
