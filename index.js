function submitData(name, email) {
    const userData = {
      name: name,
      email: email
    };
  
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("error")
      }
      return response.json()
    })
    .then(data => {
      // Access the new id from the response and append it to the DOM
      const id = data.id
      const idElement = document.createElement("p")
      idElement.textContent = `New user ID: ${id}`
      document.getElementById("result").appendChild(idElement)
    })
    .catch(error => {
      // Handle error and append the error message to the DOM
      const errorElement = document.createElement("p")
      errorElement.textContent = `Error: ${error.message}`
      document.getElementById("result").appendChild(errorElement)
    })
  }
  
  document.getElementById("dataForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
  
    submitData(name, email)
      .then(() => {
        // If successful, remove the form and display the success message
        const form = document.getElementById("dataForm")
        form.remove()
  
        const successMessage = document.createElement("p")
        successMessage.textContent = "Form submitted successfully!"
        document.getElementById("result").appendChild(successMessage)
      })
      .catch(error => {
        // Display the error message on the page
        const errorMessage = document.createElement("p")
        errorMessage.textContent = "Error: " + error.message
        document.getElementById("result").appendChild(errorMessage)
      })
  })
  