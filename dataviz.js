
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
        barmode: "group"
    };

    var settings = {staticPlot: true};

    Plotly.newPlot(graph_div, data, layout, settings);
    update_summary();
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
    console.log(norms);

    var small = [];
    var big = [];
    for (let i = 0; i < norms.length; i++) {
        if (norms[i] < 0) {
            if (norms[i] > -0.5) {
                small.push(i);
            } else {
                big.push(i);
            }
        }
    }

    summary.innerHTML = "";
    if (small.length > 0) {
        summary.innerHTML += name + " needs a bit of help with questions of type(s): " + gen_cat_list(small) + ".<br>";
    }
    if (big.length > 0) { 
        summary.innerHTML += name + " needs a lot of help with questions of type(s): " + gen_cat_list(big) + ".<br>";
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