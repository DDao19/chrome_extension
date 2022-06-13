let myLeads = [];
const error = document.querySelector(".error");
const inputEl = document.getElementById("input-el");
const buttonEl = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");

buttonEl.addEventListener("click", function (event) {
  // Error handling and styling or error
  if (inputEl.value === "") {
    error.setAttribute("id", "errorMsg");
    error.textContent = "Please enter a valid URL";
  } else if (inputEl.value != "") {
    error.removeAttribute("id");
    error.textContent = "";

    let leads = inputEl.value;
    myLeads.push(leads);
    inputEl.value = ""; // clear input text field
    sortLeads();
  }
});

// this fucntion helps with displaying the leads in order once entered
function sortLeads() {
  let listItems = "";
  for (let i = 0; i < myLeads.length; i++) {
    listItems += `
    <li class='list-item'>
      <a class="underline" href="${myLeads[i]}" target="_blank">${myLeads[i]}</a>
    </li>`;
  }

  ulEl.innerHTML = listItems;
}
