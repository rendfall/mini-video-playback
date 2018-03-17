const DEFAULT_CONFIG = {
    videoElement: null
}

function buildPreview() {
    const $preview = document.createElement('div');

    $preview.style.position = 'fixed';
    $preview.style.top = '15px';
    $preview.style.right = '15px';
    $preview.style.width = '480px';
    $preview.style.height = '270px';
    $preview.style.zIndex = '2147483647';

    return $preview;
}

function draw(video, context, buffer, width, height) {
    buffer.drawImage(video, 0, 0, width, height);
    const imageData = buffer.getImageData(0, 0, width, height);
    context.putImageData(imageData, 0, 0);
}

function render($target, $source) {
    $target.appendChild($source);
    document.body.appendChild($target);
}

function buildConfig(options) {
    const config = Object.assign({}, DEFAULT_CONFIG, options);
    const entries = Object.entries(config);
    return new Map(entries);
}

class Loop {
    constructor() {
        this.id = null;
    }

    start(fn) {
        this.step = () => {
            fn.call(fn);
            this.id = window.requestAnimationFrame(this.step);
        }
        this.step();
    }

    stop() {
        window.cancelAnimationFrame(this.id);
    }
}

// Expose API
export class MiniVideoPlayback {

    constructor(options) {
        this.$preview = buildPreview();
        this.config = buildConfig(options);
        this.loop = new Loop();
    }

    show() {
        const $video = this.config.get('videoElement');
        const $preview = this.$preview;

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

        this.loop.start(() => {
            draw($video, canvasContext, bufferContext, width, height);
        });

        render($preview, $canvas); 
    }

    hide() {
        this.$preview.style.display = 'none';
        this.loop.stop();
    }

    destroy() {
        if (this.$preview) {
            this.preview.remove();
            this.$preview = null;
        }
    }
};
