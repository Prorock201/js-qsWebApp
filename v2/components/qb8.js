'use strict';

window.QUESTIONNAIRE = window.QUESTIONNAIRE || {};

window.QUESTIONNAIRE.Qb8 = (() => {

    const Component = function () {
        this.answers = null;
        this.startFrom = 39;
        this.options = [
            'кримінальна',
            'цивільна',
            'адміністративна',
            'господарська',
            'про адміністративне правопорушення'
        ];
    };

    Component.prototype.init = (answers) => {
        let component = this.QUESTIONNAIRE.Qb8;
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
                    <h2 class="qb-header">${Component.startFrom}. ВИД ПРОВАДЖЕННЯ/СПРАВИ,В ЯКИХ ВИ ПРИЙМАЛИ ЧИ ПРИЙМАЄТЕ УЧАСТЬ ЗАРАЗ (МОЖЛИВО ВКАЗАТИ КІЛЬКА ВАРІАНТІВ):</h2>
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
            input.setAttribute('type', 'checkbox');
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
        QUESTIONNAIRE.Qb9.init(Component.answers);
    };

    return new Component();
})();