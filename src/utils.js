/*jslint browser*/

const plural = (count) => (
    count > 1
    ? "s"
    : ""
);

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

export default Object.freeze({
    getFormatter,
    plural
});
