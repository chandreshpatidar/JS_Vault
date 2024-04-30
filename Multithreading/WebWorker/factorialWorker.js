const calculateFactorial = (num) => {
  let fact = 1;

  for (let i = 1; i <= num; i++) {
    fact *= i;
  }

  return fact;
};

/**
 * Listens for a message from the main thread and calculates the factorial of the received number.
 *
 * @param {Event} event - The event object containing the data to be factored.
 * @return {void} - Sends the calculated factorial back to the main thread.
 */
self.onmessage = (event) => {
  // Calculate the factorial of the received number
  const result = calculateFactorial(event.data);

  // Send the result back to the main thread
  self.postMessage(result);
};
