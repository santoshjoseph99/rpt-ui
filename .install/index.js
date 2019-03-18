const fs = require('fs-extra');
const path = require('path');

const {
  replaceInFiles,
  makeSandboxEndpoint
} = require('graphql-boilerplate-install');

const project = 'makana-rpt-ui';
const envDestination = '../server/.env';

async function install() {
  const endpoint = await makeSandboxEndpoint(project);

  fs.copySync(
    path.resolve(__dirname, './.env'),
    path.resolve(__dirname, envDestination)
  );

  replaceInFiles([envDestination], '__PRISMA_ENDPOINT__', endpoint);
}

install();
