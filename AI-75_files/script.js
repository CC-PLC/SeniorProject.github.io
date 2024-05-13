// © Copyright 2024 MYAI168.COM. All rights reserved.

// import { fetchEventSource } from './@microsoft/fetch-event-source/lib/esm/fetch.js?v=202231118'

const element = document.querySelector('#sendButton')
element.addEventListener('click', sendMessage)

const ctrl = new AbortController();

function sendMessage() {
	const userInput = document.getElementById("userInput");
	const chatBox = document.querySelector(".chat-box");

	if (userInput.value.trim() === "") return;

	var input_string = userInput.value;
	document.getElementById("historyContent").innerHTML = ``;
	document.getElementById("historyContent").innerHTML += `您：${userInput.value}`;
	userInput.value = "";
	var waiting = '<span class="loader"></span>';
	const sendButton = document.getElementById("sendButton");
	sendButton.innerHTML = waiting;

	console.log("input_string: ", input_string);

	const url = 'https://localhost:18000';
	let responseContent = '';
	const streamingTextElement = document.getElementById('historyContent');
	let currentIndex = 0;
	streamingTextElement.innerHTML += "<br /><br />AI-75 寫程式機器人：";
	function typeCharacter() {
		if (currentIndex < responseContent.length) {
			if (responseContent.charAt(currentIndex) == "\n") {
				streamingTextElement.innerHTML += "<br />";
			} else if (responseContent.charAt(currentIndex) == " ") {
				streamingTextElement.innerHTML += "&ensp;";
			} else {
				streamingTextElement.innerHTML += responseContent.charAt(currentIndex);
			}
			currentIndex++;
			setTimeout(typeCharacter, 10); // Adjust the typing speed by changing the delay (in milliseconds)
		}
	}

	function old_postData() {
		var formData = new FormData();
		formData.append('input', input_string);
		fetchEventSource(url, {
			method: "POST",
			body: formData,
			openWhenHidden: true,
			signal: ctrl.signal,
			async onopen(response) {
				if (response.ok && response.headers.get('content-type') === 'text/event-stream') {
					//console.log('everything\'s good')
				} else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
					console.log(response.status)
					sendButton.innerHTML = "發送";
				}
			},
			onmessage(event) {
				if (event.data === '[DONE]') {
					// All data received, logging it and closing the connection
					//console.log('All data received:', responseContent);
					ctrl.abort();
					sendButton.innerHTML = "發送";
				} else {
					try {
						const data = JSON.parse(event.data);
						if (data.id) {
							// Process the data message chunk
							const choices = data.choices;
							if (choices && choices.length > 0) {
								const content = choices[0].delta.content;
								if (content) {
									responseContent += content;
									typeCharacter();
									// Auto-scroll to the bottom as new content is added
									streamingTextElement.scrollTop = streamingTextElement.scrollHeight;
								}
							}
						}
					} catch (e) {
						console.error('Error1: ', e);
						sendButton.innerHTML = "發送";
					}
				}
			},
			async onerror(error) {
				console.error('Error2:', error)
				sendButton.innerHTML = "發送";
			},
			async onclose() {
				sendButton.innerHTML = "發送";
			}
		})
	}

	function postData() {
		// Create a new XMLHttpRequest object
		var xhr = new XMLHttpRequest();
	
		// Configure the request
		xhr.open("POST", "http://127.0.0.1:18000", true);
		xhr.setRequestHeader("Content-Type", "application/json");
	
		// Set up the callback function to handle the response
		xhr.onload = function() {
			if (xhr.status === 200) {
				// If the request was successful, handle the response
				var response = JSON.parse(xhr.responseText);
				// Handle the response here
				console.log("Response from server:", response);
			} else {
				// If the request failed, handle the error
				console.error("Request failed:", xhr.status);
			}
		};
	
		// Convert the message to JSON format
		var data = JSON.stringify({ message: input_string });
	
		// Send the request with the message data
		xhr.send(data);
	}

	postData();
}
