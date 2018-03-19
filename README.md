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
    const miniVideoPlayback = new MiniVideoPlayback(videoTagElementRef, {
        width: 480,
        height: 270
    });
    miniVideoPlayback.show();
}, false);
```

## Options

#### `width` [number]

Set preview width (in `px` units)
> Default: 480px

#### `height` [number]

Set preview height (in `px` units)
> Default: 270px

#### `movable` [boolean]

Allow to drag element
> Default: true

#### `parentElement` [HTMLElement]

Point parent element where preview will be embeded
> Default: document.body

## API

#### `show()`

Show floating playback preview

#### `hide()`

Hide floating playback preview

## Troubleshooting

#### Cross-Origin Resource Sharing (CORS)

Due to CORS you have to provide video resource locally or
from server with proper `Access-Control-Allow-Origin` header.

## Changelog

All changes are listed [here](./CHANGELOG.md)

## License

[The MIT License](http://rendfall.mit-license.org) @ 2018
