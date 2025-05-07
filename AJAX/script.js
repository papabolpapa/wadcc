document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("Name").value;
    const gender = document.querySelector('input[name="Gender"]:checked')?.value || "";
    const email = document.getElementById("email").value;
    const number = document.getElementById("number").value;
  
    if (!gender) {
      alert("Please select gender.");
      return;
    }
  
    const userData = { name, gender, email, number };
  
    // Save to localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
  
    // Redirect to view page
    window.location.href = "view.html";
  });
  