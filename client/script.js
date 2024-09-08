document.getElementById('sumForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const num1 = document.getElementById('num1').value;
  const num2 = document.getElementById('num2').value;

  try {
      const response = await fetch('http://localhost:3000/api/sum', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ num1, num2 })
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const result = await response.json();
      document.getElementById('result').textContent = `The sum is: ${result.sum}`;
  } catch (error) {
      console.error('Error:', error);
      document.getElementById('result').textContent = 'Error calculating sum';
  }
});
