// models/User.js
// Example User model for MongoDB

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ['job_seeker', 'employer', 'admin'],
      default: 'job_seeker',
    },
    profilePicture: {
      type: String,
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    skills: [
      {
        type: String,
      },
    ],
    profile: {
      headline: String,
      summary: String,
      experience: [
        {
          company: String,
          position: String,
          startDate: Date,
          endDate: Date,
        },
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

//Secure password hashing before saving user to database
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) { //To check if user is old or new, if old then skip hashing
        console.log("Password not modified");
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt); //Hash the password and save it to user object
        next();
    } catch (error) {
        console.log("Error in hashing password", error);
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//JSON Web Token ( userSchema.methods se kitne bhi functions create kar sakte hai and usse controllers mein use kar sakte hai )
userSchema.methods.generateToken = async function (){  
    try{
        return jwt.sign({ //JWT payload mein user ki id, email aur role store karenge taki future mein authentication ke time pe use kar sake
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.role === 'admin',
        },
        process.env.JWT_SECRET || 'your-secret-key',
        {
            expiresIn: "7d",
        }
        );
    }catch(error){
        console.log("Error in generating token: ",error);
    }
}

module.exports = mongoose.model('User', userSchema);
