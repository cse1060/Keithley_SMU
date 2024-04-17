# Project : Keithley Data Acquisition and UV Light Control for Time Constant Measurement

This project establishes a connection between a computer, a Keithley instrument, and an Arduino to gather voltage and current data during an experiment, calculate the time constant, and control a UV light source. It employs:
- **Backend**: Flask for managing data processing and communication with the Keithley instrument.
- **Frontend**: React for building the user interface and Electron to create a desktop application.
- **Database**: Firebase for real-time data storage and visualization.

## Key Functionalities

- Collects voltage and current data from the Keithley instrument in real-time.
- Calculates the time constant based on the acquired data.
- Controls the UV light source connected to the Arduino, activating it every 30 seconds.
- Displays real-time graphs of voltage and current data.
- Provides curve-fitting functionality for analyzing data trends.

## System Architecture
- The user interacts with the React UI within the Electron application.
- The UI transmits commands to the Flask backend for data acquisition and processing.
- The backend communicates with the Keithley instrument via appropriate interfaces .
- Voltage and current data are sent to Firebase for real-time storage and retrieval.
- The frontend continuously fetches data from backend and updates the graphs.
- Offers options for curve-fitting the data 

## Getting Started
### Prerequisites

- [Python (version 3.8 or later)](https://www.python.org/downloads/) with pip package manager installed
- [Node.js and npm (or yarn)](https://nodejs.org/en)
- [Firebase project with Realtime Database and Cloud Functions enabled](https://firebase.google.com/docs/database)
- [Arduino IDE](https://www.arduino.cc/)

### Installation
####  Clone this repository
```bash
git clone https://github.com/cse1060/Keithley_SMU.git
```
#### Node.js server
- Navigate to the Node.js server directory
    ```bash
    cd Keithley_SMU/server
    ```
- Install dependencies;
    ```bash
    npm install
    ```
- Start the server using nodemon (ensure nodemon is installed globally or as a dev dependency):
    ```bash
    nodemon server.js
    ```
#### Flask Backend
- Set up a virtual environment (recommended) in the directory where your Flask app is located:
    ```bash
    python -m venv myenv
    ```
- Activate the virtual environment:
    - On Windows:
    ```bash
    myenv\Scripts\activate
    ```
    - On Linux/MacOS:
    ```bash
    source venv/bin/activate
    ```
-  Install the required python packages
    ```bash
    pip install -r requirements.txt
    ```
- Start the Flask application:
    ```bash
    python app.py
    ```

#### Frontend
- Navigate to the React application directory:
    ```bash
    cd client
    ```
- Install all the required packages
    ```bash
    npm install
    ```
- Start the Electron App:
    ```bash
    npm run start
    ```
### Running the application
- Connect the Arduino to port COM5.
- Connect The Keithley 2450 instrument to your device.
-  The Electron app will launch, displaying the user interface.
-  Interact with the UI controls to:
    - Input voltage and other required experiment specifications.
    - Start the experiment data collection.
- Voltage, current, and time constant calculations will be displayed **real-time** and stored in Firebase.
- The UV light will be controlled based on the 30-second interval to implement the measurement of time-constant.

### Authors
- [Pratham Gupta](https://github.com/cse1060)
- [Garima Upadhyay](https://github.com/GTG-hub)
- [Amit Tiwari](https://github.com/Amit2004Tiwari)
- Rishwanth Sai 
- Kalyan Sriram

### References
- Keithley 2450 documentation - https://download.tek.com/manual/2450-900-01E_Aug_2019_User.pdf
- [Levenberg Marquardt Algorithm](https://en.wikipedia.org/wiki/Levenberg%E2%80%93Marquardt_algorithm) for Curve-fitting
