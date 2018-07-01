'use strict';

window.QUESTIONNAIRE = window.QUESTIONNAIRE || {};

window.QUESTIONNAIRE.Qb9 = (() => {

    const Component = function () {
        this.answers = null;
        this.startFrom = 32;
        this.options = [
            'Перша інстанція',
            'Апеляційна інстанція',
            'Касаційна інстанція'
        ];
    };

    Component.prototype.init = (answers) => {
        let component = this.QUESTIONNAIRE.Qb9;
        let elements = null;
        component.answers = answers;
        component.wrapper = document.querySelector( '.' + component.classes.wrapper );
        component.renderQb.call(null, component);
        elements = component.wrapper.querySelectorAll(`input[type=checkbox][name=q${component.startFrom}]`);
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
                    <h2 class="qb-header">${Component.startFrom}. Які суди розглядали ці справи(за Вашою участю)</h2>
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
            input.setAttribute('type', 'checkbox');
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
        let answerOptions = Component.wrapper.querySelectorAll(`input[type=checkbox][name=q${Component.startFrom}]:checked`);
        let answersValue = [];
        answerOptions.forEach((e,i) => {
            answersValue.push(e.value);
        });
        Component.answers[`q${Component.startFrom}`] = answersValue.join(',');
        if (answersValue.length > 0) {
            Component.wrapper.querySelector('.nextButton').removeAttribute('disabled');
        } else {
            Component.wrapper.querySelector('.nextButton').setAttribute('disabled', 'disabled');
        }
    };

    Component.prototype.gotToNextBlock = (Component) => {
        Component.wrapper.querySelector('.nextButton').removeEventListener('click', Component.gotToNextBlock.bind(null, Component));
        Component.wrapper.innerHTML = '';
        QUESTIONNAIRE.Qb10.init(Component.answers);
    };

    return new Component();
})();