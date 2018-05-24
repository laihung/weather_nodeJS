# weather_nodeJS

COMPILING IN LOCAL

Step 1 :
    Download the source code of "weather" and "weather_nodeJS"
   
Step 2 :
    Please perform a "npm i" for both projects in order to get the node_modules downloaded
    
    
RUNNING IN DOCKER

Step 1 : Open the "index.js" file located in "weather_nodeJS" project

Step 2 : Assign an API Key to the constant variable name "apiKey"

Step 3 : Create a new folder name "html" in "weather_nodeJS" project

Step 4 : Build the "weather" project by entering "ng build --prod -d=weather" in terminal/command prompt

Step 5 : Copy the content in the folder of "dist" in "weather" project, over to the newly created folder name "html" in Step 3

Step 6 : Open terminal/command prompt, enter the following commands respectively :-

          - docker build -t demo/weather:v1 .
          - docker run -p 3000:3000 demo/weather:v1
          
Step 7 : Finally, you may access the url : localhost:3000
    
