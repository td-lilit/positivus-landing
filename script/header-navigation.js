class HeaderNavigation {
	element = null;
	list = null;
	toggle = null;

	_mobile = false;
	_opened = false;

	constructor() {
		this.element = document.querySelector('#headerNavigation');
		this.list = this.element.querySelector('.navigation__list');
		this.toggle = this.element.querySelector('.navigation__toggle');

		if (!this.element || !this.list) {
			return null;
		}

		this.onResize = this.onResize.bind(this);
		this.onToggle = this.onToggle.bind(this);

		this.setEvents();

		this.onResize();
	}

	get mobile() {
		return this._mobile;
	}

	set mobile(value) {
		if (value && !this._mobile) {
			this._mobile = value;
			this.onMobile();
		}

		if (!value && this._mobile) {
			this._mobile = value;
			this.onDesktop();
		}
	}

	get opened() {
		return this._opened;
	}

	set opened(value) {
		if (value && !this.opened) {
			this._opened = value;
			this.onOpen();
		}

		if (!value && this.opened) {
			this._opened = value;
			this.onClose();
		}
	}

	setEvents() {
		window.addEventListener('resize', this.onResize);
		this.toggle.addEventListener('click', this.onToggle);
	}

	removeEvents() {
		window.removeEventListener('resize', this.onResize);
		this.toggle.removeEventListener('click', this.onToggle);
	}

	//events
	onResize() {
		const width = window.innerWidth;

		this.mobile = width <= 1239;
	}

	onMobile() {
		this.list.classList.add('hidden');

		this.opened = false;
	}

	onDesktop() {
		this.list.classList.remove('hidden');

		this.opened = false;
	}

	onToggle() {
		this.opened = !this.opened;
	}

	onOpen() {
		this.list.classList.remove('hidden');

		this.toggle.classList.remove('navigation__toggle_closed');
		this.toggle.classList.add('navigation__toggle_opened');
	}

	onClose() {
		if (this.mobile) {
			this.list.classList.add('hidden');
		}

		this.toggle.classList.remove('navigation__toggle_opened');
		this.toggle.classList.add('navigation__toggle_closed');
	}
}

(function() {
	const headerNavigation = new HeaderNavigation();
}());