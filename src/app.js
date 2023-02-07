import User from "./modules/User.js";

const listUsers = [];

const main = document.querySelector("main");
const elementFilters = document.querySelector(".filters");

const getUsers = async () => {
  const response = await fetch(`https://randomuser.me/api/?results=20`);
  const data = await response.json();

  const users = parseUserData(data);
  users.forEach((element) => {
    listUsers.push(new User(element));
  });

  sortUsersByName(listUsers);
  displayUsers(listUsers);
};

const parseUserData = (rawData) => {
  const users = rawData.results;

  return users.map((el) => {
    return {
      title: el.name.title,
      first: el.name.first,
      last: el.name.last,
      city: el.location.city,
      country: el.location.country,
      age: el.dob.age,
      email: el.email,
      picture: el.picture.large,
    };
  });
};

//src = https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
const sortUsersByName = (users) => {
  // sort by name
  users.sort((a, b) => {
    const nameA = a.lastname.toUpperCase(); // ignore upper and lowercase
    const nameB = b.lastname.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
};

//src = https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
const sortUsersByAge = (users) => {
  // sort by age
  users.sort((a, b) => {
    const ageA = a.age; // ignore upper and lowercase
    const ageB = b.age; // ignore upper and lowercase
    if (ageA < ageB) {
      return -1;
    }
    if (ageA > ageB) {
      return 1;
    }

    // ages must be equal
    return 0;
  });
};

const displayUsers = (users) => {
  main.textContent = "";
  users.forEach((user) => {
    user.render();
  });
};

elementFilters.addEventListener("click", function (e) {
  if (e.target.id == "sort--name") {
    elementFilters.children[1].classList.remove("selected");
    e.target.classList.add("selected");
    sortUsersByName(listUsers);
  }

  if (e.target.id == "sort--age") {
    elementFilters.children[0].classList.remove("selected");
    e.target.classList.add("selected");
    sortUsersByAge(listUsers);
  }

  displayUsers(listUsers);
});

getUsers();
