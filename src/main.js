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

function showMiniPlayer($video) {
    const $canvas = document.createElement('canvas');
    const $buffer = document.createElement('canvas');
    const canvasContext = $canvas.getContext('2d');
    const bufferContext = $buffer.getContext('2d');

    const width = $video.clientWidth;
    const height = $video.clientHeight;

    $canvas.width = width;
    $canvas.height = height;
    $buffer.width = width;
    $buffer.height = height;

    draw($video, canvasContext, bufferContext, width, height);

    render($canvas);
}

// Expose API
module.exports = {
    show($video) { return showMiniPlayer($video); }
};
