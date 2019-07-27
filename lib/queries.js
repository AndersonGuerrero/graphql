const { ObjectID } = require('mongodb')
const connectDb = require('./db')
const errorHandler = require('./errorHandler')

module.exports = {
  getCourses: async () => {
    let db; 
    let courses = []
    try {
      db = await connectDb()
      courses = await db.collection('courses').find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return courses
  },
  getCourse: async (root, {_id}) => {
    let db 
    let course
    try {
      db = await connectDb()
      course = await db.collection('courses').findOne({ _id: ObjectID(_id)})
    } catch (error) {
      errorHandler(error)
    }
    return course
  },
  //------------------------------- Students ---------------------------------
  getPeople: async () => {
    let db; 
    let students = []
    try {
      db = await connectDb()
      students = await db.collection('students').find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return students
  },
  getPerson: async (root, {_id}) => {
    let db 
    let student
    try {
      db = await connectDb()
      student = await db.collection('students').findOne({ _id: ObjectID(_id)})
    } catch (error) {
      errorHandler(error)
    }
    return student
  },
  searchItems: async (root, {keyword}) => {
    let db 
    let items
    let courses
    let people
    try {
      db = await connectDb()
      courses = await db.collection('courses').find(
        // text es el indice creado en mongo para la coleccion courses
        { $text: {
          $search: keyword}
        }).toArray()
      people = await db.collection('students').find(
        // text es el indice creado en mongo para la coleccion students
        { $text: {
          $search: keyword}
        }).toArray()
      items = [...courses, ...people]
    } catch (error) {
      errorHandler(error)
    }
    return items
  }
}