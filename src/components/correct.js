import React, { Component } from "react";

class Correct extends Component {
    render() {
        return this.props.showCorrect && (
            <div>
                <h3>Correct.</h3>
                <button onClick={this.props.nextQuestion}>Next question</button>
            </div>
        )
    }
}
export default Correct;
