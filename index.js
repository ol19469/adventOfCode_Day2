function processInput() {
  let inputText = document.getElementById("inputBox").value.trim();
  let lines = inputText.split("\n"); // Split input into lines
  let safes = 0; // Counter for safe lines
  let linesChecked = 0;
  let modifiedLines = [];

  function isSafe(numbers) {
    if (numbers.length < 2) return false;
    let change = numbers[0] < numbers[1] ? "increase" : "decrease";

    for (let i = 0; i < numbers.length - 1; i++) {
      let diff = Math.abs(numbers[i] - numbers[i + 1]);
      let changed = numbers[i] < numbers[i + 1] ? "increase" : "decrease";

      if (change !== changed) return false; // Direction changed
      if (diff < 1 || diff > 3) return false; // Difference must be between 1 and 3
    }
    return true;
  }

  lines.forEach((line, lineIndex) => {
    let numbers = line.trim().split(/\s+/).map(Number); // Convert space-separated values into numbers

    if (numbers.length < 2) {
      modifiedLines.push(line);
      return;
    }

    if (isSafe(numbers)) {
      safes++;
      modifiedLines.push(line);
    } else {
      // Try removing each number one by one and check if it becomes safe
      let fixedLine = null;

      for (let i = 0; i < numbers.length; i++) {
        let modifiedNumbers = numbers.slice(0, i).concat(numbers.slice(i + 1)); // Remove number at index i
        if (isSafe(modifiedNumbers)) {
          fixedLine = modifiedNumbers.join(" ");
          safes++;
          break; // Stop as soon as we find a fix
        }
      }

      modifiedLines.push(fixedLine ? fixedLine : line); // Use fixed line if found
    }

    linesChecked++;
  });
  console.log(lines.length);
  console.log(linesChecked);

  console.log("Total Safe Lines:", safes);
  document.getElementById("output").textContent = safes; // Update HTML with result
}
