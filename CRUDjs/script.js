let tasks = [
    {
        'title': 'Reading book',
        'date': '15/3/2030',
        'isDone': true,
    },
    {
        'title': 'Finish CRUD project',
        'date': '1/8/2024',
        'isDone': false,
    },
    {
        'title': 'Finish JS',
        'date': '20/10/2025',
        'isDone': false,
    },
]
function getTasksFromStorage(){
    let retrievedTasks = JSON.parse(localStorage.getItem('tasks'));

    tasks = retrievedTasks ?? [] 
}

getTasksFromStorage();


function fillTasksOnThePage(){

document.getElementById('tasks').innerHTML = "";
let tasksHtml = '';
let i = 0;

for(task of tasks){
     
    tasksHtml += `
                <div class="task ${task.isDone ? 'doneTask' : ''}">
                            <!-- TasksInfo -->
                             <div class="task-info">
                                    <h1>${task.title}</h1>
                                    <div>
                                        <span class="material-symbols-outlined">
                                            calendar_month
                                            </span>
                                        <span>${task.date}</span>
                                    </div>
                             </div>
                             <!-- endTasksInfo -->
                             <!-- Actions -->
                              <div class="task-actions" id="task-action${i}">
                                    <button onclick="deleteTask(${i})" class="circular" style="background-color: rgb(114, 0, 0);">
                                        <span class="material-symbols-outlined">
                                            delete
                                            </span>
                                    </button>
                                   <button onclick="toggleTaskCompletion(${i})" id="check-btn${i}" class="circular" style="background-color: ${task.isDone ? 'rgb(0, 150, 30)': 'rgb(200, 110, 10)'};">
                                        <span class="material-symbols-outlined">
                                            ${task.isDone? 'done': 'close'}
                                            </span>
                                    </button>
                                    <button onclick="editTask(${i})" class="circular" style="background-color: rgba(0, 16, 197, 0.692);">
                                        <span class="material-symbols-outlined">
                                            edit
                                            </span>
                                    </button>
                              </div>
                              <!-- endActions -->
                    </div>`
                    i++;
                    
                    
                  
}
document.getElementById('tasks').innerHTML = tasksHtml; 
                              
}
// refresh function
fillTasksOnThePage();



// create
document.getElementById("add-btn").addEventListener("click", function(){
    // title
    let taskTitle = prompt("Enter The title of the new task")

    // date
    const today = new Date();
    curDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    // validation
    if(taskTitle == ''){
        return alert("Title is Required!")
    }
    

    tasks.push({
        'title': taskTitle,
        'date': curDate,
        'isDone': false
        }) ; 
        
        // refresh storage
        storeTask()
        
        // refresh function    
        fillTasksOnThePage();
        
})

// delete
    function deleteTask(index){
        let isConfirmed = confirm(`Are you sure you want to delete '${tasks[index].title}' task`)

        if(isConfirmed){
        tasks.splice(index, 1);

        // refresh storage
        storeTask()
        // refresh 
        fillTasksOnThePage();
        }
    }


// check
    function toggleTaskCompletion(index){
        let task = tasks[index];

        task.isDone = !task.isDone;

        // refresh storage
        storeTask() 

        // refresh function 
        fillTasksOnThePage();   
    }

 

// Update
function editTask(index){
    let task = tasks[index];
    // title
    let taskTitle = prompt("Edit task: ", task.title)
    // date
    const today = new Date();
    curDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    // In case there is no any edit the title and the date will remain
    if(taskTitle != null){
        task.title = taskTitle;
        task.date = curDate;
    }
    // task.isDone = false;

    // refresh storage
    storeTask() 
    // refresh function
    fillTasksOnThePage();
        
}



// Refresh storage function

function storeTask(){
    let tasksString = JSON.stringify(tasks)
    localStorage.setItem('tasks', tasksString)
}