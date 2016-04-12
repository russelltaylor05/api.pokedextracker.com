#### 1.4.2 (2016-4-11)

##### Bug Fixes

* **users:** order by id ([56816132](https://github.com/robinjoseph08/api.pokedextracker.com/commit/5681613234996b22fb84e738490ee760dea776f6))

#### 1.4.1 (2016-4-10)

##### Bug Fixes

* **evolutions:** fix ordering of tyrogue evolutions ([69190349](https://github.com/robinjoseph08/api.pokedextracker.com/commit/691903490a725a1f0fcafcde14a5d1ba6a674674))

### 1.4.0 (2016-4-10)

##### New Features

* **captures:** only return what's necessary ([56373912](https://github.com/robinjoseph08/api.pokedextracker.com/commit/563739127082fefd649f97ac665dcce9713a70f6))

### 1.3.0 (2016-4-9)

##### New Features

* **evolutions:** add evolutions table return them with pokemon ([ad32168d](https://github.com/robinjoseph08/api.pokedextracker.com/commit/ad32168dc1e84291b35f2f1d36c8243f30425fa2))

##### Bug Fixes

* **users:** remove findAll endpoint ([bb599931](https://github.com/robinjoseph08/api.pokedextracker.com/commit/bb599931fbdf538d29ead3003fae781b460deea6))

#### 1.2.1 (2016-3-31)

##### Bug Fixes

* **new-relic:** make sure require('newrelic') is first ([f1e10e14](https://github.com/robinjoseph08/api.pokedextracker.com/commit/f1e10e14ed912d52f1c709979f653ce5d0340007))

### 1.2.0 (2016-3-30)

##### New Features

* **monitoring:** add new relic ([2bea2442](https://github.com/robinjoseph08/api.pokedextracker.com/commit/2bea24429b96a859cade910b34fcd4676aa3fdaf))

#### 1.1.1 (2016-3-25)

##### Bug Fixes

* **captures:** speed up the list endpoint ([3eceaa99](https://github.com/robinjoseph08/api.pokedextracker.com/commit/3eceaa99ef9a94f9383914250e4fb2445d198a6e))

### 1.1.0 (2016-3-24)

##### New Features

* **captures:** nest the pokemon object in the response ([3ba86128](https://github.com/robinjoseph08/api.pokedextracker.com/commit/3ba86128f146862e202421a22f25a4375e6d8d2d))

#### 1.0.2 (2016-3-22)

##### Bug Fixes

* **users:** don't lowercase usernames passed in ([fcaee9e6](https://github.com/robinjoseph08/api.pokedextracker.com/commit/fcaee9e63ef651dbd1f9df6730287f99222919cf))

#### 1.0.1 (2016-3-21)

##### Bug Fixes

* **users:** return JWT on user creation ([b29b1f3e](https://github.com/robinjoseph08/api.pokedextracker.com/commit/b29b1f3e3b6eb7c4e3393ccca0eed1db3335c3c2))

## 1.0.0 (2016-3-20)

##### New Features

* **captures:** add list, create, delete endpoints ([5137a2ed](https://github.com/robinjoseph08/api.pokedextracker.com/commit/5137a2edbdd401b426e7dba17597fff7ea994bd5))
* **auth:** add auth service ([890acb1e](https://github.com/robinjoseph08/api.pokedextracker.com/commit/890acb1e3a7060ca3781178f37a0e2de09220907))
* **sessions:** add create endpoint ([14fab29c](https://github.com/robinjoseph08/api.pokedextracker.com/commit/14fab29c64fffdfb25fef977ca86a3cd84d37a6c))

##### Bug Fixes

* **users:** limit usernames to only 20 chars ([c2429747](https://github.com/robinjoseph08/api.pokedextracker.com/commit/c2429747c723e818fd1fb6d50cf67e7a57d95ae1))
* **pokemon:** adjust the response to be more relevant ([23f28914](https://github.com/robinjoseph08/api.pokedextracker.com/commit/23f2891405f30d1d8caa11bc84380d041576d118))

### 0.1.0 (2016-3-13)

##### Chores

* **npm:** add shrinkwrap file ([b8f8364e](https://github.com/robinjoseph08/api.pokedextracker.com/commit/b8f8364e3b73f4f8e223054fc7f8055b6b4bd539))
* **prod:** add production config variables ([f71024c2](https://github.com/robinjoseph08/api.pokedextracker.com/commit/f71024c270b0b94a3f3f7bf39e123f113263a75f))
* **init:** initial commit ([aa7d78e9](https://github.com/robinjoseph08/api.pokedextracker.com/commit/aa7d78e98c6ee51cf18387eac292ee87758c43fb))

##### New Features

* **pokemon:** add list, retrieve endpoints ([eff67ed3](https://github.com/robinjoseph08/api.pokedextracker.com/commit/eff67ed3ebff7d73a5c0a4be9aca1b0cb2b816fc))
* **users:** add list, retrieve, create endpoints ([3483eb14](https://github.com/robinjoseph08/api.pokedextracker.com/commit/3483eb14ced6ffd62ee932417bbd6bf148a32eb4))
* **server:** initialize server ([e14d722d](https://github.com/robinjoseph08/api.pokedextracker.com/commit/e14d722dcd3649b6c4ba87cc03b7aaef8cc7e1b8))

