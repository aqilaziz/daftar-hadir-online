document.getElementById("attendanceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    await createData();
});

async function createData() {
    const name = document.getElementById("name").value;
    const status = document.getElementById("status").value;
    const timestamp = new Date().toLocaleString();

    const responseElement = document.getElementById("response");
    
    const data = {
        values: [[name, timestamp, status]]
    };

    try {
        const result = await fetch("https://script.google.com/macros/s/AKfycbxgcTcjSpDw_XFAFELGBL5qyvSzeoGPr5uOWZklmZF5hlYDSeEXcr1LaCjoRF36hWpcsQ/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        if (result.ok) {
            responseElement.innerText = "Data berhasil disimpan!";
            document.getElementById("attendanceForm").reset();
            await readData(); // Refresh data after create
        } else {
            responseElement.innerText = "Gagal menyimpan data.";
        }
    } catch (error) {
        responseElement.innerText = "Terjadi kesalahan: " + error.message;
    }
}

// Read Data
async function readData() {
    const responseElement = document.getElementById("response");
    try {
        const result = await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"); // Use GET method to fetch data
        const data = await result.json();
        
        if (result.ok) {
            displayData(data);
        } else {
            responseElement.innerText = "Gagal membaca data.";
        }
    } catch (error) {
        responseElement.innerText = "Terjadi kesalahan: " + error.message;
    }
}

function displayData(data) {
    const table = document.getElementById("attendanceTable");
    table.innerHTML = ""; // Clear existing data

    data.forEach((row, index) => {
        const rowElement = document.createElement("tr");
        rowElement.innerHTML = `
            <td>${row.name}</td>
            <td>${row.timestamp}</td>
            <td>${row.status}</td>
            <td><button onclick="updateData(${index})">Update</button></td>
            <td><button onclick="deleteData(${index})">Delete</button></td>
        `;
        table.appendChild(rowElement);
    });
}

// Update Data
async function updateData(index) {
    const name = prompt("Enter new name:");
    const status = prompt("Enter new status:");

    const data = {
        index: index,
        values: [[name, new Date().toLocaleString(), status]]
    };

    try {
        const result = await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (result.ok) {
            document.getElementById("response").innerText = "Data berhasil diperbarui!";
            await readData(); // Refresh data after update
        } else {
            document.getElementById("response").innerText = "Gagal memperbarui data.";
        }
    } catch (error) {
        document.getElementById("response").innerText = "Terjadi kesalahan: " + error.message;
    }
}

// Delete Data
async function deleteData(index) {
    const data = { index: index };

    try {
        const result = await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (result.ok) {
            document.getElementById("response").innerText = "Data berhasil dihapus!";
            await readData(); // Refresh data after delete
        } else {
            document.getElementById("response").innerText = "Gagal menghapus data.";
        }
    } catch (error) {
        document.getElementById("response").innerText = "Terjadi kesalahan: " + error.message;
    }
}

// Initial data load
readData();
