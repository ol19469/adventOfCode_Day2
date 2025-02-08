function processInput() {
  let inputText = document.getElementById("inputBox").value.trim();
  let lines = inputText.split("\n"); // Split input into lines
  let safes = 0; // Counter for safe lines
  let linesChecked = 0;

  lines.forEach((line, lineIndex) => {
    let numbers = line.trim().split(/\s+/).map(Number); // Convert space-separated values into numbers

    if (numbers.length < 2) return; // Ignore single-number lines

    let isSafe = true; // Assume the line is safe until proven otherwise
    let differences = []; // Store differences for debugging

    for (let i = 0; i < numbers.length - 1; i++) {
      let diff = Math.abs(numbers[i] - numbers[i + 1]);
      differences.push(diff); // Store difference for debugging

      if (diff < 1 || diff > 3) {
        isSafe = false;
        break;
      }
    }

    if (isSafe) {
      safes++; // Only count the line if all transitions are valid
    }
    linesChecked++;
  });
  console.log(lines.length);
  console.log(linesChecked);

  console.log("Total Safe Lines:", safes);
  document.getElementById("output").textContent = safes; // Update HTML with result
}
