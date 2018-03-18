function setElementPosition($element, position) {
    $element.style.left = `${position.x}px`;
    $element.style.top = `${position.y}px`;
}

function isTarget(evt, $element) {
    return evt.target === $element
        || evt.path.includes($element);
}

function getElementPosition($element) {
    const styles = window.getComputedStyle($element, null);
    const x = styles.getPropertyValue('left');
    const y = styles.getPropertyValue('top');
    return {
        x: Number.parseInt(x, 10) || 0,
        y: Number.parseInt(y, 10) || 0
    };
}

function getElementCursor($element) {
    const styles = window.getComputedStyle($element, null);
    return styles.getPropertyValue('cursor');
}

function setElementCursor($element, value) {
    $element.style.cursor = value || 'default';
}

export class Dragger {
    constructor() {
        throw new Error('Not allowed to create instance of Dragger class');
    }

    static initialize($element, $parent = document.body) {
        const isElementValid = $element instanceof HTMLElement;
        const isParentValid = $parent instanceof HTMLElement;

        if (!(isElementValid && isParentValid)) {
            throw new Error('$element must be a HTMLElement');
        }

        let initialCursor = getElementCursor($element);
        let elementX = 0;
        let elementY = 0;
        let initialX = 0;
        let initialY = 0;

        function moveHandler(evt) {
            const deltaX = evt.clientX - initialX;
            const deltaY = evt.clientY - initialY;
            const newPosition = {
                x: elementX + deltaX,
                y: elementY + deltaY
            };

            setElementPosition($element, newPosition);
        }

        function stopHandler(evt) {
            $parent.removeEventListener('mousemove', moveHandler);
            $parent.removeEventListener('mouseup', stopHandler);
            setElementCursor($element, initialCursor);
        }

        $element.addEventListener('mousedown', (evt) => {
            if (!isTarget(evt, $element)) {
                return;
            }

            setElementCursor($element, 'move');

            const { x, y } = getElementPosition($element);
            elementX = x;
            elementY = y;


            initialX = evt.clientX;
            initialY = evt.clientY;

            $parent.addEventListener('mousemove', moveHandler);
            $parent.addEventListener('mouseup', stopHandler);
        });
    }
}
