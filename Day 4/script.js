const formData = (a) => {
  var x = document.getElementById("pinData").value;
  let msgDetails = document.getElementById("msg");
  let status = document.getElementById("status");

  if (!x) {
    alert("null");
    process.exit();
  }
  if (!isNaN(x)) {
    let url = "https://api.postalpincode.in/pincode/" + x;

    msgDetails.innerHTML = "Loading...";
    status.innerHTML = "Loading...";
    status.classList.add("loading");
    async function fetchData() {
      const response = await fetch(url);

      const data = await response.json();
      const pinDet = data[0];
      return pinDet;
    }
    async function displayData() {
      const pinDt = await fetchData();

      status.classList.remove("loading");

      let msg = pinDt.Message;
      let sts = pinDt.Status;

      if (sts === "Success") {
        if (status.classList.contains("red")) {
          status.classList.remove("red");
        }
        status.classList.add("green");
        msgDetails.innerHTML = msg;
        status.innerHTML = sts;
      } else {
        if (status.classList.contains("green")) {
          status.classList.remove("green");
        }
        status.classList.add("red");
        msgDetails.innerHTML = msg;
        status.innerHTML = "Failed";
      }
      let tableHTML = "";
      let pstOfcData = pinDt.PostOffice;

      let tbl = document.getElementById("tblData");
      pstOfcData.forEach((element) => {
        const row = tbl.insertRow();
        row.insertCell().textContent = element.Name;
        row.insertCell().textContent = element.BranchType;
        console.log(element.DeliveryStatus);
        row.insertCell().textContent = element.DeliveryStatus;
        row.insertCell().textContent = element.Circle;
        row.insertCell().textContent = element.District;
        row.insertCell().textContent = element.Division;
        row.insertCell().textContent = element.Region;
        row.insertCell().textContent = element.Block;
        row.insertCell().textContent = element.State;
        row.insertCell().textContent = element.Country;
        row.insertCell().textContent = element.Pincode;
        //   row.insertCell().textContent = element.State;/
        //   let tblRow = document.createElement("tr");
        //   tableHTML += `
        //                         <td>${element.Name}</td>
        //                         <td>${element.Pincode}</td>
        //                         <td>${element.Type}</td>
        //                         <td>${element.DeliveryStatus}</td>
        //                         <td>${element.DivisionName}</td>
        //                         <td>${element.RegionName}</td>
        //                         <td>${element.Circle}</td>
        //                         <td>${element.State}</td>
        //                 `;
      });
      // tblRow.innerHTML = tableHTML;
    }
    displayData();
  } else {
    alert("Not valid number.");
  }
};