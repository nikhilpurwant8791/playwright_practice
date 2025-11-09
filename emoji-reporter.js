// emoji-table-reporter.js
const Table = require('cli-table3');

let chalk; // placeholder

(async () => {
  chalk = (await import('chalk')).default;
})();

class EmojiTableReporter {
  constructor() {
    this.results = [];
  }

  async onTestEnd(test, result) {
    if (!chalk) chalk = (await import('chalk')).default; // ensure loaded

    const emoji =
      result.status === 'passed' ? '✅' :
      result.status === 'failed' ? '❌' :
      result.status === 'skipped' ? '⏭️' :
      '⚪';

    const status =
      result.status === 'passed' ? chalk.green(`${emoji} PASS`) :
      result.status === 'failed' ? chalk.red(`${emoji} FAIL`) :
      chalk.yellow(`${emoji} SKIP`);

    const duration = `${result.duration}ms`;

    // 🔹 Get browser/project name
    const browser = test.parent.project().name;

    // 🔹 Add browser as fourth column
    this.results.push([test.title, status, chalk.cyan(duration), chalk.magenta(browser)]);
  }

  async onEnd(result) {
    if (!chalk) chalk = (await import('chalk')).default;
    const table = new Table({
      // 🔹 Add Browser column header
      head: [chalk.bold('Test'), chalk.bold('Status'), chalk.bold('Duration'), chalk.bold('Browser')],
      style: { head: ['white'] },
    });

    this.results.forEach(row => table.push(row));

    console.log('\n' + table.toString());

    const summaryEmoji = result.status === 'passed' ? '🎉' : '💥';
    const summaryColor = result.status === 'passed' ? chalk.green : chalk.red;
    console.log(summaryColor(`\n${summaryEmoji} All tests ${result.status}\n`));
  }
}

module.exports = EmojiTableReporter;
