// arr to hold all data 
let URLArray = [];

// function for saving current tab url to localstorage 
const saveBtn = document.querySelector('#save_tab');
saveBtn.addEventListener('click', () => {
    // fatching data from locatstorage and converting it to an array 
    let localStorageData = JSON.parse(localStorage.getItem('URL'));

    // chacking if localStorage is null 
    if (localStorageData) {
        URLArray = localStorageData;
    }

    // query for getting active tab's url for chrome extension 
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        URLArray.push(tabs[0].url);

        // to set item in localStorage as string 
        localStorage.setItem("URL", JSON.stringify(URLArray))

        // calling showData function 
        showData();
    })
});


// function for saving input value to localstorage 
const saveInput = document.querySelector('#save_input');
saveInput.addEventListener('click', () => {
    const inputEl = document.querySelector('#input-el');
    // fatching data from locatstorage and converting it to an array 
    let localStorageData = JSON.parse(localStorage.getItem('URL'));

    // chacking if localStorage is null
    if (localStorageData) {
        URLArray = localStorageData;
    }

    // checking if inputEl is not null 
    if (inputEl.value) {
        URLArray.push(inputEl.value);
    } else {
        const invalidPopup = document.querySelector('.invalid_popup');
        invalidPopup.style.display = 'block';
        inputEl.style.border = '2px solid red';
        setTimeout(() => {
            invalidPopup.style.display = 'none';
            inputEl.style.borderColor = 'black';
        }, 1000)
    }

    // to set item in localStorage as string
    localStorage.setItem("URL", JSON.stringify(URLArray));
    inputEl.value = '';

    // calling showData function 
    showData();
})

// function for deleting all data from localstorage 
const deleteAll = document.querySelector('#delete_all');
deleteAll.addEventListener('click', () => {

    // to clear all localStorage data 
    localStorage.clear();

    // calling showData function 
    showData();
})

// function to display all localstorage data
function showData() {
    // fatching data from locatstorage and converting it to an array 
    let localStorageData = JSON.parse(localStorage.getItem('URL'));
    const dataContainer = document.querySelector('.data-container');
    let lis = '';
    if (localStorageData) {
        for (let i = 0; i < localStorageData.length; i++) {
            lis +=
                `   <li>
                        <a href='${localStorageData[i]}'>${localStorageData[i]}</a>
                    </li>
                 `;
        }
    }

    dataContainer.innerHTML = lis;
}

// calling showData function 
showData();
