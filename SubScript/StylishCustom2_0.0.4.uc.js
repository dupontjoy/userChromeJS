// ==UserScript==
// @name         Stylish Custom2
// @description  在Stylish编辑窗口中增加一些小功能
// @namespace    stylishCustom2@uc.js
// @author       Crab
// @modified    skofkyo
// @include      about:stylish-edit*
// @version      0.0.4mod.20160903
// ==/UserScript==
if (location.href.indexOf('about:stylish-edit') == 0) {
    /* 
    // 1.取消预览:  恢复 预览 至未储存时的状态(实质上是将储存前的样式再一次"预览")
    // 2.键盘输入"!"时自动补全为"!important;"
    // 3.注释按钮(ctrl+/)
    // 4.插入链结:检测当前打开的视窗和分页列出其地址链结;
    //		左键选单项直接插入对应的链结;
    //		中键或右键则插入包含@-moz-document url("")的链结
    // 5.插入文本:第一个子选单为文档规则,其馀为一些常用的文本 ，第二个子选单为备用的插入文本2 可将一些不常用的文本整理至这裡
    // 6.显示行和列，在行输入框内输入正整数回车可跳转之对应行
    */
    var stylishCustom2 = {

        _revertOldFindbar: true, //还原旧寻找列(预设关闭，若开启请将 false , 改为 true);
        AutoExternalEditor: false, //自动使用外部编辑开启(预设关闭，若开启请将 false , 改为 true);
        
        insertRules: {
            //可以在text中按格式加入一些常用的属性或文本
            text: [
                '/* AGENT_SHEET */',
                '-moz-box-ordinal-group:',
                '-moz-linear-gradient',
                'vertical-align:middle',
                'text-decoration:underline', ['::before 伪元素', '::before {\n\tcontent: ""\n}', 3], // 插入模板块数组，
                ['::after 伪元素', '::after {\n\tcontent: ""\n}', 3], // 参数 0：选单名，
                // 参数 1：插入内容，其中\n代表换行符，\t为制表符（tab）。
                // 参数 2：插入内容后光标所在对应内容倒数位置，可忽略预设为0，即最末
            ],
            text2: [
                '/* AGENT_SHEET */',
                '-moz-box-ordinal-group:',
                '-moz-linear-gradient',
                'vertical-align:middle',
                'text-decoration:underline', ['::before 伪元素', '::before {\n\tcontent: ""\n}', 3], // 插入模板块数组，
                ['::after 伪元素', '::after {\n\tcontent: ""\n}', 3], // 参数 0：选单名，
                // 参数 1：插入内容，其中\n代表换行符，\t为制表符（tab）。
                // 参数 2：插入内容后光标所在对应内容倒数位置，可忽略预设为0，即最末
            ],
            domRules: {
                'url("")': '@-moz-document url(""){\n\n}',
                'url-prefix("")': '@-moz-document url-prefix(""){\n\n}',
                'domain("")': '@-moz-document domain(""){\n\n}',
                'regexp("")': '@-moz-document regexp(""){\n\n}'
            }
        },

        locale: ['en-US', 'zh-CN', 'zh-TW'].indexOf(Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch).getCharPref('general.useragent.locale')),

        _localeText: {
            unperview: ['UnPerview', '取消预览', '取消预览'],
            lineNumber: ['Ln: ', '行: ', '行: '],
            colNumber: [',Col: ', ',列: ', ',列: '],
            comment: ['Comment', '注释', '注释'],
            save: ['Save', '保存', '储存'],
            insertURL: ['Insert URL', '插入链接', '插入链结'],
            insertText: ['Insert Text', '插入文本', '插入文本'],
            saveAndClose: ['Save & Close', '保存并关闭', '保存并关闭'],
            documentRules: ['Document Rule', '文档规则', '文档规则'],
            chromeMenu: ['Chrome URL', 'Chrome 路径', 'Chrome 路径'],
        },

        localeText: function(name) {
            return this._localeText[name][this.locale == -1 ? 0 : this.locale];
        },

        oldPreview: null,
        init: function() {
            if ($('stylishCustomToolbar') || !sourceEditor || sourceEditorType == 'textarea') return;
            eval('save=' + save.toString().replace(/(?=return true;\s+}$)/, 'if(typeof(stylishCustom2)!=\'undefined\'){stylishCustom2.oldPreview = codeElementWrapper.value;document.getElementById(\'unperview\').disabled = true;}\n'));
            eval('enableSave=' + enableSave.toString().replace(/(?=\}$)/, 'if(typeof(stylishCustom2)!=\'undefined\'){document.getElementById(\'saveAndClose\').disabled = !enabled;}\n'));
            eval('preview=' + preview.toString().replace('setTimeout', 'if(typeof(stylishCustom2)!=\'undefined\'){document.getElementById(\'unperview\').disabled = false;}$&'));

            this.setToolButtons();
            this.setShortcuts();
            this.oldPreview = codeElementWrapper.value;
            this.revertOldFindbar();
            sourceEditor.on('cursorActivity', this.setLineAndcolNum.bind(this));
            var ins = $('comment');
            [$('ExternalEditor'), $('Editorimportant')].forEach(function(n) {
                ins.parentNode.insertBefore(n, ins.nextSibling);
            });
            if (this.AutoExternalEditor) $('ExternalEditor').click();
        },

        setToolButtons: function() {
            var _et = $('editor-tools'),
                cE = this.createElement,
                editortools = cE('hbox', {
                    id: 'stylishCustomToolbar'
                }, [_et.parentNode, _et.nextSibling]),
                insertMenupopup = $('insert-data-uri').parentNode;
            //工具列按钮

            //保存并关闭按钮
            cE('button', {
                id: 'saveAndClose',
                class: 'devtools-toolbarbutton',
                label: this.localeText('saveAndClose'),
                disabled: true,
                onclick: function() {
                    'save' in window && window.save() && codeElementWrapper.value && window.nameE.value && window.setTimeout(window.close, 200);
                }
            }, editortools);
            //预览按钮
            this.unperview = cE('button', {
                id: 'unperview',
                class: 'devtools-toolbarbutton',
                label: this.localeText('unperview'),
                onclick: this.unperview.bind(this)
            }, editortools);
            //注释按钮
            cE('button', {
                id: 'comment',
                class: 'devtools-toolbarbutton',
                label: this.localeText('comment'),
                onclick: this.setComment
            }, editortools);

            //cE('spacer', {
            //    flex: '1'
            //}, editortools);
            cE('label', {
                style: 'max-height: 20px; margin:7px 0 4px 0;',
                value: this.localeText('lineNumber')
            }, _et);
            (this.lineNumber = cE('textbox', {
                id: 'lineNumber',
                class: 'devtools-textinput',
                style: 'padding: 0; width:40px; max-height: 20px; margin:5px 0;',
                onkeydown: this.goToLine.bind(this)
            }, _et)).value = 1;
            this.colNumber = cE('label', {
                id: 'colNumber',
                style: 'width:50px; max-height: 20px; margin:7px 0 4px 2px;',
                value: this.localeText('colNumber') + '0'
            }, _et);
            //插入链接选项
            cE('menupopup', {
                    onpopupshowing: 'stylishCustom2.showDocumentList(event,false);'
                },
                cE('menu', {
                    id: 'insertURLMenu',
                    label: this.localeText('insertURL')
                }, insertMenupopup));
            //插入文本选项
            var insertTextMenupopup = cE('menupopup', {},
                cE('menu', {
                    id: 'insertTextMenu',
                    label: this.localeText('insertText')
                }, insertMenupopup));
            //插入文档规则
            var documentRules = cE('menupopup', {}, cE('menu', {
                id: 'documentRules',
                label: this.localeText('documentRules')
            }, insertTextMenupopup));
            //插入文本选项2
            var insertTextMenu2 = cE('menupopup', {}, cE('menu', {
                id: 'insertTextMenu2',
                label: this.localeText('insertText') + '2'
            }, insertTextMenupopup));
            var {
                text,
                text2,
                domRules
            } = this.insertRules;
            for (var i in domRules) {
                cE('menuitem', {
                    label: i,
                    onclick: this.insertString.bind(null, domRules[i], 6)
                }, documentRules);
            }
            for (var i in text2) {
                cE('menuitem', {
                    label: Array.isArray(text2[i]) ? text2[i][0] : text2[i],
                    onclick: this.insertString.bind(null, text2[i])
                }, insertTextMenu2);
            }
            cE('menuseparator', {}, insertTextMenupopup);
            for (var i in text) {
                cE('menuitem', {
                    label: Array.isArray(text[i]) ? text[i][0] : text[i],
                    onclick: this.insertString.bind(null, text[i])
                }, insertTextMenupopup);
            }

        },

        setLineAndcolNum: function() {
            var {
                line,
                ch
            } = sourceEditor.getCursor();
            this.lineNumber.value = line + 1;
            this.colNumber.value = this.localeText('colNumber') + ch;
        },

        goToLine: function(event) {
            if (event.keyCode == 13 || event.keyCode == 108) {
                event.preventDefault();
                var l = parseInt(event.target.value);
                if (isNaN(l) || l <= 0) return;
                sourceEditor.setCursor({
                    line: l - 1,
                    ch: 0
                });
                sourceEditor.focus();
            }
        },

        unperview: function() {
            style.name = nameE.value;
            style.code = stylishCustom2.oldPreview;
            this.unperview.setAttribute('disabled', true);
            $('preview-button').removeAttribute('disabled');
            $('errors').style.display = 'none';
            setTimeout(function() {
                style.setPreview(true);
            }, 50);
        },

        setComment: function() {
            var selText = sourceEditor.getSelection();
            if (!selText) return;
            var [from, to] = [sourceEditor.getCursor('start'), sourceEditor.getCursor('end')],
            re = /(^[\W\s]*?\/\*)((?:(?!\/\*|\*\/)[\s\S])*?)(\*\/[\W\s]*?$)/;
            if (!re.test(selText)) {
                if (!/\/\*|\*\//.test(selText)) {
                    sourceEditor.replaceSelection('/*' + selText + '*/');
                    sourceEditor.setSelection(from, {
                        line: to.line,
                        ch: to.ch + (from.line == to.line ? 4 : 2)
                    });
                }
            } else {
                var reg = selText.match(re);
                sourceEditor.replaceSelection(reg[1].replace(/\/\*$/g, '') + reg[2] + reg[3].replace(/^\*\//g, ''));
                sourceEditor.setSelection(from, {
                    line: to.line,
                    ch: to.ch - (from.line == to.line ? 4 : 2)
                });
            }
            sourceEditor.focus();
        },

        setShortcuts: function() {
            sourceEditor.config.extraKeys['Shift-1'] = function(e) {
                sourceEditor.replaceSelection(' !important;');
            };
            sourceEditor.config.extraKeys['Ctrl-/'] = this.setComment.bind(this);
        },

        insertString: function(str, range) {
            if (Array.isArray(str)) {
                sourceEditor.replaceSelection(str[1]);
                range = str[2] || range || 0;
            } else {
                sourceEditor.replaceSelection(str);
            }
            if (range)
                sourceEditor.setCursor(sourceEditor.getPosition(sourceEditor.getOffset(sourceEditor.getCursor('end')) - range));
            sourceEditor.focus();
        },

        revertOldFindbar: function() {
            if (!this._revertOldFindbar) return;
            Object.defineProperty(codeElementWrapper, 'scrollElement', {
                get: function() {
                    if (sourceEditorType == 'sourceeditor')
                        return sourceEditor.container.contentDocument.getElementsByClassName('CodeMirror-code')[0];
                    return sourceEditor.inputField;
                }
            });
            finder.requestMatchesCount = function() {};
            var findBar = $('findbar');
            Object.defineProperty(findBar.browser, '_lastSearchString', {
                get: function() finder.searchString
            });
            findBar.browser.finder = finder;
            findBar.open();
        },

        showDocumentList: function(event, isChrome) {
            var menu = event.target,
                ww = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService(Components.interfaces.nsIWindowMediator),
                windows = ww.getXULWindowEnumerator(null),
                docs = [],
                cE = this.createElement;
            while (windows.hasMoreElements()) {
                try {
                    var windowDocShell = windows.getNext().QueryInterface(Components.interfaces.nsIXULWindow).docShell;
                    this.appendContainedDocuments(docs, windowDocShell, isChrome ? Components.interfaces.nsIDocShellTreeItem.typeChrome : Components.interfaces.nsIDocShellTreeItem.typeContent);
                } catch (ex) {
                    Components.utils.reportError(ex);
                }
            }
            this.emptyChildren(menu);
            if (!isChrome && menu.id != 'chromeMenu') {
                cE('menuseparator', {},
                    cE('menupopup', {},
                        cE('menu', {
                            id: 'chromeMenu',
                            label: this.localeText('chromeMenu'),
                            onpopupshowing: 'event.stopPropagation();stylishCustom2.showDocumentList(event,true);'
                        }, menu)
                    ).parentNode.parentNode);
            }
            if (!docs.length) {
                cE('menuitem', {
                    label: '(None)',
                    disabled: true
                }, menu);
            } else {
                for (var i = 0; i < docs.length; i++) {
                    this.addMenuItem(menu, docs[i]);
                }
            }
        },

        appendContainedDocuments: function(array, docShell, type) {
            var containedDocShells = docShell.getDocShellEnumerator(type, Components.interfaces.nsIDocShell.ENUMERATE_FORWARDS);
            while (containedDocShells.hasMoreElements()) {
                try {
                    var childDoc = containedDocShells.getNext().QueryInterface(Components.interfaces.nsIDocShell)
                        .contentViewer.DOMDocument;
                    if (type == 0 && docShell.contentViewer.DOMDocument.location.href == childDoc.location.href && childDoc.location.href != 'about:blank') {
                        array.push(childDoc);
                    }
                    if (type == 1 && docShell.contentViewer.DOMDocument.location.href != childDoc.location.href && (childDoc.location.href != 'about:blank' || childDoc.URL == childDoc.baseURI)) {
                        if (childDoc.location.href == 'about:blank' && childDoc.URL != childDoc.baseURI || (childDoc.defaultView && childDoc.defaultView.frameElement != null))
                            continue;
                        array.push(childDoc);
                    }
                } catch (ex) {
                    console.log(ex + '\n');
                }
            }
        },

        emptyChildren: function(node) {
            while (node.hasChildNodes()) {
                node.removeChild(node.lastChild);
            }
        },

        createElement: function(name, attr, parent) {
            var e = document.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', name);
            if (attr) {
                for (var i in attr) {
                    if (typeof attr[i] == 'function' || (i == 'value' && (name == 'textbox' || name == 'menuitem')))
                        e[i] = attr[i];
                    else
                        e.setAttribute(i, attr[i]);
                }
            }
            if (parent) {
                if (parent instanceof Array) {
                    parent[0].insertBefore(e, parent[1]);
                } else {
                    parent.appendChild(e);
                }
            }
            return e;
        },

        addMenuItem: function(parent, doc) {
            this.createElement('menuitem', {
                label: doc.title || doc.location.href,
                tooltiptext: doc.location.href,
                onclick: function(e) {
                    if (e.button != 0)
                        stylishCustom2.insertString('@-moz-document url("' + e.target.getAttribute('tooltiptext') + '"){\n\n}', 2);
                    else
                        stylishCustom2.insertString(e.target.getAttribute('tooltiptext'));
                    stylishCustom2.closeMenus(this);
                }
            }, parent);
        },

        closeMenus: function(node) {
            if ('tagName' in node) {
                if (node.namespaceURI == 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul' && (node.tagName == 'menupopup' || node.tagName == 'popup')) node.hidePopup();
                this.closeMenus(node.parentNode);
            }
        }
    }

    setTimeout(stylishCustom2.init.bind(stylishCustom2), 300);

    function $(id) {
        return document.getElementById(id);
    }

    (function winhook(aWindow) {
        // get the checkbox
        var checkbox = aWindow.$("wrap-lines");
        var locale = ['en-US', 'zh-CN', 'zh-TW'].indexOf(Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch).getCharPref('general.useragent.locale'));
        var _localeText = {
            ExternalEditor: ['Editor', '外部编辑', '外部編輯'],
            ColorPicker: ['Color Picker', '选色器', '選色器']
        };
        function localeText(name) {
            return _localeText[name][locale == -1 ? 0 : locale];
        }
        if (aWindow.$("internal-code")) { //ver 1.0 のとき color picker と importantを入れる

            //color picker///////////////////////////////////////////////////////////////////////////////////
            var picker = aWindow.document.createElement("colorpicker");
            var getColor = function() {
                if (arguments.callee.caller.name != 'onchange') return; //why is this necessary?
                var color = this.getAttribute("color");
                stylishCustom2.insertString(color);
            }
            picker.getColor = getColor;
            picker.setAttribute("label", localeText('ColorPicker'));
            picker.setAttribute("type", 'button');
            picker.setAttribute("style", 'margin-left: 4px;');
            picker.setAttribute("onchange", "this.getColor();");
            checkbox.parentNode.insertBefore(picker, checkbox);

            //External Editor///////////////////////////////////////////////////////////////////////////////////
            //if(typeof ItsAllText != 'undefined') return;
            // add External Editor button

            var button = aWindow.document.createElement("button");
            button.setAttribute("id", "ExternalEditor");
            button.setAttribute("class", "devtools-toolbarbutton");
            button.setAttribute("label", localeText('ExternalEditor'));
            button.setAttribute("accesskey", "T");
            checkbox.parentNode.insertBefore(button, checkbox);

            // add click event to button
            button.addEventListener("click", function() {
                if (aWindow.sourceEditorType == "orion" || aWindow.sourceEditorType == "sourceeditor") {
                    var textarea = aWindow.$("sourceeditor");
                    editinit();
                    edittarget(textarea);
                } else {
                    var textarea = aWindow.$("code");
                    if (!textarea)
                        textarea = aWindow.$("internal-code");
                    try {
                        editinit();
                        edittarget(textarea);
                    } catch (e) {}
                }
            }, false);
            //!important////////////////////////////////////////////////////////////////////////////////////////
            // create a button and place it
            var button = aWindow.document.createElement("button");
            button.setAttribute("id", "Editorimportant");
            button.setAttribute("class", "devtools-toolbarbutton");
            button.setAttribute("label", "!important");
            checkbox.parentNode.insertBefore(button, checkbox);

            // add click event to button
            button.addEventListener("click", function() {
                if (aWindow.sourceEditorType == "orion" || aWindow.sourceEditorType == "sourceeditor") {
                    var codeElement = aWindow.$("sourceeditor");
                    var code = aWindow.sourceEditor.getText();
                } else {
                    var codeElement = aWindow.$("code");
                    if (!codeElement)
                        codeElement = aWindow.$("internal-code");
                    var box = codeElement.mInputField;
                    var scroll = [box.scrollTop, box.scrollLeft];
                    var code = codeElement.value;
                }

                code = code.replace(/\s*?!\s*?important/gi, "") // remove existing !important's to simplify things
                    //change ;base64 to __base64__ so we don't match it on the ; when we split declarations
                code = code.replace(/;base64/g, "__base64__");
                var declarationBlocks = code.match(/\{[^\{\}]*[\}]/g);
                var declarations = [];
                declarationBlocks.forEach(function(declarationBlock) {
                    declarations = declarations.concat(declarationBlock.split(/;/));
                });
                //make sure everything is really a declaration, and make sure it's not already !important
                declarations = declarations.filter(function(declaration) {
                    return /[A-Za-z0-9-]+\s*:\s*[^};]+/.test(declaration) && !/!important/.test(declaration);
                });
                //strip out any extra stuff like brackets and whitespace
                declarations = declarations.map(function(declaration) {
                    return declaration.match(/[A-Za-z0-9-]+\s*:\s*[^};]+/)[0].replace(/\s+$/, "");
                });
                //replace them with "hashes" to avoid a problem with multiple identical name/value pairs
                var replacements = [];
                declarations.forEach(function(declaration) {
                    var replacement = {
                        hash: Math.random(),
                        value: declaration
                    };
                    replacements.push(replacement);
                    code = code.replace(replacement.value, replacement.hash);
                });
                replacements.forEach(function(replacement) {
                    code = code.replace(replacement.hash, replacement.value + " !important");
                });
                //put ;base64 back
                code = code.replace(/__base64__/g, ";base64");
                if (aWindow.sourceEditorType == "orion" || aWindow.sourceEditorType == "sourceeditor") {
                    aWindow.sourceEditor.setText(code);
                } else {
                    codeElement.value = code;
                    enableSave(true);
                    enablePreview(true);
                    enableCheckForErrors(true);
                    box.scrollTop = scroll[0];
                    box.scrollLeft = scroll[1];
                }
            }, false);
        }

        ////Extarnal Edittor functions///////////////////////////////////////////////////////////////////////

        //Extarnal Edittor functions
        //
        var _editor, _tmpdir = null, _dir_separator, _os;
        var _ext, _encode, _target = [];

        function editinit() {
            if (window.navigator.platform.toLowerCase().indexOf("win") != -1) {
                _editor = Services.prefs.getCharPref("view_source.editor.path");
                //_editor = "C:\\progra~1\\hidemaru\\hidemaru.exe"; /* windows */
                _dir_separator = '\\'; /* windows */
                _os = 'win'; /* windows */
            } else {
                _editor = "/bin/vi"; /* unix */
                _dir_separator = '/'; /* unix */
                _os = 'unix'; /* unix */
            }
            _ext = "css";
            _encode = 'UTF-8';
            _target = [];

            window.addEventListener("unload", function() {
                edituninit();
            }, false);
            aWindow.addEventListener("unload", function() {
                aWindow.document.removeEventListener("focus", function() {
                    checkfocus_window();
                }, true);
            }, false);
        }

        function edituninit() {
            if (_tmpdir == null) return;
            var windowType = "navigator:browser";
            var windowManager = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService();
            var windowManagerInterface = windowManager.QueryInterface(Components.interfaces.nsIWindowMediator);
            var enumerator = windowManagerInterface.getEnumerator(windowType);
            if (enumerator.hasMoreElements()) {
                return;
            }
            var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
            file.initWithPath(_tmpdir);
            var entries = file.directoryEntries;
            while (entries.hasMoreElements()) {
                var entry = entries.getNext().QueryInterface(Components.interfaces.nsIFile);
                if (/^ucjs.textarea\./i.test(entry.leafName)) {
                    try {
                        entry.remove(false);
                    } catch (e) {}
                }
            }

            try {
                if (file.exists() == true) file.remove(false);
            } catch (e) {}
            _tmpdir = null;
        }

        function checkfocus_window() {
            var target, filename, timestamp, encode, file, inst, sstream, utf, textBoxText;
            if (_target.length <= 0) return;
            file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
            istr = Components.classes['@mozilla.org/network/file-input-stream;1'].createInstance(Components.interfaces.nsIFileInputStream);
            // FileInputStream's read is [noscript].
            sstream = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);
            utf = Components.classes['@mozilla.org/intl/utf8converterservice;1'].createInstance(Components.interfaces.nsIUTF8ConverterService);

            for (var i = 0, len = _target.length; i < len; i++) {
                target = _target[i];
                if (!target.hasAttribute("filename")) continue;
                filename = target.getAttribute("filename");
                timestamp = target.getAttribute("timestamp");
                file.initWithPath(filename);
                if (!file.exists() || !file.isReadable()) continue;
                if (file.lastModifiedTime <= timestamp) continue;

                target.setAttribute("timestamp", file.lastModifiedTime);

                istr.init(file, 1, 0x400, false);
                sstream.init(istr);

                textBoxText = sstream.read(sstream.available());
                encode = target.getAttribute("encode");
                if (aWindow.sourceEditorType == "orion" || aWindow.sourceEditorType == "sourceeditor") {
                    aWindow.sourceEditor.setText(utf.convertStringToUTF8(textBoxText, encode, true));
                } else {
                    if (textBoxText.length)
                        target.value = utf.convertStringToUTF8(textBoxText, encode, true);
                    else
                        target.value = "";
                }
                enableSave(true);
                enablePreview(true);
                enableCheckForErrors(true);

                sstream.close();
                istr.close();
                try {
                    file.remove(false);
                } catch (e) {}
            }
        }

        function editfile(target, filename) {
            // Figure out what editor to use.
            var editor = _editor;
            var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
            file.initWithPath(editor);
            if (!file.exists()) {
                alert("Error_invalid_Editor_file");
                return false;
            }
            if (!file.isExecutable()) {
                alert("Error_Editor_not_executable");
                return false;
            }
            target.setAttribute("filename", filename);
            target.setAttribute("timestamp", file.lastModifiedTime);

            // Run the editor.
            var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
            process.init(file);
            var args = [filename];
            process.run(false, args, args.length); // don't block
            aWindow.document.addEventListener("focus", function() {
                checkfocus_window();
            }, true);
            return true;
        }

        function edittarget(target) {
            if (aWindow.sourceEditorType == "orion" || aWindow.sourceEditorType == "sourceeditor") {
                var textBoxText = aWindow.sourceEditor.getText();
            } else {
                var textBoxText = target.value;
            }
            // Get filename.
            var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
            if (target.hasAttribute("filename")) {
                var filename = target.getAttribute("filename");
                file.initWithPath(filename);
                try {
                    if (file.exists() == true) file.remove(false);
                } catch (e) {}
            } else {
                var filename = TmpFilenameTextarea();
            }
            file.initWithPath(filename);
            file.create(file.NORMAL_FILE_TYPE, parseInt(600, 8));

            // Write the data to the file.
            var ostr = Components.classes['@mozilla.org/network/file-output-stream;1'].createInstance(Components.interfaces.nsIFileOutputStream);
            ostr.init(file, 2, 0x200, false);

            if (navigator.platform == "Win32") {
                // Convert Unix newlines to standard network newlines.
                textBoxText = textBoxText.replace(/\n/g, "\r\n");
            }
            var conv = Components.classes['@mozilla.org/intl/saveascharset;1'].createInstance(Components.interfaces.nsISaveAsCharset);
            try {
                conv.Init(_encode, 0, 0);
                textBoxText = conv.Convert(textBoxText);
            } catch (e) {
                textBoxText = "";
            }
            ostr.write(textBoxText, textBoxText.length);

            ostr.flush();
            ostr.close();

            // setup target info
            target.setAttribute("encode", _encode);

            // Edit the file.
            if (editfile(target, file.path)) {
                _target.push(target); // Editting target array
            }
        }

        //Compose temporary filename out of
        //    - tmpdir setting
        //    - document url
        //    - textarea name
        //    - ext suffix
        function TmpFilenameTextarea() {
            var TmpFilename;
            _tmpdir = gettmpDir();
            do {
                TmpFilename = _tmpdir + _dir_separator + "ucjs.textarea." + Math.floor(Math.random() * 100000) + "." + _ext;
            } while (!ExistsFile(TmpFilename))
            return TmpFilename;
        }

        //Function returns true if given filename exists
        function ExistsFile(filename) {
            try {
                var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
                file.initWithPath(filename);
                return true;
            } catch (e) {
                return false;
            }
        }
        /**
         * Returns the directory where we put files to edit.
         * @returns nsILocalFile The location where we should write editable files.
         */
        function gettmpDir() {
            /* Where is the directory that we use. */
            var fobj = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile);
            fobj.append('Temp_ExternalEditor');
            if (!fobj.exists()) {
                fobj.create(Components.interfaces.nsIFile.DIRECTORY_TYPE,
                    parseInt('0700', 8));
            }
            if (!fobj.isDirectory()) {
                alert('Having a problem finding or creating directory: ' + fobj.path);
            }
            return fobj.path;
        }
    })(window);
}