# Roblox Authentication

## Overview

Welcome to the **Roblox Authentication** project, a simple yet effective solution for verifying Roblox users without the need for expensive databases or secure storage systems. This tool is designed for hobbyists and developers who need a straightforward way to authenticate users based on their Roblox account information.

## Features

- **User Verification**: Quickly verify Roblox users by checking their account description.
- **Dynamic Wordlist**: Generate a random verification string from a predefined list of words.
- **Simple Integration**: Easily integrate with your existing web projects.

## How It Works

1. **User Input**: Enter the Roblox User ID to start the verification process.
2. **Fetch Data**: Retrieve user details and avatar image using the Roblox API.
3. **Verification Prompt**: Display a prompt asking the user to update their description to a specific string.
4. **Check Description**: Continuously check if the user's description matches the required string.
5. **Dashboard Access**: Redirect verified users to a dashboard.

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/RobloxAuthentication.git
    ```
2. **Navigate to the Project Directory**:
    ```bash
    cd RobloxAuthentication
    ```
3. **Open `index.html`** in your browser or integrate the code into your web project.

## Usage

1. **Enter User ID**: In the web form, input the Roblox User ID you wish to verify.
2. **Follow Instructions**: The user will be prompted to update their Roblox description.
3. **Verify**: Click the verification button once the description has been updated.

## Customization

- **Wordlist**: Modify the `wordlist` array in `index.html` to include your preferred words for generating verification strings.
- **CORS Proxy**: If necessary, update the `corsProxy` variable to use your own CORS proxy server.

## Contributing

Feel free to fork the repository and make improvements. If you have suggestions or find bugs, please open an issue or submit a pull request.

# Changes

`You can add this to your own website` but please leave credit. You can modify the code and connect it to your dashboard etc. Change the style according to your feeling.
create variables to store the userdata and using JSONs are strongly reccomended for datastorage

Example:

```json
{
    "exampleuser": {
        "money" : 100,
        "kills": 34,
        "friends": 200
    },

    "exampleuser2": {
        "money" : 382,
        "kills": 68,
        "friends": 37
    }
}
```
Note: these arent actual values adjust the values to the usecases of your website.

```javascript
const fs = require('fs');
const path = './data.json'; // Path to the JSON file

/**
 * Log user data to the data.json file.
 * @param {string} user - The username.
 * @param {number} money - The amount of money.
 * @param {number} kills - The number of kills.
 * @param {number} friends - The number of friends.
 */
function logUserData(user, money, kills, friends) {
    // Read the existing data from the JSON file
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            return;
        }

        // Add new user data
        jsonData[user] = {
            money: money,
            kills: kills,
            friends: friends
        };

        // Write the updated data back to the file
        fs.writeFile(path, JSON.stringify(jsonData, null, 4), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the file:', err);
                return;
            }
            console.log('User data added successfully.');
        });
    });
}

// Example usage:
logUserData('newuser', 150, 10, 50);
```

Here is some example code you can edit the values from instead of money to like deaths or something! Add this to my javascript code then use:

```javascript
logUserData(displayname, <val1>, <val2>, <val3>)
```

You can add/remove values if you want its your choice!

```javascript

jsonData[user] = {
    money: money,
    kills: kills,
    friends: friends,
    lives: lives,
    gems: gems
};

```

Note: These values use variables you can change them to strings/integers like:

```javascript

jsonData["Noxious"] = {
    money: 288,
    kills: 3,
    friends: "Dragon",
    lives: 2,
    gems: 123
};

```
Feel free to add more values to your liking...

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/CaptainHackerGuy/RobloxAuthentication?tab=MIT-1-ov-file) file for details.
