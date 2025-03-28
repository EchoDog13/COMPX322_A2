let commodities = [];
document.addEventListener("DOMContentLoaded", getCommoditiesList());

async function getCommoditiesList() {
  try {
    const response = await fetch("getCommodities.php");
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      commodities = data.map((commoditiy) => ({
        id: commoditiy.id,
        name: commoditiy.name,
        information: commoditiy.information,
        code: commoditiy.code,
      }));
      displayCommodities();
    } else {
      throw new Error("Failed to retrieve data");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

function displayCommodities() {
  // Sort Commodities
  commodities.sort((a, b) => a.name.localeCompare(b.name));
  select = document.getElementById("commodity-select");

  select.innerHTML = "";

  commodities.forEach((commoditiy) => {
    const option = document.createElement("option");
    option.value = commoditiy.id;
    option.textContent = commoditiy.name;

    select.appendChild(option);
  });
}
