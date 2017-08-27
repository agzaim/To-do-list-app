
document.addEventListener("DOMContentLoaded", function() {
    var addingButton = document.getElementById("addTaskButton");
    var taskInput = document.getElementById("taskInput");
    var priorityInput = document.getElementById("priorityInput");
    var taskList = document.getElementsByClassName("taskList");
    var categoryInput = document.getElementById("categoryInput");
    var optionsList = document.getElementsByTagName("option");
    var removingFinishedTasksButton = document.getElementById("removeFinishedTasksButton");
    /*var workTasksList = document.getElementById("workTasks");
    var personalTasksList = document.getElementById("personalTasks");
    var groceriesList = document.getElementById("groceriesList");
    var booksList = document.getElementById("booksList");
    var moviesList = document.getElementById("moviesList");*/



    // adding event to "Add" button
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

        for (var i = 0; i< taskList.length; i++) {
            if (taskList[i].id == optionDataset) {
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

// adding task to the correct place in a correct list
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

    
    //adding event to list's categories from side panel
    document.addEventListener("click", function(event) {
        
        // hiding tasks list
        if (event.target.className === "taskCategory") {
            console.log(event.target);
            event.target.classList.add("clicked");
//            event.target.style.opacity = "1"; 
            var clickedCategory = event.target.firstElementChild.dataset.category;
            
            document.getElementById(clickedCategory).style.display = "block";
            
        }
//         event.target.parentNode.style.addClass = "cli";
            event.target.classList.remove("clicked");

        
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










