# Kanban Board

This is a task from QuickSell
- Made by: Aritro Saha 21BLC1174

## How to Run

1. Clone this repository
    ```bash
    git clone <repository-link>
    ```
2. Go inside the folder
    ```bash
    cd Kanban-Board
    ```
3. Install All Dependencies
    ```bash
    npm install
    ```
4. Run the Development Server
    ```
    npm run dev
    ```

## Functionalities

The application offers Three Distinct Ways To Group Tickets:
1. By Status
2. By User
3. By Price

The User can sort the tickets on the basis of:
1. Priority
2. Title

This Application Saves User's View State even if the page is reloaded or closed and reopened
- This is done with the help of localstorage where the user's view state is stored in the local storage of the browser and is retrieved from there
    ```javascript
    useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);
  ```

The Page is Fully Responsive and as similar to the design given in the task

## Technologies Used

- React
- Javascript
- HTML
- CSS