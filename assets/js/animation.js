// card sequence highlight
function highlightCards() {
    // get cards
    let cards = document.querySelectorAll('.how-its-done');

    let index = 0;
    setInterval(() => {
        // get ref to card
        let card = cards[index++ % cards.length];

        // apply glow
        card.style.background = "radial-gradient(circle, rgba(50, 158, 168, 0.1) 20%, transparent 50%)"

        // transform card
        card.style.transform = "scale(1.1)";

        // remove glow
        setTimeout(() => {
            card.style.background = "none";
            card.style.transform = "none";
        }, 1000)
    }, 1500);
}

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
