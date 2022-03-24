const url = "https://datausa.io/api/data?drilldowns=State&measures=Population";

var htmlTarget = document.querySelector(".dynamic-data");

var promise1 = fetch(url);

var rawData;

promise1
  .then(function (response) {
    promise2 = response.json();
    return promise2;
  })
  .then(function (processedResponse) {
    rawData = processedResponse;
    document.querySelector(".dynamic-data").appendChild(
      populateStateSelect([
        ...new Set(
          processedResponse.data.map(function (element) {
            return element.State;
          })
        ),
      ])
    );

    var ol = document.createElement("ol");
    var liArray = processedResponse.data.map(function (element) {
      var li = document.createElement("li");
      li.innerText =
        element.State + ": " + element.Year + ": " + element.Population;
      return li;
    });

    liArray.forEach((element) => {
      ol.appendChild(element);
    });

    // document.querySelector('.dynamic-data').appendChild(ol);
  })
  .catch(function (error) {
    console.log("In the catch: " + error);
  });

function populateStateSelect(data) {
  var selectState = document.createElement("select");
  selectState.id = "state";

  var optionArray = data.map(function (state) {
    var option = document.createElement("option");
    option.innerText = state;
    return option;
  });
  optionArray.forEach((element) => {
    selectState.appendChild(element);
  });
  selectState.selectedIndex = -1;

  selectState.onchange = popuateList;

  return selectState;
}

function displaySomething() {
  var ol = document.createElement("ol");
  var liArray = rawData.data.map(function (element) {
    var li = document.createElement("li");
    li.innerText =
      element.State + ": " + element.Year + ": " + element.Population;
    return li;
  });

  liArray.forEach((element) => {
    ol.appendChild(element);
  });

  document.querySelector(".dynamic-data").appendChild(ol);
}

function popuateList() {
  var ul = document.getElementById("populationData");
  if (ul != null) document.getElementById("populationData").remove();
  var stateSelect = document.getElementById("state");
  var state = stateSelect.options[stateSelect.selectedIndex].innerText;
  var ul = document.createElement("ul");
  ul.id = "populationData";

  var relevantData = rawData.data.filter(function (element) {
    return element.State == state;
  });

  var liArray = relevantData.map(function (element) {
    var li = document.createElement("li");
    li.innerText = element.Year + ": " + element.Population;
    return li;
  });

  liArray.forEach((element) => {
    ul.appendChild(element);
  });

  document.querySelector(".dynamic-data").appendChild(ul);
}

console.log("this will display before the promise is resolved");
