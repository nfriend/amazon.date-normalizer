# AMAZON.DATE Normalizer

[![GitLab Pipeline
Status](https://gitlab.com/nfriend/amazon.date-normalizer/badges/master/pipeline.svg)](https://gitlab.com/nfriend/amazon.date-normalizer/-/pipelines/latest)
[![Semantic Release
Badge](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A JavaScript module that converts an
[AMAZON.DATE](https://developer.amazon.com/en-US/docs/alexa/custom-skills/slot-type-reference.html#date)
into a [Moment.js](https://momentjs.com/) object.

## Publishing

This project uses [Semantic
Release](https://github.com/semantic-release/semantic-release) to manage
releases, which happens in this project's [GitLab pipeline](.gitlab-ci.yml).

### Environment variables

The GitLab pipeline relies on a few environment variables:

| Variable name  | Description                                                            |
| -------------- | ---------------------------------------------------------------------- |
| `GITLAB_TOKEN` | The token used by Semantic Release to interact with the GitLab project |
| `NPM_TOKEN`    | The token used by Semantic Release to publish the package to NPM       |
