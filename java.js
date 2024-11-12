document.addEventListener("DOMContentLoaded", () => {
    const warningText = document.getElementById("warning-text");
    const recipeContainer = document.getElementById("recipe-container");
    const blueDot = document.getElementById("blue-dot");
    const youLostScreen = document.getElementById("you-lost-screen");

    // Brownie recipe text
    const recipeText = `Here is the best brownie recipe you didn’t know you needed:
    Preheat your oven to 175°C and line a 20x20 cm baking pan with parchment paper.
    In a saucepan, melt 115 grams of butter over low heat, then remove it and let it cool slightly.
    Whisk in 200 grams of sugar, 2 large eggs, and 1 teaspoon of vanilla until smooth.
    Gently fold in 40 grams of cocoa powder, 65 grams of flour, 1/4 teaspoon of salt, and 1/4 teaspoon of baking powder until just combined.
    Pour the batter into your prepared pan and spread it evenly. Bake for 20-25 minutes, or until a toothpick inserted comes out with a few moist crumbs.
    Let it cool, slice, and enjoy the rich, fudgy goodness!`;

    let i = 0;

    // Display recipe text with typewriter effect
    const typewriter = setInterval(() => {
        recipeContainer.style.display = "block"; // Show recipe container
        recipeContainer.textContent = recipeText.substring(0, i);
        i++;
        if (i > recipeText.length) {
            clearInterval(typewriter);

            // Show the blue dot 2 seconds after recipe finishes
            setTimeout(() => {
                blueDot.style.display = "block";
            }, 2000);
        }
    }, 50);

    // Initialize Eye Tracking
    GazeCloudAPI.StartEyeTracking();

    // Eye Tracking Callback
    GazeCloudAPI.OnResult = function (GazeData) {
        if (GazeData.state === 0) { // Valid gaze data
            const gazeX = GazeData.docX; // Gaze X-coordinate
            const gazeY = GazeData.docY; // Gaze Y-coordinate

            // Get blue dot's position
            const dotRect = blueDot.getBoundingClientRect();

            // Check if gaze is on the blue dot
            if (
                gazeX >= dotRect.left &&
                gazeX <= dotRect.right &&
                gazeY >= dotRect.top &&
                gazeY <= dotRect.bottom
            ) {
                triggerYouLost();
            }
        }
    };

    // Trigger "You Lost" screen
    function triggerYouLost() {
        youLostScreen.style.opacity = "1";
        youLostScreen.style.pointerEvents = "all";
        GazeCloudAPI.StopEyeTracking(); // Stop eye tracking after the game ends
    }

    // Optional Callbacks
    GazeCloudAPI.OnCalibrationComplete = function () {
        console.log("Gaze Calibration Complete");
    };

    GazeCloudAPI.OnCamDenied = function () {
        console.log("Camera access denied");
    };

    GazeCloudAPI.OnError = function (msg) {
        console.log("Error: " + msg);
    };
});
