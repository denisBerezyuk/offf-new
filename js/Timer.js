const rootSelector = '[data-js-timer]';

class Timer {
	selectors = {
		root: rootSelector,
		days: '[data-js-timer-days]',
		hours: '[data-js-timer-hours]',
		minutes: '[data-js-timer-minutes]',
		seconds: '[data-js-timer-seconds]',
	};

	constructor(rootElement) {
		this.rootElement = rootElement;
		this.daysElement = this.rootElement.querySelector(this.selectors.days);
		this.hoursElement = this.rootElement.querySelector(this.selectors.hours);
		this.minutesElement = this.rootElement.querySelector(
			this.selectors.minutes
		);
		this.secondsElement = this.rootElement.querySelector(
			this.selectors.seconds
		);

		this.init();
	}

	init() {
		const rootAttrName = this.selectors.root.replace(/[\[\]]/g, '');

		const initialTime = new Date(
			this.rootElement.getAttribute(rootAttrName)
		).getTime();

		this.update(initialTime);

		this.timerId = setInterval(() => this.update(initialTime), 1000);
	}

	update(initialTime) {
		const nowTime = Date.now();
		const diff = initialTime - nowTime;

		if (diff <= 0) {
			clearInterval(this.timerId);
			this.render(0, 0, 0, 0);
			return;
		}

		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((diff / (1000 * 60)) % 60);
		const seconds = Math.floor((diff / 1000) % 60);

		this.render(days, hours, minutes, seconds);
	}

	render(days, hours, minutes, seconds) {
		this.daysElement.textContent = String(days).padStart(2, '0');
		this.hoursElement.textContent = String(hours).padStart(2, '0');
		this.minutesElement.textContent = String(minutes).padStart(2, '0');
		this.secondsElement.textContent = String(seconds).padStart(2, '0');
	}
}

class TimerCollection {
	constructor() {
		document
			.querySelectorAll(rootSelector)
			.forEach(element => new Timer(element));
	}
}

export default TimerCollection;
