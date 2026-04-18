
# Seesaw Simulation


A physics-based interactive seesaw simulation built with JavaScript.


## Live Demo

[Live Demo](https://ertugruldgnc.github.io/seesaw-simulator/) | [Project Video](#)


## 📋 Features

 - **Real Time Physics Simulation:** Every weight placed on the seesaw has an immediate physical impact on the system.
 - **Color Coded Weight System:** Each weight unit is represented by a unique color to enhance visual hierarchy and clarity.
 - **Dynamic Weight Registry:** A real time list allows users to track all weights currently active in the simulation.
 - **Smooth Animations:** Tilt and motion transitions are supported by fluid easing effects to optimize the user experience.
 - User Controls: Includes a reset button to restart the simulation and a mute button for sound management.

## ⚙️ How It Works

 The simulation is built upon a Real Torque Calculation model derived from classical mechanics. The entire system is developed based on torque equation

 - **Torque Balance:** The torque for weights on both sides of the plank is calculated individually.
 - **Angular Motion:** The plank moves proportionally to the difference between the left and right torque.
 - **Constraints:** To maintain visual stability and prevent clipping, the plank's tilt is capped at a maximum of ±30 degrees.

## 🎨 Design & Architecture
 The application is structured into two sections to provide a clean and intuitive interface
 - **Header:** Contains project information
 - **Main Section:**
    - Pivot & Plank: The plank is positioned precisely at the center of the pivot point.
    - DOM Hierarchy: All added weights are defined as children of the plank element. This ensures that when the plank tilts, the weights move in perfect synchronization with it.
    - Weight List: A dedicated panel at the bottom displays a detailed registry of all dropped weights.

## ❗ AI Usage Disclosure
 During the development process, AI tools (Gemini/ChatGPT) were used in a limited and specific capacity
 - **Design Assistance:** AI was consulted to select a harmonious color palette that is visually appealing and accessible.
 - **Code Review:** AI was utilized for final code reviews to identify potential oversights and ensure overall code quality.
 - **Important Note:** The core project logic, all physical equations, mathematical calculations, and the architectural structure were entirely conceived and implemented by me.

## 🔽 Getting Started

 **1.** Clone the repository:
 ```bash
 git clone https://github.com/ertugruldgnc/seesaw-simulator.git
 ```
 **2.** Open project:

 You can run the project by opening index.html in the seesaw-simulator folder with a browser or by launching it via the command prompt (CMD)
 ```bash
 # open project folder
 cd seesaw-simulator

 #open project
 index.html
```
## 🕹 Usage
 Simply click anywhere on the seesaw beam to place a random weight and observe the dynamic physics based movement in real time.
 - **Status Panels:** You can monitor the simulation data through the live information panels:
    - **Angle:** The precise tilt of the beam.
    - **Weight Distribution:** Total weight for both the left and right arms.
    - **Weight List:** A history of all weights currently placed on the beam.
    - **Next Weight:** Preview the value of the next weight before placing it.

