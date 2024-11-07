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
        const result = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=NoSxD7r2dor4d_VEGUd_jyd9uRl-iaP3erS1CRSK7oNbX_f1uPMUYJ3VaQ8q0kt1guCxJZkz_4XzhtOS-aaikBI0CfiAGiobm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnF_SKJJZ6ZgVdwxSc2qYA1aCJDpg3iYaXRQJagp4rxnHr3nmy8YMJ3eNBxp6d4AOV_KKtCsKOad2Tu0udVi_D3bK0wieJivUtNz9Jw9Md8uu&lib=MNySORo3_MV1rCkrR4tlmVYY0_T-l_3Eo", {
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
