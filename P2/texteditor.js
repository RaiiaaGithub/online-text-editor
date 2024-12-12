const inputsContainer = document.getElementById("inputs");
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");
const toggleBtn = document.getElementById("toggle-btn");
 // Evento para alternar a sidebar
 toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    content.classList.toggle("collapsed");
  });


  function addInputField() {
    const newInputDiv = document.createElement("div");
    newInputDiv.classList.add("input-container");

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.classList.add("text-input");
    newInput.placeholder = "Digite algo e pressione Enter...";
    newInput.required = true;

    newInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          if (newInput.value.trim() !== "") { 
            addInputField(); 
          } else {
            newInput.reportValidity(); 
            event.preventDefault(); 
          }
        }
      });

    newInputDiv.appendChild(newInput);
    inputsContainer.appendChild(newInputDiv);

    // Focar no novo campo
    newInput.focus();
  }

  // Adicionar evento ao primeiro campo
  document.querySelector(".text-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addInputField();
    }
  });