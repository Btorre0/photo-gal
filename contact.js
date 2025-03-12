document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var formData = new FormData(this);

    fetch("contact.php", {
        method: "POST",
        headers: {
            "Accept": "application/json"
        },
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data.trim() === "success") { 
            document.getElementById("contact-form").style.display = "none"; 
            document.getElementById("confirmation-message").classList.remove("hidden"); 
        } else {
            alert("Error: Sorry, information is yet to be stored. Try again later or contact me through social. You can find more information in my socials!" + data);
        }
    })
    .catch(error => console.error("Error:", error));
});
