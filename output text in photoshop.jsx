#target photoshop

function getAllTextLayers(layerSet, currentPath, data) {
    for (var i = 0; i < layerSet.layers.length; i++) {
        var layer = layerSet.layers[i];
        var layerName = layer.name;
        var fullPath = currentPath + "/" + layerName;

        if (layer.typename == "ArtLayer" && layer.kind == LayerKind.TEXT) {
            var textContentRaw = layer.textItem.contents;
            var textContent = "";

            if (typeof textContentRaw === "string") {
                textContent = textContentRaw.replace(/(\r\n|\n|\r)/gm, " ");
                if (textContent.trim) {
                    textContent = textContent.trim();
                }
            }

            var isVisible = layer.visible ? "Visible" : "Hidden";
            var isLocked = layer.allLocked ? "Locked" : "Unlocked";

            if (textContent !== "") {
                data.push([fullPath, layerName, textContent, isVisible, isLocked, ""]);
            }
        } else if (layer.typename == "LayerSet") {
            getAllTextLayers(layer, fullPath, data);
        }
    }
}

function csvSafe(str) {
    if (str.indexOf(",") != -1 || str.indexOf("\"") != -1) {
        str = str.replace(/"/g, '""');
        return '"' + str + '"';
    }
    return str;
}

try {
    var doc = app.activeDocument;
    var data = [["路径", "图层名称", "文本内容", "是否可见", "是否锁定", "翻译文本"]];
    getAllTextLayers(doc, doc.name.replace(/\.[^\.]+$/, ""), data);

    var csvFile = new File(doc.path + "/" + doc.name.replace(/\.[^\.]+$/, "") + "_完整文本导出.csv");
    csvFile.encoding = 'UTF8';
    csvFile.open('w');

    for (var i = 0; i < data.length; i++) {
        var safeLineArr = [];
        for (var j = 0; j < data[i].length; j++) {
            safeLineArr.push(csvSafe(data[i][j]));
        }
        var safeLine = safeLineArr.join(",");
        csvFile.writeln(safeLine);
    }

    csvFile.close();
    alert("✅ 已完成完整导出，位置：" + csvFile.fsName + "\n请检查翻译列并填写后回填使用。");

} catch (e) {
    alert("导出发生错误：" + e.message);
}
