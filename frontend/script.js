document.getElementById('questionnaire').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    produce: document.getElementById('produce').value,
    amount_sold: document.getElementById('amount_sold').value,
    rate_sold: document.getElementById('rate_sold').value,
    male_workers: document.getElementById('male_workers').value,
    female_workers: document.getElementById('female_workers').value
  };

  try {
    const response = await fetch('https://farmer-questionnaire-backend.onrender.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      document.getElementById('message').textContent = 'Data submitted successfully!';
    } else {
      document.getElementById('message').textContent = 'Error: ' + result.error;
    }
  } catch (error) {
    document.getElementById('message').textContent = 'Error: ' + error.message;
  }
});
