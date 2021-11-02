
var current_student = 0;
var current_question = -1;

function init_plot() {
    if (current_student === null) {
        current_student = Number(localStorage.getItem("current_student"));
        if (current_student === NaN) { current_student = 0; } 
    }
    var graph_div = document.getElementById("student_graph");

    var data1 = {
        type: "bar",
        name: student_data[current_student].name,
        x: cats,
        y: student_data[current_student].points,
    };

    var data = [data1];

    var layout = {
        title: student_data[current_student].name + " Results",
        xaxis: {
            title: "Question"
        },
        yaxis: {
            title: "Number of points earned",
            range: [range_min, range_max]
        },
        barmode: "group",

        shapes: [
            create_line(passing_line, 0, 0, 0),
        ],

        annotations: [
            create_text(passing_line, "passing"),
        ]
    };

    var settings = {staticPlot: true};

    Plotly.newPlot(graph_div, data, layout, settings);
    update_box();
}

function rgb_to_str(r, g, b)
{
    return "rgb(" + String(r) + "," + String(g) + "," + String(b) + ")";
}

function create_text(yval, text)
{
    return {
        showarrow: false,
        text: "<b>" + text + "</b>",
        font: {
            family: "Arial",
            size: 18,
            color: "#000000"
        },
        x: 1,
        y: yval,
        xref: "paper",
        yanchor: "top",
        xanchor: "right",
    };
}

function create_line(yval, r, g, b)
{
    return {
        type: "line",
        xref: "paper",
        x0: 0,
        x1: 1,
        y0: yval,
        y1: yval,
        label: "nerd",
        line: {
            color: rgb_to_str(r, g, b),
            width: 3,
            dash: "solid"
        }
    }
}

function next_student()
{
    console.log("Not owkr");
    current_student++;
    if (current_student >= student_data.length) {
        current_student = 0;
    }
    init_plot();
}

function prev_student()
{
    console.log("owkr");
    current_student--;
    if (current_student < 0) {
        current_student = student_data.length - 1;
    }
    init_plot();
}

function update_box()
{
    console.log("Current question is " + String(current_question));
    if (current_question == -1) {
        update_summary();
    }
    else {
        update_question();
    }
}

function update_summary()
{
    var summary = document.getElementById("summary");
    summary.innerHTML = "<b>Summary</b><br>";

    
}

function update_question()
{
    var summary = document.getElementById("summary");
    var question_title = "Question " + String(current_question + 1);
    summary.innerHTML = "<b>" + question_title + "</b> <br>"
}

function gen_cat_list(listcat)
{
    var tmp = "";
    for (let i = 0; i < listcat.length; i++) {
        tmp += cats[listcat[i]];
        if (i < listcat.length - 1) {
            tmp += ", ";
        }
    }
    return tmp;
}

function see_question(question)
{
    if (question >= -1 && question < 3) {
        current_question = question
    }
    update_box();
}