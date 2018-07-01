'use strict';

window.onload = () => {

	window.QUESTIONNAIRE = window.QUESTIONNAIRE || {};

	window.QUESTIONNAIRE.Welcome = (() => {

	    const Component = function () {
	    	this.wrapper = '';
	    	this.baseUrl = '';
	    	this.questionnaireUrl = '/questionnaire.html';
	    	this.init.call(null, this);
	    };

	    Component.prototype.init = (Component) => {
	    	Component.wrapper = document.querySelector( '.' + Component.classes.wrapper );
	    	Component.baseUrl = window.location.origin;
	    	Component.renderWelcomePage(Component);
	    	Component.wrapper.querySelector('.nextButton').addEventListener('click', Component.goToNextPage.bind(null, Component));
	    	Component.wrapper.querySelector('.questionnaire-link').addEventListener('click', Component.goToNextPage.bind(null, Component));
	    };

	    Component.prototype.classes = {
	    	wrapper: 'questionnaireWrapper'
	    };

	    Component.prototype.renderWelcomePage = (Component) => {
	    	const WelcomeTemplate = 
					`<div class="flex welcome-content">
						<div class="welcome-content-header">Довіра до суду.</div>
						<div>Шановні пані та панове! Пропонуємо Вам взяти участь у соціологічному опитуванні «Довіра до суду»
							Це дослідження проводиться з метою оцінки ефективності судової системи та успішності заходів з її реформування.
							Пройти опитування можна на комп’ютері, планшеті або смартфоні за посиланням:
						</div>
						<div class="questionnaire-link">${Component.baseUrl}${Component.questionnaireUrl}</div>
						<div>Опитування абсолютно анонімне.</div>
						<div>Ви можете також пройти опитування, натиснувши на цей банер на сайті Вашого суду або сторінці Facebook. Також можливо зайти через наведений QR код з будь-якого мобільного пристрою.</div>
						<div>Заповнення  анкети займає 5-7 хвилин.</div>
						<button class="nextButton center">Далі</button>
					</div>`;
				Component.wrapper.innerHTML = WelcomeTemplate;
	    };

	    Component.prototype.goToNextPage = (Component) => {
	    	window.location = `${Component.baseUrl}${Component.questionnaireUrl}`;
	    };

	    return new Component();
	})();
}
