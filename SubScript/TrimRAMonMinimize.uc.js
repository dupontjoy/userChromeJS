// ==UserScript==
// @name            trim RAM usage on minimize
// @namespace       http://scripts.bitcp.com/trimonminimize
// @description     最小化时整理内存
// @author          zbinlin
// @homepage        http://bitcp.com
// @version         0.0.2
// ==/UserScript==

(function (win) {
    "use strict";
    if (win.location.toString() !== "chrome://browser/content/browser.xul") return;
    /*
    * 触发整理内存的方式：
    *  1 << 0x00(1)     最小化时整理
    *  1 << 0x01(2)     当超过阈值（memorysize）时整理
    *  1 << 0x02(4)     定时（timeout）整理
    */
    let mode = 0x01;
    let memorysize = 400000000; /* 默认 500MB */
    let timeout = 30/*min*/ * 60 * 1000; /* 默认 30 分钟 */

    let reporterManager = Cc["@mozilla.org/memory-reporter-manager;1"]
        .getService(Ci.nsIMemoryReporterManager); 
    let TrimOnMinimize = {
        minimize: win.STATE_MINIMIZED,
        handleEvent: function (e) {
            (e.target.windowState === this.minimize) && this.onTrim();
        },
        onTrim: function () {
            let scope = {};
            Cu.import("resource://gre/modules/ctypes.jsm", scope);
            let ctypes = scope.ctypes;
            let libKernel32 = ctypes.open("Kernel32.dll");
            if (!libKernel32) return;
            let SetProcessWorkingSetSize = libKernel32.declare("SetProcessWorkingSetSize",
                                                               ctypes.winapi_abi,
                                                               ctypes.bool,
                                                               ctypes.voidptr_t,
                                                               ctypes.size_t,
                                                               ctypes.size_t
                                                              );
            let GetCurrentProcess = libKernel32.declare("GetCurrentProcess",
                                                        ctypes.winapi_abi,
                                                        ctypes.voidptr_t
                                                       );
            SetProcessWorkingSetSize(GetCurrentProcess(),
                                     ctypes.cast(ctypes.int(-1), ctypes.size_t),
                                     ctypes.cast(ctypes.int(-1), ctypes.size_t)
                                    );
            libKernel32.close();
        }
    };
    if (mode >>> 0x00 & 1) {
        win.addEventListener("sizemodechange", TrimOnMinimize, true);
        win.addEventListener("unload", function _(e) {
            win.removeEventListener("unload", _, false);
            win.removeEventListener("sizemodechange", TrimOnMinimize, true);
        }, false);
    }
    function tfn(timeout, isThreshold) {
        isThreshold ? reporterManager.resident > memorysize && TrimOnMinimize.onTrim()
                    : TrimOnMinimize.onTrim();
        setTimeout(tfn, timeout, timeout, isThreshold);
    }
    if (mode >>> 0x01 & 1) {
        let timeout = 500; /* 500ms 检查一次内存占用情况 */
        setTimeout(tfn, timeout, timeout, true);
    }
    if (mode >>> 0x02 & 1) {
        setTimeout(tfn, timeout, timeout);
    }
})(window);