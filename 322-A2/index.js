let commodities = [];
document.addEventListener("DOMContentLoaded", getCommoditiesList);

async function getCommoditiesList() {
  try {
    const response = await fetch("getCommodities.php");
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      commodities = data.map((commodity) => ({
        id: commodity.id,
        name: commodity.name,
        information: commodity.information,
        code: commodity.code,
      }));
      displayCommoditiesList();
    } else {
      throw new Error("Failed to retrieve data");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

function displayCommoditiesList() {
  // Sort commodities
  commodities.sort((a, b) => a.name.localeCompare(b.name));

  const select = document.getElementById("commodity-select");

  // Clear any existing options
  select.innerHTML = "";
  select.innerHTML += "<option></option>";

  // Add options to select dropdown
  commodities.forEach((commodity) => {
    const option = document.createElement("option");
    option.value = commodity.id;
    option.textContent = commodity.name;
    select.appendChild(option);
  });

  // Add event listener
  select.addEventListener("change", (event) => {
    const selectedId = event.target.value; // Correct property to get selected value
    const selectedCommodity = commodities.find(
      (commodity) => commodity.id == selectedId
    );

    if (selectedCommodity) {
      const newWidget = new Widget(selectedCommodity); // Assuming `Widget` is a class
      newWidget.loadWidget();
    }
  });
}
