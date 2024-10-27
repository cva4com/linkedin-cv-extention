function getPDF() {
	const { jsPDF } = window.jspdf;
	var x0 = 10;
	var x1 = 12;
	var x2 = 17;
	var y = 30;
	var doc = new jsPDF({
		orientation: "portrait",
		format: "letter",
	});
	doc.addFont('../static/fonts/Carlito-Bold.ttf', 'CarlitoBold', 'bold');

	doc.setFont("CarlitoBold", "bold");
	doc.setTextColor(100, 140, 144);
	doc.setFontSize(22);
	doc.text("CHRONOLOGICAL RESUME", 66, 17);

	doc.setFontSize(13);
	doc.text("PROFESSIONAL EXPERIENCE", x1, 50);

	doc.setLineWidth(1.0);
	doc.setDrawColor(100, 140, 144);
	doc.line(x0, 23, 207, 23);

	doc.setFontSize(11);
	doc.setTextColor(0, 0, 0);

	doc.setFont("helvetica", "italic");
	const intro = "Financial Advisor with 7+ years of experience delivering financial/investment advisory services to high value clients. Proven success in managing multi-million dollar portfolios, driving profitability, and increasing ROI through skillful strategic planning, consulting, and financial advisory services.";
	doc.text(intro, x1, y, { maxWidth: 186 });

	let lines = Math.ceil(intro.length / 110);
	y += (lines + 1) * 5;

	doc.line(x0, y - 4, x0, y + 1);

	doc.setFont("CarlitoBold", "bold");
	doc.setTextColor(100, 140, 144);
	doc.setFontSize(13);
	doc.text("PROFESSIONAL EXPERIENCE", x1, y);

	doc.setFontSize(11);
	doc.setTextColor(0, 0, 0);

	y += 3;
	y = setExperience(doc, x1, x2, y, "helvetica",
		"WELLS FARGO ADVISORS, Houston, TX",
		"Senior Financial Advisor",
		"August 2020 – Present",
		[
			"Deliver financial advice to clients, proposing strategies to achieve short- and long-term objectives for investments, insurance, business and estate planning with minimal risk",
			"Develop, review, and optimize investment portfolios for 300+ high value clients with over $190M AUM (Assets Under Management)",
			"Ensure maximum client satisfaction by providing exceptional and personalized service, enhancing client satisfaction ratings from 88% to 99.9% in less than 6 months",
			"Work closely with specialists from multiple branches, managing investment portfolios for over 800 clients with over $25M in assets under care"
		]
	);

	y = setExperience(doc, x1, x2, y, "helvetica",
		"SUNTRUST INVESTMENT SERVICES, INC., New Orleans, LA",
		"Financial Advisor",
		"July 2017 – August 2020",
		[
			"Served as knowledgeable financial advisor to clients, managing an over $20.75M investment portfolio of 90+ individual and corporate clients",
			"Devised and applied a new training and accountability program that increased productivity from #10 to #3 in the region in less than 2 year period",
			"Partnered with cross-functional teams in consulting with clients to provide asset management risk strategy and mitigation, which increased AUM by 50%"
		]
	);

	y = setExperience(doc, x1, x2, y, "helvetica",
		"MAVERICK CAPITAL MANAGEMENT, New Orleans, LA",
		"Financial Advisor",
		"July 2014 – August 2017",
		[
			"Served as the primary point of contact for over 15 clients",
			"Managed the portfolios of several major clients with over $8.5M in total assets"
		]
	);

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
	doc.text("May 2014", x1, yedu);

	yedu += 8;
	doc.setFont("helvetica", "bold");
	doc.text("LOUISIANA STATE UNIVERSITY, Baton Rouge, LA", x1, yedu);

	doc.setFont("helvetica", "normal");
	yedu += 5;
	let edu = "Bachelor of Science in Business Administration (concentration: finance), Honors: cum laude (GPA: 3.7/4.0)";
	doc.text(edu, x1, yedu, { maxWidth: 90 });

	
	let yskill = y + 9;
	let skill = "•    Proficient in MS Office (Word, Excel, PowerPoint) Outlook, MS Project, Salesforce, TFS Project Management, Webex";
	doc.text(skill, 110, yskill, { maxWidth: 90 });

	lines = Math.ceil(skill.length / 110);
	yskill += lines * 5 + 7;
	skill = "•    Fluent in English, Spanish, and French";
	doc.text(skill, 110, yskill, { maxWidth: 90 });

	lines = Math.ceil(edu.length / 43);
	yedu += lines * 4;

	lines = Math.ceil(skill.length / 43);
	yskill += lines * 5;
	if (yedu > yskill) {
		y = yedu + 2;
	} else {
		y = yskill + 3;
	}
	doc.line(x0, y, 207, y);

	y += 7;
	doc.text("3665 Margaret Street, Houston, TX 47587 • RichardWilliams@gmail.com • (770) 625-9669", doc.internal.pageSize.width/2, y, {align: 'center'});

	doc.save('Letters.pdf');
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
			if (i == 0) {
				y += 5;
			}
			achievement = "•    " + achievements[i];
			doc.text(achievement, x2, y, { maxWidth: 186 });
			if (achievement.length > 0) {
				let lines = Math.ceil(achievement.length / 110);
				y += lines * 5 + lineoffset;
			}
		}
	}

	return y;
}

document.getElementById("export").addEventListener("click", getPDF);