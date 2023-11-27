function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
}

const images = {
    ...importAll(require.context('../../assets/png/', false, /\.(png|jpe?g|svg)$/)),
    ...importAll(require.context('../../assets/svg/', false, /\.(png|jpe?g|svg)$/))
}

export default images;
