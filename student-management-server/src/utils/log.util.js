import chalk from "chalk";

export const logError = (err) => {
  // Format the timestamp with readable format (e.g., YYYY-MM-DD HH:mm:ss)
  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);

  // Use Chalk for coloring the output
  const simpleErrorMessage = chalk.redBright(`${err.name}: ${err.message}`);
  const timestampMessage = chalk.yellow(`[${timestamp}]`);

  // Extract all project-related file paths from the stack trace
  const projectFiles = err.stack
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("at"))
    .filter((line) => !line.includes("node_modules"))
    .map((line) => {
      const match = line.match(/\((.*)\)/); // Extract file path inside parentheses
      return match ? match[1] : line.split("at ")[1];
    })
    .filter((path) => path);

  // Print the formatted error message
  console.log(`${timestampMessage} ${simpleErrorMessage}`);

  // Print each relevant project file path with color
  projectFiles.forEach((file) => {
    console.log(chalk.bold(`  at ${file}`));
  });
};

export const logInfo = (...args) => {
  const stack = new Error().stack; // Capture the call stack
  const stackLine = stack.split("\n")[2]; // Caller stack line

  const match =
    stackLine.match(/at (.+?) \((.+):(\d+):\d+\)/) ||
    stackLine.match(/at (.+):(\d+):\d+/);

  let functionName = "anonymous";
  let fileName = "unknown";
  let lineNumber = "unknown";

  if (match) {
    functionName = match[1]?.split(".").pop() || "anonymous"; // Extract function name
    const fullPath = match[2] || match[1];
    fileName = fullPath.split("/").pop(); // Extract file name
    lineNumber = match[3]; // Extract line number
  }

  // Log the message in the desired format
  console.log(`${fileName}:${lineNumber}:${functionName}:`, ...args);
};
