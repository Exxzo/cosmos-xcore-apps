# Example marketplace for Cosmos

This repo is an example of a marketplace for Cosmos.

# How to use

Fork this repo, and then setup the `config.json` file with your own data. This uses GitHub Actions and GitHub Pages to deploy the marketplace index. Make sure those are enabled in your repo. The two URLs in the config are URLs to your GitHub Pages site.

You can add your own app in the folder, either using `cosmos-compose.json` files, or `docker-compose.yml` files.

## Required: GitHub Pages source

Cosmos needs the generated marketplace files (`index.json` and `servapps.json`). Those are built by `.github/workflows/static.yml`.

In the repo settings, set **Pages → Build and deployment → Source** to **GitHub Actions** (not "Deploy from a branch").

- Working marketplaces (official / unofficial) use `build_type: workflow`
- If Pages is left on "Deploy from a branch", GitHub only publishes a Jekyll README site and the Actions deploy fails with `Creating Pages deployment failed`
- After switching to GitHub Actions, re-run the **Deploy static content to Pages** workflow

This repo also commits `index.json` / `servapps.json` so the marketplace can work even before that switch.

## Add this marketplace in Cosmos

For example, this repo is `https://github.com/Exxzo/cosmos-xcore-apps` but pages are under `https://exxzo.github.io/cosmos-xcore-apps`.

In Cosmos → Settings → Marketplace sources, add:

```text
https://exxzo.github.io/cosmos-xcore-apps/index.json
```

That matches how working marketplaces are imported (see [cosmos-servapps-unofficial/index.json](https://lilkidsuave.github.io/cosmos-servapps-unofficial/index.json) and the [official marketplace](https://github.com/azukaar/cosmos-servapps-official)).

`servapps.json` is the flat app list referenced inside `index.json`. Prefer `index.json` as the Cosmos source URL.

## Xenith Lab game servers

Initial Cosmo marketplace conversions from Xenith Lab standalone Docker Compose stacks:

- `servapps/Palworld` — dedicated Palworld server (`thijsvanloef/palworld-server-docker`)
- `servapps/Satisfactory` — dedicated Satisfactory server (`wolveix/satisfactory-server`)

Both use Whiskers installer forms so ports, player limits, passwords, and data paths can be set at install time in Cosmos.
