async function getData() {
    const inputDate = document.getElementById('inputDate').value;

    if (inputDate === '') {
        document.getElementById('outputMessage').textContent = 'Please enter a date instead of table.';
        document.getElementById('outputTable').style.display = 'none';
        return;
    }

    const response = await fetch('https://data.covid19india.org/data.json');
    const data = await response.json();
    const casesData = data.cases_time_series;

    const dateData = casesData.find(item => item.date === inputDate);
    
    if (!dateData) {
        document.getElementById('outputMessage').textContent = 'Date not found instead of table.';
        document.getElementById('outputTable').style.display = 'none';
        return;
    }

    document.getElementById('outputMessage').textContent = '';
    document.getElementById('outputTable').style.display = 'table';

    const outputTable = document.getElementById('outputTable');
    outputTable.innerHTML = `
        <tr>
            <td>${dateData.date}</td>
            <td>${dateData.dailyconfirmed}</td>
            <td>${dateData.dailydeceased}</td>
        </tr>
    `;
}

