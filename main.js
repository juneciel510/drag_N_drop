function initialSourceBox(imgAddress) {
  const srcBox = document.getElementById("source-container");
  for (i = 0; i < imgAddress.length; i++) {
    var img = new Image(100, 100);
    img.src = imgAddress[i];
    img.className = "list-item";
    img.draggable = "true";
    srcBox.appendChild(img);
  }
}

function updateStatus() {
  const counter = [];
  for (let j = 0; j < lists.length; j++) {
    const list = lists[j];
    counter[j] = list.childElementCount;
  }
  document.getElementById("source-status").innerHTML = counter[0];
  document.getElementById("target1-status").innerHTML = counter[1];
  document.getElementById("target2-status").innerHTML = counter[2];
}

function dragAndDrop() {
  let draggedItem = null;

  for (let i = 0; i < list_items.length; i++) {
    const item = list_items[i];

    item.addEventListener("dragstart", function () {
      console.log("dragstart");
      draggedItem = item;
      setTimeout(function () {
        item.style.display = "none";
      }, 0);
    });

    item.addEventListener("dragend", function () {
      setTimeout(function () {
        draggedItem.style.display = "inline-block";
        draggedItem = null;
      }, 0);
    });

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];
      list.addEventListener("dragover", function (e) {
        e.preventDefault();
      });

      list.addEventListener("dragenter", function (e) {
        e.preventDefault();
        this.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
      });

      list.addEventListener("dragleave", function (e) {
        this.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      });

      list.addEventListener("drop", function (e) {
        console.log("drop");
        this.append(draggedItem);
        this.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        updateStatus();
      });
    }
  }
}

//initialize images in the source box and status box
const IMG_NUMBER = 7;
var imgAddress = [];
for (var i = 0; i < IMG_NUMBER; i++) {
  imgAddress.push("./img/1.jpg");
}
initialSourceBox(imgAddress);

const list_items = document.querySelectorAll(".list-item");
const lists = document.querySelectorAll(".list");
updateStatus();
//drag and drop
dragAndDrop();
