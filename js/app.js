
document.addEventListener("DOMContentLoaded", function() {
    var addingButton = document.getElementById("addTaskButton");
    var taskInput = document.getElementById("taskInput");
    var priorityInput = document.getElementById("priorityInput");
    var taskLists = document.getElementsByClassName("taskList");
    var categoryInput = document.getElementById("categoryInput");
    var optionsList = document.getElementsByTagName("option");
    var removingFinishedTasksButton = document.getElementById("removeFinishedTasksButton");
    var categoriesSection = document.getElementsByTagName("aside");
    var mobileBurgerMenu = document.getElementById("burgerMenuIcon");
    /*var workTasksList = document.getElementById("workTasks");
    var personalTasksList = document.getElementById("personalTasks");
    var groceriesList = document.getElementById("groceriesList");
    var booksList = document.getElementById("booksList");
    var moviesList = document.getElementById("moviesList");*/



    // **********************************************************
    // adding event to ADD BUTTON
    // **********************************************************

    addingButton.addEventListener("click", function(event) {
        event.preventDefault();
        var task = taskInput.value;
        var taskCategory = categoryInput.value;

        // cleaning the input
        taskInput.value = "";

        // finding the right tasks list
        for (var i = 0; i< optionsList.length; i++) {
            if (optionsList[i].getAttribute("value") == taskCategory) {
                var optionDataset = optionsList[i].dataset.id;
            }
        }

        for (var i = 0; i< taskLists.length; i++) {
            if (taskLists[i].id == optionDataset) {
                var currentTasksList = document.getElementById(optionDataset);
            }
        }

        // creating task
        if (task.length > 0) {
            var listElement = document.createElement("li");
            var priorityValue = 0;

            if (Number(priorityInput.value) >= 1 && Number(priorityInput.value) <= 5) {
                priorityValue = Number(priorityInput.value);
            }

            // cleaning the input
            priorityInput.value = "";

            listElement.dataset.priority = priorityValue;
            listElement.innerHTML = "<h2></h2><div></div>";
            listElement.firstElementChild.innerText = task + "  p=" + priorityValue;
            listElement.lastElementChild.classList.add("liButtonsBox");
            listElement.lastElementChild.innerHTML = "<button></button><button></button>";
            listElement.lastElementChild.firstElementChild.innerText = "Delete";
            listElement.lastElementChild.firstElementChild.classList.add("deleteButton");
            listElement.lastElementChild.lastElementChild.innerText = "Edit";
            listElement.lastElementChild.lastElementChild.classList.add("editButton");


            //adding event to "Delete" button
            listElement.lastElementChild.firstElementChild.addEventListener("click", deletingTask);
            //            listElement.lastElementChild.addEventListener("click", completingTask);   


            // hiding visible list and showing list with cuurent category
            for (var i = 0; i < taskLists.length; i++) {
                taskLists[i].style.display = "none";
            }

            currentTasksList.style.display = "block";


            addingElement(priorityValue, listElement, currentTasksList);
        }        
    });



    function deletingTask(event) {
        var deletingElement = this.parentNode.parentNode;
        this.parentNode.parentNode.parentNode.removeChild(deletingElement);
        counter();
    }


    function completingTask(event) {
        this.parentNode.classList.toggle("taskDone");
        counter();
    }


    // **********************************************************
    // ADDING TASK to the correct place in a correct list
    // **********************************************************

    function addingElement(priorityVar, element, taskList) {

        if (taskList.children.length === 0 || (taskList.children.length === 1 && priorityVar > taskList.children[0].dataset.priority))  {
            taskList.appendChild(element);

        } else if (taskList.children.length === 1 && priorityVar <= taskList.children[0].dataset.priority)  {
            taskList.insertBefore(element, taskList.children[0]);

        } else {

            for (var i = taskList.children.length - 1; i >= 0; i--) {

                if (priorityVar >= taskList.children[i].dataset.priority) {

                    taskList.insertBefore(element, taskList.children[i+1]);
                    return element;

                } else {
                    taskList.insertBefore(element, taskList.firstElementChild);
                }
            }
        }
    }


    // **********************************************************
    // adding event to LIST'S CATEGORIES from side panel
    // **********************************************************

    document.addEventListener("click", function(event) {
        var categoryBox = 0;

        
        if (event.target.parentNode.className === "taskCategory" || event.target.className === "taskCategory") {

            (event.target.className === "taskCategory") ? categoryBox = event.target : categoryBox = event.target.parentNode; 


            var clickedCategory = categoryBox.firstElementChild.dataset.category;


            // hiding visible task list and showing list with clicked category
            for (var i = 0; i < taskLists.length; i++) {
                taskLists[i].style.display = "none";
            }

            document.getElementById(clickedCategory).style.display = "block";

        }
    }); 


mobileBurgerMenu.addEventListener("click", function() {
    categoriesSection[0].classList.toggle("open");
});
    



    //dodaję event do guzika "Remove finished tasks"
    /*removingFinishedTasksButton.addEventListener("click", function(event) {
        for (var i = taskList.children.length - 1; i >= 0; i--) {
            if (taskList.children[i].className === "taskDone") {
                taskList.removeChild(taskList.children[i]);
            }
        }
    });*/
});










