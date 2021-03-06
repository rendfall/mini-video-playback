import { DEFAULTS } from './defaults';
import { Dragger } from './dragger';
import { Loop } from './loop';

function draw(video, context, buffer, width, height) {
    buffer.drawImage(video, 0, 0, width, height);
    const imageData = buffer.getImageData(0, 0, width, height);
    context.putImageData(imageData, 0, 0);
}

function render($source, $target) {
    $target.appendChild($source);
    document.body.appendChild($target);
}

function buildConfig(options) {
    const config = Object.assign({}, DEFAULTS, options);
    const entries = Object.entries(config);
    return new Map(entries);
}

export default class MiniVideoPlayback {
    constructor($video, options = {}) {
        if (!($video instanceof HTMLVideoElement)) {
            throw new Error(`First argument must be a HTMLVideoElement`);
        }

        this.config = buildConfig(options);
        this.$video = $video;
        this.loop = new Loop();
        this.setupCanvas();
        this.setupBuffer();
        this.setupPreview();

        render(this.$canvas, this.$preview);
    }

    setupPreview() {
        const width = this.config.get('width');
        const height = this.config.get('height');
        const isMovable = this.config.get('movable');
        const $parentElement = this.config.get('parentElement');
        const $preview = document.createElement('div');

        $preview.style.position = 'fixed';
        $preview.style.top = '15px';
        $preview.style.right = '15px';
        $preview.style.width = `${width}px`;
        $preview.style.height = `${height}px`;
        $preview.style.zIndex = '2147483647';

        if (isMovable) {
            Dragger.initialize($preview, $parentElement);
        }

        this.$preview = $preview;
    }

    setupCanvas() {
        const $canvas = document.createElement('canvas');
        $canvas.width = this.config.get('width');
        $canvas.height = this.config.get('height');
        this.$canvas = $canvas;
    }

    setupBuffer() {
        const $buffer = document.createElement('canvas');
        $buffer.width = this.config.get('width');
        $buffer.height = this.config.get('height');
        this.$buffer = $buffer;
    }

    show() {
        const { $video, $buffer, $canvas } = this;
        const canvasContext = $canvas.getContext('2d');
        const bufferContext = $buffer.getContext('2d');
        const width = this.config.get('width');
        const height = this.config.get('height');

        this.$preview.style.display = 'block';

        this.loop.start(() => {
            draw($video, canvasContext, bufferContext, width, height);
        });
    }

    hide() {
        this.$preview.style.display = 'none';
        this.loop.stop();
    }

    destroy() {
        if (this.$preview) {
            this.$preview.remove();
            this.$preview = null;
        }
    }
}
