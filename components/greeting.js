'use strict';

window.onload = () => {

	window.QUESTIONNAIRE = window.QUESTIONNAIRE || {};

	window.QUESTIONNAIRE.Greeting = (() => {

	    const Component = function () {
	    	this.wrapper = document.querySelector( '.' + this.classes.wrapper );
	    	this.answers = {};
	    	this.occupation = [
					'Працюючий за наймом (повна зайнятість)',
					'Працюючий за наймом (неповна зайнятість)',
					'Роботодавець, приватний підприємець',
					'Самозайнятий',
					'Безробітний',
					'Пенсіонер',
					'Студент',
					'Домогосподарка',
					'Інше'
	    	];
	    	this.region = [
					'Biнницька',
					'Волинська',
					'Днiпропетровська',
					'Донецька',
					'Жiтомирська',
					'Закарпатська',
					'Запорiзька',
					'Iвано-Франкiвська',
					'Киiвська',
					'Кiровоградська',
					'Луганська',
					'Львiвська',
					'Миколаiвська',
					'Одеська',
					'Полтавська',
					'Рiвенська',
					'Сумська',
					'Тернопiльська',
					'Харкiвська',
					'Херсонська',
					'Хмельницька',
					'Черкаська',
					'Чернiвецька',
					'Чернiгiвська',
					'м. Київ'
				];
				this.init.call(null, this);
	    };

	    Component.prototype.init = (Component) => {
	    	for (let i=1; i<=41; i++) {
	    		Component.answers[`q${i}`] = '';
	    	}
	    	Component.renderGreeting(Component);
	    	let elements = Component.wrapper.querySelectorAll('input, select');
	    	elements.forEach(i => {
	    		i.onchange = Component.checkFormValidation.bind(null, Component);
	    	});
	    	Component.wrapper.querySelector('.nextButton').addEventListener('click', Component.gotToNextBlock.bind(null, Component));
	    };

	    Component.prototype.classes = {
	    	wrapper: 'questionnaireWrapper'
	    };

	    Component.prototype.renderGreeting = (Component) => {
	    	const greetingTemplate = 
					`<div class="qb">
						<h2 class="greeting-header">ХТО ВИ?</h2>
						<ol>
							<li>
								<div>Стать:</div>
								<div class="flex"><span><input type="radio" name="gender" value="1"><span>чоловік</span></span></div>
								<div class="flex"><input type="radio" name="gender" value="2"><span>жінка</span></div>
							</li>
							<li><div>Вік: <input type="number" name="age" min="18" max="90" > років</div></li>
							<li><div>Регіон/область: <select name="region"></select></li>
							<li>
								<div>Ви проживаєте у ...:</div>
								<div class="flex"><input type="radio" name="location" value="1">великому місті</div>
								<div class="flex"><input type="radio" name="location" value="2">малому чи середньому місті</div>
								<div class="flex"><input type="radio" name="location" value="3">селищі міського типу</div>
								<div class="flex"><input type="radio" name="location" value="4">селі</div>
							</li>
							<li><span>Ваш статус (зайнятість): <select name="occupation"></select></li>
						</ol>
						<button class="nextButton" disabled>ДАЛІ</button>
					</div>`;
				Component.wrapper.innerHTML = greetingTemplate;
	    	Component.fillSelectOptions(Component);
	    };

	    Component.prototype.fillSelectOptions = (Component) => {
	    	let selects = Component.wrapper.querySelectorAll('select');
	    	selects.forEach((e,i) => {
					let defaultOption = document.createElement('option');
					defaultOption.innerHTML = ' -- виберіть варіант -- ';
					defaultOption.setAttribute('value', '0');
					defaultOption.setAttribute('disabled', 'disabled');
					defaultOption.setAttribute('selected', 'selected');
					e.appendChild(defaultOption);
	    		Component[e.name].forEach((el, index) => {
	    			let option = document.createElement('option');
	    			option.innerHTML = el;
	    			option.setAttribute('value', index + 1);
	    			e.appendChild(option);
	    		})
	    	})
	    };

	    Component.prototype.checkFormValidation = (Component) => {
	    	let q1 = Component.wrapper.querySelector('input[type=radio][name=gender]:checked');
	    	let q2 = Component.wrapper.querySelector('input[type=number][name=age]');
	    	let q3 = Component.wrapper.querySelector('select[name=region] option:checked');
	    	let q4 = Component.wrapper.querySelector('input[type=radio][name=location]:checked');
	    	let q5 = Component.wrapper.querySelector('select[name=occupation] option:checked');
	    	let enableButton = !!q1 && !!q2.value && q3.value != "0" && !!q4 && q5.value != "0";

	    	Component.answers.q1 = q1 ? q1.value : null;
	    	Component.answers.q2 = q2.value ? q2.value : null;
	    	Component.answers.q3 = q3.value != "0" ? q3.value : null;
	    	Component.answers.q4 = q4 ? q4.value : null;
	    	Component.answers.q5 = q5.value != "0" ? q5.value : null;

	    	if (enableButton) {
	    		Component.wrapper.querySelector('.nextButton').removeAttribute('disabled');
	    	}
	    };

	    Component.prototype.gotToNextBlock = (Component) => {
	    	Component.wrapper.querySelector('.nextButton').removeEventListener('click', Component.gotToNextBlock.bind(null, Component));
	    	Component.wrapper.innerHTML = '';
	    	QUESTIONNAIRE.Qb1.init(Component.answers);
	    };

	    return new Component();
	})();
}
