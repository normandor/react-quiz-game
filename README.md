# react-quiz-game
A quiz game made in React

This is an example of a quiz game made in React.
The questions are loaded from a json file (it can also be modified so that it loads the json from an API) with the following format:
```json
{
  "title": "Quiz number 1",
  "questions": [
    {
      "id": "1",
      "serie":"quiz1",
      "q": "What's the name of this city?<br />A. Prague.<br />B. Brussels.<br />C. Paris",
      "img": "1",
      "ans": "c",
      "exp": "This city is Paris, you can see the Eiffel Tower and the Seine river."
    },
    {
      ...
    }
  ]
}
```
If the question has "A.", "B.", etc. in it, it automatically generates the buttons for each option. Same with yes/no answers.<br>
Questions that don't have this pattern will have an input field to complete the answer.<br><br>
<img alt="quiz1" src="https://www.wichisoft.com.ar/images/react-quiz-game/quiz_1.jpg" width=450><br><br>
The timer can be enabled or disabled, and it takes into account the reading time (words per minute can be configured), and the time given for the response.<br>
If an answer is incorrect, the explantion ("exp" field of the json) will be shown.<br>
When all responses are given, a summary is shown with all the images. Green border indicates a correct answer and red, incorrect. Upon clicking on each image, the explanation is shown.<br><br>
<img alt="quiz2" src="https://www.wichisoft.com.ar/images/react-quiz-game/quiz_2.jpg" width=450><br>
The quiz can be tested here: <a href="https://normandor.github.io/react-quiz-game/">https://normandor.github.io/react-quiz-game/</a>
