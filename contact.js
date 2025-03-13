document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();

        var formData = new FormData(this);

        fetch("contact.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.trim() === "success") { 
                document.querySelector("form").style.display = "none"; 
                document.getElementById("confirmation-message").classList.remove("hidden"); 
            } else {
                alert("Error: alert " + data);
            }
        })
        .catch(error => console.error("Error: error 1", error));
    });
});
