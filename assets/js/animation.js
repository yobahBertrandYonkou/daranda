function displayCards() {
    // Select all the cards
    let cards = document.querySelectorAll('.card-container');

    // IntersectionObserver callback function
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'visible' class when the card is in the viewport
                entry.target.classList.add('visible');
                // Stop observing the card once it's visible
                observer.unobserve(entry.target);
            }
        });
    };

    // Create an IntersectionObserver instance
    const observer = new IntersectionObserver(observerCallback, {
        root: null, // Use the viewport as the root
        threshold: 0.5 // Trigger when 10% of the card is visible
    });

    // Observe each card
    cards.forEach(card => {
        observer.observe(card);
    });

}

// Create 50 random elements on page load
window.onload = () => {
    displayCards();
    highlightCards();
};
