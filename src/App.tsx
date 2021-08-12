import React from "react";
import NavBar from "./components/NavBar";
import { Route } from "react-router-dom";
import NewItem from "./components/NewItem";
import ItemsList from "./components/ItemsList";
import ItemDetail from "./components/ItemDetail";

interface IState {}
interface IProps {}

class App extends React.Component<IProps, IState> {
  render() {
    return (
      <div>
        <NavBar />
        <Route path="/" exact component={ItemsList} />
        <Route path="/items/:id" exact component={ItemDetail} />
        <Route path="/new" exact component={NewItem} />
        <Route path="/change/:id" exact component={NewItem} />
      </div>
    );
  }
}

export default App;
