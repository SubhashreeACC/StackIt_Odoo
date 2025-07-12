const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  text:       { type: String, required: true },
  user:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  votes:      { type: Number, default: 0 },
  accepted:   { type: Boolean, default: false },
  createdAt:  { type: Date, default: Date.now }
});

const questionSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  tags:        [{ type: String }],
  user:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers:     [answerSchema],
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model("Question", questionSchema);
