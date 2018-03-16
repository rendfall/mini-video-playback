const DEFAULT_CONFIG = {
    videoElement: null
}

function draw(video, context, buffer, width, height) {
    buffer.drawImage(video, 0, 0, width, height);
    const imageData = buffer.getImageData(0, 0, width, height);
    context.putImageData(imageData, 0, 0);

    window.requestAnimationFrame(() => draw(video, context, buffer, width, height));
}

function render($canvas) {
    const $preview = document.createElement('div');

    $preview.style.position = 'fixed';
    $preview.style.top = '15px';
    $preview.style.right = '15px';
    $preview.style.width = '480px';
    $preview.style.height = '270px';
    $preview.style.zIndex = '2147483647';

    $preview.appendChild($canvas);

    document.body.appendChild($preview);
}

function buildConfig(options) {
    const config = Object.assign({}, DEFAULT_CONFIG, options);
    const entries = Object.entries(config);
    return new Map(entries);
}

// Expose API
export class MiniVideoPlayback {

    constructor(options) {
        this.config = buildConfig(options);
    }

    show() {
        const $video = this.config.get('videoElement');

        if (!($video instanceof HTMLVideoElement)) {
            throw new Error(`The videoElement option must be HTMLVideoElement`);
        }

        const $canvas = document.createElement('canvas');
        const $buffer = document.createElement('canvas');
        const canvasContext = $canvas.getContext('2d');
        const bufferContext = $buffer.getContext('2d');

        const width = $video.clientWidth;
        const height = $video.clientHeight;

        $buffer.width = width;
        $buffer.height = height;
        $canvas.width = width
        $canvas.height = height;

        draw($video, canvasContext, bufferContext, width, height);
        render($canvas); 
    }

};
