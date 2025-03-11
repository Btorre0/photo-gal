
// document.getElementById("contact-form").addEventListener("submit", function(event) {
//     event.preventDefault();

//     document.getElementById("contact-form").style.display = "none";
//     document.getElementById("confirmation-message").classList.remove("hidden");
// });

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
            alert("Error: data.trim is not successful" + data);
        }
    })
    .catch(error => console.error("Error:", error));
});
