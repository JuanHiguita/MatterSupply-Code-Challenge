## Available Scripts

In the project directory, you can run:

### `npm install`
installa todas las dependecias para poder ejecutar la app adecuadamente

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Notes

- The button with the github logo will redirect you to the home page, in case the logo is not displayed on the screen reload the page to fix it.

- When you are signed in if you click on your username it will redirect you to your profile where you will see your posts, and you can edit or delete them.

## Questions

- What are your thoughts around continuous integration, where & how you would deploy this application?
    - I consider that continuous integration and continuous delivery are extremely important when we develop high or medium scale apps, because due to the good use of these         concepts we can carry out an agile and optimal development of the app. 

        Especially when we talk about agile development we must look more to the side of continuous integration because with the use of this practice helps us in the early detection of any error that may be happening in the app automatically, so we can correct it quickly and effectively, thus avoiding a large agglomeration of bugs at the same time which make it chaotic to try to solve them. 

    - Currently I have understood that all the platforms for version control have the option to create the pipes of continuous integration where the different tests will be carried out automatically in the components, although I have understood that the chosen one by excellence is gitlab.

        To carry out this process a series of tests should be created which will be configured in the gitlab pipes so when we make the merge to the branch of the tested components these changes pass through the pipes to be analyzed and find any possible error. once the component passes properly through each pipe it can be integrated to the master branch of the project.

- What do you think you would do differently if you had 2 weeks to complete this assignment and no requirement to use Github. What would your backend solution look like?
    - I would focus on fixing some bugs that the app has, as well as improving the visual aspect of the app. On the other hand I would look to add some features that I left out because they were not a priority.

        For the backend I could opt for a quick solution like firebase, or in case of looking for something more complete I would use node.js

- How and where do you feel like this application should be deployed to?
    - Adding some more features it could be implemented in a similar way to reddit, having different groups where people make their posts in the form of gists, and according to what the user wants to see he could navigate between the different groups or forums that have been created within the app.

- Are you happy with your own solutions? If yes, which parts do you think are really well done, if not, what would you want to change?
    - In general terms, yes, I feel that the solution I proposed to the problem is fine and I consider it is a simple app, but aesthetic and clean in terms of what the user sees, however there are a lot of aspects that I know can be improved with more time, or even with help from someone more experienced, there are several bugs that I am aware of, and I tried to solve them but could not find a viable solution, and on the other hand there are features that I would have liked to include but these were not a priority so I decided not to spend the time I had on adding extras to the app.

        At the code side I would not be so happy with the result, because although it works and may be fine, I consider that it is very improvable in many aspects with some more time, or with the help of a more experienced developer.
