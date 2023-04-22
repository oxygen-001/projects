const login = document.querySelector("#loginBtn");

login.addEventListener("click", () => {
  window.location.replace("../login.html");

  console.log("ha");
});

function debounce(func, wait) {
  let timeout;

  return function () {
    let context = this;
    let args = arguments;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

function searchElement(searchValue) {}

const debounceChild = debounce(searchElement, 1000);
console(document.querySelector("input").value)
document.querySelector("input"),
  addEventListener("input", (e) => {
    let url = new URL(window.location);

    let query = new URLSearchParams();

    query.append("search");

    window.history.pushState({}, "", url.toString());
  });

function renderBookElements() {
  let result = 
    searchfunc.map((item, index) => {
      let starElement = "";
      for (let i = 0; i < item.reyting; i++) {
        starElement += `<img src="./img/favourites.png" alt="" />`;
      }
      let result = `
        <div class="for_books_elemensts"> <div class="for_left_img">
        <img
          class="photos"
          src="${item.photo}"
          alt=""
        />
      </div>
    
      <div class="for_right_text">
        <h3 class="title">
        ${item.name_book}
        </h3>
    
        <p class="author">${item.author}</p>
        <p class="data">${item.date}</p>
        <p class="reyting">${starElement}</p>
        <p class="price">${item.price}</p>
    
        <div class="for_books_button">
          <button class="editButton">Edit</button>
          <button onclick="deleteBookItem(${index})" class="deleteButton">Delete</button>
        </div>
      </div></div>`;

      return result;
    }
  ).join("");

  for_books.innerHTML = result;
}
