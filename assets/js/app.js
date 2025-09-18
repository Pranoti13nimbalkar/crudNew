let cl = console.log;


const todoForm = document.getElementById("todoForm");
const todoItemControl = document.getElementById("todoItem");
const addTodoItem = document.getElementById("addTodoItem");
const updateTodoItem = document.getElementById("updateTodoItem");
const todoContainer= document.getElementById('todoContainer');

let todoArr=[
   
];
if(localStorage.getItem('todoArr')){
   todoArr = JSON.parse(localStorage.getItem('todoArr'))
}

uuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    });
};
const setItem =()=>{
   localStorage.setItem('todoArr', JSON.stringify(todoArr))
}
// to write a function of templating

const createTodoList = arr=>{
   if(arr.length >0){
      let result=``
      arr.forEach(ele => {
         result+= ` <li class="list-group-item d-flex justify-content-between align-item-center" id="${ele.todoId}">
          <strong>${ele.todoItem}</strong>
          <div>
            <i class="fa-solid fa-pen-to-square fa-2x text-success  text-center" onClick="onEdit(this)"></i>
            <i class="fa-solid fa-trash fa-2x text-danger  text-center" onClick="onRemove(this)"></i>
          </div>
        </li>`
      });
        todoContainer.innerHTML =result;
   }
}

createTodoList(todoArr);

const onRemove = ele=>{
   Swal.fire({
  title: `Are u sure, you want to remove todoItem ?`,
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    let REMOVE_ID = ele.closest('li').id;
    cl(REMOVE_ID);

   //  get index Node. from obj

   let getIndex = todoArr.findIndex(todo=> todo.todoId === REMOVE_ID);

   // remove obj from arr 

   todoArr.splice(getIndex, 1);

   // update arr in ls
  setItem()
   // remove from UI
   ele.closest('li').remove();
   Swal.fire({
            title:`todoItem removed successfully`,
            icon: "success",
            timer:"2000"
            });
  }
});
}



const onEdit =(ele)=>{
   let EDIT_ID = ele.closest('li').id;
   cl(EDIT_ID)
   localStorage.setItem('EDIT_ID', EDIT_ID);
   let EDIT_OBJ = todoArr.find(todo=> todo.todoId === EDIT_ID );
   cl(EDIT_OBJ);

   // fetch data to control
   todoItemControl.value = EDIT_OBJ.todoItem;
   addTodoItem.classList.add('d-none')
  updateTodoItem.classList.remove('d-none')

 }


 const onTodoUpdate=()=>{
   const UPDATED_ID = localStorage.getItem('EDIT_ID');

   // upadaet Object
   let UPDATED_OBJ ={
      todoItem:todoItemControl.value,
      todoId: UPDATED_ID
   }
   cl(UPDATED_OBJ);

   // replace in ls

   let getIndex = todoArr.findIndex(todo=> todo.todoId=== UPDATED_ID)
   todoArr[getIndex]= UPDATED_OBJ;

   // update in ls
    setItem()
   // update on ui 

   let li = document.getElementById(UPDATED_ID).firstElementChild;
   cl(li);
   li.innerHTML = UPDATED_OBJ.todoItem;
  
 addTodoItem.classList.remove('d-none')
  updateTodoItem.classList.add('d-none')

                     Swal.fire({
            title:`TodoItem Updated successfully`,
            icon: "success",
            timer:"2000"
            });
             todoForm.reset()
 }




const onAddTodo =(eve)=>{
 eve.preventDefault();

//  to create todoObj
let todoObj ={
   todoItem :  todoItemControl.value,
   todoId : uuid()
}

cl(todoObj)

// to store in ls 
todoArr.push(todoObj);
  setItem()

// create new li/
const li =document.createElement('li');
li.className="list-group-item d-flex justify-content-between align-item-center";
li.id = todoObj.todoId;
li.innerHTML= ` <strong>${todoObj.todoItem}</strong>
          <div>
            <i class="fa-solid fa-pen-to-square fa-2x text-success text-center" onClick="onEdit(this)"></i>
            <i class="fa-solid fa-trash fa-2x text-danger  text-center" onClick="onRemove(this)"></i>
          </div>`

          const ul = document.querySelector('#todoContainer');
          ul.append(li);

                     Swal.fire({
            title:`${todoObj.todoItem} added successfully`,
            icon: "success",
            timer:"2000"
            });
            todoForm.reset();
}







todoForm.addEventListener('submit', onAddTodo);
updateTodoItem.addEventListener('click', onTodoUpdate)