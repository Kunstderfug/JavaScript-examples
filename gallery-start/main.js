const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

const newImage = images.map(SRC => {
  const img = new Image();
  img.src = 'images/' + SRC;
  thumbBar.appendChild(img);

  img.onclick = e => {
    displayedImage.src = e.target.src;
  };
});

btn.onclick = () => {
  overlay.classList.toggle('show');
};

/* Wiring up the Darken/Lighten button */
