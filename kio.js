const num_id = (el) => {
    const tid = el.id;
    const r = parseInt(el.id.substr(3, 1));
    const c = parseInt(el.id.substr(6));
    const id = r * 16 + c;
    return id;
}

const get_labels = (doc) => {
    const labels = [].slice.call(doc.getElementsByClassName('kio-label'));
    labels.sort((a, b) => num_id(a) - num_id(b));
    return labels;
}

const load_from_hash = (doc) => {
    const labels = get_labels(doc);

    const hash = window.location.hash.substr(1);
    const config = hash ? hash.split(':') : [];

    if (config.length == 0) {
        return;
    }

    const font = config[0];
    const chars = config.slice(1);

    doc.getElementById('kio-svg-root').setAttribute('data-kio-font', font);

    const len = Math.min(labels.length, chars.length);

    for (let i = 0; i < len; i++) {
        const char = String.fromCodePoint(parseInt(chars[i], 16));

        labels[i].children[0].textContent = char;
    }
}

const hash_changed = () => {
    const svg = document.getElementById('kio-svg');
    const doc = svg.contentDocument;

    load_from_hash(doc);
}

const svg_loaded = (svg) => {
    const doc = svg.contentDocument;
    const labels = get_labels(doc);

    for (const lab of labels) {
        lab.addEventListener('click', (ev) => {
            console.log(ev.target.parentElement);
        })
    }

    load_from_hash(doc);

    window.onhashchange = hash_changed;
}
