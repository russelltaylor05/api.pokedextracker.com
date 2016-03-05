# api.pokedextracker.com

The API for [pokedextracker.com](http://pokedextracker.com).

[![Build Status](https://travis-ci.org/robinjoseph08/api.pokedextracker.com.svg)](https://travis-ci.org/robinjoseph08/api.pokedextracker.com)
[![Coverage Status](https://coveralls.io/repos/robinjoseph08/api.pokedextracker.com/badge.svg?branch=master&service=github)](https://coveralls.io/github/robinjoseph08/api.pokedextracker.com?branch=master)
[![Dependency Status](https://david-dm.org/robinjoseph08/api.pokedextracker.com.svg)](https://david-dm.org/robinjoseph08/api.pokedextracker.com)

## Install

This project is meant to be run with Node.js v5, so make sure you have it installed and active when running this application.

```bash
$ nvm install 5
$ nvm use 5
$ npm i
```

If you have [avn](https://github.com/wbyoung/avn) setup, the `.node-version` file should automatically switch the version for you.

### Database

```bash
$ psql postgres
postgres=# CREATE ROLE "pokedex_tracker_user" CREATEDB CREATEUSER LOGIN;
$ createdb -O pokedex_tracker_user pokedex_tracker
```
