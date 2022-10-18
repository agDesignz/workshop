//jshint esversion:6

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const _ = require("lodash")
const Project = require(__dirname + '/schemae/projects.js')
const udemy = require(__dirname + "/src/udemy.json")
const coursera = require(__dirname + "/src/coursera.json")
const courseRsrcs = require(__dirname + "/src/courseRsrcs.json")
const otherRsrcs = require(__dirname + "/src/otherRsrcs.json")

const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(express.static('public'))
app.set('view engine', 'ejs')

mongoose.connect("mongodb+srv://agArt:30452ndAveS@udemycluster.oihtb.mongodb.net/workshop?retryWrites=true&w=majority");

app.get("/", (req, res) => {
  Project.find({}, async (err, projects) => {
    if(!err){

      res.render('main', {
        udemy: udemy,
        coursera: coursera,
        courseRsrcs: courseRsrcs,
        otherRsrcs: otherRsrcs,
        projects: projects
      })
    } else {
      console.log(err)
    }
  })
})

app.get("/:title", async (req, res) => {
  const projectSelected = req.params.title
  const projectName = await Project.find({ link: projectSelected})
  await res.render("project", {
    projectName: projectName
  })
})

app.post("/", async (req, res) => {
  const projectName = req.body.newProject
  const project = new Project({
    name: projectName,
    link: _.kebabCase(projectName)
  })
  await project.save().then(() => {
    res.redirect("/")
  })
})

app.post("/delete", (req, res) => {
  const checkedId = req.body.checkbox
  Project.findByIdAndDelete(checkedId, (err, docs) => {
    if (!err) {
      res.redirect("/")
    } else {
      console.log(err)
    }
  })
})


const port = process.env.PORT || 3000

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))



  // const projects = [
  //   "Total Thai",
  //   "Theatre Planner (like this app)",
  //   "Shopping List and Menus",
  //   "Wheeky Boyz",
  //   "Flesh out DKG Landscaping",
  //   "Scraping app (from articles)",
  //   "video upload app",
  //   "other crap from the articles"
  // ]
