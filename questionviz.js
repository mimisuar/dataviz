var current_student = 0;
var current_question = 0;

function init_summary()
{
    current_student = Number(localStorage.getItem("current_student"));
    if (current_student === NaN) {
        current_student = 0;
    }

    var i = current_student;
    var p = document.getElementById("summary_title");
    var name = student_data[i].name;

    p.innerText = "Summary of " + name + " (Question " + String(current_question + 1) + ")";
}

function back_to_main()
{
    window.location.href = "index.html";
}