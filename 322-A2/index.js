let commodities = [];
let widgets = [];
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
      if (widgets[selectedCommodity.id - 1] == undefined) {
        const newWidget = new Widget(selectedCommodity);
        widgets[newWidget.id - 1] = newWidget;
        newWidget.show();
        generateKey();
      }
    }
  });
}

/**
 * Widget class - stores commidity information and has methods to show and hide the widget from the DOM
 */
class Widget {
  constructor(selectedCommodity) {
    this.code = selectedCommodity.code;
    this.id = selectedCommodity.id;
    this.information = selectedCommodity.information;
    this.cName = selectedCommodity.name;
  }

  //Add to DOM
  //Show Name
  //Add graph button
  //remove graph button
  show() {
    console.log("Show Widget");
    console.log(this.cName);
    const widgetsContainer = document.getElementById("widgets-container");

    const widgetDiv = document.createElement("div");
    var _h3 = document.createElement("h3");
    var _removeButton = document.createElement("button");
    var _showGraphButton = document.createElement("button");
    var _hideGraphButton = document.createElement("button");

    _h3.innerHTML = this.cName;
    _removeButton.innerHTML = "Remove";
    _removeButton.onclick = () => this.hide();

    _showGraphButton.innerText = "Show Graph";
    _showGraphButton.onclick = () => showGraph(this.code);

    _hideGraphButton.innerText = "Hide Graph";
    //_hideGraphButton.onclick(); //DO SOMETHING

    widgetDiv.id = `widget-${this.id}`;
    //Append elements to DIV
    widgetDiv.append(_h3);
    widgetDiv.append(_showGraphButton);
    widgetDiv.append(_hideGraphButton);
    widgetDiv.append(_removeButton);

    //Append div to container
    widgetsContainer.append(widgetDiv);
  }

  //Remove from widget array
  //Remove from DOM
  hide() {
    const widgetDiv = document.getElementById(`widget-${this.id}`);
    if (widgetDiv) {
      widgetDiv.remove(); // Removes the div element from the DOM
    }

    // Optionally remove from the widgets array
    widgets[this.id - 1] = undefined;
  }
}

async function showGraph(code) {
  const dataLocation = `${"https://www.alphavantage.co/query?function="}${code}&interval=monthly&apikey=MIDP5HIWUE7ZTBG1}`;
  dataLocation = "query.json";

  try {
    const response = await fetch(dataLocation);

    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const res = await response.json();
    console.log("JSON response:", res);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the function
showGraph();

const data = {
  //labels: ;
  datasets: "query.json",
};

const config = {
  type: "line",
  data: data,
};

const chart = new Chart(document.getElementById("chart"), config);

/**
 * Generate an API for testing to allow more than 25 requests per day
 * @param {*} length
 * @returns
 */
function generateKey(length = 16) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "";

  for (let i = 0; i < length; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return key;
}

// Example usage:
console.log(generateKey()); // Generates a key like "MIDP5HIWUE7ZTBG1"
