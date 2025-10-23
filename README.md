# 🚌 Real-Time Bus Tracking System

This is a lightweight, web-based bus tracking system designed to provide real-time location data for public transport vehicles. It features a simple Web UI for commuters and utilizes Firebase for powerful, real-time backend data handling and authentication.

## ✨ Features

* **Live Location Tracking:** View the real-time GPS location of buses on an interactive map.
* **User Authentication:** Secure login and registration for users (e.g., commuters or admins) handled by Firebase Auth.
* **Real-Time Database:** Uses Firebase's real-time capabilities to instantly sync GPS data from the bus to the user's map.
* **Interactive Map UI:** Leverages the OpenStreetMap API (likely with a library like [Leaflet.js](https://leafletjs.com/)) to display maps, routes, and live bus icons.
* **Responsive Web UI:** Built with standard HTML, CSS, and JavaScript, making it accessible from any modern web browser on desktop or mobile.

## 🔧 Tech Stack

As outlined in the project brief:

* **Frontend:** HTML, CSS, JavaScript (Web UI)
* **Backend & Database:** Google Firebase (handles real-time GPS data & user authentication)
* **Maps API:** OpenStreetMap (for displaying the map and live bus tracking)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* A web browser
* A Google account to create a Firebase project

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-project-name.git](https://github.com/your-username/your-project-name.git)
    cd your-project-name
    ```

2.  **Set up Firebase:**
    * Go to the [Firebase Console](https://console.firebase.google.com/).
    * Create a new project.
    * Add a **Web App** (click the `</>` icon) to your project.
    * Copy the `firebaseConfig` object provided.
    * In the Firebase console, enable **Authentication** (e.g., "Email/Password" provider).
    * Enable a database: **Firestore** or **Realtime Database** (to store the live GPS coordinates).

3.  **Configure the Application:**
    * In the project's `js/` folder, create a new file named `config.js`.
    * Paste your `firebaseConfig` object into `config.js`:

    ```javascript
    // js/config.js
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      databaseURL: "YOUR_DATABASE_URL",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    ```

4.  **IMPORTANT: Secure your keys!**
    * Create a `.gitignore` file in the root of your project.
    * Add `js/config.js` to it to ensure you don't commit your secret keys to GitHub.
    ```
    # .gitignore
    js/config.js
    ```

5.  **Run the Application:**
    * No complex build step is needed. Simply open the `index.html` file in your web browser.
    * You can also run it with a simple local server (like the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension) for a better development experience.

## 🗺️ How It Works

This system has two main parts:

1.  **Driver / Data Input:**
    * A separate device or application (e.g., a simple `driver.html` page or a mobile app) is used by the bus driver.
    * This device authenticates with Firebase.
    * It uses the device's GPS (e.g., `navigator.geolocation`) to get the current location.
    * It continuously writes its location data (latitude, longitude) to a specific path in the Firebase Realtime Database (e.g., `/buses/bus-01/location`).

2.  **Commuter / Web UI (`index.html`):**
    * The user opens the main web page and logs in.
    * The JavaScript in the app connects to Firebase.
    * It *listens* for real-time changes to the `/buses/` path in the database.
    * When new location data arrives, the app updates the position of the corresponding bus icon on the OpenStreetMap-powered map.

## 📁 Project Structure (Example)
