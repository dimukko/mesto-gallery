// Получение и отрисовка данных пользователя
class UserInfo extends NewElement {
  constructor(container, api, user) {
    super();
    this.name = container.querySelector(".user-info__name");
    this.about = container.querySelector(".user-info__job");
    this.avatar = container.querySelector(".user-info__photo");
    this.api = api;
    this.user = user;
  }

  getUserInfo(path) {
    this.renderLoading(true);
    this.api
      .get(path)
      .then(user => {
        this.name.textContent = user.name;
        this.about.textContent = user.about;
        this.avatar.style.backgroundImage = `url(${user.avatar})`;
        this.user.id = user._id;
      })
      .finally(() => {
        this.renderLoading(false);
      })
  }
}