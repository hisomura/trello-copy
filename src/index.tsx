import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import "./styles/global.css";
import { PersistGate } from "redux-persist/integration/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
