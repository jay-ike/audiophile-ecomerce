
function ItemCounter(props) {
    let input;
    function inputDetails(element) {
        return {
            id: element.id,
            prevValue: element.value
        }
    }
    function removeItem() {
        const val = Number.parseInt(input.value ?? "1", 10);
        const detail = inputDetails(input);

        if (val > 0) {
            input.value = val - 1;
            input.dispatchEvent(
                new CustomEvent("counterdecremented", { bubbles: true, detail })
            );
        }
    }
    function addItem() {
        const val = Number.parseInt(input.value ?? "1", 10);
        const detail = inputDetails(input);
        input.value = val + 1;
        input.dispatchEvent(
            new CustomEvent("counterincremented", { bubbles: true, detail })
        );
    }
    return (
        <div class="item-counter">
            <button type="button" data-icon-position="start" data-icon="minus" aria-label="remove one item" onClick={removeItem}></button>
            <input ref={input} type="text" disabled name={props.name} id={props.id} value={props.value ?? 1} />
            <label for={props.id} class="visually-hidden">{props.name}</label>
            <button type="button" data-icon-position="start" data-icon="plus" aria-label="add one item" onClick={addItem}></button>
        </div>
    );
}

export default ItemCounter;
