let request = new XMLHttpRequest();
const image = document.querySelector('img');
const button = document.querySelector('button');
const listOfCharacters = [];

image.onclick = () => {
	request.onreadystatechange = () => {
		if (request.readyState === 4 && request.status === 200) {
			let resultOfSorting = request.response;
			if (resultOfSorting === '"Slytherin"') {
				image.setAttribute(
					'src',
					'https://vignette.wikia.nocookie.net/pottermore/images/4/45/Slytherin_Crest.png/revision/latest/scale-to-width-down/180?cb=20111112232353'
				);
				image.setAttribute('title', 'Slytherin');
			} else if (resultOfSorting === '"Gryffindor"') {
				image.setAttribute(
					'src',
					'https://vignette.wikia.nocookie.net/pottermore/images/1/16/Gryffindor_crest.png/revision/latest/scale-to-width-down/180?cb=20111112232412'
				);
				image.setAttribute('title', 'Gryffindor');
			} else if (resultOfSorting === '"Hufflepuff"') {
				image.setAttribute(
					'src',
					'https://vignette.wikia.nocookie.net/pottermore/images/5/5e/Hufflepuff_crest.png/revision/latest/scale-to-width-down/180?cb=20111112232427'
				);
				image.setAttribute('title', 'Hufflepuff');
			} else if (resultOfSorting === '"Ravenclaw"') {
				image.setAttribute(
					'src',
					'https://vignette.wikia.nocookie.net/pottermore/images/4/4f/Ravenclaw_crest.png/revision/latest/scale-to-width-down/180?cb=20111112232334'
				);
				image.setAttribute('title', 'Ravenclaw');
			}
		}
	};
	request.open('GET', `https://www.potterapi.com/v1/sortingHat`);
	request.send(null);
};

button.addEventListener('click', () => {
	const searchResult = [];
	const leftList = document.getElementById('leftList');
	const li = document.getElementsByTagName('li');
	leftList.innerHTML = '';

	listOfCharacters.forEach((character, index) => {
		if (character.includes(document.forms['search']['name'].value)) {
			searchResult.push(index);
			const li = document.createElement('li');
			li.textContent = character;

			leftList.appendChild(li);
			li.onclick = () => {
				const paragraph1 = document.createElement('p');
				const paragraph2 = document.createElement('p');
				paragraph1.textContent = `House: ${
					JSON.parse(request.response)[index].house
				}`;
				li.appendChild(paragraph1);
				paragraph2.textContent = `Wand: ${
					JSON.parse(request.response)[index].wand
				}`;
				li.append(paragraph2);
			};
		}
	});
});

const API_KEY = '$2a$10$YQ1M/JA/PG20kgAs1uNHfOvUbT7kipEPOe5OD7iK4wibMPqY3C3mG';
request.onreadystatechange = () => {
	if (request.readyState === 4 && request.status === 200) {
		const result = JSON.parse(request.response);
		result.forEach((element, index) => {
			listOfCharacters.push(element.name);
		});
	}
};
request.open('GET', `https://www.potterapi.com/v1/characters?key=${API_KEY}`);
request.send(null);
