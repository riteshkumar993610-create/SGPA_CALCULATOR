// ================================
// DARK MODE
// ================================

const toggle = document.getElementById("modeToggle");

if (toggle) {
    toggle.addEventListener("change", () => {
        document.body.classList.toggle("dark");
    });
}


// ================================
// SUBJECT DATA
// ================================

const yearData = {

    1: {

        sem1: [
            { name: "Physics", credit: 4 },
            { name: "Engg. Math-1", credit: 4 },
            { name: "Electrical", credit: 3 },
            { name: "PPS", credit: 3 },
            { name: "EVS", credit: 3 },
            { name: "Physics Lab", credit: 1 },
            { name: "Electrical Lab", credit: 1 },
            { name: "Graphics", credit: 2 },
            { name: "PPS Lab", credit: 1 }
        ],

        sem2: [
            { name: "Chemistry", credit: 4 },
            { name: "Engg. Math-2", credit: 4 },
            { name: "Mechanical", credit: 3 },
            { name: "Electronics", credit: 3 },
            { name: "Soft Skill", credit: 3 },
            { name: "Chemistry Lab", credit: 1 },
            { name: "Electronics Lab", credit: 1 },
            { name: "English Lab", credit: 1 },
            { name: "Workshop", credit: 2 }
        ]

    },

    2: {

        sem3: [
            { name: "Digital Electronics", credit: 4 },
            { name: "Data Structures", credit: 4 },
            { name: "COA", credit: 4 },
            { name: "Technical Communication", credit: 3 },
            { name: "DSTL", credit: 3 },
            { name: "Python Programming", credit: 2 },
            { name: "DS Lab", credit: 1 },
            { name: "COA Lab", credit: 1 },
            { name: "Web Designing", credit: 1 },
            { name: "Mini Project", credit: 2 }
        ],

        sem4: [
            { name: "Maths-4", credit: 4 },
            { name: "Operating System", credit: 4 },
            { name: "OOP using Java", credit: 3 },
            { name: "TAFL", credit: 4 },
            { name: "Universal Human Values", credit: 3 },
            { name: "Cyber Security", credit: 2 },
            { name: "OS Lab", credit: 1 },
            { name: "OOPS Java Lab", credit: 1 },
            { name: "Cyber Security Workshop", credit: 1 }
        ]

    },

    3: {

        sem5: [
            { name: "DBMS", credit: 4 },
            { name: "Web Technology", credit: 4 },
            { name: "DAA", credit: 4 },
            { name: "Dept Elective-I", credit: 3 },
            { name: "Dept Elective-II", credit: 3 },
            { name: "DBMS Lab", credit: 1 },
            { name: "Web Tech Lab", credit: 1 },
            { name: "DAA Lab", credit: 1 },
            { name: "Mini Project / Internship", credit: 2 },
            { name: "Constitution of India", credit: 0 }
        ],

        sem6: [
            { name: "Software Engineering", credit: 4 },
            { name: "Software Management", credit: 4 },
            { name: "Computer Networks", credit: 4 },
            { name: "Dept Elective-III", credit: 3 },
            { name: "Open Elective-I", credit: 3 },
            { name: "SE Lab", credit: 1 },
            { name: "SM Lab", credit: 1 },
            { name: "CN Lab", credit: 1 },
            { name: "EITK", credit: 0 }
        ]

    },

    4: {

        sem7: [
            { name: "Artificial Intelligence", credit: 3 },
            { name: "Dept Elective-IV", credit: 3 },
            { name: "Open Elective-II", credit: 3 },
            { name: "AI Lab", credit: 1 },
            { name: "Mini Project", credit: 2 },
            { name: "Project-I", credit: 5 },
            { name: "Startup & Entrepreneurship", credit: 2 }
        ],

        sem8: [
            { name: "Open Elective-III", credit: 3 },
            { name: "Open Elective-IV", credit: 3 },
            { name: "Open Elective-V", credit: 3 },
            { name: "Project-II", credit: 10 }
        ]

    }

};


// ================================
// UPDATE SEMESTER
// ================================

function updateSemester(container, subjects) {

    const subjectsDiv = container.querySelector(".onesubjects");

    subjectsDiv.innerHTML = "";

    let totalCredits = 0;

    subjects.forEach(sub => {

        const row = document.createElement("div");
        row.className = "sone";

        const title = document.createElement("h2");
        title.textContent = `${sub.name}(${sub.credit})`;

        totalCredits += sub.credit;

        const internal = document.createElement("input");
        internal.type = "number";
        internal.min = 0;
        internal.max = 30;
        internal.placeholder = "00";

        const external = document.createElement("input");
        external.type = "number";
        external.min = 0;
        external.max = 70;
        external.placeholder = "00";

        row.append(title);
        row.append(internal);
        row.append(external);

        subjectsDiv.appendChild(row);

    });

    const creditBox = container.querySelectorAll(".credit h2");

    creditBox[0].textContent = `Total Credit: ${totalCredits}`;
    creditBox[1].textContent = "Marks: ";
    creditBox[2].textContent = "Percentage: ";

    container.querySelector(".calculate h2").textContent = "SGPA: 0";

}



// ================================
// SWITCH YEAR
// ================================

function switchYear() {

    const year = Number(document.getElementById("year").value);

    const data = yearData[year];

    const semesterCards = document.querySelectorAll(".left");

    updateSemester(
        semesterCards[0],
        data.sem1 || data.sem3 || data.sem5 || data.sem7
    );

    updateSemester(
        semesterCards[1],
        data.sem2 || data.sem4 || data.sem6 || data.sem8
    );

    const circles = document.querySelectorAll(".circle");

    circles[0].textContent =
        Object.keys(data)[0].replace("sem", "");

    circles[1].textContent =
        Object.keys(data)[1].replace("sem", "");

}

document
.getElementById("year")
.addEventListener("change", switchYear);

switchYear();



// ================================
// CALCULATE BUTTON
// ================================

document
.querySelectorAll(".calCGPA")
.forEach((button, index) => {

    button.addEventListener("click", () => {

        const container =
            document.querySelectorAll(".left")[index];

        if (!validateInputs(container)) {

            return;

        }

        calculateSemester(container);

        updateOverallTotal();

        const downloadButton =
            container.querySelector(".downloadBtn");

        if (downloadButton) {

            downloadButton.style.display = "inline-block";

        }

    });

});


// ================================
// GRADE POINT
// ================================

function getGradePoint(marks) {

    if (marks >= 90) return 10;
    if (marks >= 80) return 9;
    if (marks >= 70) return 8;
    if (marks >= 60) return 7;
    if (marks >= 50) return 6;
    if (marks >= 45) return 5;
    if (marks >= 40) return 4;

    return 0;
}


// ================================
// CALCULATE SEMESTER
// ================================

function calculateSemester(container) {

    const rows = container.querySelectorAll(".sone");

    let totalMarks = 0;
    let creditSum = 0;
    let weightedGP = 0;

    rows.forEach(row => {

        const inputs = row.querySelectorAll("input");

        const internal = Number(inputs[0].value) || 0;
        const external = Number(inputs[1].value) || 0;

        const marks = internal + external;

        totalMarks += marks;

        const credit = Number(
            row.querySelector("h2")
            .textContent.match(/\((\d+)\)/)[1]
        );

        const gradePoint = getGradePoint(marks);

        creditSum += credit;

        weightedGP += credit * gradePoint;

    });

    const totalMax = rows.length * 100;

    const percentage =
        ((totalMarks / totalMax) * 100).toFixed(2);

    const sgpa =
        creditSum === 0
            ? "0"
            : (weightedGP / creditSum).toFixed(2);

    const creditBox =
        container.querySelectorAll(".credit h2");

    creditBox[0].textContent =
        `Total Credit: ${creditSum}`;

    creditBox[1].textContent =
        `Marks: ${totalMarks}/${totalMax}`;

    creditBox[2].textContent =
        `Percentage: ${percentage}%`;

    container.querySelector(".calculate h2")
        .textContent = `SGPA: ${sgpa}`;

}



// ================================
// VALIDATE INPUT
// ================================

function validateInputs(container) {

    const inputs = container.querySelectorAll("input");

    for (const input of inputs) {

        if (input.value === "") {

            alert("Please enter all subject marks.");

            input.focus();

            return false;

        }

    }

    return true;

}



// ================================
// UPDATE TOTAL
// ================================

function updateOverallTotal() {

    const cards = document.querySelectorAll(".left");

    let overallMarks = 0;
    let overallMax = 0;

    cards.forEach(card => {

        const rows = card.querySelectorAll(".sone");

        overallMax += rows.length * 100;

        rows.forEach(row => {

            const inputs = row.querySelectorAll("input");

            overallMarks +=
                (Number(inputs[0].value) || 0) +
                (Number(inputs[1].value) || 0);

        });

    });

    document.querySelector("#Total h2").textContent =
        `Total: ${overallMarks}/${overallMax}`;

}



// ================================
// DOWNLOAD PDF
// ================================

document.querySelectorAll(".downloadBtn").forEach(btn => {

    btn.addEventListener("click", () => {

        const card = btn.closest(".left");

        const sem =
            card.querySelector(".circle").textContent;

        downloadPDF(card, sem);

    });

});



async function downloadPDF(container, semNumber) {

    await new Promise(resolve => setTimeout(resolve, 300));

    const canvas = await html2canvas(container, {

        scale: 2

    });

    const image = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");

    const width = pdf.internal.pageSize.getWidth();

    const height =
        (canvas.height * width) / canvas.width;

    pdf.addImage(image, "PNG", 0, 0, width, height);

    pdf.setFontSize(12);

    pdf.text(
        "Generated by Ritesh Kumar",
        10,
        height - 15
    );

    pdf.textWithLink(
        "LinkedIn Profile",
        10,
        height - 8,
        {
            url:
            "https://www.linkedin.com/in/ritesh-kumar-3b621a358"
        }
    );

    pdf.save(`AKTU_Sem_${semNumber}_Result.pdf`);

}



// ================================
// RESET
// ================================

document
.getElementById("reset")
.addEventListener("click", resetAll);



function resetAll() {

    document.querySelectorAll(".left").forEach(card => {

        card.querySelectorAll("input")
            .forEach(input => input.value = "");

        const creditBox =
            card.querySelectorAll(".credit h2");

        creditBox[0].textContent = "Total Credit:";
        creditBox[1].textContent = "Marks:";
        creditBox[2].textContent = "Percentage:";

        card.querySelector(".calculate h2")
            .textContent = "SGPA: 0";

        const download =
            card.querySelector(".downloadBtn");

        download.style.display = "none";

    });

    document.querySelector("#Total h2").textContent =
        "Total:";

}

