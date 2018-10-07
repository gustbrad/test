var mongoose = require("mongoose");
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var userSchema = new Schema({
  username: {
     type: String,
     required: true
  },
  email: {
     type: String,
     unique: true,
     required: true
  },
  password: {
     type: String,
     required: true
  },
  isMusican: {
       type: Boolean,
       required: true
  },
  profile_Options: {
     type: Schema.Types.ObjectId,
     ref: "Options"
  },
  musicianInfo: {
     type: Schema.Types.ObjectId,
     ref: "Musician"
  },
  bandInfo: {
       type: Schema.Types.ObjectId,
       ref: "Band"
  }
});

// Define schema methods
userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.local.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function(next) {
	if (!this.local.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.local.password = this.hashPassword(this.local.password)
		next()
	}
	// this.password = this.hashPassword(this.password)
	// next()
})

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", userSchema);

// Export the Article model
module.exports = User;
