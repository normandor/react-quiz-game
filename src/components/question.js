import React, { Component } from "react";

class Question extends Component {
    fetchAnswers() {
        let answers = [];

        // if it's a yes/no question
        if (this.props.data.ans.toUpperCase() === 'YES' || this.props.data.ans.toUpperCase() === 'NO') {
            return ['YES', 'NO'];
        }

        const possibleAnswers = ['A', 'B', 'C', 'D'];
        possibleAnswers.forEach(data => {
            const pattern = `<br />${data}.`;
            if (this.props.data.q.indexOf(pattern) > 0) {
                answers.push(data);
            }
        });

        return answers;
    }

  render() {
      let image = `${process.env.PUBLIC_URL}/${this.props.data.serie}/${this.props.data.img}.jpg`;
      const answersFetched = this.fetchAnswers();
      let answersNodes;
      if (answersFetched.length !== 0) {
          answersNodes = Object.values(answersFetched).map(function (value, index) {
              return (
                  <div
                      key={index}
                      className={'optionButtons'}
                  >
                      <button
                          className={'optionButtons'}
                          id={"answer-input-" + index}
                          onClick={(e) => {
                              this.props.setAnswer(e, value);
                          }}
                          disabled={!this.props.responsesEnabled}
                      >{value}</button>
                  </div>
              )
          }.bind(this));
      } else {
          answersNodes = (
              <div
                  key="1"
                  className={'optionButtons'}
              > <span className={'labelResponse'}>Réponse</span>
                  <input
                      id={"answerInputText"}
                      type={"text"}
                      className={'optionButtons'}
                      disabled={!this.props.responsesEnabled}
                  ></input>
                  <button
                      onClick={(e) => {
                          this.props.setAnswer(e, document.getElementById("answerInputText").value);
                      }}
                  >
                      Accept
                  </button>
              </div>
          );
      }

      const mystyle = {
          fill: "blue",
          stroke: "pink",
          opacity: 0.5,
      };
      const mystyleRed = {
          fill: "red",
          stroke: "pink",
          opacity: 0.5,
      };

      return (
        <div className={'wrapper'}>
            <div className={'grid-image'}>
                <img src={image} alt='img' className={'questionImage'}/>
            </div>
            <div className={'grid-question'}>
                <hr />
                Question {
                    (parseInt(this.props.id) + 1) + " of " + parseInt(this.props.total) + ":\n\n"
                }
                <hr />
              <h4 className='new-line'>
                  {
                      this.props.data.q.replaceAll('<br />', '\n')
                          .replaceAll('<p class="question_weight">', '')
                          .replaceAll('</p>', '\n')
                    }
              </h4>
            </div>
            <div className={'grid-responses'}>
                { this.props.timerOn === 1 ?
                    <div>
                        <svg width="450" height="30" >
                            <rect x="-50" y="20" width="450" height="15"
                                  style={mystyle} />
                            <rect x="-50" y="20" width={
                                (450 - (450 / 15) * this.props.seconds < 0) ? 0 : 450 - (450 / 15) * this.props.seconds
                            } height="15"
                                  style={mystyleRed} />
                        </svg>
                    </div>
                    :
                    <div>
                        <br />
                    </div>
                }
                <form>
                    { answersNodes }
                    <br/>
                </form>
            </div>
            <div className={'grid-score'}>
                Score: {this.props.score}
            </div>
        </div>
    );
  }
};

export default Question;
