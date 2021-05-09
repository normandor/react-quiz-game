import React, { Component } from "react";

class Menu extends Component {
  render() {
    return (
        <div className={"container"}>
            <h2>Select a quiz</h2><br />
                <a href={"/?module=quiz1"}>Quiz 1</a><br />
                <a href={"/?module=quiz2"}>Quiz 2</a><br />
        </div>
    );
  }
};

export default Menu;
