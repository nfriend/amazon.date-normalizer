# AMAZON.DATE Normalizer

[![GitLab Pipeline
Status](https://gitlab.com/nfriend/amazon.date-normalizer/badges/master/pipeline.svg)](https://gitlab.com/nfriend/amazon.date-normalizer/-/pipelines/latest)
[![Semantic Release
Badge](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A JavaScript module that converts an
[AMAZON.DATE](https://developer.amazon.com/en-US/docs/alexa/custom-skills/slot-type-reference.html#date)
into a [Moment.js](https://momentjs.com/) object.

## Installation

This NPM module is hosted in [GitLab's Package
registry](https://gitlab.com/nfriend/amazon.date-normalizer/-/packages).

To use it, add the following to your project's `.yarnrc`:

```
"@nfriend:registry" "https://gitlab.com/api/v4/packages/npm/"
```

Or, if you're using `npm`, add this to `.npmrc`:

```
@nfriend:registry=https://gitlab.com/api/v4/packages/npm/
```

Then, install the package:

```
yarn add @nfriend/amazon.date-normalizer
```

_or:_

```
npm install --save @nfriend/amazon.date-normalizer
```

## Usage

```ts
import { normalize } from '@nfriend/amazon.date-normalizer';

const amazonDateString = '2015-W49-WE';
const eventDate = normalize(amazonDateString);

// prints "2015-01-01"
console.log(eventDate.format('YYYY-MM-DD'));
```

For a complete list of all cases this module handles, see
[`tests/index.test.ts`](tests/index.test.ts).

## Timezone

The returned `moment` object is always returned in UTC timezone.

No matter where the user is located, if they say "December 25th", this module
will return an object like this:

```js
const amazonDateString = '2015-12-25';
const eventDate = normalize(amazonDateString);

// prints "2015-12-25T00:00:00.000Z"
console.log(eventDate.toISOString());
```

### Translating the date into the user's current timezone

To translate this date into the user's current timezone, use
[`moment-timezone`](https://momentjs.com/timezone/):

```js
const upsServiceClient = handlerInput.serviceClientFactory.getUpsServiceClient();

deviceTimeZone = await upsServiceClient.getSystemTimeZone(
  handlerInput.requestEnvelope.context.System.device.deviceId,
);

// The second parameter causes the date to be _moved_ into the user's
// timezone, not just translated. So `translatedDate` will not refer
// to the same moment in time as `eventDate`.
const translatedDate = eventDate.clone().tz(deviceTimeZone, true);
```

## Publishing

This project uses [Semantic
Release](https://github.com/semantic-release/semantic-release) to manage
releases, which happens in this project's [GitLab pipeline](.gitlab-ci.yml).

To trigger a new release, add a new commit with a message like this:

```
fix: Put out all the fires
```

and `git push` on `master`.

### Environment variables

The GitLab pipeline relies on a few environment variables:

| Variable name  | Description                                                            |
| -------------- | ---------------------------------------------------------------------- |
| `GITLAB_TOKEN` | The token used by Semantic Release to interact with the GitLab project |
| `NPM_TOKEN`    | The token used by Semantic Release to publish the package to NPM       |
