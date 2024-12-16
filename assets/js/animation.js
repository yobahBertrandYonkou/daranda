// Function to create a random element with a depth effect
function createRandomElement() {
    const size = Math.random() * 50 + 20; // Random size between 20px and 70px
    const x = Math.random() * window.innerWidth; // Random X position
    const y = Math.random() * window.innerHeight; // Random Y position
    const distanceFactor = Math.random(); // Random value to simulate depth (0-1)

    // Create a new div element
    const element = document.createElement('div');
    element.classList.add('random-element');

    // Apply random size, position, and opacity to simulate depth
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.top = `${y}px`;
    element.style.left = `${x}px`;

    // Adjust opacity and size for depth effect
    const opacity = 1 - distanceFactor; // Closer elements have higher opacity
    const scaledSize = size * (1 - distanceFactor * 0.5); // Reduce size for depth
    element.style.transform = `scale(${scaledSize / size})`; // Apply size scaling for depth

    // Generate a random color from the predefined color arrays
    const color = getRandomColor(); // Generate a random color from the arrays
    element.style.backgroundColor = color;

    // Add the radial gradient glow effect using the color
    const glowIntensity = Math.random() * 0.3 + 0.2; // Random intensity for the gradient
    element.style.background = `radial-gradient(circle, ${color} ${glowIntensity * 10}%, transparent 60%)`;

    // Set the opacity of the element itself
    const randomOpacityAdjustment = Math.random() * 0.5 + 0.5; // Random factor between 0.5 and 1.0
    const finalOpacity = opacity * randomOpacityAdjustment; // Apply the adjustment
    element.style.opacity = finalOpacity;

    // Append the element to the body
    document.body.appendChild(element);

    // Optionally, animate the element's position to give a floating effect
    animateElement(element);
}

// Function to generate a random color from predefined color arrays
function getRandomColor() {
    const colors1 = ["#ea5545", "#f46a9b", "#ef9b20", "#edbf33", "#ede15b", "#bdcf32", "#87bc45", "#27aeef", "#b33dc6"];
    const colors2 = ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"];
    const colors3 = ["#b30000", "#7c1158", "#4421af", "#1a53ff", "#0d88e6", "#00b7c7", "#5ad45a", "#8be04e", "#ebdc78"];
    const colors4 = ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"];

    // Combine all color arrays
    const allColors = [...colors1, ...colors2, ...colors3, ...colors4];

    // Pick a random color from the combined array
    const randomIndex = Math.floor(Math.random() * allColors.length);
    return allColors[randomIndex];
}

// Function to animate an element, making it float
function animateElement(element) {
    const duration = Math.random() * 10 + 5; // Random duration for animation (5-15 seconds)
    const animationDelay = Math.random() * 5; // Random delay before starting

    element.style.animation = `float ${duration}s ease-in-out ${animationDelay}s infinite`;

    // Add a keyframes animation for floating effect
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-50px); }
            100% { transform: translateY(0); }
        }
    `, styleSheet.cssRules.length);
}

// Function to create multiple random elements
function createMultipleRandomElements(count) {
    for (let i = 0; i < count; i++) {
        createRandomElement();
    }
}

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
    createMultipleRandomElements(50);
    highlightCards();
};
