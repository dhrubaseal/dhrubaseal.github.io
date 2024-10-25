document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.querySelector(".yes-btn");
    const noBtn = document.querySelector(".no-btn");
    const question = document.querySelector(".question");
    const gif = document.querySelector(".gif");
    const wrapper = document.querySelector(".wrapper");

    // Function to create and animate hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animation = `floatHeart ${Math.random() * 2 + 3}s ease-in-out`;
        document.body.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => heart.remove(), 5000);
    }

    // Function to handle successful click
    function handleSuccess() {
        question.textContent = "I love you too! ❤️";
        question.classList.add('success');
        gif.src = "https://i.giphy.com/media/Vuw9m5wXviFIQ/giphy.gif";
        
        // Add fade out animation to buttons
        yesBtn.style.transition = 'all 0.5s ease';
        noBtn.style.transition = 'all 0.5s ease';
        yesBtn.style.opacity = '0';
        noBtn.style.opacity = '0';
        
        // Create multiple hearts
        for (let i = 0; i < 15; i++) {
            setTimeout(() => createHeart(), i * 200);
        }

        // Remove buttons after fade out
        setTimeout(() => {
            yesBtn.style.display = 'none';
            noBtn.style.display = 'none';
        }, 500);
    }

    // Handle Yes button click
    yesBtn.addEventListener("click", handleSuccess);

    // Handle No button hover
    noBtn.addEventListener("mouseover", () => {
        const wrapperRect = wrapper.getBoundingClientRect();
        const noBtnRect = noBtn.getBoundingClientRect();

        // Calculate boundaries with padding
        const padding = 20;
        const maxX = wrapperRect.width - noBtnRect.width - padding;
        const maxY = wrapperRect.height - noBtnRect.height - padding;

        // Generate new position
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;

        // Ensure minimum distance from current position
        const minDistance = 100; // minimum pixels to move
        const currentX = parseFloat(noBtn.style.left) || 0;
        const currentY = parseFloat(noBtn.style.top) || 0;

        while (Math.abs(newX - currentX) < minDistance && Math.abs(newY - currentY) < minDistance) {
            newX = Math.random() * maxX;
            newY = Math.random() * maxY;
        }

        // Apply smooth movement
        noBtn.style.transition = 'all 0.2s ease';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    });

    // Prevent No button from getting stuck at edges
    noBtn.addEventListener('transitionend', () => {
        const rect = noBtn.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();

        if (rect.right > wrapperRect.right || rect.left < wrapperRect.left ||
            rect.bottom > wrapperRect.bottom || rect.top < wrapperRect.top) {
            noBtn.style.left = '50%';
            noBtn.style.top = '0';
            noBtn.style.transform = 'translateX(-50%)';
        }
    });
});