# Example marketplace for Cosmos

This repo is an example of a marketplace for Cosmos.

# How to use

Fork this repo, and then setup the config.json file with your own data. This uses github actions and github pages to deploy the website. Make sure those are enabled in your repo. The two URLs in the config are URL to your Github Pages.

You can add your own app in the folder, either using cosmos-compose.json files, or docker-compose.yml files.

For example, this repo is `https://github.com/Exxzo/cosmos-xcore-apps` but pages are under `https://Exxzo.github.io/cosmos-xcore-apps`. In order to add this repo to Cosmos you need to add `https://Exxzo.github.io/cosmos-xcore-apps/servapps.json` to the list of sources in the Cosmos settings.
