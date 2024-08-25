const corsProxy = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy URL

// Define the wordlist
const wordlist = [
    "apple", "banana", "cherry", "date", "elderberry", 
    "fig", "grape", "honeydew", "kiwi", "lemon",
    "mango", "nectarine", "orange", "papaya", "quince",
    "raspberry", "strawberry", "tangerine", "ugli", "valencia",
    "watermelon", "xigua", "yellowfruit", "zucchini"
];

document.getElementById('app').innerHTML = `
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header text-center">
                    <h4>Roblox Verification</h4>
                </div>
                <div class="card-body">
                    <form id="verification-form">
                        <div class="form-group mb-3">
                            <label for="userid">Enter your Roblox User ID</label>
                            <input type="text" class="form-control" id="userid" required>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-primary">Verify</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
`;

document.getElementById('verification-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const userId = document.getElementById('userid').value.trim();
    
    try {
        const apiUrlUser = `${corsProxy}https://users.roblox.com/v1/users/${userId}`;
        const avatarUrl = `${corsProxy}https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png`;

        // Fetch user data
        const response = await fetch(apiUrlUser);
        
        if (!response.ok) {
            throw new Error(`User API response status: ${response.status}`);
        }

        const userData = await response.json();
        const displayname = userData.name;

        // Fetch avatar data
        const avatarResponse = await fetch(avatarUrl);
        
        if (!avatarResponse.ok) {
            throw new Error(`Avatar API response status: ${avatarResponse.status}`);
        }

        const avatarData = await avatarResponse.json();
        const avatarImageUrl = avatarData.data[0].imageUrl;

        // Generate a random string from the wordlist with a limit of 6 words
        const maxWords = 6;
        const wordtodecide = Math.floor(Math.random() * maxWords) + 1; // Random number between 1 and maxWords
        let st = "";

        for (let i = 0; i < wordtodecide; i++) {
            const e = Math.floor(Math.random() * wordlist.length);
            st += i === 0 ? wordlist[e] : " " + wordlist[e];
        }

        confirmUser(displayname, st, userId, avatarImageUrl);

    } catch (error) {
        console.error("Error occurred during the fetch process:", error);
        alert("An error occurred. Please try again. Check the console for details.");
    }
});

function confirmUser(displayname, st, userId, avatarImageUrl) {
    document.getElementById('app').innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header text-center">
                        <h4>Verification for ${displayname}</h4>
                    </div>
                    <div class="card-body text-center">
                        <img src="${avatarImageUrl}" alt="Avatar" class="img-thumbnail mb-3">
                        <p>Is this the correct user?</p>
                        <button id="confirm-btn" class="btn btn-success">Yes</button>
                        <button id="back-btn" class="btn btn-secondary mt-3">No, go back</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('confirm-btn').addEventListener('click', function() {
        showVerification(displayname, st, userId, avatarImageUrl);
    });

    document.getElementById('back-btn').addEventListener('click', function() {
        location.reload();
    });
}

function showVerification(displayname, st, userId, avatarImageUrl) {
    document.getElementById('app').innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header text-center">
                        <h4>Verification for ${displayname}</h4>
                    </div>
                    <div class="card-body text-center">
                        <img src="${avatarImageUrl}" alt="Avatar" class="img-thumbnail mb-3">
                        <p>Change your description to:</p>
                        <p><strong>${st}</strong></p>
                        <button id="verify-btn" class="btn btn-success">I have updated my description</button>
                        <button id="back-btn" class="btn btn-secondary mt-3">Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('verify-btn').addEventListener('click', async function() {
        const apiUrl = `${corsProxy}https://users.roblox.com/v1/users/${userId}`;

        for (let i = 0; i < 10; i++) {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Verification API response status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Verification Data:", data);
                
                if (data.description === st) {
                    showDashboard(displayname, avatarImageUrl);
                    return;
                }

                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, 5000));

            } catch (error) {
                console.error("Error occurred during verification:", error);
                alert("An error occurred during verification. Check the console for details.");
                return;
            }
        }

        alert("Verification Failed. Please try again later.");
    });

    document.getElementById('back-btn').addEventListener('click', function() {
        location.reload();
    });
}

function showDashboard(username, avatarUrl) {
    document.getElementById('app').innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-6 text-center">
                <h3>Logged in as ${username}</h3>
                <img src="${avatarUrl}" alt="Avatar" class="img-thumbnail mt-3">
            </div>
        </div>
    `;
}
