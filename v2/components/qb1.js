'use strict';

window.QUESTIONNAIRE = window.QUESTIONNAIRE || {};

window.QUESTIONNAIRE.Qb1 = (() => {

    const Component = function () {
        this.answers = null;
        this.startFrom = 7;
        this.options = [
            'Повністю довіряю українським судам',
            'Скоріше довіряю, чим не довіряю',
            'Скоріше не довіряю,ніж довіряю',
            'Зовсім не довіряю',
            'Важко сказати,не визначився'
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
                    <h2 class="qb-header">${Component.startFrom}. ЯКЕ З НАВЕДЕНИХ НИЖЧЕ ТВЕРДЖЕНЬ НАЙБІЛЬШ ТОЧНО ПЕРЕДАЄ ВАШЕ ОСОБИСТЕ СТАВЛЕННЯ ДО СУДОВОЇ СИСТЕМИ УКРАЇНИ:</h2>
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
            let label = document.createElement('label');
            let input = document.createElement('input');
            let answer = document.createElement('span');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', `q${Component.startFrom}`);
            input.setAttribute('value', i + 1);
            answer.innerHTML = e;
            optionContainer.appendChild(label);
            label.appendChild(input);
            label.appendChild(answer);
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