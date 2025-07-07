const writingForm = document.querySelector("div#writing");
const table = document.querySelector("div#table");

const input1 = writingForm.querySelector(".todo");
const input2 = writingForm.querySelector(".due");
const submitBtn = writingForm.querySelector("button");

let list = [];

function makeList(todo, due, id) {
    const n = {
        todo: todo,
        due: due,
    };
    return n;
}

function saveToLocal() {
    localStorage.setItem("list", JSON.stringify(list));
    window.location.reload();
}

function onClick() {
    let todo = "";
    let dueDate = "";

    if (input1.value) {
        todo = input1.value;
    } else {
        todo = "-";
    }

    if (input2.value) {
        dueDate = input2.value;
    } else {
        dueDate = "-";
    }
    input1.value = null;
    input2.value = null;

    list.push(makeList(todo, dueDate));
    saveToLocal();
}

function paintTable() {
    let ob = JSON.parse(localStorage.getItem("list"));

    if (ob !== null) {
        for (i = 0; i < ob.length; i++) {
            const tr = document.createElement("tr");
            tr.classList.add(i + 1);

            tr.innerHTML = `
                <th scope="row">${i + 1}</th>
                <td class="todo">${ob[i].todo}</td>
                <td class="due">${ob[i].due}</td>
                <td class="btn ${i + 1}"><button type="button" class="btn btn-danger">Delete</button></td>
            `;

            table.querySelector("tbody").appendChild(tr);
        }

        const btn = table.querySelectorAll("td.btn button");
        btn.forEach((ele) => {
            ele.addEventListener("click", deleteBtn);
        });
    }

}

function deleteBtn(event) {
    if (list.length === 1) {
        localStorage.clear();
        window.location.reload();
    } else {
        const className = event.target.parentElement.classList[1] - 1;
        list.splice(className, 1);
        saveToLocal();
        target.remove();
    }
}

submitBtn.addEventListener("click", onClick);
window.addEventListener("DOMContentLoaded", paintTable);
window.addEventListener("DOMContentLoaded", () => {
    list = JSON.parse(localStorage.getItem("list"));
    if (list === null) {
        list = [];
    }
});