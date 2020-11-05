import React, { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createStore, Store } from "redux";
import { rootReducer } from "./store/store";

type Options = {
  initialState?: {};
  store?: Store;
} & RenderOptions;

function render(ui: ReactElement, options: Options = {}) {
  const { initialState, store, ...renderOptions } = options;
  const nextStore = store ?? createStore(rootReducer, initialState);

  const Wrapper: React.FC = (props) => {
    return (
      <Provider store={nextStore}>
        <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>{" "}
      </Provider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
