document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch("contact.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.trim() === "success") {
                form.style.display = "none";
                document.getElementById("confirmation-message").classList.remove("hidden");
            } else {
                alert("Error: " + data);
                console.warn("Server responded with:", data);
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            alert("An error occurred while sending the form. Please check the console for details.");
        });
    });
});
