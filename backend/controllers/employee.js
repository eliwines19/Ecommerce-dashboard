const EmployeeSchema = require('../models/EmployeeModel')

exports.addEmployee = async (req, res) => {
    const { name, country, jobTitle, hireDate } = req.body

    const employee = EmployeeSchema({
        name,
        country,
        jobTitle,
        hireDate
    })

    try {
        //validations
        if(!name || !country || !jobTitle || !hireDate){
            return res.json({ error: "All Fields Required" })
        }
        await employee.save()
        return res.status(200).json({ message: "Employee Added Successfully" })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

exports.getEmployees = async (req, res) => {
    try {
        const employees = await EmployeeSchema.find().sort()
        return res.status(200).json(employees)
    } catch (error) {
        return res.status(500).json({ Error: error })
    }
}

exports.deleteEmployee = async (req, res) => {
    const { id } = req.params

    EmployeeSchema.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: "Employee Deleted Successfully" })
        })
        .catch((error) => {
            res.status(500).json({ Error: error })
        })
}