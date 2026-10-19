console.log("Client side js!");

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const search = document.querySelector("button");
const message1 = document.querySelector(".message1");
const message2 = document.querySelector(".message2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = input.value;

  message1.textContent = "Loading...";
  message2.textContent = "";
  if (!location) {
    message1.textContent =
      "You must enter an adress to see the weather update!";
  } else {
    fetch("/weather?address=" + location).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          message1.textContent = data.error;
        } else {
          message1.textContent = data.location;
          message2.textContent = data.forecast;
        }
      });
    });
  }
});
