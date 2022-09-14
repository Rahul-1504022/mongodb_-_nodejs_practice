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
        firstName: "Kabir",
        lastName: "Said",
        dob: new Date("21 September 1995"),
        passed: true,
        hobbies: ["Playing", "Hiking"],
        parents: {
            father: "K",
            mother: "D",
        },
        subjects: [
            {
                name: "Math",
                marks: 79,
            },
            {
                name: "English",
                marks: 63,
            }
        ]
    }
);

//save student object to shema
// student.save()//return promise
//     .then(data => console.log(data))
//     .catch(error => console.log(error));

async function saveStudent() {
    try {
        const savedata = await student.save();
        console.log(savedata);
    } catch (error) {
        console.log(error.message);
    }
}
saveStudent();
