//Get a dog photo from the dog.ceo api and place the photo in the DOM

let arrowList = document.querySelectorAll(".arrow");
let input = document.querySelector("#slider");
let output = document.querySelector(".sliderText");
let left = "left-arrow";
let right = "right-arrow";
let position = 0; //variable  for tracking arrow clicks
let breed;
const breedList = [];
let flag = false;
let arrayOfList = [];

let inputText = document.querySelector(".search")
let breedNames = document.querySelector("ul.breeds")

//creating first the list of all breeds to be used in the app
const url1 = `https://dog.ceo/api/breeds/list/all`;
fetch(url1)
    .then(res => res.json())
    .then(data => {
        for (let breed in data.message) {
            breedList.push(breed);
        }
        breedList.forEach(x => {
            let newList = document.createElement("li")
            newList.innerText = x;
            breedNames.appendChild(newList);
            newList.classList.add(".breed")
        })
    });


//when user clicks input text field, list of all breeds pops up
document.addEventListener("click", event => {
    if (event.target.className == "search") {
        inputText.value = ""; //when the user again clicks the input field then it...
        filterString();  //...clears the screen and again displays all the breeds. 
        breedNames.classList.add("show");
        arrayOfList = document.querySelectorAll("li");
        arrayOfList.forEach(x => {
            x.addEventListener("click", changeBreed);
        })
        copyBreedList = [...arrayOfList]
    }
    else
        breedNames.classList.remove("show");
})

//for the input text search when user writes something
inputText.addEventListener("keyup", filterString);

//function to implement search filter
function filterString() {
    arrayOfList.forEach(x => {
        if (x.innerText.toLowerCase().includes(inputText.value.toLowerCase())) {
            x.style.display = "";  
            arrayOfList.forEach(x => {
                // x[inputText.value.length].style.color = "#E80F88";
            //    x.style.color = "#E80F88";
            })     
            // inputText.style.color = "#E80F88"    
        }
        else x.style.display = "none"
    })
}

//function to change the breed when user clicks on any breed
function changeBreed(event) {
    inputText.value = event.target.innerText;
    position = input.value;
    breed = inputText.value;
    const url = `https://dog.ceo/api/breed/${breed}/images`;
    fetch(url)
        .then((res) => res.json()) // parse response as JSON
        .then((data) => {
            document.querySelector("img").src = data.message[0];
            input.max = data.message.length - 1;
            input.value = 0;
            output.innerText = 1;
        })
        .catch((err) => {
            console.log(`error ${err}`);
        });
}

//using slider to change the images
input.addEventListener('input', event => {
    output.innerText = Number(input.value) + 1;

    const url = `https://dog.ceo/api/breed/${breed}/images`;
    fetch(url)
        .then((res) => res.json()) // parse response as JSON
        .then((data) => {

            input.max = data.message.length - 1;
            document.querySelector("img").src = data.message[input.value];
            output.innerText = Number(input.value) + 1;
        })
        .catch((err) => {
            console.log(`error ${err}`);
        });

})

//using arrow buttons to change the images
arrowList.forEach(x => x.addEventListener("click", changePic));
function changePic(event) {


    let className = event.target.classList[1];

    const url = `https://dog.ceo/api/breed/${breed}/images`;
    fetch(url)
        .then((res) => res.json()) // parse response as JSON
        .then((data) => {
            let numberOfImages = data.message.length;
            let imageClass = event.target.className.split(" ")[1];
            position = input.value;
            document.querySelector("img").src = data.message[order(imageClass, numberOfImages)];
            output.innerText = Number(position) + 1;
        })
        .catch((err) => {
            console.log(`error ${err}`);
        });
}

// function to check if next or prrevious arrow got clicked
function order(imageClass, numberOfImages) {
    if (imageClass == left) {
        if (position <= 0) {

            position = numberOfImages - 1;
            input.value = numberOfImages - 1;
            return position;
        }
        input.value--;
        position--;
        return position;
    }

    if (imageClass == right) {
        if (position >= numberOfImages - 1) {
            position = 0;
            input.value = 0;
            return position;
        }
        input.value++;
        position++;
        return position;
    }
}


