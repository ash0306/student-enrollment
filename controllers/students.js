const studentModel = require('../models/students')

const getAllStudents = async(request,response)=>{
    try{
        const students = await studentModel.find();
        response.status(200).json(students);
    }
    catch(error){
        response.status(500).json({message:error.message});
    }
}

const createNewStudent = async (request,response)=>{
    const newStudent = new studentModel({
        name: request.body.name,
        enrolledDepartment: request.body.enrolledDepartment,
        enrollmentDate: request.body.enrollmentDate
    })
    try{
        const student = await newStudent.save();
        response.status(201).json(student);
    }
    catch(error){
        response.status(500).json({message:error.message});
    }
}

const getStudentById = (request,response)=>{
    response.status(200).json(response.student);
}

const updateStudent = async (request,response)=>{
    if(request.body.name != null){
        response.student.name = request.body.name;
    }
    if(request.body.enrolledDepartment != null){
        response.student.enrolledDepartment = request.body.enrolledDepartment;
    }
    try{
        const updatedStudent = await response.student.save();
        response.status(201).json(updatedStudent);
    }
    catch(error){
        response.status(400).json({message:error.message})
    }
}

const deleteStudent = async (request,response)=>{
    try{
        await response.student.deleteOne();
        response.json({message:`Deleted ${response.student.name} and their details
        `})
    }
    catch(error){
        response.status(500).json({message:error.message})
    }
}

async function getStudent(request,response,next){
    let student
    try{
        student = await studentModel.findById(request.params.id)
        if(student==null){
            return response.status(404).json({message:`Cannot find user with id ${request.param.id}`})
        }
    }
    catch(error){
        return response.status(500).json({message:error.message})
    }
    response.student = student;
    next();
}

module.exports = {getAllStudents, createNewStudent, getStudentById, updateStudent, deleteStudent, getStudent}