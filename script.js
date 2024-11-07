document.getElementById("attendanceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const status = document.getElementById("status").value;
    const timestamp = new Date().toLocaleString();

    const responseElement = document.getElementById("response");
    
    const data = {
        values: [[name, timestamp, status]]
    };

    try {
        const result = await fetch("https://script.google.com/macros/s/AKfycbwqPl27hhH5V9zg8lS3bKzjo6HIaBy5-uOt7S9CobuMeBsB3lWUD2e8SObryeNq6gFxzw/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        if (result.ok) {
            responseElement.innerText = "Data berhasil disimpan!";
            document.getElementById("attendanceForm").reset();
        } else {
            responseElement.innerText = "Gagal menyimpan data.";
        }
    } catch (error) {
        responseElement.innerText = "Terjadi kesalahan: " + error.message;
    }
});