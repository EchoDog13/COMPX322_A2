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
  // Show widgets
  show() {
    console.log("Show Widget");
    console.log(this.cName);
    const widgetsContainer = document.getElementById("widgets-container");

    //Create widdget element
    const widgetDiv = document.createElement("div");
    const _h3 = document.createElement("h3");
    const _removeButton = document.createElement("button");
    const _showGraphButton = document.createElement("button");
    const _hideGraphButton = document.createElement("button");

    //Add content to widget elements
    _h3.innerHTML = this.cName;
    _removeButton.innerHTML = "Remove";
    _removeButton.onclick = () => this.hide();

    _showGraphButton.innerText = "Show Graph";
    //Update buttons based on graph state
    _showGraphButton.onclick = () => {
      showGraph(this.code, this.cName);
      _showGraphButton.style.display = "none"; // Hide "Show Graph" button
      _hideGraphButton.style.display = "inline-block"; // Show "Hide Graph" button
    };

    _hideGraphButton.innerText = "Hide Graph";
    _hideGraphButton.style.display = "none"; // Initially hide "Hide Graph" button
    _hideGraphButton.onclick = () => {
      hideGraph(this.cName);
      _hideGraphButton.style.display = "none"; // Hide "Hide Graph" button
      _showGraphButton.style.display = "inline-block"; // Show "Show Graph" button
    };

    //Append widget to widget
    widgetDiv.id = `widget-${this.id}`;
    widgetDiv.append(_h3);
    widgetDiv.append(_showGraphButton);
    widgetDiv.append(_hideGraphButton);
    widgetDiv.append(_removeButton);

    //Append Widget to page (Widget container)
    widgetsContainer.append(widgetDiv);
  }
  //Hide widget
  hide() {
    //Find the widget
    const widgetDiv = document.getElementById(`widget-${this.id}`);
    if (widgetDiv) {
      widgetDiv.remove(); // Removes the div element from the DOM
    }
    hideGraph(this.cName);
    // remove from the widgets array
    widgets[this.id - 1] = undefined;
  }
}

let chart;

async function showGraph(code, label) {
  try {
    const dataResponse = await loadGraphData(code); // Load graph data
    console.log(dataResponse);

    const dates = dataResponse.data.map((item) => item.date); // Extract dates
    const values = dataResponse.data.map((item) => parseFloat(item.value)); // Extract values

    const newDataset = {
      label: label, // Label for the dataset
      data: values, // Y-axis data
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`, // Random line color
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`, // Fill color
      borderWidth: 1, // Line width
    };

    if (chart) {
      // If the chart already exists, add the new dataset
      chart.data.labels = dates; // Update labels (X-axis)
      chart.data.datasets.push(newDataset); // Add the new dataset
      chart.update(); // Update the chart
    } else {
      // If the chart doesn't exist, create a new one
      const chartData = {
        labels: dates, // X-axis labels
        datasets: [newDataset], // Initial dataset
      };

      const config = {
        type: "line", // Chart type
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
        },
      };

      chart = new Chart(document.getElementById("chart"), config); // Create the chart
    }

    // Ensure the chart is visible
    document.getElementById("chart").style.display = "block";
  } catch (error) {
    console.error("Error loading graph data:", error);
  }
}

async function loadGraphData(code) {
  const dataLocation = `${"https://www.alphavantage.co/query?function="}${code}&interval=monthly&apikey=MIDP5HIWUE7ZTBG1}`;

  try {
    const response = await fetch(dataLocation);

    if (!response.ok) {
      throw new Error("Network response failed");
    }
    const res = await response.json(); // Parse the JSON response
    return res; // Return the JSON object
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it in showGraph
  }
}

function hideGraph(label) {
  if (chart) {
    // Find the index of the dataset with the specified label
    const datasetIndex = chart.data.datasets.findIndex(
      (dataset) => dataset.label === label
    );

    if (datasetIndex !== -1) {
      // Remove the dataset from the datasets array
      chart.data.datasets.splice(datasetIndex, 1);

      // Update the chart to reflect the changes
      chart.update();

      if (isGraphEmpty()) {
        document.getElementById("chart").style.display = "none"; // Hide the chart
      }
    } else {
      console.warn(`Dataset with label "${label}" not found.`);
    }
  } else {
    console.warn("No chart instance found.");
  }
}

function isGraphEmpty() {
  if (chart && chart.data.datasets.length === 0) {
    return true; // The graph is empty
  }
  return false; // The graph has datasets
}

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
