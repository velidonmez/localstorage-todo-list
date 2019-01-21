function checkToDos() {
  if (localStorage) {
    return JSON.parse(localStorage.getItem("todoList")) || [];
  }
}

function addToDo(text, saveToStorage) {
  var id = Math.floor(Math.random() * 100000);
  $("ol").append(
    '<li class="listItem" data-item-order="' +
      id +
      '">' +
      text +
      '<button class="deleteSelected">Remove</button></li>'
  );

  if (saveToStorage) {
    var currentTodos = checkToDos();
    currentTodos.push({ text: text });
    localStorage.setItem("todoList", JSON.stringify(currentTodos));
  }
}

function generateToDos() {
  var todoListItems = checkToDos();
  console.log(todoListItems);
  if (todoListItems.length) {
    for (var i = 0; i < todoListItems.length; ++i) {
      addToDo(todoListItems[i].text, false);
    }
  }
}

$("#inputForm").submit(function(e) {
  e.preventDefault();
  var todoText = $(".inputTxt").val();
  if (!todoText) {
    alert("Please enter a note!");
    return;
  }
  addToDo(todoText, true);
  $(".inputTxt").val("");
});

function removeToDo() {
  var x = $(this).parent().attr("data-item-order");
  var y = $(this).parent().index();

  var todoListItems = checkToDos();

  console.log(todoListItems);
  delete todoListItems[y];
  var arr = [];

  for (var i = 0; i < todoListItems.length; ++i) {
    if (todoListItems[i] != undefined) {
      arr.push(todoListItems[i]);
    }
  }
  var getJSON = JSON.stringify(arr);
  localStorage.setItem("todoList", getJSON);
  $("li[data-item-order=" + x + "]").remove();
}

var clearAllTodos = function() {
  localStorage.removeItem("todoList");
  $("li").remove();
};

$(document).on("click", "#btnClear", clearAllTodos);
$(document).on("click", ".deleteSelected", removeToDo);

$(document).ready(function() {
  generateToDos();
});