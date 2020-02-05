class Api {
  constructor(props) {
    this.url = props.url;
    this.headers = props.headers;
  }

  // запрос информации с сервера
  get(path) {
    return fetch(`${this.url}${path}`, {
        headers: this.headers
      })
      .then(this.checkStatus)
      .catch(this.showError);
  }

  // обновляем информацию о пользователе
  updateInfo(path, fields) {
    const [input1, input2] = fields;
    return fetch(`${this.url}${path}`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: input1.value,
          about: input2.value
        })
      })
      .then(this.checkStatus)
      .catch(this.showError);
  }

  // обновляем фото профиля
  updateUserPic(path, fields) {
    const [input1, input2] = fields;
    return fetch(`${this.url}${path}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: input2.value
      })
    })
      .then(this.checkStatus)
      .catch(this.showError);
  }

  // добавляем новую карточку на сервер
  postCard(path, fields) {
    const [input1, input2] = fields;
    return fetch(`${this.url}${path}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: input1.value,
          link: input2.value
        })
      })
      .then(this.checkStatus)
      .catch(this.showError);
  }
  
  // удаляем карточку
  delete(path, id) {
    return fetch(`${this.url}${path}/${id}`, {
      method: "DELETE",
      headers: this.headers
    })
      .then(this.checkStatus)
      .then(res => res)
      .catch(this.showError);
  }

  // метод для установки лайка
  put(path, id) {
    return fetch(`${this.url}${path}/${id}`, {
      method: "PUT",
      headers: this.headers
    })
      .then(this.checkStatus)
      .catch(this.showError);
  }


  //проверка статуса ответа от сервера
  checkStatus(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  // отобразить в консоли ошибку
  showError(err) {
    return console.log(err);
  }
}