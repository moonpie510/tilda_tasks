class City {
    cities = {
        Sochi: {title: 'Сочи', phone: '8-862-400-30-20', address: 'ул. Центральная, д. 1'},
        Moscow: {title: 'Москва', phone: '8-800-555-35-35', address: 'ул. Примерная, д. 123'},
        "St Petersburg": {title: 'Санкт-Петербург', phone: '8-812-100-40-80', address: 'Невский пр., д. 100'},
    }

    selectors = {
        cityModal: 'cityModal',
        closeModal: 'closeModal',
        currentCity: 'currentCity',
        footerCity: 'footerCity',
        citySearch: 'citySearch',
        cityButtons: '.modal__city',
        headerPhone: '.header__phone',
        footerPhone: '.footer__phone',
        footerAddress: '.footer__address',
        citiesList: 'citiesList',
    }

    stateClasses = {
        modalShow: 'modal--show',
        modalActive: 'modal__city--active',
    }

    localStorageKey = 'selectedCity'

    constructor() {
        this.citiyListContainerElement = document.getElementById(this.selectors.citiesList);
        this.initCity();

        // Получаем элементы страницы
        this.modalElement = document.getElementById(this.selectors.cityModal);
        this.closeModalElement = document.getElementById(this.selectors.closeModal);
        this.currentCityElement = document.getElementById(this.selectors.currentCity);
        this.footerCityElement = document.getElementById(this.selectors.footerCity);
        this.citySearchElement = document.getElementById(this.selectors.citySearch);
        this.cityButtonsElements = document.querySelectorAll(this.selectors.cityButtons);
        this.phoneElement = document.querySelector(this.selectors.headerPhone);
        this.footerPhoneElement = document.querySelector(this.selectors.footerPhone);
        this.addressElement = document.querySelector(this.selectors.footerAddress);

        // Связываем обработчики событий
        this.bindEvents();
    }

    renderCityButtons() {
        this.citiyListContainerElement.innerHTML = '';

        for (const [cityKey, cityData] of Object.entries(this.cities)) {
            const button = document.createElement('button');
            button.className = 'modal__city';
            button.dataset.city = cityKey;
            button.textContent = cityData.title;

            button.addEventListener('click', this.onChoseCity);

            this.citiyListContainerElement.appendChild(button);
        }
    }

    async initCity() {
        this.renderCityButtons()
        this.currentCity = await this.getCity();
        this.updateCity();
    }

    async getCity() {
        let city = localStorage.getItem(this.localStorageKey)

        if (city) {
            return city;
        }

        try {
            const response = await fetch('https://geolocation-db.com/json/');
            const data = await response.json();
            city = data.city;

            if (!this.cities[city]) {
                return 'Moscow';
            }

            return city;
        } catch (error) {
            return 'Moscow';
        }
    }

    onClickOpenModalButton = () => {
        this.modalElement.classList.add(this.stateClasses.modalShow);
        document.body.style.overflow = 'hidden';

        // Помечаем текущий город как активный
        this.cityButtonsElements.forEach(btn => {
            if (btn.dataset.city === this.currentCity) {
                btn.classList.add(this.stateClasses.modalActive);
            } else {
                btn.classList.remove(this.stateClasses.modalActive);
            }
        });
    }

    onClickCloseButton = () => {
        this.closeModal();
    }

    onClickOutsideModal = (event) => {
        if (event.target === this.modalElement) {
            this.closeModal();
        }
    }

    onClickEscape = (event) => {
        if (event.key === 'Escape' && this.modalElement.classList.contains(this.stateClasses.modalShow)) {
            this.closeModal();
        }
    }

    onChoseCity = (event) => {
        this.currentCity = event.target.dataset.city;
        this.updateCity();
        this.closeModal();
    }

    onSearchCity = (event) => {
        const searchText = event.target.value.toLowerCase();
        this.cityButtonsElements.forEach(btn => {
            const cityName = btn.textContent.toLowerCase();
            if (cityName.includes(searchText)) {
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }
        });
    }

    closeModal = () => {
        this.modalElement.classList.remove(this.stateClasses.modalShow);
        document.body.style.overflow = 'auto';
        this.citySearchElement.value = '';

        this.cityButtonsElements.forEach(btn => {
            btn.style.display = 'block';
        });
    }

    bindEvents() {
        this.currentCityElement.addEventListener('click', this.onClickOpenModalButton);
        this.closeModalElement.addEventListener('click', this.onClickCloseButton);
        this.modalElement.addEventListener('click', this.onClickOutsideModal);
        document.addEventListener('keydown', this.onClickEscape);

        this.cityButtonsElements.forEach(btn => {
            btn.addEventListener('click', this.onChoseCity);
        });

        this.citySearchElement.addEventListener('input', this.onSearchCity);
    }

    updateCity() {
        this.currentCityElement.textContent = this.cities[this.currentCity].title;
        this.footerCityElement.textContent = this.cities[this.currentCity].title;
        this.phoneElement.textContent = this.cities[this.currentCity].phone;
        this.footerPhoneElement.textContent = this.cities[this.currentCity].phone;
        this.addressElement.textContent = this.cities[this.currentCity].address;

        localStorage.setItem(this.localStorageKey, this.currentCity);
    }
}

export default City;