var student_data = [];
var cats = ["Type 1", "Type 2", "Type 3", "Type 4"];
var class_data = {name: "Class Averages", incorrect: [0, 0, 0, 0]}
var range_min = 0;
var range_max = 0;
var passing_line = 1
var success_line = 3

function init_dataset()
{
    var student_a = {
        name: "Student A",
        incorrect: [2, 3, 4, 3]
    };
    student_data.push(student_a);

    var student_b = {
        name: "Student B",
        incorrect: [1, 1, 4, 0]
    };
    student_data.push(student_b);

    var student_c = {
        name: "Student C",
        incorrect: [0, 0, 4, 0]
    };
    student_data.push(student_c);

    var student_d = {
        name: "Student D",
        incorrect: [0, 1, 3, 2]
    };
    student_data.push(student_d);

    var student_e = {
        name: "Student E",
        incorrect: [0, 0, 3, 0]
    };
    student_data.push(student_e);

    var student_f = {
        name: "Student F",
        incorrect: [4, 2, 0, 1]
    };
    student_data.push(student_f);

    _compute_class_data();
}

function _compute_class_data()
{
    var tmp = [ [], [], [], [] ];
    student_data.forEach(function(student) { 
        for (let i = 0; i < tmp.length; i++) {
            tmp[i].push(student.incorrect[i]);
        }
    });

    for (let i = 0; i < tmp.length; i++) {
        tmp[i].sort();
        let med = average(tmp[i]);
        class_data.incorrect[i] = med;
    }

    let u = tmp.flat();
    range_min = Math.min(...u);
    range_max = Math.max(...u);
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