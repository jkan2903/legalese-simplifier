fetch('https://legalese-simplifier.onrender.com/api/analyze', { // URL of your backend API
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ text: textToAnalyze })
})
.then(response => response.json())
.then(data => {
  const summaryElement = document.getElementById('summary'); // Get the element to display the summary
  if (summaryElement) {
    summaryElement.textContent = data.summary; // Set the text content of the element
  } else {
    console.error("Element with ID 'summary' not found.");
  }

  const redFlagsList = document.getElementById('redFlags'); // Get the list element
  if (redFlagsList) {
    data.redFlags.forEach(redFlag => {  // Iterate through the red flags array
      const listItem = document.createElement('li'); // Create a list item element
      listItem.textContent = redFlag; // Set the text of the list item
      redFlagsList.appendChild(listItem); // Add the list item to the list
    });
  } 
})
.catch(error => {
  console.error('Error:', error);
});