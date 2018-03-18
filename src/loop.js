export class Loop {
    constructor() {
        this.id = null;
    }

    start(fn) {
        this.step = () => {
            fn.call(fn);
            this.id = window.requestAnimationFrame(this.step);
        };
        this.step();
    }

    stop() {
        window.cancelAnimationFrame(this.id);
    }
}
