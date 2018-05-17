import React from 'react';

class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
            classNames: ['', '', '', '']
        }
        
        this.checkAnswer = this.checkAnswer.bind(this);
    }
    
    checkAnswer(e) {
        let { isAnswered } = this.props;
        
        if(!isAnswered) {
            let elem = e.currentTarget;
            let { correct, increaseScore } = this.props;
            let answer = Number(elem.dataset.id);
            let updatedClassNames = this.state.classNames;

            if(answer === correct){
                updatedClassNames[answer-1] = 'right';
                increaseScore();
            }
            else {
                updatedClassNames[answer-1] = 'wrong';
            }
            
            this.setState({
                classNames: updatedClassNames
            })

            this.props.showButton();
        }
    }
    
    shouldComponentUpdate() {
        this.setState({
            classNames: ['', '', '', '']
        });
        return true;
    }
    
    render() {
        let { answers } = this.props;
        let { classNames } = this.state;
        
        let transition = {
            transitionName: "example",
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 300
        }
        
        return (
            <div id="answers">
                <button onClick={this.checkAnswer} className={classNames[0]} data-id="1"><p>{answers[0]}</p></button>
                <button onClick={this.checkAnswer} className={classNames[1]} data-id="2"><p>{answers[1]}</p></button>
                <button onClick={this.checkAnswer} className={classNames[2]} data-id="3"><p>{answers[2]}</p></button>
                <button onClick={this.checkAnswer} className={classNames[3]} data-id="4"><p>{answers[3]}</p></button>
            </div>
        );
    }
}

export default Answers