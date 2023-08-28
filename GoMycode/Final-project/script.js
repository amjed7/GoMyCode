// Add an event listener to the difficulty level dropdown
document.getElementById("difLvlsCoding").addEventListener("change", function() {
    var selectedValue = this.value;
    if (selectedValue) {
        window.location.href = selectedValue; // Redirect to the selected URL
    }
});

// Add similar event listeners for the other categories
