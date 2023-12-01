# Fancier Discord Webhook

This GitHub Action can produce fancy and more meaningful discord messages for your commits.
<br>It includes Test results and coverage.

## :notebook: Requirements

This currently works only for node with `npm test` script projects.
And actually only parse mocha test results (`x passing` & `Y failing` tests).
Would be happy to accept PR to add more test runners.

## :mailbox_with_no_mail: Inputs

### `webhookurl`

**Required** This is the full URL of your Discord webhook.

## :framed_picture: Screenshots

The standard webhook from GitHub to Discord just dumps the commit messages right into your chat, this is fine but sometimes you just want some extra information. Did the commit introduce any new issues? Did it even compile successfully? That's what this Action is for.<br>

### :spider_web: Standard Webhook

![old webhook](https://raw.githubusercontent.com/baked-libs/discord-webhook/master/assets/old-webhook.png)

### :star: New and improved Webhook

![tests passed](https://raw.githubusercontent.com/baked-libs/discord-webhook/master/assets/tests-passed.png)
![tests skipped](https://raw.githubusercontent.com/baked-libs/discord-webhook/master/assets/tests-skipped.png)
![tests failed](https://raw.githubusercontent.com/baked-libs/discord-webhook/master/assets/tests-failed.png)

### :books: Changes

- forked from https://github.com/baked-libs/maven-discord-integration

#### :art: Dynamic Coloring

The color of the embed changes depending on the compiler and test results. Here's a breakdown:

| Color  | Description                                                      |
| ------ | ---------------------------------------------------------------- |
| red    | The build has failed.                                            |
| orange | The build was successful but some tests failed.                  |
| yellow | The build was successful, no tests failed but some were skipped. |
| green  | The build was successful, no tests failed and none were skipped. |

## :scroll: Example setup

To set up this Action, create a new workflow file under `.github/workflows/workflow_name.yml`.

This workflow is rather simple, it checks out your repository, sets up Node and the webhook will then run `npm test` and report the results to your discord webhook.
You must configure the webhook url in advance in your repo's vars or secrets.

```yaml
name: Discord Webhook

on: [push]

jobs:
  report-status:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.15'
      - name: Run Discord Webhook
        uses: cpecorari/nodetest-discord-detailed@v0.1
        with:
          webhookurl: ${{ vars.DISCORD_WEBHOOK_URL }}
```
