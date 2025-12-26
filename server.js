const express = require("express")
const app = express()

app.use(express.json())

app.post("/calculate-result", (req, res) => {
    const { name, subjects } = req.body

    if (!name || !subjects || typeof subjects !== "object") {
        return res.status(400).json({
            error: "Invalid input"
        })
    }

    let totalMarks = 0
    let subjectCount = 0

    for (let subject in subjects) {
        const marks = subjects[subject]

        if (typeof marks !== "number" || marks < 0 || marks > 100) {
            return res.status(400).json({
                error: `Invalid marks for ${subject}`
            })
        }

        totalMarks += marks
        subjectCount++
    }

    const percentage = (totalMarks / (subjectCount * 100)) * 100

    let grade
    if (percentage >= 90) grade = "A+"
    else if (percentage >= 80) grade = "A"
    else if (percentage >= 70) grade = "B"
    else if (percentage >= 60) grade = "C"
    else if (percentage >= 50) grade = "D"
    else grade = "F"

    res.json({
        studentName: name,
        subjects,
        totalMarks,
        percentage: percentage.toFixed(2) + "%",
        grade
    })
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
