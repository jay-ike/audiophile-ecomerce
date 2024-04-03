/*jslint browser*/
import {openDB} from "./idb-min.js";
const {DOMException, Storage, btoa, console, localStorage} = window;

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
    const result = Number.parseFloat(0.1925 * amount);
    return result.toFixed(2);
}

function shippingCost(cartAmount) {
    return Math.round(0.05 * cartAmount);
}


function upserter(db, store, keyFn) {
    return async function (value) {
        let oldValue = await db.get(store, keyFn(value));
        oldValue = Object.assign(oldValue ?? {}, value);
        await db.put(store, oldValue);
        return oldValue;
    };
}

function fetcher(db, store) {
    return () => db.getAll(store);
}

function storage() {
    const store = localStorage;
    const isSupported = typeof Storage === "function";
    return Object.freeze({
        empty() {
            store.clear();
        },
        get(key) {
            let value = store.getItem(key);
            try {
                return JSON.parse(value);
            } catch (error) {
                if (SyntaxError.prototype.isPrototypeOf(error)) {
                    return value;
                }
            }
        },
        isSupported,
        remove(key) {
            store.removeItem(key);
        },
        set(key, value) {
            try {
                store.setItem(key, JSON.stringify(value));
            } catch (error) {
                if (DOMException.prototype.isPrototypeOf(error)) {
                    console.warn(error);
                }
            }
        },
        values() {
            return Object.assign({}, store);
        }
    });
}

async function createDb(dbName = "jay-ike_shop", version = 1) {
    const product_store = "audio_products";
    const order_store = "audio_orders";
    const cartKey = btoa("audio_cart");
    const cartStore = storage();
    let result = Object.create(null);
    const db = await openDB(dbName, version, {
        upgrade: function upgrade(db) {
            db.createObjectStore(
                product_store,
                {keyPath: "id"}
            ).createIndex("category", "category", {unique: false});
            db.createObjectStore(order_store, {keyPath: "timestamp"});
        }
    });
    result.bulkUpsert = async function insertMany(products) {
        let tx = db.transaction(product_store, "readwrite");
        let actions = products.map((elt) => tx.store.put(elt));
        actions[actions.length] = tx.done;
        await Promise.all(actions);
    };
    result.upsertOrder = upserter(db, order_store, (order) => order.timestamp);
    result.upsertProduct = upserter(db, product_store, (prod) => prod.id);
    result.getAllProducts = fetcher(db, product_store);
    result.getAllOrders = fetcher(db, order_store);
    result.getProductById = (id) => db.get(product_store, id);
    result.getProductsByCategories = async function category(categories) {
        let request;
        if (!Array.isArray(categories)) {
            return [];
        }
        request = await db.getAllFromIndex(product_store, "status");
        return request.filter((elt) => categories.includes(elt.status));
    };
    result.deleteProduct = (id) => db.delete(product_store, id);
    result.saveCart = function (cart) {
        cartStore.set(cartKey, cart);
    };
    result.getCart = function () {
        cartStore.get(cartKey);
    };
    return Object.freeze(result);
}

async function fetchData(url, options, timeout) {
    let controller = new AbortController();
    let response;
    let success;
    const defaultOptions = {
        headers: {"content-type": "application/json"},
        method: "GET",
        signal: controller.signal
    };
    if (Number.isFinite(timeout)) {
        setTimeout(() => controller.abort(), timeout);
    }
    try {
        response = await fetch(
            url,
            Object.assign(defaultOptions, options ?? {})
        );
        success = response.ok;
        response = await response.json();
        return Object.assign({success}, response);
    } catch (error) {
        return Object.assign({success: false}, {message: error.message});
    }

}

function storeUpdater(prop, computed) {
    return function(val) {
        const clone = Object.assign({}, val);
        if (clone[prop] !== undefined) {
            clone[prop] = computed(clone[prop]);
        }
        return clone;
    };
}

async function fetchProducts() {
    const db = await createDb();
    let products = await db.getAllProducts();
    if (products.length === 0) {
        products = await fetchData("/data.json");
        products = products.data;
        await db.bulkUpsert(products);
    }
    return { db, products };
}

export default Object.freeze({
    copy,
    createDb,
    fetchData,
    fetchProducts,
    getFormatter,
    getTax,
    plural,
    shippingCost,
    storeUpdater
});
