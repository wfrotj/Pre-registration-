import React, { createContext } from "react";
import { useState } from "react";
import "../styles/Registration.css";
import TitleCase from "./utils/TitleCase";

function Registration() {
  const [students, setStudents] = useState([]);
  const [firstNameValue, setFirstNameValue] = useState("");
  const [count, setCount] = useState(0);
  const [lastNameValue, setLastNameValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [age, setAge] = useState(0);
  const openPreview = document.getElementById("openPreviewBtn");

  //opening the preview
  const appendModal = () => {
    const body = document.querySelector("body");
    const preview = document.createElement("div");
    preview.classList.add("preview");
    preview.style.display = "flex";

    const details = document.createElement("article");
    details.classList.add("details");

    const fname = document.createElement("h1");
    fname.classList.add("fname");
    fname.textContent = `First Name: ${{ TitleCase }(firstNameValue)}`;

    const lname = document.createElement("h1");
    lname.classList.add("lname");
    lname.textContent = `Last Name: ${{ TitleCase }(lastNameValue)}`;

    const h2 = document.createElement("h2");
    h2.textContent = `Age: ${age}`;

    const confirm = document.createElement("button");
    confirm.classList.add("confirm");
    confirm.textContent = "CONFIRM";
    confirm.type = "submit";
    confirm.onclick = function () {
      alert("Success!");
      preview.style.display = "none";
    };

    const edit = document.createElement("button");
    edit.classList.add("edit");
    edit.textContent = "EDIT";
    edit.onclick = function () {
      preview.style.display = "none";
      editStudent();
    };
    details.append(fname, lname, h2, confirm, edit);
    preview.appendChild(details);
    body.appendChild(preview);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (firstNameValue === "" || lastNameValue === "" || age === 0) return;

    if (editingIndex !== null) {
      // Editing existing student
      const newStudents = [...students];
      newStudents[editingIndex] = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        age: age,
      };
      setStudents(newStudents);
      setEditingIndex(null);
    } else {
      // appendModal();
      // Adding new student
      setStudents([
        ...students,
        {
          firstName: { TitleCase }(firstNameValue),
          lastName: { TitleCase }(lastNameValue),
          age: age,
        },
      ]);
      setCount(count + 1);
    }
    setFirstNameValue("");
    setLastNameValue("");
    setAge(0);
    appendModal();
  };

  const handleFirstNameChange = (event) =>
    setFirstNameValue(event.target.value);
  const handleLastNameChange = (event) => setLastNameValue(event.target.value);
  const handleAge = (event) => setAge(event.target.value);
  //deleting

  const appendDelete = (index) => {
    const body = document.querySelector("body");
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("questionContainer");
    const question = document.createElement("h1");
    question.textContent = "Are you sure you want to delete?";

    const yesBtn = document.createElement("button");
    yesBtn.textContent = "YES";
    yesBtn.onclick = function () {
      const newStudents = [...students];
      newStudents.splice(index, 1);
      setStudents(newStudents);
      setCount(count - 1);
      questionContainer.style.display = "none";
    };

    const noBtn = document.createElement("button");
    noBtn.textContent = "NO";
    noBtn.onclick = function () {
      questionContainer.style.display = "none";
    };

    questionContainer.append(question, yesBtn, noBtn);
    body.appendChild(questionContainer);
  };

  //editing
  const editStudent = (index) => {
    const studentToEdit = students[index];
    if (!studentToEdit) {
      console.error("Cannot edit student at index:", index);
      return;
    }
    setFirstNameValue(studentToEdit.firstName);
    setLastNameValue(studentToEdit.lastName);
    setAge(studentToEdit.age);
    setEditingIndex(index);

    // Prefill form fields with student data
    const firstNameInput = document.getElementById("firstNameInput");
    const lastNameInput = document.getElementById("lastNameInput");
    const ageInput = document.getElementById("ageInput");
    if (firstNameInput) {
      firstNameInput.value = studentToEdit.firstName;
    }
    if (lastNameInput) {
      lastNameInput.value = studentToEdit.lastName;
    }
    if (ageInput) {
      ageInput.value = studentToEdit.age;
    }
  };

  return (
    <div className="main">
      <div className="hero">
        <h1>Pre-registration Form</h1>
        <div>
          <p>Number of registrants: {count}</p>
        </div>
        <div className="form-container" id="primary">
          <form onSubmit={handleFormSubmit} id="openPreviewBtn">
            <label>First Name</label>
            <input
              type="text"
              value={firstNameValue}
              onChange={handleFirstNameChange}
              className="fname"
              id="firstNameInput"
            />

            <label>Last Name</label>
            <input
              type="text"
              value={lastNameValue}
              onChange={handleLastNameChange}
              className="lname"
              id="lasttNameInput"
            />
            <div>
              <label>Age</label>
              <input
                type="number"
                className="age"
                value={age}
                onChange={handleAge}
                id="ageInput"
              />
            </div>

            <div>
              <button type="submit" className="add-btn">
                {editingIndex !== null ? "Save" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="tableData">
        <table border="1">
          <thead>
            <tr>
              <th>No.</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Age</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.age}</td>
                <td>
                  <button onClick={() => appendDelete(index)}>Delete</button>
                  <button onClick={() => editStudent(index)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Registration;
