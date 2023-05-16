import React from "react";

function StudentTable({ students }) {
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
            <td>{student.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
