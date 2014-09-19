// exexcept.js

// ***** BEGIN LICENSE BLOCK *****
// Version: MPL 1.1
//
// The contents of this file are subject to the Mozilla Public License Version
// 1.1 (the "License"); you may not use this file except in compliance with
// the License. You may obtain a copy of the License at
// http://www.mozilla.org/MPL/
//
// Software distributed under the License is distributed on an "AS IS" basis,
// WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
// for the specific language governing rights and limitations under the
// License.
//
// The Original Code is the Firefox Preferences System.
//
// The Initial Developer of the Original Code is
// Ben Goodger.
// Portions created by MATSUI Nag. are Copyright (C) 2009-2011
// MATUI Nag. All Rights Reserved.
// Portions created by the Initial Developer are Copyright (C) 2005
// the Initial Developer. All Rights Reserved.
//
// Contributor(s):
//   Ben Goodger <ben@mozilla.org>
//   Blake Ross <firefox@blakeross.com>
//
// ***** END LICENSE BLOCK *****
function ExExPermission(aHost, aRawHost, aType, aPerm) {
  this.host = aHost;
  this.rawHost = aRawHost;
  this.perm = [];
  this.perm[aType] = aPerm;
}

var ExEx = {
  _permissions: [],
  _pm: Components.classes["@mozilla.org/permissionmanager;1"].getService(Components.interfaces.nsIPermissionManager),
  _as: Components.classes["@mozilla.org/atom-service;1"].getService(Components.interfaces.nsIAtomService),
  _bundle: null,
  _tree: null,
  _lastPermissionSortColumn: "",
  _lastPermissionSortAscending: false,
  _dispFull: 'userChromeJS.exexceptions.full',
  _types: [
    "cookie",
    "install",
    "image",
    "popup",
    "script",
    "document",
    "dtd",
    "object",
    "objectsubrequest",
    "ping",
    "refresh",
    "stylesheet",
    "subdocument",
    "xbl",
    "xmlhttprequest"
  ],

  _view: {
    _rowCount: 0,
    get rowCount() { 
      return this._rowCount; 
    },
    getCellText: function (aRow, aColumn) {
      if (aColumn.id == "siteCol") {
        return ExEx._permissions[aRow].rawHost;
      } else {
        var p = ExEx._permissions[aRow].perm[aColumn.id.slice(0, -3)];
        return (p) ? ExEx._getCapabilityString(p) : "";
      }
    },

    isSeparator: function(aIndex) { return false; },
    isSorted: function() { return false; },
    isContainer: function(aIndex) { return false; },
    cycleHeader: function(aColumn) {},
    getCellValue: function(aRow, aColumn) {},
    getColumnProperties: function(aColumn, aProp){},
    getImageSrc: function(aRow, aColumn) {},
    getProgressMode: function(aRow, aColumn) {},
    getRowProperties: function(aRow, aProp){},
    setTree: function(aTree){},
    getCellProperties: function(aRow, aColumn, aProperties) {
      var perm = this.getCellText(aRow, aColumn);
      switch (perm) {
      case "✕":
		if(aProperties)
			aProperties.AppendElement(ExEx._as.getAtom('disable'));
		else
			return "disable";
        return;
      case "✔":
      case "✓":
		if(aProperties)
			aProperties.AppendElement(ExEx._as.getAtom('enable'));
		else
			return "enable";
        return;
      case "✚":
      case "✝":
		if(aProperties)
			aProperties.AppendElement(ExEx._as.getAtom('noforeign'));
		else
			return "noforeign";
        return;
      case "-":
      case " -":
		if(aProperties)
			aProperties.AppendElement(ExEx._as.getAtom('default'));
		else
			return "default";
        return;
      default:
        return;
      }
    }
  },

  _getCapabilityString: function (perm) {
    var stringKey;
    switch (perm) {
    case 0:
    case undefined:
      stringKey = "default";
return "-";
      break;
    case 1:
      stringKey = "allow";
return "✔";
      break;
    case 2:
      stringKey = "deny";
return "✕";
      break;
    case 3:
      stringKey = "noforeign";
return "✚";
      break;
    case 8:
      stringKey = "session";
return "✚";
      break;
    default:
      return "";
    }
  },

  addPermission: function () {
    var textbox = document.getElementById("url");
    var host = textbox.value.replace(/^\s*([-\w]*:\/+)?/, "");

    try {
      var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
      var uri = ioService.newURI("http://"+host, null, null);
      host = uri.host;
    } catch(ex) {
      var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
      var message = "请输入正确的主机名称";
      var title = "输入的主机名称不正确";
      promptService.alert(window, title, message);
      return;
    }

    var exists = false;
    for (var i = 0; i < this._permissions.length; ++i) {
      if (this._permissions[i].rawHost == host) {
        exists = true;
        break;
      }
    }

    var rawhost = (host.charAt(0) == ".") ? host.substring(1, host.length) : host;
    var uri = ioService.newURI("http://" + rawhost, null, null);
    var remove = true;

    for (var i = 0; i < this._types.length; ++i) {
      var type = this._types[i];
      var perm = document.getElementById(type).value;
      if (perm != 0) {
        this._pm.add(uri, this._types[i], perm);
        remove = false;
      } else {
        this._pm.remove(rawhost, this._types[i]);
      }
    }

    if (exists) {
      if (remove) {
        // remove
        for (var i = 0; i < this._permissions.length; ++i) {
          if (this._permissions[i].rawHost == rawhost) {
            this._permissions.splice(i, 1);
            break;
          }
        }
      } else {
        // change
        for (var i = 0; i < this._permissions.length; ++i) {
          if (this._permissions[i].rawHost == rawhost) {
            for (var j = 0; j < this._types.length; ++j) {
              var type = this._types[j];
              var perm = document.getElementById(type).value;
              perm = (perm == "0") ? undefined : parseInt(perm);
              this._permissions[i].perm[type] = perm;
            }
            break;
          }
        }
        if (this._lastPermissionSortColumn != "rawHost") {
          this._sort(this._tree, this._view, this._permissions,
                     this._lastPermissionSortColumn,
                     this._lastPermissionSortColumn,
                     !this._lastPermissionSortAscending);
        }
      }
    } else {
      if (remove) {
        // do nothing
      } else {
        // add
        var i = this._permissions.length;
        for (var j = 0; j < this._types.length; ++j) {
          var type = this._types[j];
          var perm = document.getElementById(type).value;
          perm = (perm == "0") ? undefined : parseInt(perm);

          if (j) {
            this._permissions[i].perm[type] = perm;
          } else {
            var p = new ExExPermission(
              rawhost,
              host,
              this._types[0],
              perm);
            this._permissions.push(p);
          }
        }

        ++this._view._rowCount;
        this._tree.treeBoxObject.rowCountChanged(this._view.rowCount - 1, 1);
        this._sort(this._tree, this._view, this._permissions, 
                        this._lastPermissionSortColumn,
                        this._lastPermissionSortColumn,
                        !this._lastPermissionSortAscending);
      }
    }
    this._tree.treeBoxObject.invalidate();

    var row = -1;
    for (var i = 0; i < this._permissions.length; ++i) {
      if (this._permissions[i].rawHost == rawhost) {
        this._tree.view.selection.select(i);
        row = i;
        break;
      }
    }
    if (row >= 0) {
      this._tree.view.selection.select(row);
      textbox.value = rawhost;
    } else {
      textbox.value = "";
    }
    textbox.focus();
    this.onHostInput(textbox);
  },

  onHostInput: function (aSiteField) {
    document.getElementById("btnAdd").disabled = !aSiteField.value;
  },

  onHostKeyPress: function (aEvent) {
    if (aEvent.keyCode == KeyEvent.DOM_VK_RETURN)
      document.getElementById("btnAdd").click();
  },

  onLoad: function () {
    this._bundle = document.getElementById("bundlePreferences");

    var params = {
      introText: '您可以指定哪些网站可以加载哪些对象。键入您想要设定的站点地址，然后单击"设置”',
      windowTitle: 'ExExceptions设置',
      prefilledHost: (window.arguments) ? window.arguments[0] : ""
    };
    this.init(params);
  },

  init: function (aParams) {
    var permissionsText = document.getElementById("permissionsText");
    while (permissionsText.hasChildNodes())
      permissionsText.removeChild(permissionsText.firstChild);
    permissionsText.appendChild(document.createTextNode(aParams.introText));

    document.title = aParams.windowTitle;

    this._loadPermissions();

    var rawhost = "";
    var row = -1;
    try {
      var host = aParams.prefilledHost.replace(/^\s*([-\w]*:\/+)?/, "");
      host = (host.charAt(0) == ".") ? host.substring(1, host.length) : host;
      var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
      rawhost = ioService.newURI("http://" + host, null, null).host;
      for (var i = 0; i < this._permissions.length; ++i) {
        if (this._permissions[i].rawHost == rawhost) {
          row = i;
          break;
        }
      }
    } catch (e) {
    }

    var urlLabel = document.getElementById("urlLabel");
    var urlField = document.getElementById("url");
    urlField.value = rawhost;
    this.onHostInput(urlField);

    if (row >= 0) {
      this._tree.focus();
      this._tree.view.selection.select(row);
      this._tree.boxObject.scrollToRow(row);
    } else {
      for (var i = 0; i < this._types.length; ++i) {
        document.getElementById(this._types[i]).value = 0;
      }
      urlField.focus();
    }

  },

  onPermissionSelected: function () {
    var hasSelection = this._tree.view.selection.count > 0;
    var hasRows = this._tree.view.rowCount > 0;
    var aRow = this._tree.view.selection.currentIndex;
    if (this._permissions[aRow] != undefined) {
      document.getElementById("url").value = this._permissions[aRow].rawHost;
      var perm = this._permissions[aRow].perm;
      for (var i = 0; i < this._types.length; ++i) {
        var type = this._types[i];
        document.getElementById(type).value =
          (perm[type] == undefined) ? 0 : perm[type];
      }
      document.getElementById("btnAdd").disabled = false;
    } else {
      document.getElementById("url").value = "";
      for (var i = 0; i < this._types.length; ++i) {
        var type = this._types[i];
        document.getElementById(type).value = 0;
      }
      document.getElementById("btnAdd").disabled = true;
    }

    document.getElementById("removePermission").disabled = !hasRows || !hasSelection;
  },

  onPermissionDeleted: function () {
    if (!this._view.rowCount) {
      return;
    }
    var removedPermissions = [];
    this._deleteSelectedItems(this._tree, this._view, this._permissions, removedPermissions);
    for (var i = 0; i < removedPermissions.length; ++i) {
      var p = removedPermissions[i];
      for (var j = 0; j < this._types.length; ++j) {
        var type = this._types[j];
        this._pm.remove(p.host, type);
      }
    }
    document.getElementById("removePermission").disabled = !this._permissions.length;
  },

  onPermissionKeyPress: function (aEvent) {
    if (aEvent.keyCode == 46)
      this.onPermissionDeleted();
  },

  onPermissionSort: function (aColumn) {
    this._lastPermissionSortAscending =
      this._sort(this._tree, 
                 this._view, 
                 this._permissions,
                 aColumn, 
                 this._lastPermissionSortColumn, 
                 this._lastPermissionSortAscending);
    this._lastPermissionSortColumn = aColumn;
  },

  _loadPermissions: function () {
    this._tree = document.getElementById("permissionsTree");
    this._permissions = [];

    var count = 0;
    var enumerator = this._pm.enumerator;
    while (enumerator.hasMoreElements()) {
      var nextPermission = enumerator.getNext().QueryInterface(Components.interfaces.nsIPermission);
      this._addPermissionToList(nextPermission);
    }
   
    this._view._rowCount = this._permissions.length;

    this.toggleDisp(true);

    this._tree.treeBoxObject.view = this._view;
    this.onPermissionSort("rawHost", false);
  },

  _addPermissionToList: function (aPermission) {
    var typestr = ","+this._types.toString()+",";
    if (!typestr.match(","+aPermission.type+",")) {
      return;
    }

    var host = aPermission.host;

    for (var i = 0; i < this._permissions.length; ++i) {
      if (this._permissions[i].host == host) {
        this._permissions[i].perm[aPermission.type] = aPermission.capability;
        return;
      }
    }

    var p = new ExExPermission(
      host,
      (host.charAt(0) == ".") ? host.substring(1,host.length) : host,
      aPermission.type,
      aPermission.capability);
    this._permissions.push(p);
  },

  _deleteSelectedItems: function (aTree, aView, aItems, aDeletedItems) {
    var selection = aTree.view.selection;
    selection.selectEventsSuppressed = true;

    var rc = selection.getRangeCount();
    for (var i = 0; i < rc; ++i) {
      var min = { }; var max = { };
      selection.getRangeAt(i, min, max);
      for (var j = min.value; j <= max.value; ++j) {
        aDeletedItems.push(aItems[j]);
        aItems[j] = null;
      }
    }

    var nextSelection = 0;
    for (i = 0; i < aItems.length; ++i) {
      if (!aItems[i]) {
        var j = i;
        while (j < aItems.length && !aItems[j])
          ++j;
        aItems.splice(i, j - i);
        nextSelection = j < aView.rowCount ? j - 1 : j - 2;
        aView._rowCount -= j - i;
        aTree.treeBoxObject.rowCountChanged(i, i - j);
      }
    }

    if (aItems.length) {
      selection.select(nextSelection);
      aTree.treeBoxObject.ensureRowIsVisible(nextSelection);
      aTree.focus();
    }
    selection.selectEventsSuppressed = false;
  },

  _sort: function (aTree, aView, aDataSet, aColumn, aLastSortColumn, aLastSortAscending) {
    var ascending = (aColumn == aLastSortColumn) ? !aLastSortAscending : true;
    aDataSet.sort(function (a, b) {
      if (aColumn == "rawHost") {
        return a[aColumn].toLowerCase().localeCompare(b[aColumn].toLowerCase());
      } else {
        var aa = (a.perm[aColumn] == undefined) ? "0" : a.perm[aColumn];
        var bb = (b.perm[aColumn] == undefined) ? "0" : b.perm[aColumn];
        return (aa > bb);
      }
    });

    if (!ascending) {
      aDataSet.reverse();
    }

    aTree.view.selection.select(-1);
    aTree.view.selection.select(0);
    aTree.treeBoxObject.invalidate();
    aTree.treeBoxObject.ensureRowIsVisible(0);

    return ascending;
  },

  toggleDisp: function (aPreserve) {
    var gPref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    var f = gPref.getBoolPref(this._dispFull);
    if (aPreserve) {
      f = !f;
    }
    gPref.setBoolPref(this._dispFull, !f);

    var b = document.getElementById("toggleDisp");

    if (f) {
      b.label = b.getAttribute("morelabel");
      b.accessKey = b.getAttribute("moreaccesskey");
    } else {
      b.label = b.getAttribute("lesslabel");
      b.accessKey = b.getAttribute("lessaccesskey");
    }

    document.getElementById("midRow").setAttribute("minimal", f);
    document.getElementById("botRow").setAttribute("minimal", f);

    for (var i = 5; i < this._types.length; ++i) {
      document.getElementById(this._types[i]+"Col").setAttribute("minimal", f);
    }

    this._tree.treeBoxObject.invalidate();
  },

  importHostperm: function () {
    var nsIFilePicker = Components.interfaces.nsIFilePicker;
    var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
    fp.init(window, "Import Exceptions Settings", nsIFilePicker.modeOpen);
    fp.appendFilter("Hostperm Files","*.txt; *.1");
    fp.appendFilter("All Files","*.*");

    var rv = fp.show();
    if (rv != nsIFilePicker.returnOK && rv != nsIFilePicker.returnReplace) {
      return;
    }

    var istream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
    istream.init(fp.file, 0x01, 0444, 0);
    istream.QueryInterface(Components.interfaces.nsILineInputStream);

    var l = {};
    while (istream.readLine(l)) {
      var line = l.value;
      if (!line.length || (line.charAt(0) == '#') || (!line.match(/^host/))) {
        continue;
      }

      var linearray = line.split("\t");
      var type = linearray[1];
      var perm = linearray[2];
      var host = linearray[3];
      var rawhost = (host.charAt(0) == ".") ? host.substring(1, host.length) : host;
      var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
      var uri = ioService.newURI("http://" + rawhost, null, null);

      var typestr = ","+this._types.toString()+",";
      if (!typestr.match(","+type+",") || (perm < 0) || (perm > 8)) {
        continue;
      }

      this._pm.add(uri, type, perm);
    }

    istream.close();

    this._loadPermissions();
  },

  exportHostperm: function () {
    var nsIFilePicker = Components.interfaces.nsIFilePicker;
    var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
    fp.init(window, "Export Exceptions Settings", nsIFilePicker.modeSave);
    fp.appendFilter("Hostperm Files","*.txt; *.1");
    fp.appendFilter("All Files","*.*");

    var rv = fp.show();
    if (rv != nsIFilePicker.returnOK && rv != nsIFilePicker.returnReplace) {
      return;
    }

    var data = "# Permission File\n# Generated by ExExceptions\n\n";

    for (var i = 0; i < this._permissions.length; ++i) {
      for (var j = 0; j < this._types.length; ++j) {
        var type = this._types[j];
        if (this._permissions[i].perm[type] != undefined) {
          data = data +
            "host" + "\t" +
            type + "\t" +
            this._permissions[i].perm[type] + "\t" +
            this._permissions[i].rawHost + "\n";
        }
      }
    }    

    var ostream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);

    ostream.init(fp.file, 0x02 | 0x08 | 0x20, 0664, 0);
    ostream.write(data, data.length);
    ostream.close();
  },

  savePrefs: function () {
    window.close();
  },

  //onCommand: function() {
  //  var href = document.popupNode.href;
  //  if (typeof(href) != 'string') {
  //    href = document.commandDispatcher.focusedWindow.location.href;
  //  }
  //  window.openDialog('chrome://exexcept/content/exexcept.xul', 'ExExceptions Settings', '', href);
  //},

};
