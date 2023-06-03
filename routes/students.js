const express = require('express');
const router = express.Router();
const studentModel = require('../models/students');
const {getAllStudents, createNewStudent, updateStudent,getStudentById, deleteStudent, getStudent} = require('../controllers/students')

// getAllStudents and addStudent
router.route('/').get(getAllStudents).post(createNewStudent);

// getStudentById and updateStudent and deleteStudent
router.route('/:id').get(getStudent,getStudentById).patch(getStudent,updateStudent).delete(getStudent,deleteStudent)


module.exports = router;