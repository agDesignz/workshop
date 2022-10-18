const mongoose = require("mongoose")

const projectsSchema = new mongoose.Schema({
  name: String,
  link: String
})

const Project = mongoose.model("Project", projectsSchema)

module.exports = mongoose.model("Projects", projectsSchema)
