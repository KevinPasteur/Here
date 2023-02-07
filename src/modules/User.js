class User {
  title;
  firstname;
  lastname;
  age;
  city;
  country;
  email;
  picture;
  element;
  isPresent = false;

  constructor(user) {
    this.title = user.title;
    this.firstname = user.first;
    this.lastname = user.last;
    this.age = user.age;
    this.city = user.city;
    this.country = user.country;
    this.email = user.email;
    this.picture = user.picture;
    this.element = this.#generateElement();
    this.element.addEventListener("click", this.#toggleIsPresent.bind(this));
  }

  #generateElement() {
    const elementDivUser = document.createElement("div");

    const childHTML = `
    <img src="${this.picture}">
    <div class="user--info">
        <h1>${this.title} ${this.firstname} ${this.lastname}</h1>
        <p>${this.age} years old</p>
        <p>${this.city}, ${this.country}</p>
    </div>
    <a href="${this.email}">
        <span class="mail">✉️</span>
    </a>
    `;

    elementDivUser.classList.add("user");
    elementDivUser.dataset.present = this.isPresent;
    elementDivUser.insertAdjacentHTML("afterbegin", childHTML);

    return elementDivUser;
  }

  render() {
    document.querySelector("main").appendChild(this.element);
    return this;
  }

  #toggleIsPresent() {
    this.isPresent = !this.isPresent;
    this.element.dataset.present = this.isPresent;
  }
}

export default User;
