function getPDF(info) {
	const { jsPDF } = window.jspdf;
	var doc = new jsPDF({
		orientation: "portrait",
		format: "letter",
	});
	const center = doc.internal.pageSize.width / 2;
	var x0 = 10;
	var x1 = 12;
	var x2 = 17;
	var y = 17;
	doc.addFont('../static/fonts/Carlito-Bold.ttf', 'CarlitoBold', 'bold');

	doc.setFont("CarlitoBold", "bold");
	doc.setTextColor(100, 140, 144);
	doc.setFontSize(16);
	doc.text(info.header + " - " + info.title, center, y, {align: 'center', maxWidth: 186});

	doc.setLineWidth(1.0);
	doc.setDrawColor(100, 140, 144);
	doc.line(x0, 23, 207, 23);

	doc.setFontSize(11);
	doc.setTextColor(0, 0, 0);

	doc.setFont("helvetica", "italic");
	y += 13;
	doc.text(info.summary, x1, y, { maxWidth: 186 });

	let lines = Math.ceil(info.summary.length / 110);
	y += (lines + 1) * 5;
	let linebreak = info.summary.split(/\r\n|\r|\n/).length;
	if (linebreak >= 2) {
		y += (linebreak - 1) * 5;
	}
	doc.line(x0, y - 4, x0, y);

	doc.setFont("CarlitoBold", "bold");
	doc.setTextColor(100, 140, 144);
	doc.setFontSize(13);
	doc.text("PROFESSIONAL EXPERIENCE", x1, y);

	doc.setFontSize(11);
	doc.setTextColor(0, 0, 0);

	y += 3;

	for (let i = 0; i < info.experience.length; i++) {
		if (i > 5) break;
		y = setExperience(doc, x1, x2, y, "helvetica",
			info.experience[i].company,
			info.experience[i].position,
			info.experience[i].period,
			info.experience[i].achievements
		);
		if (i == info.experience.length-1 && info.experience[i].achievements.length == 0)
		{
			y += 6;
		}
	}

	y += 6;
	doc.line(x0, y - 5, 10, y + 1);
	doc.line(107.5, y - 5, 107.5, y + 1);

	doc.setFont("CarlitoBold", "bold");
	doc.setTextColor(100, 140, 144);
	doc.setFontSize(13);
	doc.text("EDUCATION", x1, y);
	doc.text("ADDITIONAL SKILLS", 110, y);

	doc.setFontSize(11);
	doc.setTextColor(0, 0, 0);

	let yedu = y + 9;
	doc.setFont("helvetica", "italic");
	doc.text(info.education[0].years, x1, yedu);

	yedu += 8;
	doc.setFont("helvetica", "bold");
	doc.text(info.education[0].school, x1, yedu);

	doc.setFont("helvetica", "normal");
	yedu += 5;
	let edu = info.education[0].degree;
	doc.text(edu, x1, yedu, { maxWidth: 90 });

	let yskill = y + 9;
	let skills = "";
	if (info.skills && info.skills.length > 0) {
		skills = "•	" + info.skills.join(', ');
	}
	doc.text(skills, 110, yskill, { maxWidth: 90 });

	lines = Math.ceil(skills.length / 110);
	yskill += lines * 5 + 1;
	let languages = "";
	if (info.languages && info.languages.length > 0) {
		languages = "•	" + info.languages.join(', ');
	}
	doc.text(languages, 110, yskill, { maxWidth: 90 });

	lines = Math.ceil(edu.length / 43);
	yedu += lines * 4;

	lines = Math.ceil(languages.length / 43);
	yskill += lines * 5;
	if (yedu > yskill) {
		y = yedu + 2;
	} else {
		y = yskill + 3;
	}
	doc.line(x0, y, 207, y);

	y += 7;
	doc.text(info.contact, center, y, {align: 'center'});

	doc.save(`CV_${info.header}.pdf`);
}

/**
 * Set for work experience.
 *
 * @param {jsPDF} doc The global jsPDF.
 * @param {number} x1 The y coordinate of the line experience.
 * @param {number} x1 The y coordinate of the line achievements.
 * @param {number} y The y coordinate of the line.
 * @param {string} font The font of the line.
 * @param {string} company The company name.
 * @return {string} position The job title.
 * @return {string} period The period employed.
 * @return {array} achievements The responsibilities and achievements.
 */
function setExperience(doc, x1, x2, y, font, company, position, period, achievements) {
	const lineoffset = 1.5;
	doc.setFontSize(11);
	doc.setTextColor(0, 0, 0);

	y += 6;
	doc.setFont(font, "italic");
	doc.text(period, x1, y);

	y += 8;
	doc.setFont(font, "bold");
	doc.text(company, x1, y);

	y += 6;
	doc.setFont(font, "normal");
	doc.text(position, x1, y);

	if (achievements != undefined && achievements.length > 0) {
		let achievement = "";
		for (let i = 0; i < achievements.length; i++) {
			if (achievements[i].length == 0)continue;
			if (i == 0) {
				y += 5;
			}
			achievement = "•	" + achievements[i];
			doc.text(achievement, x2, y, { maxWidth: 186 });
			if (achievement.length > 0) {
				let lines = Math.ceil(achievement.length / 90);
				y += lines * 5 + lineoffset;
			}
		}
	}

	return y;
}

const exportButton = document.getElementById("export");

const getActiveTab = () => new Promise(resolve => {
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => resolve(tabs[0]));
});

const executeScript = (tabId, file) => {
	chrome.scripting.executeScript({
		target: { tabId },
		files: [file],
	})
	.then(() => console.log("Injected the content script."))
	.catch(err => console.error(err));
};

const handleButtonClick = (button, file) => {
	if (button.disabled) return;
	getActiveTab().then(tab => executeScript(tab.id, file));
};

exportButton.addEventListener("click", () => handleButtonClick(exportButton, "./static/js/export.js"));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === "export") {
		navigator.clipboard.writeText(request.text)
			.then(() => {
				const hasStatus = document.getElementById("status");
				if (hasStatus) hasStatus.remove();
				const textElement = document.createElement("p");
				textElement.id = "status";
				textElement.textContent = `The CV pdf file has been downloaded.`;
				document.getElementById("export").insertAdjacentElement("afterend", textElement);
				getPDF(request.info);
			})
			.catch(err => console.error("Could not get data: ", err));
	}
});

chrome.commands.onCommand.addListener(command => {
	if (command === "export_cv") handleButtonClick(exportButton, "./static/js/export.js");
});

getActiveTab().then(tab => {
	const url = tab.url;
	const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w\-\_]+\/?$/;
	exportButton.disabled = !linkedinRegex.test(url);
});