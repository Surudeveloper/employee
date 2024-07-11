const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    id: { type: string },
    name: { type: string },
    phone: { type: string },
    department: { type: string },
    designation: { type: string },
    salary: { type: string },
    bankAccount: { type: string },
    address: { type: string },
    phone: { type: string },
    createdate:{type:Date},
    lstupdateddate:{type:Date},
}, { collection: 'employee'})

module.exports = mongoose.model('employee', employeeSchema)