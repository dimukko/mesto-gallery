//Родительский класс для создания всплывающих окон
import NewElement from './new-element.js';

export default class Popup extends NewElement {
  constructor() {
    super();
  }

  // открыть окно
  open() {
    this.container.appendChild(this.render());
    this.element.classList.add('popup_is-opened');
  }

  // закрыть окно
  close() {
    this.element.classList.remove('popup_is-opened');
    this.removeEventList();
    this.element.remove();
  }

  // установка слушателей
  setEventList() {
    this.element.querySelector('.popup__close').addEventListener("click", () => this.close());
  }

  // удаление слушателей
  removeEventList() {
    this.element.querySelector('.popup__close').removeEventListener("click", () => this.close());
  }
}