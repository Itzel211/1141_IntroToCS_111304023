document.getElementById("submitBtn").addEventListener("click", function () {
    const math = Number(document.getElementById("mathInput").value);
    const eng = Number(document.getElementById("engInput").value);

    if (isNaN(math) || isNaN(eng)) {
        alert("Please enter valid numbers!");
        return;
    }

    const avg = ((math + eng) / 2).toFixed(2);

    const row = `
      <tr>
        <td>${math}</td>
        <td>${eng}</td>
        <td>${avg}</td>
      </tr>
    `;

    document.getElementById("gradeBody").insertAdjacentHTML("beforeend", row);

    updateColumnAverages();
});

function updateColumnAverages() {
    const rows = document.querySelectorAll("#gradeBody tr");
    let totalMath = 0;
    let totalEng = 0;

    rows.forEach(r => {
        totalMath += Number(r.children[0].textContent);
        totalEng += Number(r.children[1].textContent);
    });

    const count = rows.length;

    const avgMath = (totalMath / count).toFixed(2);
    const avgEng = (totalEng / count).toFixed(2);
    const overall = ((totalMath + totalEng) / (count * 2)).toFixed(2);

    document.getElementById("avgMath").textContent = avgMath;
    document.getElementById("avgEng").textContent = avgEng;
    document.getElementById("overallAvg").textContent = overall;
}
