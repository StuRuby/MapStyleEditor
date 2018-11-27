import npmurl from 'url';

function loadJSON(url, defaultValue, callback) {
    fetch(url, {
        mode: 'cors',
        credentials: 'same-origin'
    })
        .then(resp => resp.json())
        .then(body => callback(body))
        .catch(() => {
            console.warn('Can not metadata for ' + url);
            callback(defaultValue);
        });
}


export function downloadGlyphsMetadata(urlTemplate, cb) {
    if (!urlTemplate) cb([]);

    let urlObj = npmurl.parse(urlTemplate);
    const normPathPart = '/%7Bfontstack%7D/%7Brange%7D.pbf';
    if (urlObj.pathname === normPathPart) {
        urlObj.pathname = '/fontstacks.json';
    } else {
        urlObj.pathname = urlObj.pathname.replace(normPathPart, '.json');
    }
    let url = npmurl.format(urlObj);

    loadJSON(url, [], cb)
}

export function downloadSpriteMetadata(baseUrl, cb) {
    if (!baseUrl) return cb([]);
    const url = baseUrl + '.json';
    loadJSON(url, {}, glyphs => cb(Object.keys(glyphs)));
}