import { useState } from 'react'

const Course = ({ course }) => {
return (
    <>
        <h1>{course.name}</h1>
        <ul>
            {course.parts.map(part => {
                return (
                    <li key={part.id}>{part.name} {part.exercises}</li>
                )
            }
            )}
        </ul>
        <p><b>total of {course.parts.map(part => part.exercises).reduce((a, b) => a + b, 0)} exercises</b></p>
    </>
)
}

export default Course