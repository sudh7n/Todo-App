const taskBox = document.getElementById("task-box");
const addBtn = document.querySelector(".add-btn");
const taskList = document.getElementById("task-list-container");
const filterButtons = document.querySelectorAll(".task-btn-container button");

addBtn.addEventListener("click", () => {
  const taskText = taskBox.value.trim();
  if (taskText !== "") {
    const li = document.createElement("li");
    li.textContent = taskText;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    li.addEventListener("click", (e) => {
      if (e.target.tagName !== "SPAN") {
        li.classList.toggle("checked");
        applyFilter();
      }
    });

    span.addEventListener("click", () => {
      li.remove();
    });

    taskList.appendChild(li);
    taskBox.value = "";
    applyFilter();
  }
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilter();
  });
});

function applyFilter() {
  const activeBtn = document.querySelector(".task-btn-container .active");
  const filter = activeBtn?.textContent.toLowerCase();

  const tasks = document.querySelectorAll("#task-list-container li");
  tasks.forEach((task) => {
    if (filter === "all") {
      task.style.display = "block";
    } else if (filter === "active") {
      task.style.display = task.classList.contains("checked")
        ? "none"
        : "block";
    } else if (filter === "completed") {
      task.style.display = task.classList.contains("checked")
        ? "block"
        : "none";
    }
  });
}

document.querySelector(".all-btn").classList.add("active");
applyFilter();
