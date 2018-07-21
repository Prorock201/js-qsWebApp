'use strict';

window.QUESTIONNAIRE = window.QUESTIONNAIRE || {};

window.QUESTIONNAIRE.End = (() => {

    const Component = function () {
        this.answers = null;
    };

    Component.prototype.init = (answers) => {
        let component = this.QUESTIONNAIRE.End;
        component.answers = answers;
        component.wrapper = document.querySelector( '.' + component.classes.wrapper );
        component.renderQb.call(null, component);
        
        $.ajax({
            method: "POST",
            // url: 'http://localhost:3000/setAnswersToDB',
            url: 'http://5.23.48.94:3000/setAnswersToDB',
            data: component.answers,
        })
        .done(function( msg ) {
            alert( "Data Saved: " + msg );
            console.log(msg);
        });
    };

    Component.prototype.classes = {
        wrapper: 'questionnaireWrapper'
    };

    Component.prototype.renderQb = (Component) => {
        const qbTemplate = 
                `<div class="qb final-header">ДЯКУЄМО ЗА УЧАСТЬ!!!!</div>`;
        Component.wrapper.innerHTML = qbTemplate;
    };

    return new Component();
})();