import { argv } from 'node:process';
import readline from 'node:readline';
import styles from 'ansi-styles';
import chalk from 'chalk';
import convert from 'color-convert';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function colorGenerator(colorName, mode) {
  const colorObject = Object.keys(styles.color);

  if (argv.length < 3) {
    // Random color
    const randomColor = Math.floor(
      Math.random() * (colorObject.length - 1) + 1,
    );

    return printColorGenerator(colorObject[randomColor - 1]);
  } else if (mode) {
    if (mode === 'light') {
      colorName += 'Bright';
    } else {
      // If it  receive a light mode
      return `${mode} is exist`;
    }
  }
  for (const key of colorObject) {
    if (key === colorName) {
      // Color from argument
      return printColorGenerator(colorName);
    }
  }

  // Error message
  return `${colorName} is not exist`;
}

function printColorGenerator(color) {
  let printColor = '';
  // Convert to hex code
  const getAnsiColor = Object.values(styles.color[color].open);
  const convertColor = convert.ansi16.hex(
    Number(getAnsiColor[2] + getAnsiColor[3]),
  );

  // Make a print
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 31; j++) {
      if (i === 3 || i === 5) {
        if (j > 4 && j < 26) {
          printColor += ' ';
        } else {
          printColor += '#';
        }
      } else if (i === 4 && j > 4 && j < 26) {
        if (j > 5) {
          continue;
        }
        printColor += `      #${convertColor}        `;
      } else {
        printColor += '#';
      }
    }
    printColor += '\n';
  }
  return chalk[color](printColor);
}

// If 'ask' receives
if (argv[2] === 'ask') {
  let color = '';
  let mode = '';

  rl.question('What color do you like?: ', (askColor) => {
    color = askColor;

    rl.question('Which mode do you like? [dark/light]: ', (askMode) => {
      mode = askMode;
      if (mode === 'light') {
        console.log(colorGenerator(color, mode));
      } else if (mode === 'dark') {
        console.log(colorGenerator(color));
      }

      rl.close();
    });
  });
} else {
  console.log(colorGenerator(argv[2], argv[3]));
}
