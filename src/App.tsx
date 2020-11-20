import React, { useCallback } from "react";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import BoardContainer from "./components/BoardContainer";
import { useDispatch, useSelector } from "react-redux";
import { boardsActions, boardsSelectors } from "./store/boardsSlice";
import InputBox from "./components/InputBox";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route path="/boards/:id" render={(props) => <BoardContainer boardId={props.match.params.id} />} />
      </Switch>
    </Router>
  );
}

function Home() {
  const dispatch = useDispatch();
  const boards = useSelector(boardsSelectors.selectAll);

  const inputHandler = useCallback((value: string) => {
    dispatch(boardsActions.addBoard({ name: value }));
  }, []);

  return (
    <div>
      {boards.map((board) => (
        <div key={board.id}>
          <Link to={`/boards/${board.id}`}>
            <div>{board.name}</div>
          </Link>
        </div>
      ))}
      <InputBox inputHandler={inputHandler} label={"+ New Board"} />
    </div>
  );
}
