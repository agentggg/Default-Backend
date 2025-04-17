const Course = require('./models/course')
const User = require('./models/user')
const Analytics = require('./models/analytics');
const Feedback = require('./models/feedback');
var nodemailer = require('nodemailer');



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
  try {
    const email = req.body.email?.trim().toLowerCase();
    const phone = req.body.phone?.replace(/\D/g, '');

    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }]
    });

    if (existingUser) {
      return res.status(409).send({ error: 'User with this email or phone number already exists.' });
    }
    req.body.profile_type = 'Default';
    req.body.email = email;
    req.body.phone = phone;

    const user = new User(req.body);
    await user.save();
    res.status(200).send(user);

    update_all_nations(req.body)
      .then(result => {
        if (result !== "successful") {
          console.warn("⚠️ update_all_nations failed:", result);
        }
      })
      .catch(err => {
        console.error("❌ Error in update_all_nations:", err);
      });
  } catch (err) {
    console.error("🚨 Error saving user:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};




const update_all_nations = async(contact) => {
  const {first_name, last_name, email, phone, referral} = contact
  const emailMessage = `Hey ${first_name}! 🌟 

I just want to say a huge thank you for considering joining us at Kingdom Tech! 🙌 Kingdom Tech is powered by the incredible fusion of Tech & Faith, and your presence here is truly a blessing. Together, we’re on an amazing journey that’s all about showing the world that the Kingdom can be preached using technology as a powerful tool! ✝️💻 Remember when Jesus said, "And this gospel of the kingdom will be preached in the whole world as a testimony to all nations, and then the end will come"? 🌍 Back in the day, that meant traveling far and wide, but guess what? Now, thanks to technology, we can reach people all over the globe at the click of a button, Tech & Faith! 📱✨ 

Just think about it – the body of Christ has the potential to spread the message further than ever before, and it’s all because we’re embracing the tools that tech offers us. 

It’s inspiring to see how everyone in the secular world has tapped into this exciting mystery. Now, it’s our turn as the body of Christ to step up, take ownership, and utilize what is rightfully ours! 🚀💪 Let’s harness the power of technology to share hope, love, and faith with those who need it most. 

I’m so excited to have you on board and can’t wait to see the incredible things we’ll accomplish together! Let’s make some noise for the Kingdom! 🎉💖 

Blessings 
Stevenson Gerard
Tech & Faith
`
  try {
    const apiRes = await fetch('https://allnations-agentofgod.pythonanywhere.com/register/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: first_name,
        lastName: last_name,
        phoneNumber: phone,
        username: "cisco",
        category: "957",
        user: "1",
        notes: `E-learn contact referred by ${referral}, and email contact ${email}`,
        org: "RAW"
      })
    });

    if (!apiRes.ok) {
      throw new Error(`API request failed with status ${apiRes.status}`);
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD
      }
    });

    const mailOptions = {
      from: `"Tech & Faith" <${process.env.EMAIL_HOST_USER}>`,
      to: email,
      subject: 'Thank you for supporting Kingdom Tech',
      text: emailMessage
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);

    return "successful";

  } catch (err) {
    console.error("❌ update_all_nations error:", err.message);
    return "failed";
  }
  };

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

