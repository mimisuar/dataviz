
var current_student = 0;

function init_plot() {
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
        barmode: "group",

        shapes: [
            create_line(passing_line, 0, 0, 0),
            create_line(success_line, 0, 20, 0)
        ],

        annotations: [
            create_text(passing_line, "nerd"),
            create_text(success_line, "bruv"),
        ]
    };

    var settings = {staticPlot: true};

    Plotly.newPlot(graph_div, data, layout, settings);
    update_summary();
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
    current_student++;
    if (current_student >= student_data.length) {
        current_student = 0;
    }
    init_plot();
}

function prev_student()
{
    current_student--;
    if (current_student < 0) {
        current_student = student_data.length - 1;
    }
    init_plot();
}

function update_summary()
{
    var summary = document.getElementById("summary");
    
    var student = student_data[current_student];
    var name = student.name;
    console.log("Updating summary for " + name + "...");

    let diffs = [];
    for (let i = 0; i < student.incorrect.length; i++) {
        let diff = class_data.incorrect[i] - student.incorrect[i];
        diffs.push(diff);
    }
    
    let max = Math.max(...diffs.map(Math.abs));
    //console.log(max);
    let norms = diffs.map(function(a){return a / max;});

    var small = [];
    var big = [];
    for (let i = 0; i < norms.length; i++) {
        if (norms[i] < 0) {
            if (norms[i] > -0.75) {
                small.push(i);
            } else {
                big.push(i);
            }
        }
    }

    summary.innerHTML = "";
    if (small.length > 0) {
        summary.innerHTML += name + " had some trouble with questions of type(s): " + gen_cat_list(small) + ".<br><br>";
    }
    if (big.length > 0) { 
        summary.innerHTML += name + " needs <i>a lot</i> of help with questions of type(s): " + gen_cat_list(big) + ".<br><br>";
    }

    var class_max = average(class_data.incorrect);
    var class_abs = class_data.incorrect.map(function(a){return a / class_max;});
    var tmp = [];
    for (let i = 0; i < class_abs.length; i++) { 
        if (class_abs[i] > 1) {
            tmp.push(i);
        }
    }
    if (tmp.length > 0) {
        summary.innerHTML += "Most of the class seemed to struggle with questions of type(s): " + gen_cat_list(tmp) + ".";
    }
    
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