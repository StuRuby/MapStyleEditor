//标准化url
export function normalizeSourceURL(url, apiToken = '') {
    const matches = url.match(/^mapbox:\/\/(.*)/);
    if (matches) {
        // mapbox://mapbox.mapbox-streets-v7
        return `https://api.mapbox.com/v4/${matches[1]}.json?secure&access_token=${apiToken}`;
    }
    else {
        return url;
    }
}