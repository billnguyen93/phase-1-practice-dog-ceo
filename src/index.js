document.addEventListener('DOMContentLoaded', function() {

const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
let breeds = []
const ul = document.querySelector("#dog-breeds")

fetch(imgUrl)
  .then(resp => resp.json())
  .then(data => data.message.forEach(dogImage => renderImage(dogImage)))

function renderImage(dogImage) {
  const container = document.querySelector("#dog-image-container")
  const image = document.createElement('img')
  image.src = dogImage
  container.append(image)
  
}   

fetch(breedUrl)
  .then(resp => resp.json())
  .then(data => {
      breeds = Object.keys(data.message)
      renderBreeds(breeds)
  })

function renderBreeds(breeds) {
  
  breeds.forEach(breed => {
    const li = document.createElement('li')
    li.innerText = breed
    ul.append(li)
    li.addEventListener('click', changeColor)
  })
}

function changeColor(e) {
  e.target.style.color = "red"
}

const dropdown = document.getElementById('breed-dropdown')
dropdown.addEventListener('change', handleChange)

function handleChange(e) {
  let letter = e.target.value
  let filteredBreeds = breeds.filter(breeds => breeds.startsWith(letter))
  ul.textContent = ''
  renderBreeds(filteredBreeds)
}

})