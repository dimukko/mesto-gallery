// Создание элементов на странице
class NewElement {
    constructor() {
        this.element = null;
        this.container = document.querySelector('.root');
        this.initCallBack = this.initCallBack.bind(this);
    }

    // создание разметки
    create(markup) {
        const createNewTag = document.createElement('div');
        createNewTag.insertAdjacentHTML('beforeend', markup);
        return createNewTag.firstChild;
    }

    // добавление разметки в документ
    render() {
        this.element = this.create(this.template);
        this.setEventList();
        return this.element;
    }

    // прелоадер
    renderLoading(isLoading) {
        if (isLoading) {
            document.querySelector('.spinner').classList.add('spinner_visible');
            document.querySelector('.places-list').classList.add('places-list_hidden');
        } else {
            document.querySelector('.spinner').classList.remove('spinner_visible');
            document.querySelector('.places-list').classList.remove('places-list_hidden');
        }
    }

    // метод для вызова колбэка
    anotherClassCall(fn) {
        this._callBack = fn;
    }

    // проверка колбэка на вшивость и вызов
    initCallBack(item) {
        return typeof this._callBack === 'function' && this._callBack(item);
    }
}