#target photoshop

function normalizeText(str) {
    str = String(str); // 强制转换为字符串以兼容 ExtendScript
    str = str.replace(/(\r\n|\n|\r)/gm, " "); // 换行转空格
    str = str.replace(/\s+/g, " "); // 合并多个空白为单空格
    return str.replace(/^\s+|\s+$/g, ""); // 手动去除首尾空格（兼容无 trim 环境）
}

function getTranslationMap(csvContent) {
    var lines = csvContent.split(/\r\n|\n|\r/);
    var map = {};
    for (var i = 1; i < lines.length; i++) { // skip header
        if (!lines[i]) continue;
        var cols = lines[i].split(",");
        if (cols.length < 6) continue;

        var keyRaw = cols[2]; // 第三列“文本内容”
        var valueRaw = cols[5]; // 第六列“翻译文本”

        var key = normalizeText(keyRaw.replace(/^"(.*)"$/, "$1").replace(/""/g, '"'));
        var value = normalizeText(valueRaw.replace(/^"(.*)"$/, "$1").replace(/""/g, '"'));

        if (value !== "") {
            map[key] = value;
        }
    }
    return map;
}

function replaceTextByContent(layerSet, translationMap, updatedCountObj) {
    for (var i = 0; i < layerSet.layers.length; i++) {
        var layer = layerSet.layers[i];
        if (layer.typename == "ArtLayer" && layer.kind == LayerKind.TEXT) {
            var textContent = normalizeText(layer.textItem.contents);
            if (translationMap[textContent] !== undefined) {
                layer.textItem.contents = translationMap[textContent];
                updatedCountObj.count++;
            }
        } else if (layer.typename == "LayerSet") {
            replaceTextByContent(layer, translationMap, updatedCountObj);
        }
    }
}

try {
    var doc = app.activeDocument;
    var csvFile = File.openDialog("选择填写完成翻译的 CSV 文件", "*.csv");
    if (csvFile != null) {
        csvFile.encoding = 'UTF8';
        csvFile.open('r');
        var csvContent = csvFile.read();
        csvFile.close();

        var translationMap = getTranslationMap(csvContent);
        var updatedCountObj = { count: 0 };

        replaceTextByContent(doc, translationMap, updatedCountObj);

        alert("✅ 回填完成，共更新 " + updatedCountObj.count + " 个文本图层。\n已解决长句换行和空格差异问题，请检查并导出使用。");

    } else {
        alert("未选择 CSV 文件，操作取消。");
    }

} catch (e) {
    alert("回填发生错误：" + e.message);
}
