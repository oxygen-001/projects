const editButton = document.querySelector(".navSecondButton");
const modal = document.querySelector(".modal");
const closeIcon = document.querySelector(".closeIcon");
const saveButton = document.querySelector(".save_button");
const nameBook = document.querySelector("#name_book");
const author = document.querySelector("#author");
const photo = document.querySelector("#photo");
const date = document.querySelector("#date");
const reyting = document.querySelector("#reyting");
const price = document.querySelector("#price");
const category = document.querySelector("#category");
const form = document.querySelector("#form");
let errorInputs = false;
let for_books = document.querySelector(".for_books");
let door = document.querySelector(".door");
let booksArray = [];

let globalImages;
let step = 2;
let page = 1;

function saveBookData() {
  // e.preventDefault()
  uploadImg(globalImages).then((res) => {
    const bookObj = {
      name_book: nameBook.value,
      author: author.value,
      photo: res,
      date: date.value,
      reyting: reyting.value,
      price: price.value,
      category: category.value,
    };

    modal.style.transform = "translateY(-100%)";

    let arr = Object.keys(bookObj).filter((key) => !bookObj[key]);

    if (arr.length) {
      arr.forEach((item) => {
        document.querySelector(`#${item}`).classList.add("error_input");
      });

      return;
    }

    fetch("https://books-4e66d-default-rtdb.firebaseio.com/books.json", {
      method: "POST",

      body: JSON.stringify(bookObj),
    })
      .then((res) => {
        if (!res.ok) throw new Error("something wrong");
        return res.json();
      })
      .then((res) => {
        console.log(res);
        getAllBooks();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  });
}

saveButton.addEventListener("click", saveBookData);

closeIcon.addEventListener("click", () => {
  modal.style.transform = "translateY(-100%)";
});

editButton.addEventListener("click", (e) => {
  modal.style.transform = "translateY(0px)";
});

Array.from(form).forEach((item) => {
  item.addEventListener("change", (e) => {
    // if(e.target.value)
  });
});

function getAllBooks() {
  fetch("https://books-4e66d-default-rtdb.firebaseio.com/books.json")
    .then((res) => {
      if (!res.ok) throw new Error("something wrong");
      return res.json();
    })
    .then((res) => {
      booksArray = Object.keys(res || {}).map((item) => {
        return {
          ...res[item],
          id: item,
        };
      });
      console.log(booksArray);
      renderPageinationElements(booksArray.length);

      console.log(choppedBookItems(booksArray));
      renderBookElements(choppedBookItems(booksArray));
    })
    .catch((err) => {})
    .finally(() => {});
}

function renderBookElements() {
  let result = choppedBookItems(
    booksArray.map((item, index) => {
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
    })
  ).join("");

  for_books.innerHTML = result;
}

getAllBooks();

function deleteBookItem(id) {
  
  
  let findedElement = booksArray.find((item, index) => index === id);

  fetch(
    `https://books-4e66d-default-rtdb.firebaseio.com/books/${findedElement.id}.json`,
    {
      method: "DELETE",
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error("something wrong : ");

      return res.json();
    })
    .then((res) => {
      console.log("malumot ochdi");

      getAllBooks();
    })
    .catch((err) => {})
    .finally(() => {});
}

function postImage(e) {
  globalImages = e.target.files;
  // const formData = new FormData();

  // Promise.all(
  //   [...e.target.files].map((item) => {
  //     formData.append("formfile", item);

  //     return fetch("https://api.oqot.uz/api/1.0/file/upload", {
  //       method: "POST",
  //       body: formData,
  //     }).then((res) => {
  //       return res.json();
  //     });
  //   })
  // )
  //   .then((res) => {
  //     globalImageUrl = res
  //       .map((item) => {
  //         return `https:api.oqot.uz/api/1.0/file/download/${item}`;
  //       })
  //       .join(" ");
  //   })
  //   .catch((err) => {});

  const file = e.target.files[0];
  document
    .querySelector("#showPhoto")
    .setAttribute("src", URL.createObjectURL(file));
}

function uploadImg(files) {
  const formData = new FormData();
  let promise = new Promise((res3, rej) => {
    Promise.all(
      [...files].map((item) => {
        formData.append("formfile", item);

        return fetch("https://api.oqot.uz/api/1.0/file/upload", {
          method: "POST",
          body: formData,
        }).then((res) => {
          return res.json();
        });
      })
    )
      .then((res) => {
        res3(
          res
            .map((item) => {
              return `https:api.oqot.uz/api/1.0/file/download/${item}`;
            })
            .join(" ")
        );
      })
      .catch((err) => {});
  });

  return promise;
}

door.addEventListener("click", () => {
  window.location.replace("../login.html");
});

document.querySelector("#photo").addEventListener("change", postImage);

function renderPageinationElements(length) {
  let result = "";
  let pageNumbers = Math.ceil(length / step);

  for (let i = 0; i < pageNumbers; i++) {
    result += `  <button class="buttons ${page == i + 1 ? "active" : ""}">${
      i + 1
    }</button>`;
  }

  document.querySelector(".button-container").innerHTML = result;
  document.querySelectorAll(".buttons").forEach((item) => {
    item.addEventListener("click", (e) => {
      page = +e.target.innerHTML;
      getAllBooks();
    });
  });
}

function choppedBookItems(books) {
  let start = page * step - step;
  let end = start + step;

  return books.slice(start, end);
}



