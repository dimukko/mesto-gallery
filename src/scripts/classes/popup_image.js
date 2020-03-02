// Создание всплывающего окна с фото
import Popup from './popup.js';

export default class PopupImage extends Popup {
  constructor(imgUrl) {
    super();
    this._imgUrl = imgUrl;
  }

  // шаблон разметки всплывающего окна с фото
  get template() {
    return `
      <div class="popup" id="photo-popup">
        <div class="popup__photo">
          <img src="${require('../../images/close.svg')}" alt="" class="popup__close" />
          <img src="${this._imgUrl}" alt="" class="popup__img" />
        </img>
      </div>
    </div> `.trim();
  }
}