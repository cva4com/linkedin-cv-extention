(function () {
	if (typeof exportCV === "undefined") {
		window.exportCV = function () {

			var data = {
				"header": "Mr. Smith",
				"title": "",
				"contact": "",
				"summary": "",
				"experience": [],
				"education": [
					{
						school: "",
						degree: "",
						years: ""
					}
				],
				"skills": [],
				"languages": []
			};

			let profiles = document.getElementById('profile-sticky-header-toggle');
			if (profiles != null && profiles.parentElement.nodeName == "SECTION") {
				let profiles_sections = profiles.parentElement;
				let header = profiles_sections.querySelectorAll(".t-24")[0];
				if (header)data.header = header.innerText;

				let title = profiles_sections.getElementsByClassName("text-body-medium")[0];
				if (title)data.title = title.innerText;

				let contact = profiles_sections.getElementsByClassName("text-body-small inline")[0];
				if (contact)data.contact = contact.innerText;
			}

			let abouts = document.getElementById('about');
			if (abouts != null && abouts.parentElement.nodeName == "SECTION") {
				let abouts_sections = abouts.parentElement;
				let about = abouts_sections.querySelectorAll('[aria-hidden="true"]');
				if (about.length > 1) {
					data.summary = about[1].innerText;
				}
			}

			let experiences = document.getElementById('experience');
			if (experiences != null && experiences.parentElement.nodeName == "SECTION") {
				const experiences_sections = experiences.parentElement;
				const experience_list = experiences_sections.getElementsByTagName("ul")[0];
				let items = [];
				if (experience_list) {
					items = experience_list.getElementsByTagName('li');
				}
				let index = 0;
				for(let i = 0; i < items.length; i++) {

					let isSinglePosition = true;
					const position_lists = items[i].getElementsByTagName("ul");
					const position_list = items[i].getElementsByTagName("ul")[0];
					if (position_list) {
						const positions = position_list.getElementsByTagName('li');
						if (position_lists.length == 1 && positions.length == 2) {
							isSinglePosition = false;
						}
					}

					const experience = items[i].querySelectorAll('[aria-hidden="true"]');
					let experience_index = 0;
					if (!experience) { continue; }
					if (experience.length < 3) { continue; }
					if (experience.length <= 3 && items.length > 3) { continue; }
					data.experience.push({
						company: "",
						position: "",
						period: " ",
						location: " ",
						achievements: []
					});

					if (isSinglePosition) {
						// Position
						if (experience.length > experience_index && experience[experience_index].nodeName != "SPAN") {
							experience_index++;
						}
						if (experience.length > experience_index && experience[experience_index].nodeName == "SPAN") {
							data.experience[index].position = experience[experience_index].innerText;
						}
						experience_index++;

						// Company
						if (experience.length > experience_index && experience[experience_index].nodeName == "SPAN") {
							data.experience[index].company = experience[experience_index].innerText;
						}
						experience_index++;

						// Period
						if (experience.length > experience_index && experience[experience_index].nodeName == "SPAN") {
							data.experience[index].period = experience[experience_index].innerText;
						}
						experience_index++;

						// Location or Achievements
						if (experience.length > experience_index && experience[experience_index].nodeName == "SPAN") {
							if (experience.length == 4 && 
									!experience[experience_index].parentElement.classList.contains("t-14") && 
									!experience[experience_index].parentElement.classList.contains("t-black--light"))
							{
								if (experience[experience_index].innerText.indexOf("\n") > -1) {
									data.experience[index].achievements = experience[experience_index].innerText.split("\n");
								} else {
									data.experience[index].achievements = [];
									data.experience[index].achievements.push(experience[experience_index].innerText);
								}
								index++;
								continue;
							} else {
								data.experience[index].location = experience[experience_index].innerText;
							}
						}
						experience_index++;

						// Achievements or LinkedIn helped me get this job
						if (experience.length > experience_index && experience[experience_index].nodeName == "SPAN") {
							if (experience[experience_index].innerText.indexOf("\n") > -1) {
								data.experience[index].achievements = experience[experience_index].innerText.split("\n");
							} else {
								data.experience[index].achievements = [];
								data.experience[index].achievements.push(experience[experience_index].innerText);
							}
						} else if (experience_index == 4 && experience.length > 4 && experience[4].nodeName == "LI-ICON") {
							data.experience[index].location = "";
						}
						experience_index++;

						// Achievements or LinkedIn icon
						if (experience.length > experience_index && experience[experience_index].nodeName == "SPAN") {
							if (experience[experience_index].innerText.indexOf("\n") > -1) {
								data.experience[index].achievements = experience[experience_index].innerText.split("\n");
							} else {
								data.experience[index].achievements = [];
								data.experience[index].achievements.push(experience[experience_index].innerText);
							}
						}
						experience_index++;

						// Achievements
						if (experience.length > experience_index && experience[experience_index].nodeName == "SPAN") {
							if (experience[experience_index].innerText.indexOf("\n") > -1) {
								data.experience[index].achievements = experience[experience_index].innerText.split("\n");
							} else {
								data.experience[index].achievements = [];
								data.experience[index].achievements.push(experience[experience_index].innerText);
							}
						}
					} else {
						// Company
						if (experience.length > experience_index && experience[experience_index].nodeName == "SPAN") {
							data.experience[index].company = experience[experience_index].innerText;
						}
						experience_index++;

						// Period
						if (experience.length > experience_index && experience[experience_index].nodeName == "SPAN") {
							data.experience[index].period = experience[experience_index].innerText;
						}

						const positions = position_list.getElementsByTagName('li');
						for (let j = 0; j < positions.length; j++) {
							const position = positions[j].querySelectorAll('[aria-hidden="true"]');
							if (position.length > 1 && position[1].nodeName == "SPAN") {
								if (data.experience[index].position.length === 0) {
									data.experience[index].position = position[1].innerText;
								} else {
									data.experience[index].position += ", " + position[1].innerText;
								}
							}
							if (position.length > 2 && position[2].nodeName == "SPAN") {
								if (data.experience[index].achievements.length === 0) {
									data.experience[index].achievements = [];
									data.experience[index].achievements.push(position[2].innerText);
								} else {
									data.experience[index].achievements[0] += ", " + position[2].innerText;
								}
							}
							if (position.length > 3 && position[4].nodeName == "SPAN") {
								data.experience[index].location = position[4].innerText;
							}
						}
						i += 2;
					}

					index++;
				}
			}

			let educations = document.getElementById('education');
			if (educations != null && educations.parentElement.nodeName == "SECTION") {
				let educations_sections = educations.parentElement;
				let education = educations_sections.querySelectorAll('[aria-hidden="true"]');
				if (education && education.length > 2) {
					data.education[0].school = education[2].innerText;
				}
				if (education && education.length > 3) {
					data.education[0].degree = education[3].innerText;
				}
				if (education && education.length > 4) {
					data.education[0].years = education[4].innerText;
				}
			}

			let skills = document.getElementById('skills');
			if (skills != null && skills.parentElement.nodeName == "SECTION") {
				let skills_sections = skills.parentElement;
				let skill = skills_sections.querySelectorAll('[aria-hidden="true"]');
				for (let j = 0; j < skill.length; j++) {
					if (skill[j].nodeName == "DIV" && skill.length > j+1 && skill[j+1].nodeName == "SPAN") {
						data.skills.push(skill[j+1].innerText);
					}
				}
			}

			let languages = document.getElementById('languages');
			if (languages != null && languages.parentElement.nodeName == "SECTION") {
				let languages_sections = languages.parentElement;
				let language = languages_sections.querySelectorAll('[aria-hidden="true"]');
				if (language && language.length > 2) {
					data.languages.push(language[2].innerText);
				}
				if (language && language.length > 4) {
					data.languages.push(language[4].innerText);
				}
			}

			chrome.runtime.sendMessage({
				type: "export",
				info: data,
			});
		};
	}

	exportCV();
})();