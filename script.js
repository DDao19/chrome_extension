let myLeads = [];
const error = document.querySelector(".error");
const inputEl = document.getElementById("input-el");
const inputBtnEl = document.getElementById("input-btn");
const deleteBtnEl = document.getElementById("delete-btn");
const tabBtnEl = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

// this fucntion helps with displaying the leads in order once entered
function render(leads) {
  let listItems = "";

  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li class='list-item'>
      <a class="underline" href="${leads[i]}" target="_blank">${leads[i]}</a>
    </li>`;
  }

  ulEl.innerHTML = listItems;
}

// Handle input button click
inputBtnEl.addEventListener("click", function (event) {
  // Error handling and styling or error
  if (inputEl.value === "" || inputEl.value.replace(/\s+/g, "").length == 0) {
    inputEl.focus();
    inputEl.value = "";

    error.setAttribute("id", "errorMsg");
    error.textContent = "Please enter a valid URL";
  } else if (inputEl.value !== "") {
    error.removeAttribute("id");
    error.textContent = "";

    let leads = inputEl.value;
    myLeads.push(leads);
    inputEl.value = ""; // clear input text field

    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    render(myLeads);
  }
});

tabBtnEl.addEventListener("click", function () {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

// Handle delete button click
deleteBtnEl.addEventListener("click", function () {
  if (myLeads.length !== 0) {
    error.removeAttribute("id");
    error.textContent = "";

    localStorage.clear();
    myLeads = [];
    render(myLeads);
  } else if (myLeads.length === 0) {
    error.setAttribute("id", "errorMsg");
    error.textContent = "There are no leads to delete.";
  }
});
