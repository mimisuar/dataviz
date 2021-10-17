
var current_student = 0;

function initPlot() {
    var graph_div = document.getElementById("student_graph");

    var data1 = {
        type: "bar",
        name: student_data[current_student].name,
        x: cats,
        y: student_data[current_student].incorrect,
    };

    var data2 = {
        name: class_data.name,
        type: "bar",
        x: cats,
        y: class_data.incorrect
    };

    var data = [data2, data1];

    var layout = {
        title: student_data[current_student].name + " Results",
        xaxis: {
            title: "Question type"
        },
        yaxis: {
            title: "Number of incorrect answers",
            range: [range_min, range_max]
        },
        barmode: "group"
    };

    var settings = {staticPlot: true};

    Plotly.newPlot(graph_div, data, layout, settings);
    

    console.log(Plotly.BUILD);
}

function next_student()
{
    current_student++;
    if (current_student >= student_data.length) {
        current_student = 0;
    }
    initPlot();
}

function prev_student()
{
    current_student--;
    if (current_student < 0) {
        current_student = student_data.length - 1;
    }
    initPlot();
}