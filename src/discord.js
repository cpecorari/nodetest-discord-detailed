const discord = require('discord.js');
const MAX_MESSAGE_LENGTH = 40;

module.exports.start = (webhookurl, commits, size) =>
  new Promise((resolve, reject) => {
    var client;
    console.log('Preparing Webhook...');
    try {
      client = new discord.WebhookClient({ url: webhookurl });
    } catch (error) {
      reject(error.message);
      return;
    }
    client
      .send({
        embeds: [
          {
            title: 'Starting unit tests... please be patient... ',
            color: 0x00bb22,
            description: getChangeLog(commits, size),
            thumbnail: { url: 'https://tenor.com/bf5hd.gif' },
          },
        ],
      })
      .then(
        (d) => {
          console.log('Successfully sent the message id : ', d.id);
          resolve(d.id);
        },
        (e) => {
          console.error('ERROR SENDING DISCORD : ', e);
          reject(e);
        }
      );
  });

module.exports.send = (webhookurl, repo, branch, url, commits, size, report, previousDiscordId) =>
  new Promise((resolve, reject) => {
    var client;
    console.log('Preparing Webhook...');
    try {
      client = new discord.WebhookClient({ url: webhookurl });
    } catch (error) {
      reject(error.message);
      return;
    }
    const embed = createEmbed(repo, branch, url, commits, size, report);
    client.editMessage(previousDiscordId, { embeds: [embed] }).then(
      (d) => {
        console.log('Successfully sent the message! ', d);
        resolve();
      },
      (e) => {
        console.error('ERROR SENDING DISCORD : ', e);
        reject(e);
      }
    );
  });

function createEmbed(repo, branch, url, commits, size, report) {
  console.log('Constructing Embed ...');
  var latest = commits?.[0];

  var embed = new discord.EmbedBuilder({
    title: size + (size == 1 ? ' Commit was ' : ' Commits were ') + 'added to ' + repo + ' (' + branch + ')',
    url,
    description: getChangeLog(commits, size),
    timestamp: Date.parse(latest?.timestamp || Date.now()),
  }).setColor(getEmbedColor(report));

  appendTestResults(embed, report);

  console.log('EMBED : ', embed);
  return embed;
}

function getChangeLog(commits, size) {
  var changelog = '';

  if (!commits) return '';

  for (var i in commits) {
    if (i > 3) {
      changelog += `+ ${size - i} more...\n`;
      break;
    }

    var commit = commits[i];
    var sha = commit.id.substring(0, 8);
    var message =
      commit.message.length > MAX_MESSAGE_LENGTH
        ? commit.message.substring(0, MAX_MESSAGE_LENGTH) + '...'
        : commit.message;
    changelog += `[\`${sha}\`](${commit.url}) ${message} (@${commit.author.username})\n`;
  }

  return changelog;
}

function getEmbedColor(report) {
  if (report.status === 'FAILURE') {
    return 0xe80000;
  }

  if (report.tests.length > 0) {
    var skipped = report.skipped;
    var failures = report.failed;

    if (failures > 1) {
      return 0xff6600;
    }
    if (skipped > 1) {
      return 0xff9900;
    }

    return 0x00ff00;
  } else {
    return 0x00bb22;
  }
}

function appendTestResults(embed, report) {
  var title = false;
  var passed = report.passed;
  var skipped = report.skipped;
  var failed = report.failed;

  var tests = '';

  if (passed > 0) {
    tests += ` :green_circle: ${passed} Tests passed`;
  }

  if (skipped > 0) {
    tests += ` :yellow_circle: ${skipped} Tests were skipped`;
  }

  if (failed > 0) {
    tests += ` :red_circle: ${failed} Tests failed\n`;
  }

  embed.addFields({ name: 'Unit Tests' + (failed > 0 ? '' : `:`), value: tests });
}
