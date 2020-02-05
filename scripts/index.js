// ---------------------------------- Импорт -----------------------------------------------------  //

import Api from './classes/api.js';
import Card from './classes/card.js';
import CardList from './classes/cardlist.js';
import PopupForm from './classes/popup_form.js';
import PopupImage from './classes/popup_image.js';
import User from './classes/user.js';
import UserInfo from './classes/userinfo.js';
import Validation from './classes/validation.js';

// ---------------------------------- Свойства -----------------------------------------------------  //
// Окно с формой новой карточки
const newCardPopupProps = {
    id: 'new-card',
    title: 'Новое место',
    formName: 'new',
    firstFormFieldType: 'text',
    firstFormFieldName: 'name',
    secondFieldType: 'url',
    secondFieldName: 'link',
    firstFormFieldPlaceholder: 'Название',
    secondFormFieldPlaceholder: 'Ссылка на картинку',
    buttonName: 'submit',
    buttonText: '+',
    path: '/cards'
}

// Окно с формой редактирования профиля
const editProfilePopupProps = {
    id: 'edit-profile',
    title: 'Редактирование профиля',
    formName: 'edit',
    firstFormFieldType: 'text',
    firstFormFieldName: 'username',
    secondFieldType: 'text',
    secondFieldName: 'userdesc',
    firstFormFieldPlaceholder: 'Имя',
    secondFormFieldPlaceholder: 'О себе',
    buttonName: 'submit',
    buttonText: 'Сохранить',
    path: '/users/me'
}

// Окно с формой смены пользовательской картинки
const userPicPopupProps = {
    id: 'avatar',
    title: 'Редактирование фото профиля',
    formName: 'edit-user-pic',
    firstFormFieldType: 'text',
    firstFormFieldName: 'none',
    secondFieldType: 'url',
    secondFieldName: 'userpic-link',
    firstFormFieldPlaceholder: 'none',
    secondFormFieldPlaceholder: 'Ссылка на картинку',
    buttonName: 'submit',
    buttonText: 'Сохранить',
    path: '/users/me/avatar'
}


// Свойства API
const accessOptions = {
    url: "http://95.216.175.5/cohort6",
    headers: {
        authorization: "c6b154b0-5bf5-4fe1-a54b-c8f1efaf3b04",
        "Content-Type": "application/json"
    }
}

// ---------------------------------- Переменные -----------------------------------------------------  //

const addButton = document.querySelector(".user-info__button"); // кнопка открытия формы добавления карточки

const editButton = document.querySelector(".user-info__edit-button"); // кнопка открытия редактирования профиля

const rootContainer = document.querySelector(".root"); // main секция страницы

const placesList = document.querySelector(".places-list"); // блок для карточек

const userInfoBlock = document.querySelector(".user-info"); // блок с информацией о профиле пользователя

const userInfoPic = userInfoBlock.querySelector(".user-info__photo"); // фото профиля

// ---------------------------------- Классы -----------------------------------------------------  //

const validation = new Validation(); // валидация

const api = new Api(accessOptions); // API

const user = new User(); // объект для хранения id пользователя

const userInfo = new UserInfo(userInfoBlock, api, user); // информация о пользователе

const editProfilePopup = new PopupForm(editProfilePopupProps, validation, api); // форма редактирования профиля

const newCardPopup = new PopupForm(newCardPopupProps, validation, api); // форма добавления карточки

const userPicPopup = new PopupForm(userPicPopupProps, validation, api, userInfo); // форма смены фото профиля

const cardListRender = new CardList(placesList, api); // рендер карточек

// ---------------------------------- Коллбэки Классов ----------------------------------------------  //

// колбэк для метода addCard чтобы не использовать создание внутри класса другого класса
cardListRender.anotherClassCall((item) => {
    const card = new Card({
        name: item.name,
        link: item.link,
        likes: item.likes.length || 0,
        usersLikes: item.likes,
        _id: item._id,
        ownerId: item.owner._id, 
        api: api,
        user: user
    });
    card.anotherClassCall(() => {
        const preview = new PopupImage(item.link);
        preview.open();
    })
    return card.render();
})

// колбэк добавления новой карточки в блок
newCardPopup.anotherClassCall((item) => {
    cardListRender.addCard(item);
})

// для загрузки страницы
const onLoad = () => {
    userInfo.getUserInfo("/users/me");
    cardListRender.renderList("/cards");
}


// ---------------------------------- Слушатели -----------------------------------------------------  //

addButton.addEventListener('click', () => newCardPopup.open()); // открытие формы добавления карточки
editButton.addEventListener('click', () => editProfilePopup.open()); // открытие формы редактирования профиля
userInfoPic.addEventListener('click', () => userPicPopup.open()); // открытие формы смены фото профиля
window.addEventListener("load", onLoad()); // инициализация рендера