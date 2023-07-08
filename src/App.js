import React, { Component } from "react";
import Todo from "./components/Todo/Todo";
import "./components/Todo/Todo.css";

export default class App extends Component {
  render() {
    return (
      <div
        style={{
          color: "black",
          marginBottom: "300px",
          marginLeft: "300px",
          marginRight: "300px",
          marginTop: "20px",
          border: "4px solid midnightblue",
          borderRadius: "3px",
          backgroundColor: "darkgrey",
        }}
      >
        <Todo></Todo>
      </div>
    );
  }
}
