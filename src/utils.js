/*jslint browser*/

const plural = (count) => (
    count > 1
    ? "s"
    : ""
);
function copy(object) {
    return Object.freeze({
        with(newDatas) {
            return Object.assign(
                Object.assign({}, object ?? {}),
                newDatas ?? {}
            );
        }
    });
}

function getFormatter() {
    let dateFormatter = new Intl.DateTimeFormat(
        navigator.language,
        {day: "numeric", month: "short", year: "numeric"}
    );
    let currencyFormatter = new Intl.NumberFormat(
        navigator.language,
        {currency: "USD", style: "currency"}
    );

    return Object.freeze({
        formatCurrency(amount) {
            let result = Number.parseFloat(amount.toString());
            if (Number.isFinite(result)) {
                return currencyFormatter.format(amount);
            }
            return "";
        },
        formatDate(date) {
            return dateFormatter.format(date);
        },
        updateCurrencyFormatter(language, options) {
            const opt = currencyFormatter.resolvedOptions();
            return new Intl.NumberFormat(
                language ?? opt.locale,
                Object.assign(opt, options ?? {})
            );
        },
        updateDateFormatter(language, options) {
            const opt = dateFormatter.resolvedOptions();
            return new Intl.DateTimeFormat(
                language ?? opt.locale,
                Object.assign(opt, options ?? {})
            );
        }
    });
}
function getTax(amount) {
    return Number.parseFloat((0.1925 * amount).toFixed(2));
}

function shippingCost(cartAmount) {
    return Math.round(0.05 * cartAmount);
}

export default Object.freeze({
    copy,
    getFormatter,
    getTax,
    plural,
    shippingCost
});
