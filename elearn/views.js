const Course = require('./models/course')
const User = require('./models/user')

exports.get_courses = async (req, res) => {
    let response = []
    response = await Course.find()
    res.status(200).json(response)
}

exports.new_course = async (req, res) => {
    console.log("🚀 ~ exports.new_course= ~ req:", req.body)
    const {title, description, profile_type, createdAt, points, name_identifier} = req.body
    // res.header("Access-Control-Allow-Origin", "*"); // Use specific domain in production
    console.log("🚀 ~ exports.new_course= ~ name_identifier:", name_identifier)
    const response = []
    try{
        const course = new Course({
            title: title,
            cards: points,
            profile_type: profile_type,
            createdAt: createdAt,
            description: description,
            name_identifier: name_identifier
          });
          await course.save() 
          res.status(201).json(course)
    }catch(err){
        console.log("🚀 ~ exports.new_course= ~ err:", err)
        res.status(500).json(response)
    }
} 

exports.user = async (req, res) => {
    const response = []
    const { first_name, last_name, email, phone, referral } = req.body;
    const newUser = new User({ first_name, last_name, email, phone, referral });
    console.log("🚀 ~ exports.user= ~ newUser:", newUser)
    res.send(response)
} 