# Mini Video Playback ([npm](https://www.npmjs.com/package/mini-video-playback))

[![npm version](https://badge.fury.io/js/mini-video-playback.svg)](https://badge.fury.io/js/mini-video-playback)

> Make the video pop out so that you could move it wherever you like.

![logo-128.png](https://raw.githubusercontent.com/rendfall/mini-video-playback/master/assets/logo-128.png "Logo")

## Install

```
$ npm install mini-video-playback
```

## Usage

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const videoTagElementRef = document.querySelector('video');
    const miniVideoPlayback = new MiniVideoPlayback(videoTagElementRef);
    miniVideoPlayback.show();
}, false);
```

## API

#### `show()`

Show floating playback preview

#### `hide()`

Hide floating playback preview

## Changelog

All changes are listed [here](./CHANGELOG.md)

## License

[The MIT License](http://rendfall.mit-license.org) @ 2018
