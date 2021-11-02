var student_data = [];
var cats = ["Q1", "Q2", "Q3"];
var range_min = 0;
var range_max = 0;
var passing_perc = 0.5;
var passing_line = 2;

function init_dataset()
{
    var student_a = {
        name: "Student A",
        points: [5, 7, 6],
        questions: [
            "Drew the particles velocity curve as a straight line.",
            "2",
            "3"
        ]
    };
    student_data.push(student_a);

    var student_b = {
        name: "Student B",
        points: [2, 3, 4],
        questions: [
            "y",
            "ur",
            "mom"
        ]
    };
    student_data.push(student_b);

    var student_c = {
        name: "Student C",
        points: [7, 1, 5],
        questions: [
            "my",
            "only",
            "hope"
        ]
    };
    student_data.push(student_c);

    _compute_class_data();
}

function _compute_class_data()
{
    var tmp = [ [], [], [] ];
    student_data.forEach(function(student) { 
        for (let i = 0; i < tmp.length; i++) {
            tmp[i].push(student.points[i]);
        }
    });

    let u = tmp.flat();
    range_min = 0;
    range_max = Math.max(...u);
    passing_line = range_max * passing_perc;
}

function median(values){
    if(values.length ===0) throw new Error("No inputs");
  
    var half = Math.floor(values.length / 2);
    
    if (values.length % 2) {
      return values[half];
    }
    
    return (values[half - 1] + values[half]) / 2.0;
  }

function average(values) {
    if(values.length ===0) throw new Error("No inputs");

    let sum = 0.0;
    values.forEach(function(a) {
        sum += a;
    });

    return sum / values.length;
}

function standard_deviation(values) {
    if (values.length === 0) throw new Error("No inputs");
    var avg = average(values);
    var tmp_diff = values.map(function(x) { return Math.pow(x - avg, 2)});
    var varience = average(tmp_diff);
    return Math.sqrt(varience);
}