'use strict';

window.onload = () => {
	window.QUESTIONNAIRE = window.QUESTIONNAIRE || {};

	window.QUESTIONNAIRE.QRPage = ((QRCode) => {

	    const Component = function () {
	    	this.wrapper = '';
	    	this.qrcode = {};
	    	this.baseUrl = '';
	    	this.apiVersion = '/v2';
	    	this.welcomeUrl = '/welcome.html';
	    	this.init.call(null, this);
	    };

	    Component.prototype.init = (Component) => {
	    	Component.wrapper = document.querySelector( '.' + Component.classes.wrapper );
	    	Component.renderQRPage(Component);
	    	Component.qrcode = new QRCode("qrcode");
	    	Component.baseUrl = window.location.origin;
	    	Component.qrcode.makeCode(`${Component.baseUrl}${Component.welcomeUrl}`);
	    	Component.wrapper.querySelector( '.' + Component.classes.qrContent ).addEventListener('click', Component.goToNextPage.bind(null, Component));
	    };

	    Component.prototype.classes = {
	    	wrapper: 'questionnaireWrapper',
	    	qrContent: 'qr-content'
	    };

	    Component.prototype.renderQRPage = (Component) => {
	    	const QRTemplate = 
					`<div class="flex qr-content">
						<div class="qr-header">
							<div class="qr-header-h1">Довіра до суду:</div>
							<div class="qr-header-h2">соціологічне опитування</div>
						</div>
						<div id="qrcode"></div>
					</div>`;
				Component.wrapper.innerHTML = QRTemplate;
	    };

	    Component.prototype.goToNextPage = (Component) => {
	    	window.location = `${Component.baseUrl}${Component.apiVersion}${Component.welcomeUrl}`;
	    };

	    return new Component();
	})(QRCode);
}
