const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const concat = addendum => str => str.concat(addendum)
const match = regex => str => str.match(regex)
const prop = key => object => object[key]
const add = x => y => x + y

// map :: Functor f => (a -> b) -> f a -> f b
const map = f => anyFunctor => anyFunctor.map(f)

// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
const curry = (fn) => {
    const arity = fn.length;

    return function $curry(...args) {
        if (args.length < arity) {
            return $curry.bind(null, ...args);
        }

        return fn.call(null, ...args);
    };
};

// inspect :: a -> String
function inspect(x) {
    if (x && typeof x.inspect === 'function') {
        return x.inspect();
    }

    function inspectFn(f) {
        return f.name ? f.name : f.toString();
    }

    function inspectTerm(t) {
        switch (typeof t) {
        case 'string':
            return `'${t}'`;
        case 'object': {
            const ts = Object.keys(t).map(k => [k, inspect(t[k])]);
            return `{${ts.map(kv => kv.join(': ')).join(', ')}}`;
        }
        default:
            return String(t);
        }
    }

    function inspectArgs(args) {
        return Array.isArray(args) ? `[${args.map(inspect).join(', ')}]` : inspectTerm(args);
    }

    return (typeof x === 'function') ? inspectFn(x) : inspectArgs(x);
}

module.exports = {
    compose,
    concat,
    match,
    inspect,
    prop,
    curry,
    add,
    map,
}