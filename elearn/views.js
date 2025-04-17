const Course = require('./models/course')
const User = require('./models/user')
const Analytics = require('./models/analytics');
const Feedback = require('./models/feedback');

exports.get_courses = async (req, res) => {
    let response = []
    response = await Course.find()
    res.status(200).json(response)
}

exports.new_course = async (req, res) => {
    const {title, description, profile_type, createdAt, points, name_identifier} = req.body
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
        res.status(500).json(response)
    }
} 

exports.user = async (req, res) => {
    const response = []
    try{
      req.body['profile_type'] = 'Default'
      const response = new User(req.body);
      await response.save()
      res.status(200).send(response);
    }catch(err){
      console.log("🚀 ~ exports.user= ~ err:", err)
      res.status(500).send(response);
    }
 
} 

exports.analytics = async (req, res) => {
  try {
    const course = await Course.findOne({ name_identifier: req.body.course });
    if (!course) return res.status(404).send('Course not found');

    const analytics = new Analytics({ ...req.body, course: course._id });
    await analytics.save();
    res.status(201).send('Analytics recorded');
  } catch (err) {
    res.status(500).send('Error saving analytics');
  }
} 

exports.feedback = async (req, res) => {
    try {
      const course = await Course.findOne({ name_identifier: req.body.course });
      if (!course) return res.status(404).send('Course not found');
  
      const feedback = new Feedback({
        course: course._id,
        cardIndex: req.body.cardIndex,
        feedback: req.body.feedback
      });
      await feedback.save();
      res.status(201).send('Feedback saved');
    } catch (err) {
      res.status(500).send('Error saving feedback');
    }
  } 

exports.update_course = async (req, res) => {
  try {
    const courseId = req.body._id;

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      req.body,           // directly use the updated object
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(updatedCourse);
  } catch (err) {
    console.error("🚀 ~ exports.update_course ~ error:", err);
    res.status(500).send('Error updating course');
  }
};

exports.health_check = async (req, res) => {
  const response = [{
    "ping":"pong"
  }]
  res.status(200).json(response)
}

exports.get_course = async (req, res) => {
  let response = []
  try{
    response = await Course.findOne({name_identifier:req.params.name_identifier})
    res.status(200).json(response)
  }catch(err){
    console.log("🚀 ~ exports.get_course= ~ err:", err)
    res.status(500).json(response)
  }
  
}