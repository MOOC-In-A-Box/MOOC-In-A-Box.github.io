# MOOC-In-A-Box

## Motivation
This project was built for the project part of [OMSCS 6460 - Educational Technology](http://omscs6460.gatech.edu/spring-2020/) for the Spring 2020 term.

Team Education Dragons built this.

## Technologies Used
* Built with [ReactJS](https://reactjs.org/)
    * Componentized JS Framework that made it easy for us to share and reuse components, as well as have somewhat isolated dev environments.
* Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* Styled with [MaterialUI](https://material-ui.com/)
* Hosted on [GitHub Pages](https://pages.github.com/)
* [Node / NPM](https://nodejs.org/en/)
* [GIT](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Local Development Setup
This guide assumes that the developer has Git, Node, and NPM installed and properly configured. For more information on any of these, see the above links in the technology section.

### Cloning and Setup
1. Clone the respostiory
    * ```shell
        git clone https://github.com/MOOC-In-A-Box/MOOC-In-A-Box.github.io.git
        ```
2. Navigate to cloned firestory
    * ```shell
        cd ./MOOC-In-A-Box.github.io/
        ```
3. Checkout the "source-code" branch
    * ```shell
        git checkout source-code
        ```
4. Navigate into the source code directory
    * ```shell
        cd mooc-in-a-box
         ```
5. Install npm dependencies
    * ```shell
        npm install
        ```

### Running the application locally

1. Execute the start npm script, from the base directory: MOOC-In-A-Box.github.io/mooc-in-a-box.
    * ```shell
        npm start
        ```
2. Open your favorite browser, and navigate to http://localost:3000.

3. If it's your first time, you will need to sign in with Gmail or Facebook. Make sure your browser allows for for popups.

### Quick Explanations
There are 3 locations for this application code.
1. Root (MOOC-In-A-Box.github.io/mooc-in-a-box)
    * Contains the files that are important for the intial setup of the entire application.
    * App.js
        * Contains all the routing, theming, and initial set up for the application.
    * App.css
        * Basic styling for the application.
2. Service (MOOC-In-A-Box.github.io/mooc-in-a-box/src/service)
    * Contains the file "firebase.service.js"
    * This is the file that makes all of the requests to firebases, handles all of the initial setup for that connection, etc.
3. Components (MOOC-In-A-Box.github.io/mooc-in-a-box/src/components)
    * The "meat" of the application. Contains all of the components, logic, and styling that makes up the application. 

## Deployment
This application is hosted on Github Pages as mentioned above. The running application can be viewed at this [link](https://mooc-in-a-box.github.io/).

The deployment process is simple.

1. First make sure you are in the root of the application (MOOC-In-A-Box.github.io/mooc-in-a-box).
2. Execute the deploy npm script.
    * ```shell
        npm run deploy
        ```