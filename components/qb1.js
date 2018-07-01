'use strict';

window.QUESTIONNAIRE = window.QUESTIONNAIRE || {};

window.QUESTIONNAIRE.Qb1 = (() => {

    const Component = function () {
        this.answers = null;
        this.startFrom = 6;
        this.options = [
            'повністю довіряю українським судам',
            'скоріше довіряю чим не довіряю',
            'скоріше не довіряю ніж довіряю',
            'зовсім не довіряю',
            'важко сказати; не визначився'
        ];
    };

    Component.prototype.init = (answers) => {
        let component = this.QUESTIONNAIRE.Qb1;
        let elements = null;
        component.answers = answers;
        component.wrapper = document.querySelector( '.' + component.classes.wrapper );
        component.renderQb.call(null, component);
        elements = component.wrapper.querySelectorAll(`input[type=radio][name=q${component.startFrom}]`);
        elements.forEach(i => {
            i.onchange = component.checkFormValidation.bind(null, component);
        });
        component.wrapper.querySelector('.nextButton').addEventListener('click', component.gotToNextBlock.bind(null, component));
    };

    Component.prototype.classes = {
        wrapper: 'questionnaireWrapper',
        questionContent: 'qb-content'
    };

    Component.prototype.renderQb = (Component) => {
        const qbTemplate = 
                `<div class="qb">
                    <h2 class="qb-header">${Component.startFrom}. Яке з наведених нижче тверджень найбільш точно передає Ваше особисте ставлення до судової системи України:</h2>
                    <div class="qb-content"></div>
                    <button class="nextButton" disabled>ДАЛІ</button>
                </div>`;
        Component.wrapper.innerHTML = qbTemplate;
        Component.renderOptions.call(null, Component);
    };

    Component.prototype.renderOptions = (Component) => {
        let container = document.createElement('div');
        Component.options.forEach((e,i) => {
            let optionContainer = document.createElement('div');
            let input = document.createElement('input');
            let answer = document.createElement('span');
            optionContainer.classList.add('flex');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', `q${Component.startFrom}`);
            input.setAttribute('value', i + 1);
            answer.innerHTML = e;
            optionContainer.appendChild(input);
            optionContainer.appendChild(answer);
            container.appendChild(optionContainer);
        });
        document.querySelector(`.${Component.classes.wrapper} .${Component.classes.questionContent}`).appendChild(container);
    };

    Component.prototype.checkFormValidation = (Component) => {
        let answerOption = Component.wrapper.querySelector(`input[type=radio][name=q${Component.startFrom}]:checked`);
        Component.answers[answerOption.name] = answerOption.value;
        Component.wrapper.querySelector('.nextButton').removeAttribute('disabled');
    };

    Component.prototype.gotToNextBlock = (Component) => {
        Component.wrapper.querySelector('.nextButton').removeEventListener('click', Component.gotToNextBlock.bind(null, Component));
        Component.wrapper.innerHTML = '';
        switch (Component.answers[`q${Component.startFrom}`]) {
            case '1':
            case '2':
                QUESTIONNAIRE.Qb2.init(Component.answers);
                break;
            case '3':
            case '4':
                QUESTIONNAIRE.Qb3.init(Component.answers);
                break;
            case '5':
                QUESTIONNAIRE.Qb4.init(Component.answers);
                break;
            default:
                alert('Something went wrong!');
                break;
        }
    };

    return new Component();
})();