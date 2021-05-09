import React, { Component } from "react";

class Explanation extends Component {
    render() {
        return this.props.showExplanation && (
            <div>
                <h3>Wrong.</h3>
                <h4>Correct response: {this.props.correct.toUpperCase()}.</h4>
                <h4 className='new-line'> { this.props.explanation.replaceAll('<br />', '\n') }</h4>
                <button onClick={this.props.nextQuestion}>Next question</button>
            </div>
        )
    }
}
export default Explanation;
