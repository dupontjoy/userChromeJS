// ==UserScript==
// @name        UCJSToolkit
// @author      80
// @version     0.42 mod3 2009/01/30 07:00 Alice0775
// @description library for userChrome.js scripts.
// @include     main
// ==/UserScript==

// userChrome.js 用のライブラリ 使い方は注釈文にて．
// クラスなので new UCJSToolkit(); でオブジェクトを作ってから．
// 各メソッドはオブジェクトの外に持ち出したり，別のオブジェクト下に置いても動くと思う．一応そう言う設計にした．
var UCJSToolkit = (function(){
    const Cc = Components.classes;
    const Ci = Components.interfaces;
    const Cr = Components.results;

    const IO_SERVICE         = Cc['@mozilla.org/network/io-service;1'].getService(Ci.nsIIOService);
    const SUBSCRIPT_LOADER   = Cc['@mozilla.org/moz/jssubscript-loader;1'].getService(Ci.mozIJSSubScriptLoader);
    const CONSOLE_SERVICE    = Cc['@mozilla.org/consoleservice;1'].getService(Ci.nsIConsoleService);
    const UNICODE_CONVERTER  = Cc['@mozilla.org/intl/scriptableunicodeconverter'].createInstance(Ci.nsIScriptableUnicodeConverter);
    const REGEX_META_START   = /^\s*[/][/]\s*==UserScript==/;
    const REGEX_META_END     = /^\s*[/][/]\s*==[/]UserScript==/;
    const REGEX_META_DATA    = /^\s*[/][/]\s*@([a-zA-Z][\w-]*)\s+(.+?)\s*$/;

    function Toolkit(){
        /^[^@]*@(.*?)[^/]+:\d+$/(Error().stack.split('\n')[2]);
        var p0 = RegExp.$1;
        var p1 = Error().fileName.replace(/[^/]+$/,'').split(' -> ').pop();
        this.SCRIPT_PATH = (p0 == p1) ? [p0] : [p0,p1];
        this.ERROR       = null;
        var _this        = this;
        var errorDisplay = 2;

        // file で指定したファイルを読み込んで文字列で返す．
        // file に指定できるのは URL かローカルパスの文字列．或いは nsIFile オブジェクト．
        // 成功で真を返し，失敗すると偽を返し，プロパティ ERROR にエラー情報が入る．
        this.loadFile = function(file){
            try{
                var stream;
                switch(_this._typeof(file)){
                  case 'file':
                    stream = Cc['@mozilla.org/network/file-input-stream;1'].createInstance(Ci.nsIFileInputStream);
                    stream.init(file,1,0,false);
                    break;
                  case 'string':
                    if(/^[a-z]+:[/][/]/i.test(file)) stream = IO_SERVICE.newChannelFromURI(IO_SERVICE.newURI(file,null,null)).open();
                    else{
                        var f = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
                        f.initWithPath(file);
                        stream = Cc['@mozilla.org/network/file-input-stream;1'].createInstance(Ci.nsIFileInputStream);
                        stream.init(f,1,0,false);
                    }
                    break;
                  default: throw 'unknown type';
                }

                var ss = Cc['@mozilla.org/scriptableinputstream;1'].createInstance(Ci.nsIScriptableInputStream);
                ss.init(stream);
                var data = ss.read(ss.available());
                ss.close();
                stream.close();
                return data;
            }
            catch(e){ _this.ERROR = e; return null; }
        };

        // buf(文字列)を file で指定したファイルに書き出す．
        // file に指定できるのは URL かローカルパスの文字列．或いは nsIFile オブジェクト．
        // 成功で真を返し，失敗すると偽を返し，プロパティ ERROR にエラー情報が入る．
        this.saveFile = function(file,buf){
            try{
                var f;
                switch(_this._typeof(file)){
                  case 'file': f = file; break;
                  case 'string':
                    if(/^[a-z]+:[/][/]/i.test(file)) f = IO_SERVICE.getProtocolHandler('file').QueryInterface(Ci.nsIFileProtocolHandler).getFileFromURLSpec(file);
                    else{
                        var f = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
                        f.initWithPath(file);
                    }
                    break;
                  default: throw 'unknown type';
                }

                var stream = Cc['@mozilla.org/network/file-output-stream;1'].createInstance(Ci.nsIFileOutputStream);
                if(f.exists()) f.remove(true);
                f.create(f.NORMAL_FILE_TYPE,0666);
                stream.init(f,2,0x200,false);
                stream.write(buf,buf.length);
                stream.close();
                return true;
            }
            catch(e){ _this.ERROR = e; return false; }
        };

        // name(文字列)で指定した名前のテンポラリファイルを作成し，そのnsIFile オブジェクトを返す．
        // 失敗すると null を返し，プロパティ ERROR にエラー情報が入る．
        this.createTMPFile = function(name){
            try{
                var file = Cc['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get('TmpD',Ci.nsIFile);
                file.append(name);
                file.createUnique(Ci.nsIFile.NORMAL_FILE_TYPE,0664);
                return file;
            }
            catch(e){ _this.ERROR = e; return null; }
        };

        // 文字列 src の中のメタデータを連想配列 meta に置き換えた物を返す．
        // meta の仕様は readMeta で返されるものと同じ．
        // 改行コードが全て「\n」になる副作用がある．
        this.replaceMeta = function(src,meta){
            var m = [];
            for(var k in meta){
                var a = meta[k].split('\n');
                for(var i = 0,max = a.length;i < max;++i) m.push('// @' + k + ' ' + a[i]);
            }

            var a    = src.split(/\r\n|\r|\n/);
            var data = [];
            for(var i = 0,max = a.length;i < max;++i){
                if(REGEX_META_START.test(a[i])){
                    for(;i < max;++i){
                        if(REGEX_META_END.test(a[i])){ data.push(m.join('\n')); break; }
                        else if(!REGEX_META_DATA(a[i])) data.push(a[i]);
                    }
                    for(;i < max;++i) data.push(a[i]);
                    break;
                }
                else data.push(a[i]);
            }
            return data.join('\n');
        };

        // filename(文字列)の指すファイルをオブジェクト scope 内で実行する．
        // filename は相対パス．一致するファイルをこの関数の実行したディレクトリと，SCRIPT_PATH の中から探す．
        // 成功で真を返し，失敗すると偽を返し，プロパティ ERROR にエラー情報が入る．
        this.require = function(filename,scope){
            /^[^@]*@(.*?)[^/]+:\d+$/(Error().stack.split('\n')[2]);
            var cur  = RegExp.$1;
            var path = (/^[a-z]+:[/][/]/i.test(filename)) ? [''] : [cur].concat(_this.SCRIPT_PATH);
            var scp  = scope || ((this === _this) ? undefined : this);
            for(var i = 0;i < path.length;++i){
                if(!_this.isFileExists(path[i] + filename)) continue;
                try{ SUBSCRIPT_LOADER.loadSubScript(path[i] + filename,scp); return true; }
                catch(e){ this.ERROR = e; return false; }
            }
            _this.ERROR = new Error('file not found.');
            return false;
        };

        // エラーメッセージを出力する．
        // name はエラーのヘッダに付加して出力される文字列．err は Error オブジェクトかエラーメッセージの文字列．
        // display は出力先の指定．1 : dump / 2 : エラーコンソール / 4: alert を論理和を用いて指定可能．省略可．
        this.errorMessage = function(name,err,display){
            var disp = display || errorDisplay;
            /^[^@]*@.*?([^/]+):\d+$/(Error().stack.split('\n')[2]);
            var head = RegExp.$1 + ' / ' + name;
            function _stack(stack){
                if(typeof(stack) != 'string') return '';
                var c = 0;
                return stack.split('\n').map(function(v){
                    /^([^@]*)@(.*?):(\d+)$/(v);
                    if(!RegExp.$1 && !RegExp.$2) return '-------- stack ' + c++ + ' - n/a\n';
                    if(!RegExp.$1) return '-------- stack ' + c++ + '\nfile : ' + RegExp.$2 + ' - line : ' + RegExp.$3 + '\n';
                    if(!RegExp.$2) return '-------- stack ' + c++ + '\nfunction : ' + RegExp.$1 + '\n';
                    return '-------- stack ' + c++ + '\nfunction : ' + RegExp.$1 + '\nfile : ' + RegExp.$2 + ' - line : ' + RegExp.$3 + '\n';
                }).join('');
            };
            try{
                if(disp & 1) dump( head + '\n' + err + '\n' + ((_this._typeof(err) == 'error' && 'stack' in err) ? _stack(err.stack) : ''));
                if(disp & 4) alert(head + '\n' + err + '\n');
                if(disp & 2){
                    var error = Cc['@mozilla.org/scripterror;1'].createInstance(Ci.nsIScriptError);
                    if(_this._typeof(err) == 'error') error.init(head + '  ' + err.name + ' : ' + err.message,err.fileName || null,null,err.lineNumber,null,2,err.name);
                    else error.init(head + '\n' + err + '\n',null,null,null,null,2,null);
                    CONSOLE_SERVICE.logMessage(error);
                }
            }
            catch(e){ dump('errorMessage error.\n' + e + '\n'); }
        };

        // errorMessage の display 省略時の出力先の設定．errorMessage の display と同じ値を指定する．
        this.setErrorDisplay = function(display){ return errorDisplay = display; };
    }

    // SCRIPT_FILE プロパティ(getter) スクリプトファイル名の URL 表記文字列を返す．
    Toolkit.prototype.__defineGetter__('SCRIPT_FILE',function(){ /^[^@]*@(.+):\d+$/(Error().stack.split('\n')[2]); return RegExp.$1; });
    // SCRIPT_LINE プロパティ(getter) 実行した行番号を返す．
    Toolkit.prototype.__defineGetter__('SCRIPT_LINE',function(){ /^[^@]*@.+:(\d+)$/(Error().stack.split('\n')[2]); return RegExp.$1; });

    // mozIJSSubScriptLoader へのショートカット．
    // 第二引数を省略するとこのオブジェクト内のスコープで実行される．
    Toolkit.prototype.loadSubScript = SUBSCRIPT_LOADER.loadSubScript;

    // typeof の改良版．
    // 文字列，数値，真偽値，配列，関数，エラー等のオブジェクトに対応．オマケで nsIFile オブジェクトだと 'file' を返す．
    Toolkit.prototype._typeof = function(obj){
        var type = typeof(obj);
        if(type == 'object'){
            var c = obj.constructor;
            if     (c === eval('String'))         return 'string';
            else if(c === eval('Number'))         return 'number';
            else if(c === eval('Boolean'))        return 'boolean';
            else if(c === eval('Array'))          return 'array';
            else if(c === eval('Function'))       return 'function';
            else if(c === eval('Date'))           return 'date';
            else if(c === eval('RegExp'))         return 'regexp';
            else if(c === eval('Error'))          return 'error';
            else if(c === eval('EvalError'))      return 'error';
            else if(c === eval('RangeError'))     return 'error';
            else if(c === eval('ReferenceError')) return 'error';
            else if(c === eval('SyntaxError'))    return 'error';
            else if(c === eval('TypeError'))      return 'error';
            else if(c === eval('URIError'))       return 'error';
            else if(obj instanceof Ci.nsIFile)    return 'file';
        }
        return type;
    };

    // str の指す文字列の文字コードを返す．
    // us-ascii / ISO-2022-JP / Shift_JIS / EUC-JP / UTF-8 に対応．
    Toolkit.prototype.getCharset = function(str){
        if(/\x1B\x24(?:[\x40\x42]|\x28\x44)/.test(str)) return 'ISO-2022-JP';
        if(/[\x80-\xFE]/.test(str)){
            var buf = RegExp.lastMatch + RegExp.rightContext;
            if(/[\xC2-\xFD][^\x80-\xBF]|[\xC2-\xDF][\x80-\xBF][^\x00-\x7F\xC2-\xFD]|[\xE0-\xEF][\x80-\xBF][\x80-\xBF][^\x00-\x7F\xC2-\xFD]/.test(buf)) return (/[\x80-\xA0]/.test(buf)) ? 'Shift_JIS' : 'EUC-JP';
            if(/^(?:[\x00-\x7F\xA1-\xDF]|[\x81-\x9F\xE0-\xFC][\x40-\x7E\x80-\xFC])+$/.test(buf)) return 'Shift_JIS';
            if(/[\x80-\xA0]/.test(buf)) return 'UTF-8';
            return 'EUC-JP';
        }
        else return 'us-ascii';
    };

    // url(文字列)の指すファイルが存在するか否かを返す．
    Toolkit.prototype.isFileExists = function(url){
        try{ return IO_SERVICE.getProtocolHandler('file').QueryInterface(Ci.nsIFileProtocolHandler).getFileFromURLSpec(IO_SERVICE.newURI(url,null,null).spec).exists(); }
        catch(e){
            try{ var s = IO_SERVICE.newChannelFromURI(IO_SERVICE.newURI(url,null,null)).open(); s.close(); return true; }catch(e){}
            return false;
        }
    };

    // ローカルパス path(文字列)の URL 表記文字列を返す．
    Toolkit.prototype.fromLocalPath = function(path){
        try{
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            file.initWithPath(path);
            return Cc['@mozilla.org/network/io-service;1'].getService(Ci.nsIIOService).getProtocolHandler('file').QueryInterface(Ci.nsIFileProtocolHandler).getURLSpecFromFile(file);
        }
        catch(e){ return null; }
    };

    // url(文字列)のローカルパス文字列を返す．
    Toolkit.prototype.toLocalPath = function(url){
        try{ return IO_SERVICE.getProtocolHandler('file').QueryInterface(Ci.nsIFileProtocolHandler).getFileFromURLSpec(url).path; }
        catch(e){ return null; }
    };

    // nsIFile オブジェクト file の ファイルパスを URL 表記文字列で返す．
    Toolkit.prototype.fileToURL = function(file){
        try{ return Cc['@mozilla.org/network/io-service;1'].getService(Ci.nsIIOService).getProtocolHandler('file').QueryInterface(Ci.nsIFileProtocolHandler).getURLSpecFromFile(file); }
        catch(e){ return null; }
    };

    // ワイルドカードを含む文字列 wcstr を正規表現オブジェクトにして返す．
    Toolkit.prototype.wildcardToRegex = function( pattern ) {
      var s = new String(pattern);
      var res = new String("^");

      for (var i = 0 ; i < s.length ; i++) {
        switch(s[i]) {
          case "*" :
            res += ".*";
            break;

          case "." :
          case "?" :
          case "^" :
          case "$" :
          case "+" :
          case "{" :
          case "[" :
          case "|" :
          case "(" :
          case ")" :
          case "]" :
            res += "\\" + s[i];
            break;

          case "\\" :
            res += "\\\\";
            break;

          case " " :
            // Remove spaces from URLs.
            break;

          default :
            res += s[i];
            break;
        }
      }

      var tldRegExp = new RegExp("^(\\^(?:[^/]*)(?://)?(?:[^/]*))(\\\\\\.tld)((?:/.*)?)$")
      var tldRes = res.match(tldRegExp);
      if (tldRes) {
        // build the mighty TLD RegExp
        var tldStr = "\.(?:demon\\.co\\.uk|esc\\.edu\\.ar|(?:c[oi]\\.)?[^\\.]\\.(?:vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nv)\\.us|[^\\.]\\.(?:(?:pvt\\.)?k12|cc|tec|lib|state|gen)\\.(?:vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nv)\\.us|[^\\.]\\.vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nvus|ne|gg|tr|mm|ki|biz|sj|my|hn|gl|ro|tn|co|br|coop|cy|bo|ck|tc|bv|ke|aero|cs|dm|km|bf|af|mv|ls|tm|jm|pg|ky|ga|pn|sv|mq|hu|za|se|uy|iq|ai|com|ve|na|ba|ph|xxx|no|lv|tf|kz|ma|in|id|si|re|om|by|fi|gs|ir|li|tz|td|cg|pa|am|tv|jo|bi|ee|cd|pk|mn|gd|nz|as|lc|ae|cn|ag|mx|sy|cx|cr|vi|sg|bm|kh|nr|bz|vu|kw|gf|al|uz|eh|int|ht|mw|gm|bg|gu|info|aw|gy|ac|ca|museum|sk|ax|es|kp|bb|sa|et|ie|tl|org|tj|cf|im|mk|de|pro|md|fm|cl|jp|bn|vn|gp|sm|ar|dj|bd|mc|ug|nu|ci|dk|nc|rw|aq|name|st|hm|mo|gq|ps|ge|ao|gr|va|is|mt|gi|la|bh|ms|bt|gb|it|wf|sb|ly|ng|gt|lu|il|pt|mh|eg|kg|pf|um|fr|sr|vg|fj|py|pm|sn|sd|au|sl|gh|us|mr|dz|ye|kn|cm|arpa|bw|lk|mg|tk|su|sc|ru|travel|az|ec|mz|lb|ml|bj|edu|pr|fk|lr|nf|np|do|mp|bs|to|cu|ch|yu|eu|mu|ni|pw|pl|gov|pe|an|ua|uk|gw|tp|kr|je|tt|net|fo|jobs|yt|cc|sh|io|zm|hk|th|so|er|cz|lt|mil|hr|gn|be|qa|cv|vc|tw|ws|ad|sz|at|tg|zw|nl|info\\.tn|org\\.sd|med\\.sd|com\\.hk|org\\.ai|edu\\.sg|at\\.tt|mail\\.pl|net\\.ni|pol\\.dz|hiroshima\\.jp|org\\.bh|edu\\.vu|net\\.im|ernet\\.in|nic\\.tt|com\\.tn|go\\.cr|jersey\\.je|bc\\.ca|com\\.la|go\\.jp|com\\.uy|tourism\\.tn|com\\.ec|conf\\.au|dk\\.org|shizuoka\\.jp|ac\\.vn|matsuyama\\.jp|agro\\.pl|yamaguchi\\.jp|edu\\.vn|yamanashi\\.jp|mil\\.in|sos\\.pl|bj\\.cn|net\\.au|ac\\.ae|psi\\.br|sch\\.ng|org\\.mt|edu\\.ai|edu\\.ck|ac\\.yu|org\\.ws|org\\.ng|rel\\.pl|uk\\.tt|com\\.py|aomori\\.jp|co\\.ug|video\\.hu|net\\.gg|org\\.pk|id\\.au|gov\\.zw|mil\\.tr|net\\.tn|org\\.ly|re\\.kr|mil\\.ye|mil\\.do|com\\.bb|net\\.vi|edu\\.na|co\\.za|asso\\.re|nom\\.pe|edu\\.tw|name\\.et|jl\\.cn|gov\\.ye|ehime\\.jp|miyazaki\\.jp|kanagawa\\.jp|gov\\.au|nm\\.cn|he\\.cn|edu\\.sd|mod\\.om|web\\.ve|edu\\.hk|medecin\\.fr|org\\.cu|info\\.au|edu\\.ve|nx\\.cn|alderney\\.gg|net\\.cu|org\\.za|mb\\.ca|com\\.ye|edu\\.pa|fed\\.us|ac\\.pa|alt\\.na|mil\\.lv|fukuoka\\.jp|gen\\.in|gr\\.jp|gov\\.br|gov\\.ac|id\\.fj|fukui\\.jp|hu\\.com|org\\.gu|net\\.ae|mil\\.ph|ltd\\.je|alt\\.za|gov\\.np|edu\\.jo|net\\.gu|g12\\.br|org\\.tn|store\\.co|fin\\.tn|ac\\.nz|gouv\\.fr|gov\\.il|org\\.ua|org\\.do|org\\.fj|sci\\.eg|gov\\.tt|cci\\.fr|tokyo\\.jp|net\\.lv|gov\\.lc|ind\\.br|ca\\.tt|gos\\.pk|hi\\.cn|net\\.do|co\\.tv|web\\.co|com\\.pa|com\\.ng|ac\\.ma|gov\\.bh|org\\.zw|csiro\\.au|lakas\\.hu|gob\\.ni|gov\\.fk|org\\.sy|gov\\.lb|gov\\.je|ed\\.cr|nb\\.ca|net\\.uy|com\\.ua|media\\.hu|com\\.lb|nom\\.pl|org\\.br|hk\\.cn|co\\.hu|org\\.my|gov\\.dz|sld\\.pa|gob\\.pk|net\\.uk|guernsey\\.gg|nara\\.jp|telememo\\.au|k12\\.tr|org\\.nz|pub\\.sa|edu\\.ac|com\\.dz|edu\\.lv|edu\\.pk|com\\.ph|net\\.na|net\\.et|id\\.lv|au\\.com|ac\\.ng|com\\.my|net\\.cy|unam\\.na|nom\\.za|net\\.np|info\\.pl|priv\\.hu|rec\\.ve|ac\\.uk|edu\\.mm|go\\.ug|ac\\.ug|co\\.dk|net\\.tt|oita\\.jp|fi\\.cr|org\\.ac|aichi\\.jp|org\\.tt|edu\\.bh|us\\.com|ac\\.kr|js\\.cn|edu\\.ni|com\\.mt|fam\\.pk|experts-comptables\\.fr|or\\.kr|org\\.au|web\\.pk|mil\\.jo|biz\\.pl|org\\.np|city\\.hu|org\\.uy|auto\\.pl|aid\\.pl|bib\\.ve|mo\\.cn|br\\.com|dns\\.be|sh\\.cn|org\\.mo|com\\.sg|me\\.uk|gov\\.kw|eun\\.eg|kagoshima\\.jp|ln\\.cn|seoul\\.kr|school\\.fj|com\\.mk|e164\\.arpa|rnu\\.tn|pro\\.ae|org\\.om|gov\\.my|net\\.ye|gov\\.do|co\\.im|org\\.lb|plc\\.co\\.im|net\\.jp|go\\.id|net\\.tw|gov\\.ai|tlf\\.nr|ac\\.im|com\\.do|net\\.py|tozsde\\.hu|com\\.na|tottori\\.jp|net\\.ge|gov\\.cn|org\\.bb|net\\.bs|ac\\.za|rns\\.tn|biz\\.pk|gov\\.ge|org\\.uk|org\\.fk|nhs\\.uk|net\\.bh|tm\\.za|co\\.nz|gov\\.jp|jogasz\\.hu|shop\\.pl|media\\.pl|chiba\\.jp|city\\.za|org\\.ck|net\\.id|com\\.ar|gon\\.pk|gov\\.om|idf\\.il|net\\.cn|prd\\.fr|co\\.in|or\\.ug|red\\.sv|edu\\.lb|k12\\.ec|gx\\.cn|net\\.nz|info\\.hu|ac\\.zw|info\\.tt|com\\.ws|org\\.gg|com\\.et|ac\\.jp|ac\\.at|avocat\\.fr|org\\.ph|sark\\.gg|org\\.ve|tm\\.pl|net\\.pg|gov\\.co|com\\.lc|film\\.hu|ishikawa\\.jp|hotel\\.hu|hl\\.cn|edu\\.ge|com\\.bm|ac\\.om|tec\\.ve|edu\\.tr|cq\\.cn|com\\.pk|firm\\.in|inf\\.br|gunma\\.jp|gov\\.tn|oz\\.au|nf\\.ca|akita\\.jp|net\\.sd|tourism\\.pl|net\\.bb|or\\.at|idv\\.tw|dni\\.us|org\\.mx|conf\\.lv|net\\.jo|nic\\.in|info\\.vn|pe\\.kr|tw\\.cn|org\\.eg|ad\\.jp|hb\\.cn|kyonggi\\.kr|bourse\\.za|org\\.sb|gov\\.gg|net\\.br|mil\\.pe|kobe\\.jp|net\\.sa|edu\\.mt|org\\.vn|yokohama\\.jp|net\\.il|ac\\.cr|edu\\.sb|nagano\\.jp|travel\\.pl|gov\\.tr|com\\.sv|co\\.il|rec\\.br|biz\\.om|com\\.mm|com\\.az|org\\.vu|edu\\.ng|com\\.mx|info\\.co|realestate\\.pl|mil\\.sh|yamagata\\.jp|or\\.id|org\\.ae|greta\\.fr|k12\\.il|com\\.tw|gov\\.ve|arts\\.ve|cul\\.na|gov\\.kh|org\\.bm|etc\\.br|or\\.th|ch\\.vu|de\\.tt|ind\\.je|org\\.tw|nom\\.fr|co\\.tt|net\\.lc|intl\\.tn|shiga\\.jp|pvt\\.ge|gov\\.ua|org\\.pe|net\\.kh|co\\.vi|iwi\\.nz|biz\\.vn|gov\\.ck|edu\\.eg|zj\\.cn|press\\.ma|ac\\.in|eu\\.tt|art\\.do|med\\.ec|bbs\\.tr|gov\\.uk|edu\\.ua|eu\\.com|web\\.do|szex\\.hu|mil\\.kh|gen\\.nz|okinawa\\.jp|mob\\.nr|edu\\.ws|edu\\.sv|xj\\.cn|net\\.ru|dk\\.tt|erotika\\.hu|com\\.sh|cn\\.com|edu\\.pl|com\\.nc|org\\.il|arts\\.co|chirurgiens-dentistes\\.fr|net\\.pa|takamatsu\\.jp|net\\.ng|org\\.hu|net\\.in|net\\.vu|gen\\.tr|shop\\.hu|com\\.ae|tokushima\\.jp|za\\.com|gov\\.eg|co\\.jp|uba\\.ar|net\\.my|biz\\.et|art\\.br|ac\\.fk|gob\\.pe|com\\.bs|co\\.ae|de\\.net|net\\.eg|hyogo\\.jp|edunet\\.tn|museum\\.om|nom\\.ve|rnrt\\.tn|hn\\.cn|com\\.fk|edu\\.dz|ne\\.kr|co\\.je|sch\\.uk|priv\\.pl|sp\\.br|net\\.hk|name\\.vn|com\\.sa|edu\\.bm|qc\\.ca|bolt\\.hu|per\\.kh|sn\\.cn|mil\\.id|kagawa\\.jp|utsunomiya\\.jp|erotica\\.hu|gd\\.cn|net\\.tr|edu\\.np|asn\\.au|com\\.gu|ind\\.tn|mil\\.br|net\\.lb|nom\\.co|org\\.la|mil\\.pl|ac\\.il|gov\\.jo|com\\.kw|edu\\.sh|otc\\.au|gmina\\.pl|per\\.sg|gov\\.mo|int\\.ve|news\\.hu|sec\\.ps|ac\\.pg|health\\.vn|sex\\.pl|net\\.nc|qc\\.com|idv\\.hk|org\\.hk|gok\\.pk|com\\.ac|tochigi\\.jp|gsm\\.pl|law\\.za|pro\\.vn|edu\\.pe|info\\.et|sch\\.gg|com\\.vn|gov\\.bm|com\\.cn|mod\\.uk|gov\\.ps|toyama\\.jp|gv\\.at|yk\\.ca|org\\.et|suli\\.hu|edu\\.my|org\\.mm|co\\.yu|int\\.ar|pe\\.ca|tm\\.hu|net\\.sb|org\\.yu|com\\.ru|com\\.pe|edu\\.kh|edu\\.kw|org\\.qa|med\\.om|net\\.ws|org\\.in|turystyka\\.pl|store\\.ve|org\\.bs|mil\\.uy|net\\.ar|iwate\\.jp|org\\.nc|us\\.tt|gov\\.sh|nom\\.fk|go\\.th|gov\\.ec|com\\.br|edu\\.do|gov\\.ng|pro\\.tt|sapporo\\.jp|net\\.ua|tm\\.fr|com\\.lv|com\\.mo|edu\\.uk|fin\\.ec|edu\\.ps|ru\\.com|edu\\.ec|ac\\.fj|net\\.mm|veterinaire\\.fr|nom\\.re|ingatlan\\.hu|fr\\.vu|ne\\.jp|int\\.co|gov\\.cy|org\\.lv|de\\.com|nagasaki\\.jp|com\\.sb|gov\\.za|org\\.lc|com\\.fj|ind\\.in|or\\.cr|sc\\.cn|chambagri\\.fr|or\\.jp|forum\\.hu|tmp\\.br|reklam\\.hu|gob\\.sv|com\\.pl|saitama\\.jp|name\\.tt|niigata\\.jp|sklep\\.pl|nom\\.ni|co\\.ma|net\\.la|co\\.om|pharmacien\\.fr|port\\.fr|mil\\.gu|au\\.tt|edu\\.gu|ngo\\.ph|com\\.ve|ac\\.th|gov\\.fj|barreau\\.fr|net\\.ac|ac\\.je|org\\.kw|sport\\.hu|ac\\.cn|net\\.bm|ibaraki\\.jp|tel\\.no|org\\.cy|edu\\.mo|gb\\.net|kyoto\\.jp|sch\\.sa|com\\.au|edu\\.lc|fax\\.nr|gov\\.mm|it\\.tt|org\\.jo|nat\\.tn|mil\\.ve|be\\.tt|org\\.az|rec\\.co|co\\.ve|gifu\\.jp|net\\.th|hokkaido\\.jp|ac\\.gg|go\\.kr|edu\\.ye|qh\\.cn|ab\\.ca|org\\.cn|no\\.com|co\\.uk|gov\\.gu|de\\.vu|miasta\\.pl|kawasaki\\.jp|co\\.cr|miyagi\\.jp|org\\.jp|osaka\\.jp|web\\.za|net\\.za|gov\\.pk|gov\\.vn|agrar\\.hu|asn\\.lv|org\\.sv|net\\.sh|org\\.sa|org\\.dz|assedic\\.fr|com\\.sy|net\\.ph|mil\\.ge|es\\.tt|mobile\\.nr|co\\.kr|ltd\\.uk|ac\\.be|fgov\\.be|geek\\.nz|ind\\.gg|net\\.mt|maori\\.nz|ens\\.tn|edu\\.py|gov\\.sd|gov\\.qa|nt\\.ca|com\\.pg|org\\.kh|pc\\.pl|com\\.eg|net\\.ly|se\\.com|gb\\.com|edu\\.ar|sch\\.je|mil\\.ac|mil\\.ar|okayama\\.jp|gov\\.sg|ac\\.id|co\\.id|com\\.ly|huissier-justice\\.fr|nic\\.im|gov\\.lv|nu\\.ca|org\\.sg|com\\.kh|org\\.vi|sa\\.cr|lg\\.jp|ns\\.ca|edu\\.co|gov\\.im|edu\\.om|net\\.dz|org\\.pl|pp\\.ru|tm\\.mt|org\\.ar|co\\.gg|org\\.im|edu\\.qa|org\\.py|edu\\.uy|targi\\.pl|com\\.ge|gub\\.uy|gov\\.ar|ltd\\.gg|fr\\.tt|net\\.qa|com\\.np|ass\\.dz|se\\.tt|com\\.ai|org\\.ma|plo\\.ps|co\\.at|med\\.sa|net\\.sg|kanazawa\\.jp|com\\.fr|school\\.za|net\\.pl|ngo\\.za|net\\.sy|ed\\.jp|org\\.na|net\\.ma|asso\\.fr|police\\.uk|powiat\\.pl|govt\\.nz|sk\\.ca|tj\\.cn|mil\\.ec|com\\.jo|net\\.mo|notaires\\.fr|avoues\\.fr|aeroport\\.fr|yn\\.cn|gov\\.et|gov\\.sa|gov\\.ae|com\\.tt|art\\.dz|firm\\.ve|com\\.sd|school\\.nz|edu\\.et|gob\\.pa|telecom\\.na|ac\\.cy|gz\\.cn|net\\.kw|mobil\\.nr|nic\\.uk|co\\.th|com\\.vu|com\\.re|belgie\\.be|nl\\.ca|uk\\.com|com\\.om|utazas\\.hu|presse\\.fr|co\\.ck|xz\\.cn|org\\.tr|mil\\.co|edu\\.cn|net\\.ec|on\\.ca|konyvelo\\.hu|gop\\.pk|net\\.om|info\\.ve|com\\.ni|sa\\.com|com\\.tr|sch\\.sd|fukushima\\.jp|tel\\.nr|atm\\.pl|kitakyushu\\.jp|com\\.qa|firm\\.co|edu\\.tt|games\\.hu|mil\\.nz|cri\\.nz|net\\.az|org\\.ge|mie\\.jp|net\\.mx|sch\\.ae|nieruchomosci\\.pl|int\\.vn|edu\\.za|com\\.cy|wakayama\\.jp|gov\\.hk|org\\.pa|edu\\.au|gov\\.in|pro\\.om|2000\\.hu|szkola\\.pl|shimane\\.jp|co\\.zw|gove\\.tw|com\\.co|net\\.ck|net\\.pk|net\\.ve|org\\.ru|uk\\.net|org\\.co|uu\\.mt|com\\.cu|mil\\.za|plc\\.uk|lkd\\.co\\.im|gs\\.cn|sex\\.hu|net\\.je|kumamoto\\.jp|mil\\.lb|edu\\.yu|gov\\.ws|sendai\\.jp|eu\\.org|ah\\.cn|net\\.vn|gov\\.sb|net\\.pe|nagoya\\.jp|geometre-expert\\.fr|net\\.fk|biz\\.tt|org\\.sh|edu\\.sa|saga\\.jp|sx\\.cn|org\\.je|org\\.ye|muni\\.il|kochi\\.jp|com\\.bh|org\\.ec|priv\\.at|gov\\.sy|org\\.ni|casino\\.hu|res\\.in|uy\\.com)"

        // insert it
        res = tldRes[1] + tldStr + tldRes[3];
      }
      return new RegExp(res + "$", "i");
    };

    // len で指定した長さのランダム文字列を返す．
    // character に使う文字の羅列を入れておくとそれらの文字を使い，省略すると英数字を使う．
    Toolkit.prototype.createRandomString = function(len,character){
        if(!character) character = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var buf = '';
        for(var i = 0,slen = character.length;i < len;++i) buf += character.charAt(Math.floor(Math.random() * slen));
        return buf;
    };

    // code(文字列)から Greasemonkey 方式のメタデータを読み取り，連想配列にして返す．
    // 同じ項目名で値が複数ある場合は '\n' を区切り文字として使う．
    Toolkit.prototype.readMeta = function(code){
        if(!code) return [];
        var a    = code.split(/\r\n|\r|\n/);
        var max  = a.length;
        var meta = false;
        var data  = [];
        for(var i = 0;i < max;++i){
            if     (!meta && REGEX_META_START.test(a[i])) meta = true;
            else if( meta && REGEX_META_END.test(a[i])) break;
            else if( meta && REGEX_META_DATA(a[i])){
                if(data[RegExp.$1]) data[RegExp.$1] += '\n' + RegExp.$2;
                else data[RegExp.$1] = RegExp.$2;
            }
        }
        return data;
    };

    // name(文字列)で指定した項目名の設定を，値に適した型で返す．設定値が無ければ null を返す．
    Toolkit.prototype.getPref = function(name){
        const PREF = Cc['@mozilla.org/preferences;1'].getService(Ci.nsIPrefBranch);
        try{
            switch(PREF.getPrefType(name)){
              case Ci.nsIPrefBranch.PREF_STRING: return PREF.getCharPref(name);
              case Ci.nsIPrefBranch.PREF_INT:    return PREF.getIntPref(name);
              case Ci.nsIPrefBranch.PREF_BOOL:   return PREF.getBoolPref(name);
              default: return null; }
        }
        catch(e){ return null; }
    };

    // name(文字列)で指定した項目名の設定に value を書き込む．
    // 失敗で null を返すかも．
    Toolkit.prototype.setPref = function(name,value){
        const PREF = Cc['@mozilla.org/preferences;1'].getService(Ci.nsIPrefBranch);
        switch(Toolkit.prototype._typeof(value)){
          case 'string':  return PREF.setCharPref(name,value);
          case 'number':  return PREF.setIntPref(name,value);
          case 'boolean': return PREF.setBoolPref(name,value);
          default: return null; }
    };

    // ローカルパス path(文字列)で指定したファイルを引数の配列 arg を伴って実行する．
    // wait が真ならプロセスの終了まで待つ．
    Toolkit.prototype.process = function(path,arg,wait){
        var file    = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
        var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
        file.initWithPath(path);
        process.init(file);
        process.run(wait,arg,arg.length);
    };

    // 番号表クラス．new UCJSToolkit().NumberTable(retired);
    // オブジェクトに番号付けをする．
    // get(obj) で obj の指すオブジェクトに付けられた番号，又は新規に付けた番号を返す．
    // delete(obj) で obj の指すオブジェクトに付けられた番号を削除する．
    // retired が真なら delete() した番号は永久欠番となり，そうでないのならその番号は再び使われる．
    Toolkit.prototype.NumberTable = function(retired){
        var table = [];
        var empty = [0];
        this.get = function(obj){
            var id = table.indexOf(obj); if(id != -1) return id;
            if(retired) return table.push(obj) - 1;
            table[id = empty.pop()] = obj;
            if(!empty.length) empty.push(table.length);
            /*Components.classes["@mozilla.org/consoleservice;1"]
              .getService(Components.interfaces.nsIConsoleService)
              .logStringMessage('Create WindowId = ' + id);
            */
            return id;
        };
        this.delete = function(obj){
            var id = table.indexOf(obj); if(id == -1) return null;
            delete table[id];
            if(!retired) empty.push(id);
            /*
            Components.classes["@mozilla.org/consoleservice;1"]
              .getService(Components.interfaces.nsIConsoleService)
              .logStringMessage('Delete WindowId = ' + id);
            */
            return id;
        };
    };

    // scope オブジェクトのスコープのプロトタイプを拡張する．
    // extend は拡張するプロトタイプを指定した配列．'string' で文字列，'regexp' で正規表現のプロトタイプが拡張される．
    // 文字列のプロトタイプには toUnicode fromeUnicode getCharset が加わる．
    // 正規表現のプロトタイプには globalMatch が加わる．
    Toolkit.prototype.extendPrototype = function(scope,extend){
        var strflag = true;
        var regflag = true;
        if(Toolkit.prototype._typeof(extend) == 'array'){
            strflag = (extend.indexOf('string') == -1) ? false : true;
            regflag = (extend.indexOf('regexp') == -1) ? false : true;
        }
        if(strflag){
            // charset で指定した文字コードからユニコード(UTF-16)へ変換した文字列を返す．
            // charset を省略すると文字コードを自動判別する．
            scope.String.prototype.toUnicode = function(charset){
                UNICODE_CONVERTER.charset = charset || this.getCharset();
                return UNICODE_CONVERTER.ConvertToUnicode(this);
            };
            // charset で指定した文字コードへユニコード(UTF-16)から変換した文字列を返す．
            scope.String.prototype.fromUnicode = function(charset){
                if(!charset) return this;
                UNICODE_CONVERTER.charset = charset;
                return UNICODE_CONVERTER.ConvertFromUnicode(this);
            };
            // 前述の getCharset() と同様．
            scope.String.prototype.getCharset = function(){ return Toolkit.prototype.getCharset(this); };
        }
        if(regflag){
            // 文字列 str のマッチする全てにマッチし，func の指す関数をコールバックする．
            // 正規表現の g 指定は不要で，マッチすれば最終的にマッチした箇所の右側を返し，そうでなければ null を返す．
            // コールバック関数の第一引数は，マッチした箇所の左側(以前にマッチした箇所から今回マッチした箇所まで)が入り，
            // 第二引数には後方参照の配列が入り，第三引数にはマッチした箇所の右側が入る．
            scope.RegExp.prototype.globalMatch = function(str,func){
                if(Toolkit.prototype._typeof(func) != 'function') return null;
                var flag = false;
                while(this(str)){ str = RegExp.rightContext; func(RegExp.leftContext,[RegExp.lastMatch,RegExp.$1,RegExp.$2,RegExp.$3,RegExp.$4,RegExp.$5,RegExp.$6,RegExp.$7,RegExp.$8,RegExp.$9],RegExp.rightContext); flag = true; }
                return (flag) ? str : null;
            };
        }
    };

    return Toolkit;
})();
