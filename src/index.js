const core = require('@actions/core');
const github = require('@actions/github');

const analysis = require('../src/analysis.js');
const webhook = require('../src/discord.js');

async function run() {
  const payload = github.context.payload;
  console.log(`Received event payload: ${JSON.stringify(payload, undefined, 2)}`);
  const repository = payload.repository?.full_name;
  const commits = payload.commits;
  const size = commits?.length;
  const branch = payload.ref?.split('/')?.[payload?.ref?.split('/')?.length - 1];
  const from =
    payload.sender.type === 'User'
      ? { author: payload.sender.login, url: payload.sender.html_url, avatar_url: payload.sender.avatar_url }
      : { author: 'Bot', avatar_url: '', url: 'github.com' };

  console.log(`Received ${commits?.length}/${size} commits...`);

  if (commits?.length === 0) {
    // This was likely a "--tags" push.
    console.log(`Aborting analysis, found no commits.`);
    return;
  }

  const webhookurl = core.getInput('webhookurl', { required: true });

  webhook
    .start(webhookurl, commits, size)
    .then((messageId) => {
      analysis.start(isSkipped(payload.head_commit)).then(
        (report) => {
          console.log('REPORT : ', report);
          webhook
            .send(webhookurl, repository, branch, payload.compare, commits, size, report, messageId, from)
            .catch((err) => core.setFailed(err.message));
          if (report.failed > 0) core.setFailed(report.failed);
        },
        (err) => core.setFailed(err)
      );
    })
    .catch(console.error);
}

try {
  run();
} catch (error) {
  core.setFailed(error.message);
}

function isSkipped(commit) {
  return commit?.message?.toLowerCase()?.includes('[skip]');
}
