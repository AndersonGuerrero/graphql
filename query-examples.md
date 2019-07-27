
{
  allCourses: getCourses {
    ...customFiels
  }
  oneCourse: getCourse(_id: "5d3a6faeabae351e2620048c") {
    ...customFiels
  }
  Course2: getCourse(_id: "5d3a6faeabae351e2620048c") {
    ...customFiels
  }
}

fragment customFiels on Course {
  _id
  title
  description
  teacher
}
# Variables para consultas y guardados

mutation addPersonToCourse2($course: ID! $person: ID!){
    addPeople(courseID: $course, personID: $person){
      _id
      title
    }
  }
# --------------- Vars -----------------------
  {
    "course": "5d39c2d0b390b33d4b5a8a99",
    "person": "5d3b33f1fbe69c738ec2aaf0"
  }
# ----------------------------------------

# Quey con variables
query getCourse2($course: ID!){
    getCourse(_id:$course){
      _id
      title
      people{
        name
        email
      }
    }

# ------------------- propiedad enum ---------------------------
mutation createNewCourse($courseinput: CouserInput!){
    createCourse(input:$courseinput){
      _id
      title
      topic
      level
    }
  }
 # ------------------------ Vars --------------------------------
  {
    "courseinput":{
      "title": "hola jajaja",
      "description": "lol des",
      "level": "intermedio"
    }
  }
# --------------------------------------------------------------

# ----------------------- interface -----------------------------

mutation createNewMonitor($monitorInput: PersonInput!)
{
 createPerson(input:$monitorInput){
  	_id
  	name
  	email
    ...on Monitor{
      phone
    }
  	...on Student{
      avatar
    }
	} 
}

mutation createStudent($studentInput: PersonInput!)
{
 createPerson(input:$studentInput){
  	_id
  	name
  	email
    ...on Monitor{
      phone
    }
  	...on Student{
      avatar
    }
	} 
}
# -- Vars
{
  "monitorInput": {
    "name": "Monitorxd",
    "email": "test@gmail.com",
    "phone": "74238949324"
  },
  "studentInput": {
    "name": "Monitorxd",
    "email": "test@gmail.com",
    "avatar": "//fhjsdh/sdfsdf.png"
  }
# ----------------------------------------------------------

# ------------- Directivas --------------------------------
query getPeopleData($monitor: Boolean!, $avatar: Boolean!){
  getPeople{
    _id
    name
    email
    ...on Monitor @include(if: $monitor){
      phone
    }
    ...on Student @include(if: $avatar){
      avatar
    }
  }
}
#vars
{
  "monitor": false,
  "avatar": true
}
# ---------------------------------------------------------