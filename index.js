document.addEventListener("DOMContentLoaded", () => {
  const userFrame = document.getElementById("book-user");
  const coverFrame = document.getElementById("book-cover");
  const titleFrame = document.getElementById("book-title");
  const starsFrame = document.getElementById("book-stars");
  const platformFrame = document.getElementById("book-platform");

  const ratingInput = document.getElementById("form-rating");
  const ratingValue = document.getElementById("rating-value");
  ratingInput.addEventListener("input", () => {
    ratingValue.textContent = ratingInput.value;
  });

  function downloadImage() {
    const div = document.getElementById('book-frame');
    html2canvas(div).then(canvas => {
      const image = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = image;
      link.download = 'share-book.png';
      link.click();
    });
  }

  const downloadButton = document.getElementById("download-button");
  downloadButton.addEventListener("click", (e) => {
    e.preventDefault();
    downloadImage()
  })

  function generateTemplate() {
    const userInput = document.getElementById("form-user");
    const coverInput = document.getElementById("form-cover");

    const name = document.getElementById("form-name").value;
    const rating = parseFloat(document.getElementById("form-rating").value);
    const platform = document.getElementById("form-platform").value;

    userFrame.innerHTML = "";
    coverFrame.innerHTML = "";
    titleFrame.textContent = name;
    starsFrame.innerHTML = "";
    platformFrame.innerHTML = "";

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      const star = document.createElement("i");
      star.className = "fa fa-star";
      starsFrame.appendChild(star);
    }

    if (halfStar) {
      const half = document.createElement("i");
      half.className = "fa fa-star-half";
      starsFrame.appendChild(half);
    }

    if (userInput.files && userInput.files[0]) {
      const readerUser = new FileReader();
      readerUser.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add("user-img");
        userFrame.appendChild(img);
      };
      readerUser.readAsDataURL(userInput.files[0]);
    }

    if (coverInput.files && coverInput.files[0]) {
      const readerCover = new FileReader();
      readerCover.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add("cover-img");
        coverFrame.appendChild(img);
      };
      readerCover.readAsDataURL(coverInput.files[0]);
    }

    const img = document.createElement("img");
    img.src = `${platform}.png`;
    platformFrame.appendChild(img);

    downloadButton.classList.remove("hidden");
  }

  const formSubmit = document.getElementById("form-submit");
  formSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    generateTemplate();
  })
});