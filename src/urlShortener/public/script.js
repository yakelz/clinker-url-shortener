document.getElementById('urlForm').onsubmit = async function (event) {
	event.preventDefault();
	const url = document.getElementById('urlInput').value;
	const customShortId = document.getElementById('customShortIdInput').value;

	const response = await fetch('http://localhost:3001/api/shorten', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ fullUrl: url, customShortId: customShortId }),
	});
	const result = await response.json();

	document.getElementById('result').textContent = response.ok
		? `Сокращенная ссылка: ${result.short}`
		: `Ошибка: ${result.error}`;
};
