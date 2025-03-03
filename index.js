import { argv } from 'node:process';
import readline from 'node:readline';
import styles from 'ansi-styles';
import chalk from 'chalk';
import convert from 'color-convert';

function colorGenerator(colorName, luminosity) {
  const colorObject = Object.keys(styles.color);

  if (argv.length < 3) {
    // Random color
    const randomColor =
      colorObject[Math.floor(Math.random() * colorObject.length)];

    return printColorGenerator(randomColor);
  } else if (luminosity) {
    if (luminosity === 'light') {
      colorName += 'Bright';
    } else if (luminosity === 'dark') {
    } else {
      // If it  receive a light mode
      return `${luminosity} is exists`;
    }
  }
  for (const key of colorObject) {
    if (key === colorName) {
      // Color from argument
      return printColorGenerator(colorName);
    }
  }

  // Error message
  return `${colorName} is not exists`;
}

function printColorGenerator(getColor) {
  let printColor = '';
  // Convert to hex code
  const getAnsiColor = styles.color[getColor].open;
  const ansiToNum = getAnsiColor.replace('\x1B[', '').replace('m', '');
  const convertColor = convert.ansi16.hex(Number(ansiToNum));

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
  return chalk[getColor](printColor);
}

// If 'ask' receives
if (argv[2] === 'ask') {
  let color = '';
  let mode = '';

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

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
