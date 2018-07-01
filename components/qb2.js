'use strict';

window.QUESTIONNAIRE = window.QUESTIONNAIRE || {};

window.QUESTIONNAIRE.Qb2 = (() => {

    const Component = function () {
        this.answers = null;
        this.startFrom = 9;
        this.tableCaption = [
            '',
            'повністю погоджуюсь',
            'скоріше погоджуюсь, чим ні',
            'скоріше ні, ніж погоджуюсь',
            'зовсім не погоджуюсь',
            'важко сказати; не визначився'
        ];
        this.questions = [
            'Рішення, які приймаються судами, є справедливими, обґрунтованими та законними',
            'Судді мають належну кваліфікацію',
            'Суди та судді є незалежними, на їх рішення не впливають інші органи влади, політики чи посадові особи',
            'Відсутні сумніви в тому, що в судах всі рівні перед законом і нікому  не надається перевага через його майновий стан, посади, родинні зв’язки тощо',
            'Умови роботи судів (графіки розгляду справ, стан приміщень тощо) є комфортними і зручними для учасників судових  проваджень',
            'Судові процедури є простими та ефективними',
            'Відсутні суттєві перешкоди для звернення до суду',
            'Справи розглядаються без необґрунтованих затримок протягом розумного строку',
            'Судові рішення виконуються'
        ];
    };

    Component.prototype.init = (answers) => {
        let component = this.QUESTIONNAIRE.Qb2;
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
                    <h2 class="qb-header">Чи погоджуєтесь Ви з наступними твердженнями? (зробіть відмітку у кожному рядку)</h2>
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
        QUESTIONNAIRE.Qb4.init(Component.answers);
    };

    return new Component();
})();