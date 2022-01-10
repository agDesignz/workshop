//jshint esversion:6

const express = require('express')
const bodyParser = require('body-parser')
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


app.get("/", (req, res) => {
  res.render('main', {
    udemy: udemy,
    coursera: coursera,
    courseRsrcs: courseRsrcs,
    otherRsrcs: otherRsrcs,
    projects: projects
  })
})

const projects = []

app.post("/", async (req, res) => {
  let newProject = req.body.newItem
  projects.push(newProject)
  res.redirect("/")
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))
