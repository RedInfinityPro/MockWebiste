# Lander University Food Program
![Lander University](https://img.shields.io/badge/Lander-University-0A66C2?style=for-the-badge&logo=none&logoColor=white)
![TRANSACT](https://img.shields.io/badge/TRANSACT-APP-FF0000?style=for-the-badge&logo=stripe&logoColor=white)
![Greenwood SC](https://img.shields.io/badge/Greenwood-SC-2E8B57?style=for-the-badge&logo=googlemaps&logoColor=white)

Lander University's Food Program website includes a calendar section for events, detailed meal plan options for resident students, and information on dining services. 

## Key Features 
various meal plans, mobile ordering via the TRANSACT app, and contact information for Dining Services staff. The site also offers a navigation menu.

## Mock Eye-Tracking Usability Test
- Hypothesis: The website may be user-friendly as its design and layout are more modernized than the original Lander University website and contain content in an easier-to-navigate location than the original website. To explain: Restroom hours and food plans are not easily accessible. In addition, this website allows the user to view potentially real calendar events that are not present or available on the original website.
- Task: To observe how the website may introduce better usage from the clients and how the user is less overwhelmed by the original landing website content and design.

### Pre-Test Setup Checklist
☐ GP3 device centered below the monitor

☐ Lighting is even (no glare)

☐ Participant seated 50–70 cm from screen

☐ Software open and recording folder prepared

☐ Website loaded and ready

☐ Consent explained

☐ Task clearly written

### Calibration
☐ Explain calibration dots

☐ Complete 9-point calibration

☐ Confirm acceptable accuracy

☐ Recalibrate if needed

### Immediate Post-Test Notes
- Participant statement: According to the appearance and design of the website, it was information containing elements and information about the Lander University Program. Showcasing the TRANSACT application details and meal plans. The participant did not note any new changes or explore the fundamental elements of the website. 
- Eye-tracking data shown: Attractive elements such as the image display allowed the user to see what restaurants and services Lander University provides to students at an easy and quick time. Based on the data, we can observe strong eye tracking data for the information regarding the TRANSACT application and the services displayed at the top of the page. The data also indicates that the  user refused to interact with button elements, and the website failed to attract the user's eyes for long periods of time.
- Hypothesis support: Based on the data, we can observe the most important elements attracting the eyes the most, such as the app and the services. However, based on the participants' explanation, we can determine that the website does not offer new or any additional resources that are valuable to the users. 
- Notes: The most interesting part of the eye tracking data is the fact that the client's eyes are not affected by the new image displayed in the service display element as much as originally thought. The client's attention to the website was short-lived, even after the new UI layout and design were implemented.

## Project Structure
- 📂 databases
    - 📔 calendar-data.json
    - 📔 staff-data.json
- 📂 Eye Tracking Data
    - 📂 videos
        - 🎞️ GazeFlowData: 03-11-26
        - 🎞️ SpotlightMap: 03-11-26
- 📂 eye tracking data
    - 📂 videos
        - 🎞️ gazeFlowData: 03-11-26
        - 🎞️ spotlightMap: 03-11-26
- 📂 images
    - 📂 about-images
        - 📷 appImage.png
    - 📂 coverflow-images
        - 📷 Chick-fil-a-logo.png
        - 📷 DiningHallImage.png
        - 📷 FoodPantryImage.png
        - 📷 FreshensImage.png
        - 📷 GreenwoodMarketplaceImage.png
        - 📷 starbucksLogo.png
        - 📷 TheDropImage.png
    - 📂 logos
        - 📷 50 Plan.png
        - 📷 100 Plan.png
        - 📷 165 Plan.png
        - 📷 350 Plan.png
        - 📷 All Access Plan.png
        - 📷 LanderLogo.png
    - 📂 staff-images
- 📂 src
    - 📂 css
        - index-style.css
        - otherPages-style.css
    - 📂 js
        - index-script.js
        - load-calendar.js
        - load-staff.js
- load-staff.html
- index.html
- staff.html
- start.sh
- start.bat

# Run The Website
- If you have a Windows operating system, double-click or select "run as application" in the 'start.bat' file to run the server.
- If you have a Linux operating system (perhaps Mac OS as well), double-click or select "run as application" on the 'start.sh' file to run the server.
    - Note: both server files will automatically open the webpage.
