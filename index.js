const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

mongoose.connect('mongodb://localhost:27017/my-students')
    .then(() => console.log("Connected to MONGO-DB sucessfully"))
    .catch(err => console.error("Connection failed"));

//schema => defines the shape of document
const studentSchema = new mongoose.Schema(
    {
        firstName: { type: String },
        lastName: String,
        dob: Date,
        entryDate: { type: Date, default: Date.now },
        passed: Boolean,
        hobbies: [String],
        parents: {
            father: String,
            mother: String,
        },
        subjects: [
            {
                name: String,
                marks: { type: Number, min: 0, max: 100 },
            }
        ],
    }
)

//Model
const Student = mongoose.model('Student', studentSchema);//class
//ready
const student = new Student(
    {
        firstName: "Kashem",
        lastName: "Hossen",
        dob: new Date("25 March 1987"),
        passed: true,
        hobbies: ["Reading", "Writing"],
        parents: {
            father: "S",
            mother: "T",
        },
        subjects: [
            {
                name: "Math",
                marks: 89,
            },
            {
                name: "English",
                marks: 88,
            }
        ]
    }
);

//save student object to shema
// student.save()//return promise
//     .then(data => console.log(data))
//     .catch(error => console.log(error));

//Create a new Entry
async function saveStudent() {
    try {
        const saveData = await student.save();
        console.log(saveData);
    } catch (error) {
        console.log(error.message);
    }
}
// saveStudent();

//Read from Collection
async function readStudent() {
    try {
        const readData = await Student
            .find()
            .select({ firstName: 1, lastName: 1, passed: 1 });
        console.log(readData);
    } catch (error) {
        console.log(error.message);
    }
}
// readStudent();

//Update Collection
async function updateStudent(id) {
    try {
        const student = await Student.updateOne({ _id: id }, {
            $set: {
                passed: false
            }
        })
        console.log(student);
    } catch (error) {
        console.log(error.message);
    }
}
// updateStudent("632210063696972c6d4f3caf");

//Delete from Collection
async function deleteStudent(id) {
    try {
        const student = await Student.deleteOne({ _id: id })
        console.log(student);
    } catch (error) {
        console.log(error.message);
    }
}
// deleteStudent("632210063696972c6d4f3caf");