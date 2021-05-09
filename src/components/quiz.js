import Question from './question.js';
import Explanation from './explanation.js';
import Cookies from 'js-cookie';
import Correct from './correct.js';

import React, { Component } from "react";

class Quiz extends Component {

  constructor(props) {
    super(props);

    this.time_answer = 15;
    this.state = {
      showExplanation: false,
      showCorrect: false,
      responsesEnabled: true,
      step: 0,
      user_answers_correct: [],
      questions: [],
      seconds: this.time_answer,
      timerOn: Cookies.get('timerOn') ? parseInt(Cookies.get('timerOn')) : 1,
      points: 0,
    }
    this.timer = 0;
    this.countDown = this.countDown.bind(this);

  }

  startTimer() {
    if (this.state.timerOn === 1) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      seconds: seconds,
    });

    if (seconds === 0) {
      this.stopTimer();
      this.setAnswer(new Event('click'), '--timeout--');
    }
  }

  componentDidMount() {
    const qs = require('query-string');
    // eslint-disable-next-line no-restricted-globals
    const module = qs.parse(location.search).module;

    import(`../assets/data-${module}.json`)
        .then((Baz) => {
          this.setState({
            quiz:Baz.default,
            seconds: this.time_answer + Math.floor(this.getTextReadingTime(Baz.default.questions[0].q))
          });
        });

    this.startTimer();
  }

  componentWillUnmount(){
    if (this.state.timerOn === 1) {
      clearInterval(this.timer)
    }
  }

  handleClick = () => {
  };

  getTextReadingTime(text) {
    const words = text.split(' ').length
    const wpm = 130
    const min = words / wpm

    return Math.round(min * 60 * 100) / 100
  }

  nextQuestion = () => {
    this.setState({
      step: (this.state.step + 1),
      showCorrect: false,
      showExplanation: false,
      responsesEnabled: true,
      seconds: this.time_answer,
    });

    if (this.state.step < this.state.quiz.questions.length -1) {
      const question = this.state.quiz.questions[this.state.step + 1].q;
      this.setState({
        seconds: this.time_answer + Math.floor(this.getTextReadingTime(question)),
      });
    }
    this.startTimer();
  }

  showExplanation = () => {
    this.setState({
      showExplanation: true,
      responsesEnabled: false,
    });
  }

  showCorrect = () => {
    this.setState({
      showCorrect: true,
      responsesEnabled: false,
    });
  }

  setAnswer = (event, index) => {
    event.preventDefault();
    if (this.state.timerOn === 1) {
      this.stopTimer();
    }
    let isAnswerCorrect = 0;

    if (index.toUpperCase() === this.state.quiz.questions[this.state.step].ans.toUpperCase()) {
      isAnswerCorrect = 1;
      this.showCorrect();
      this.setState({points: this.state.points + 1})
    } else {
      this.showExplanation();
    }

    this.setState({user_answers_correct: [...this.state.user_answers_correct, isAnswerCorrect]}, this.handleClick);
    this.setState({questions: [...this.state.questions, this.state.quiz.questions[this.state.step].id]}, this.handleClick);
  }

  renderResult = () => {
    this.stopTimer();
    let result = Object.values(this.state.user_answers_correct).map(function (value, index) {
      let image = `${process.env.PUBLIC_URL}/${this.state.quiz.questions[index].serie}/${this.state.quiz.questions[index].img}.jpg`;
      if (value === 1) {
        return (
            <span key={index}>
              <img alt='img'
                   onClick={() => alert(this.state.quiz.questions[index].exp.replaceAll('<br />', '\n'))}
                   className={'border-blue'} src={image} />
            </span>
        )
      } else {
        return (
            <span key={index}>
              <img alt='img'
                   onClick={() => alert(this.state.quiz.questions[index].exp.replaceAll('<br />', '\n'))}
                   className={'border-red'} src={image} />
            </span>
        )
      }
    }, this);

    const resultPercentage = Math.round(100 * this.state.points / this.state.quiz.questions.length);
    return (
        <div>
          <h3>Results</h3>
          <div>
            {this.state.points}/{this.state.quiz.questions.length}: {resultPercentage}%
          </div>
          <div>
            <h3>Answers</h3>
            {result}
          </div>
        </div>
    );
  }

  toggleTimer = () => {
    if (this.state.timerOn === 1) {
      this.stopTimer();
      this.setState({
        timerOn: 0,
      });
      Cookies.set('timerOn', 0);
      return;
    }

    this.setState({
      timerOn: 1,
      seconds: this.time_answer
    }, this.startTimer);
    Cookies.set('timerOn', 1);
  }

  render() {
    if (!this.state?.quiz?.questions) {
      return <div></div>
    }

    return (
        <div className={"container"}>
          <h1>{this.state.quiz.title}</h1>
          <h4><a href={"./"}>Back</a></h4>
          <h4 onClick={this.toggleTimer} className={"text-left pointer"}>Timer on/off</h4>

          {(this.state.step < this.state.quiz.questions.length
                  ? (<div>
                    <Question
                        id={this.state.step}
                        total={this.state.quiz.questions.length}
                        data={this.state.quiz.questions[this.state.step]}
                        validateAnswers={this.handleClick}
                        responsesEnabled={this.state.responsesEnabled}
                        setAnswer={this.setAnswer}
                        seconds={this.state.seconds}
                        timerOn={this.state.timerOn}
                        score={`${this.state.points}/${this.state.quiz.questions.length}`}
                    />
                    <br />

                    <Explanation
                        showExplanation={this.state.showExplanation}
                        explanation={this.state.quiz.questions[this.state.step].exp}
                        correct={this.state.quiz.questions[this.state.step].ans}
                        nextQuestion={this.nextQuestion}
                    />
                    <Correct
                        showCorrect={this.state.showCorrect}
                        nextQuestion={this.nextQuestion}
                    />
                  </div>)
                  : (<div>{this.renderResult()}</div>)
          )}
        </div>
    )
  }
}

export default Quiz;
