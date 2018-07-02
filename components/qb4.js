'use strict';

window.QUESTIONNAIRE = window.QUESTIONNAIRE || {};

window.QUESTIONNAIRE.Qb4 = (() => {

    const Component = function () {
        this.answers = null;
        this.startFrom = 26;
        this.tableCaption = [
            '',
            'повністю довіряю',
            'скоріше довіряю, чим ні',
            'скоріше ні, ніж так',
            'повністю не довіряю',
            'важко сказати; не визначився'
        ];
        this.questions = [
            'Президент України',
            'Верховна Рада України',
            'Кабінет Мінстрів України',
            'Прокуратура',
            'Національна поліція',
            'Національне антикорупційне бюро',
            'Місцеві органи влади (місцева рада, мер міста)',
            'Політичні партії;',
            'Громадські організації;',
            'Засоби масової інформації (преса, телебачення, інформагентства)'
        ];
    };

    Component.prototype.init = (answers) => {
        let component = this.QUESTIONNAIRE.Qb4;
        let elements = null;
        component.answers = answers;
        component.wrapper = document.querySelector( '.' + component.classes.wrapper );
        component.renderQb.call(null, component);
        elements = component.wrapper.querySelectorAll('input[type=radio]');
        elements.forEach(i => {
            i.onchange = component.checkFormValidation.bind(null, component);
        });
        component.wrapper.querySelector('.nextButton').addEventListener('click', component.gotToNextBlock.bind(null, component));
    };

    Component.prototype.classes = {
        wrapper: 'questionnaireWrapper',
        tableContainer: 'table-container'
    };

    Component.prototype.renderQb = (Component) => {
        const qbTemplate = 
                `<div class="qb">
                    <h2 class="qb-header">В якій мірі Ви довіряєте наступних органам?</h2>
                    <div class="table-container"></div>
                    <button class="nextButton" disabled>ДАЛІ</button>
                </div>`;
        Component.wrapper.innerHTML = qbTemplate;
        Component.renderTable.call(null, Component);
    };

    Component.prototype.renderTable = (Component) => {
        let table = document.createElement('table');
        let trHead = document.createElement('tr');
        Component.tableCaption.forEach(e => {
            let th = document.createElement('th');
            th.innerHTML = e;
            trHead.appendChild(th);
        });
        table.appendChild(trHead);
        Component.questions.forEach((e,i) => {
            let tr = document.createElement('tr');
            let tdQuestion = document.createElement('td');
            let question = `${Component.startFrom + i}`;
            tdQuestion.innerHTML = `${question}. ${e}`;
            tr.appendChild(tdQuestion);
            for (let z = 5; z >= 1; z--) {
                let td = document.createElement('td');
                let input = document.createElement('input');
                td.setAttribute('align', 'center');
                input.setAttribute('type', 'radio');
                input.setAttribute('name', `q${question}`);
                input.setAttribute('value', z);
                td.appendChild(input);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        });
        document.querySelector(`.${Component.classes.wrapper} .${Component.classes.tableContainer}`).appendChild(table);
    };

    Component.prototype.checkFormValidation = (Component) => {
        let enableButton = true;
        Component.questions.forEach((e,i)=> {
            let question = `q${Component.startFrom + i}`;
            let answerOption = Component.wrapper.querySelector(`input[type=radio][name=${question}]:checked`);
            if (answerOption) {
                Component.answers[question] = answerOption.value;
            } else {
                enableButton = false;
            }
        });
        if (enableButton) {
            Component.wrapper.querySelector('.nextButton').removeAttribute('disabled');
        }
    };

    Component.prototype.gotToNextBlock = (Component) => {
        Component.wrapper.querySelector('.nextButton').removeEventListener('click', Component.gotToNextBlock.bind(null, Component));
        Component.wrapper.innerHTML = '';
        QUESTIONNAIRE.Qb5.init(Component.answers);
    };

    return new Component();
})();