# React Native Practical Course
Testing React Native applications

### Application description
The App displays meal info.
 - On start of the app a random meal info is shown.
 - If user does not fill in "enter a meal name" input, and presses on GET MEAL button, new random meal is fetched and displayed.
 - If user does fill in "enter a meal name" input, and presses on GET MEAL button, the search by entered value in name will be made, and found meal will be displayed  
 <br>
<img src="./assets/demo.gif" width=250>
  
 
The application consists of 
 - **App** component, 
 - **MealDisplay** component 
 - service **mealService** that uses Axios to make get requests to the server to retrieve meal data

## Tasks
1. Please write unit tests using Jest framework. You should test all 3 mentioned parts:
    - App
    - MealDisplay
    - mealService

2. **Mocks**  
    - Tests mustn't cause real requests to the server, so mocking Axios is crucial.  
    - Also, it is a good approach to mock service when testing component that uses this service.  
    - App component uses MealsDisplay component, if you wish, you can mock MealsDisplay when testing App, but it is optional.
1. All testing modules should be placed in ```tests``` directory.  
All tests should be real - it means that code like this ```expect(2 + 2).toBe(4)``` isn't good :)  
Code coverage is calculating by Jest framework, and should be at least **90%** for each tested item and by each evaluating approach

