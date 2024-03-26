import {createEffect, createSignal} from "solid-js";

function ItemCounter(props) {
    let input;
    const [counter, setCounter] = createSignal(props.initialValue ?? 1);
    const addItem  = () => setCounter((val) => val + 1);
    const removeItem = () => setCounter(function (val) {
        if (val > 0) {
            return val - 1;
        }
        return val;
    });
    createEffect(function (count) {
        let event;

        if (counter() > count) {
            event = new CustomEvent("counterincremented", {bubbles: true, details: props.itemDatas});
            input.dispatchEvent(event);
        }
        if (counter() < count) {
            event = new CustomEvent("counterdecremented", {bubbles: true, details: props.itemDatas});
            input.dispatchEvent(event);
        }
        return counter();
    });

    return (
        <div class="item-counter">
            <button type="button" data-icon-position="start" data-icon="minus" aria-label="remove one item" onClick={removeItem}></button>
            <input ref={input} type="text" disabled name={props.name} id={props.id} value={counter()}/>
            <button type="button" data-icon-position="start" data-icon="plus" aria-label="add one item" onClick={addItem}></button>
        </div>
    );
}

export default ItemCounter;
