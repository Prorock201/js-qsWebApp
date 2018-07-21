'use strict';

window.onload = () => {

	window.QUESTIONNAIRE = window.QUESTIONNAIRE || {};

	window.QUESTIONNAIRE.Welcome = (() => {

	    const Component = function () {
	    	this.wrapper = '';
	    	this.baseUrl = '';
	    	this.apiVersion = '/v2';
	    	this.questionnaireUrl = '/questionnaire.html';
	    	this.init.call(null, this);
	    };

	    Component.prototype.init = (Component) => {
	    	Component.wrapper = document.querySelector( '.' + Component.classes.wrapper );
	    	Component.baseUrl = window.location.origin;
	    	Component.renderWelcomePage(Component);
	    	Component.wrapper.querySelector('.nextButton').addEventListener('click', Component.goToNextPage.bind(null, Component));
	    };

	    Component.prototype.classes = {
	    	wrapper: 'questionnaireWrapper'
	    };

	    Component.prototype.renderWelcomePage = (Component) => {
	    	const WelcomeTemplate = 
					`<div class="flex welcome-content">
						<div class="welcome-content-header">Доброго дня!</div>
						<div>Пропонуємо Вам взяти участь в соціологічному опитуванні «Довіра до суду». Це дослідження проводиться з метою оцінки ефективності судової системи та успішності заходів з її реформування. Опитування є анонімним. Просимо Вас поділитися своїм досвідом та оцінками. Дякуємо за співпрацю.</div>
						<button class="nextButton center">Далі</button>
					</div>`;
				Component.wrapper.innerHTML = WelcomeTemplate;
	    };

	    Component.prototype.goToNextPage = (Component) => {
	    	window.location = `${Component.baseUrl}${Component.apiVersion}${Component.questionnaireUrl}`;
	    };

	    return new Component();
	})();
}
