const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const concat = addendum => str => str.concat(addendum)
const match = regex => str => str.match(regex)

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

module.exports = { compose, concat, match, inspect }