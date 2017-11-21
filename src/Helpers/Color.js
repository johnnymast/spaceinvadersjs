window.fill = (color) => {
    if (color) {
        config.set('engine.color.fill', color);
        return true;
    }
    return config.get('engine.color.fill');
}

window.stroke = (color) => {
    if (color) {
        config.set('engine.color.stroke', color);
        return true;
    }
    return config.get('engine.color.stroke');
}

window.background = (color) => {
    if (color) {
        config.set('engine.color.background', color);
        return true;
    }
    return config.get('engine.color.background');
}