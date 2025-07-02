# photoshop-text-translater
How can we translate text in Photoshop? However, Photoshop doesn't export text layers directly, so I think we can use this method.
本项目包含用于在 **Photoshop 内快速、高效完成电商/品牌素材多语言翻译回填**的 ExtendScript 脚本，支持长句、含英文逗号内容，避免回填丢失，适用于长期稳定产线使用。

This project contains **ExtendScript scripts for quickly and efficiently completing multi-language translation fill for e-commerce/brand materials within Photoshop**. It supports long sentences, content containing commas, and prevents fill loss, suitable for long-term stable production use.

---

## ✨ 功能 Features

✅ **完整导出 PSD 所有文本图层，用于批量翻译**  
✅ **支持回填含换行、长句、含英文逗号的翻译文本**  
✅ **在 Photoshop 内直接执行，无需离开工作流**  
✅ **稳定闭环多语言产线翻译效率**

✅ **Fully export all text layers in PSD for batch translation**  
✅ **Supports filling translated text with line breaks, long sentences, and commas**  
✅ **Execute directly within Photoshop without leaving workflow**  
✅ **Stably close the loop on multi-language production line translation efficiency**

---

## 🛠️ 使用方法 Usage

### 1️⃣ 导出文本以便翻译 Export text for translation

在 Photoshop 中打开 PSD，执行：
**`Export_PSD_Text_Full_Check.jsx`**

- 将完整导出所有文本图层（含路径、图层名、文本内容）
- 自动去除空白、合并换行，便于翻译
- 生成的 CSV 可直接用于翻译填写

Open the PSD in Photoshop and run:
**`Export_PSD_Text_Full_Check.jsx`**

- Fully export all text layers (including path, layer name, text content)
- Automatically remove blanks and merge line breaks for easy translation
- The generated CSV can be used directly for translation filling

---

### 2️⃣ 回填翻译文本 Fill translated text

完成翻译后，填写在 CSV 的翻译列（保持原“文本内容”不变）。

After translation, fill in the translation column in the CSV (keep the original "text content" unchanged).

在 Photoshop 中打开 PSD，执行：
**`Import_PSD_Text_ByContent_CSVSafe.jsx`**

- 自动匹配“文本内容”并用“翻译文本”进行回填
- 支持含英文逗号、长句及换行文本稳定匹配

Open the PSD in Photoshop and run:
**`Import_PSD_Text_ByContent_CSVSafe.jsx`**

- Automatically match "text content" and fill with "translated text"
- Supports stable matching of text with commas, long sentences, and line breaks

---

## ⚠️ 注意事项 Notes

- 请使用 **UTF-8 无 BOM** 编码保存 CSV（推荐 LibreOffice / Excel）
- 请保持 CSV 中英文逗号和引号完整，避免 WPS 等工具错误保存
- 推荐在回填前使用 VS Code / Sublime 检查 CSV 编码

- Please save CSV with **UTF-8 without BOM** encoding (LibreOffice / Excel recommended)
- Keep commas and quotes intact in CSV to avoid incorrect saving by tools like WPS
- It is recommended to check CSV encoding with VS Code / Sublime before filling back

---

## 📧 联系 Contact

如有问题，可通过 Issues 提出或联系开发者。

If you have any questions, please raise an issue or contact the developer.
