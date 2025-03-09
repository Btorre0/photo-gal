const images = [
    "gallery/IMG_0010.png",
    "gallery/IMG_0015.png",
    "gallery/IMG_0039.png",
    "gallery/IMG_0131.png",
    "gallery/IMG_0132.png",
    "gallery/IMG_0133.png",
    "gallery/IMG_0140.png",
    "gallery/IMG_0141.png",
    "gallery/IMG_0310.png",
    "gallery/IMG_0313.png",
    "gallery/IMG_0440.png",
    "gallery/IMG_0445.png"
];

let currentIndex = 0;
function openLightbox(index, event) {
    event.preventDefault();
    currentIndex = index;
    document.getElementById("lightbox-img").src = images[currentIndex];
    document.getElementById("lightbox").classList.add("active"); // Add class instead of changing display
}

function closeLightbox() {
    document.getElementById("lightbox").classList.remove("active"); // Remove class to hide
}


// Change image in lightbox
function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    document.getElementById("lightbox-img").src = images[currentIndex];
}

// Keyboard navigation support
document.addEventListener("keydown", function (event) {
    document.getElementById("lightbox").style.display = "none";
    if (document.getElementById("lightbox").style.display === "block") {
        if (event.key === "ArrowRight") {
            changeImage(1);
        } else if (event.key === "ArrowLeft") {
            changeImage(-1);
        } else if (event.key === "Escape") {
            closeLightbox();
        }
    }
});
