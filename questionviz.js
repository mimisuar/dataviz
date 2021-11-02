var current_student = 0;

function init_summary()
{
    current_student = Number(localStorage.getItem("current_student"));
    if (current_student === NaN) {
        current_student = 0;
    }

    var p = document.getElementById("summary_title");
    var name = student_data[i].name;

    p.innerText = "Summary of " + name;
}