// Создание карточки
import NewElement from './new-element.js';

export default class Card extends NewElement {
    constructor(props) {
        super();
        this._imageLink = props.link; // ссылка на картинку
        this._imageName = props.name; // имя карточки
        this._likes = props.likes; // количество лайков
        this._usersLike = props.usersLikes; // кто полайкал
        this._remove = this._remove.bind(this); // бинд для удаления
        this._like = this._like.bind(this); // бинд для лайка
        this._card_id = props._id; // id карточки
        this._owner_id = props.ownerId; // id владельца карточки
        this.api = props.api; // api
        this.user = props.user; // объект с id пользователя
    }

    // шаблон разметки для новой карточки
    get template() {
        const displayDelButton =
            this._owner_id === this.user.id ? "block" : "none";

        const isLiked = this._usersLike.some(like => this.user.id === like._id);

        const displayLikeIcon =
            isLiked === true ? "place-card__like-icon_liked" : "";

        return `
		<div class="place-card" id="${this._card_id}">
			<div class="place-card__image" style="background-image: url(${this._imageLink});">
				<button class="place-card__delete-icon" style="display: ${displayDelButton}"></button>
			</div>
			<div class="place-card__description">
                <h3 class="place-card__name">${this._imageName}</h3>
                <div class="place-card__likes-container">
                <button class="place-card__like-icon ${displayLikeIcon}"></button>
                <p class="place-card__likes">${this._likes}</p>
                </div>
			</div>
		</div>
		`.trim()
    }

    // удаление карточки
    _remove() {
        if (confirm("Delete this card?")) {
            this.api.delete("/cards", this._card_id);
        }
        this.removeEventList();
        this.element.remove();
    }

    // отметка лайк
    _like() {
        const likeIcon = this.element.querySelector(".place-card__like-icon");
        const likesNum = this.element.querySelector(".place-card__likes");

        if (likeIcon.classList.contains("place-card__like-icon_liked")) {
            this.api.delete("/cards/like", this._card_id).then(item => {
                likesNum.textContent = item.likes.length;
            });
        } else {
            this.api.put("/cards/like", this._card_id).then(item => {
                likesNum.textContent = item.likes.length;
            });
        }

        likeIcon.classList.toggle("place-card__like-icon_liked");

    }

    // установка слушателей
    setEventList() {
        this.element.querySelector('.place-card__delete-icon').addEventListener('click', this._remove);
        this.element.querySelector('.place-card__like-icon').addEventListener('click', this._like);
        this.element.querySelector('.place-card__image').addEventListener('click', this.initCallBack);
    }

    // удаление слушателей 
    removeEventList() {
        this.element.querySelector('.place-card__delete-icon').removeEventListener('click', this._remove);
        this.element.querySelector('.place-card__like-icon').removeEventListener('click', this._like);
        this.element.querySelector('.place-card__image').removeEventListener('click', this.initCallBack);
    }

}