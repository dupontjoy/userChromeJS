/*——————————标签页右键————————————*/

//撤销关闭二级菜单 By feiruo
var undoMenu = TabMenu({
    label: '撤销关闭',
    accesskey: "R",
    insertAfter: "context_undoCloseTab",
    tooltiptext: "右键显示所有历史记录",
    onclick: "if (event.button == 2) {PlacesCommandHook.showPlacesOrganizer('History');}",
    onpopupshowing: function(e) {
        var popup = e.target;
        popup.setAttribute('id', 'addUndoMneun');
        var items = popup.querySelectorAll('.bookmark-item');
        [].forEach.call(items, function(item) {
            item.parentNode.removeChild(item);
        });
        var undoItems = JSON.parse(Cc['@mozilla.org/browser/sessionstore;1'].getService(Ci.nsISessionStore).getClosedTabData(window));
        if (undoItems.length == 0) {
            popup.setAttribute('oncommand', 'this.parentNode._placesView._onCommand(event);');
            if (!this.parentNode._placesView) new HistoryMenu(event);
        } else {
            undoItems.map(function(item, id) {
                var m = document.createElement('menuitem');
                m.setAttribute('label', item.title);
                m.setAttribute('image', item.image ? 'moz-anno:favicon:' + item.image : '');
                m.setAttribute('class', 'menuitem-iconic bookmark-item closedtab');
                m.setAttribute('oncommand', 'undoCloseTab(' + id + ')');
                m.setAttribute('type', 'unclose-menuitem');
                popup.appendChild(m);
            });
        }
    },
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAABDklEQVQ4jZ3SPShFcRjH8Q8JN2IgI4pJorxkMJDNYlE27AZWG4vBJoOymewMshtsdzHIQilKUl7SDde9hnNuTqdzLuc+9UzP8/2e/uf3kFyNWMVwyrxqNWEddxjPCuewiQJeMJYFbsU2PlDGM0b/C7dhF58hXA5FR9jDBhbQh/o43IV9FCNwUhdxgx30RwWHKP0BxzuPiYpgCbcZBWWco7cimcV1bKGEJzziPUHwja3oU2ZwFVl4xTwGMYUVHMdkl/EfOokLvzGOxOY5LOI+3CnEBQTHk8eb9ENaw1fYiTWEU+mn3C2I9CFNAD3oTJm1CFI4qSaoVu04w3KtggEcoKMWuA5zmK71682CeBvgB+93YAIjVuYDAAAAAElFTkSuQmCC"
});

/*——————————图片右键————————*/

//右键搜索图片 以图搜图
 var imagesub = PageMenu({ label: "以图搜图",accesskey: "t",  condition: "image", where: "tab", insertAfter:"context-viewpartialsource-selection", image: "data:image/png;base64,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",  });
imagesub([
            {label: 'Google Search',
      url : 'http://www.google.com/searchbyimage?image_url=%IMAGE_URL%',
      image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC",where: 'tab'
      },{label: 'Bing Search',
      url : 'http://www.bing.com/images/searchbyimage?FORM=IRSBIQ&cbir=sbi&imgurl=%IMAGE_URL%&mkt=en-US',
      image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jWP4v5PhPyWYAZnzfQsz+Qb828nwPyAg4H9OovP/1W3q5BsQEBDwPzXWjTIDAgICqGNAWbr9/+UtGv/vLuUnz4AplYZwfkqM+/+ZNXr/L8wVI80LkaE+KOIBAQH//5FiwNfNrP87isxIMyA30fn//50M/+8u5f/fnGdJmgvS41z/X5wr+r+nxOR/IJrG5Bj3/4enyuAOg7wkp/8Ty43/BwX6o2gMDvL7v6hRG2tKRUnKfaXGGM5tzLX6/2QlD3F54f9Ohv8Hp8j+jwrz+Z8a4/7/+HQp0jITDP/axvz/7w5G0nMjORgALS2D1pyznwIAAAAASUVORK5CYII=",where: 'tab'
      },
      {label: 'Baidu shitu Search',
      url : 'http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=%IMAGE_URL%',
      image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoklEQVQ4jZ2T6UuUURSHzz9QRhCpJJVZERUFmVmp7bZYZiUttpiEVliEtCctJtGHPgQGEm1EUbQHUlCBWSI1NbagJfheX3XG1LSmhWL0NTtPH6ZmEulLF86XcznPPb/7O0eksAYprEEK3iKHqpED1Uj+a2TvK2TXC2SHG8lzIVufILkVyKZyJLsMySpF1t1HpLCG/z2ScQ+Rgre9LqzaTj1S0K7VVR0KYKxOtY2jvQAr7iBysLpH0nGUPTvaGBVTp5kZzWobh2mTGzVljldt4/QEpJcgsr8qmPj8qRuAXXltTB7fQE5mC26Xn7hx9cyd4cHt8vcEpN1GZN9rADyNXWxY26y5Oa1668ZXcjJbKC7yAVBc5KO4yIfb5cfr6QoBFt1EZPdLAK5d+sKQgZYmxjUogG0cOjtCsm3jsGrZO1YuadLWlh8BwPxriOysBOC5y09CbANLFzZxt+QbtnHYvKGFvC2t2Mbh2NGPTBpfT0ykwe3yK4DMvYLI9mcAdHfDjatftbjIp7ZxSE326ogoo2NibNYsf6e2cViW6iVtvlcb6gOOyKxLiGx7Gmyzo+MntnFIm+dlZJTR6HDDn1ixuElt4/D44XfltzKZfhGR3Iog4E1VJymzvYwYVMffxdHhhnHDbbIymrHrQlZK4nlENpUDoAqH89t18ACjQweaXoDBA4yOHWbzqPR78Gdl6jlEssuCgKMFHzS8r6WR/SwiwywN71OrEWEWUf0tHdTf0mERhssXvoQA8WcRySoNtuRp7GJLdivJSR7SU5o4cdzHieM+Zk1tJHZ0PRvXN9P2/kdIQtxpRNY9+Hu4FKgEnvwjKntM4sRTiKy+F1iK9BJkyW0k9Say4HrA49mXkZkXkaQLSMJ5ZMo5JP5M4OXYU8iEk/wC6ZkDX3ssK20AAAAASUVORK5CYII=",where: 'tab'
      },
       {label: 'Baidu image Search',
      url : 'http://image.baidu.com/i?rainbow=1&ct=1&tn=shituresultpc&objurl=%IMAGE_URL%',
      image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoklEQVQ4jZ2T6UuUURSHzz9QRhCpJJVZERUFmVmp7bZYZiUttpiEVliEtCctJtGHPgQGEm1EUbQHUlCBWSI1NbagJfheX3XG1LSmhWL0NTtPH6ZmEulLF86XcznPPb/7O0eksAYprEEK3iKHqpED1Uj+a2TvK2TXC2SHG8lzIVufILkVyKZyJLsMySpF1t1HpLCG/z2ScQ+Rgre9LqzaTj1S0K7VVR0KYKxOtY2jvQAr7iBysLpH0nGUPTvaGBVTp5kZzWobh2mTGzVljldt4/QEpJcgsr8qmPj8qRuAXXltTB7fQE5mC26Xn7hx9cyd4cHt8vcEpN1GZN9rADyNXWxY26y5Oa1668ZXcjJbKC7yAVBc5KO4yIfb5cfr6QoBFt1EZPdLAK5d+sKQgZYmxjUogG0cOjtCsm3jsGrZO1YuadLWlh8BwPxriOysBOC5y09CbANLFzZxt+QbtnHYvKGFvC2t2Mbh2NGPTBpfT0ykwe3yK4DMvYLI9mcAdHfDjatftbjIp7ZxSE326ogoo2NibNYsf6e2cViW6iVtvlcb6gOOyKxLiGx7Gmyzo+MntnFIm+dlZJTR6HDDn1ixuElt4/D44XfltzKZfhGR3Iog4E1VJymzvYwYVMffxdHhhnHDbbIymrHrQlZK4nlENpUDoAqH89t18ACjQweaXoDBA4yOHWbzqPR78Gdl6jlEssuCgKMFHzS8r6WR/SwiwywN71OrEWEWUf0tHdTf0mERhssXvoQA8WcRySoNtuRp7GJLdivJSR7SU5o4cdzHieM+Zk1tJHZ0PRvXN9P2/kdIQtxpRNY9+Hu4FKgEnvwjKntM4sRTiKy+F1iK9BJkyW0k9Say4HrA49mXkZkXkaQLSMJ5ZMo5JP5M4OXYU8iEk/wC6ZkDX3ssK20AAAAASUVORK5CYII=",where: 'tab'
      },
      {label: '360ShiTu Search',
      url: 'http://st.so.com/stu?imgurl=%IMAGE_URL%',
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB6klEQVQ4jaXOz2oTURQG8Ltv7vEZAl1Jsm3VZO7ccdqNlK4sBFd9k0IoCD5BaRYKVtRi5l8zmZTY0o5NoVuhI9KFRbGpLaSkDYEk1s/FnTGDC6l64bf5zncPhxlhRjdDOph5dwt/wwzpwAgzOjN3eXsmJPwLc5e3mblD+B/M3CaklVq3sfPNweWwg8thB60zH4/28/i9l2D3m4TEYmsKF4NzPP34GAvNHBaaOVQ+lHExOMdiawrpboIZmwRjkyAbhL1THyuHSyg6HJqnFB2O1aiMvVMfsqG6acxoEIwGQfcJ/VEP88Ek9BqHDAgyIOg1jrl6Fv1RD7qvumlM1gmyThAex9Wwi/lgEtJXmawTpE+YC7LoDjoQHh/nMSZ9VRIux/YXGyuHS5A1lUmfIGuE1aiMt5/fQLh8nMeYrKmScAkP6zmc9b+iEpVR2sqjtJVHJSpjeD1QFzgcST/B9A2CvkEQHqFocTxws/A/reGkd4yT3jGeRU+QvKthF8JT/QTTPUJCOIRilaOwznHvdewVx/Ra5teS/qgH4Y7/MN0lpAmHoFkErcpjhMI6x/TzDK5/fEfl/TI0a9xnwlGf/kSz1ZI7LzK4+5JDs8YzJhzevumSYlVdJ+wk521WsCZmhU1Hwo4HN3dUsCZmfwKCejnLHZeJTwAAAABJRU5ErkJggg==",where: 'tab'
      },
      {label: 'Sougou Search',
      url: 'http://pic.sogou.com/ris?query=%IMAGE_URL%',
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB0klEQVQ4jZ3Sv2sUQRQH8FdsZSURK0tB8D/Qa3Iii1oIwcIuSnoLf4AigkUgWqQXLhgQQgqxDUHsrCTFtoJL4G53dmcvs7t37M3uODur97WYuPFMUM8Hr5vvZ+bxhvr9/mIQBHtBEOCkDsMQjDEwxhBFEeI4Bud8L0mSRSIiGgwGSfzgCrjr/Hs/vArGWEZEpykIgvnChy2EABF1ZoDh7XMo367D+B6mSuLX+j5K8PXju/ZslmUgom4LiJWL+JZGbaBhX1DtbKDa2YB6/wbG92B8rwXyPLdAGIbgroNqd3PmxvzJtT+OMB6PLcAYA3cdFK/u4/eqP3+C3F5D/uwmkqUzM0BRFBaIouhIXV+B9j5gqtUxbKoV5PYakhunwF0HUkoLxHF84hPTe5cwef0UxvdmILm1Cu46KMvSApzzNjR6voSD5fNHW7l19thoPzehlLLAcDhsA3+rqVbIHtlPp7W2gBCiBardzXZdTbxv1xnvw/ge5NYqxN0L7dm6ri2Qpul//URjjAWyLIsOXtyZKzx6uQwpZUpEXcrz/LoQIiuKApPJBFJKlGWJqqqglILWGnVdwxgDYwyapkFVVXmv13tMRJfpsBaIqENE3Tm6Q0QLPwAGVa1p0zMtjwAAAABJRU5ErkJggg==",where: 'tab'
      },
      {label: 'TinEye Search',
      url : 'http://www.tineye.com/search?url=%IMAGE_URL%',
      image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADRElEQVQ4jW3Tf0zUdRzH8Y9QkUHLOW9KYEmtGkziPMexDicMuB/Q0TFg2MQK2gkRP+JEQjhyJr8Kji/I7zhghLBkghvS6cFUfhxwcXLFFvpPK4iTWLM/+0NW7dkftwJX7+315+vxx2t7C3X9ZEy8ZWYxt64PveUWGsnxv1E3TJF8yUFK2wKJzXPEW2YW1fWTMSLBMr3Z3VTN2vkIhk1xaKXZf0sZHfPIM84gC1PxbGAI+4JfQhb4ArFqLeUDtzk77N4UGsnBNXMKK4VBTBSEo5EcaCUHxYMuDsmjEUI8lmOh+8mtbya5ppuMum6ERnJgaLCTYniLTGmcU1YXlpvLpGVloZUJSo4KqmOexvKmjK7UA/S2f8JHc79gmlzhw+t3vYBGchD5fhX5fQ4sN5dI77FT+2Uf9p6PGb3aSf9wHy2D/Vzs7KLA0kG+ZKWwyUpRc+828LZkI+ezTnJGnZTZlzFarOiyC4nUGHg5XIHsQBDyqGiSUtKRyWQE+D3JHv/d20DxoIuTHSMUX53myBvH0CTq0adlIHb5IITgOdl+XMvf8+iPP+m/MoKv327vLv8A58fuYbK5OXQkisOvy/n90RYAn7d2Inx8USXo2HkZWUYvoG6cJb5hhrKBWd7ttSF8nyI7J4/fHj5kdXWVv4CjquOEK1UsLC6SlpoKwNDomBeIqryB0mzjvdoh0lqG2RvyGrFqLaXnKjiVmQnA6fwi/J4JwDowRE11NQA9l7/yAkqzDaXZhrZmkqrriyR92o4QgtN5BWx41tna2iI6Ng4hBK+EHmbi1h1u35kiLELBnsCD24DSbMN0+S5VC6skVDQSoT9BZYuV7DPl7A15lefD5BxUqIgwZBKbV05yVQe5Y0uPA0qzjbNDS7S5PFTM/4xxzE32iJOiiXuUzPxE6fw6JY41yhY8SN/9SvP0j/8FlGYbxy/Yye9zUnfjPm1ODy0uD63frNPuXOPS1A9UXnGS1ziCIceMUFaMP9hZTmya4YP+OYq7xiltGsBYWEbSCSP6k7no0rOJM7zDi6EKdvk8gRDigVCUXtNFnvt6M/qCnSLbfWrdHmq/3eCie4PKqRVMrV8QH7qPAH9/goKDdz7Wpr8Qur8B/c1d/jmhRwsAAAAASUVORK5CYII=",where: 'tab'
      },
]);

//复制图片Base64
page({
label:"复制图片Base64",
condition: "image",
accesskey: "B",
text:"%IMAGE_BASE64%",
insertAfter:"context-copyimage",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADbklEQVQ4jV3KT0xTdwDA8XfyZAw3IzEmEBJIZNnZgxdjOJg4No+GJcQlyw47kBATxWggWcOfDav8ebwf0PKsEjpo6SxStH9oaW1LCUIYBQyw/qd9fVIqcET97qBLtn2Tz+0r2R3P7y+txD7Mx7z4Yh58MTdLqzHiG1vENza/2GJpNYYv5sYX8zAf87K0Evtgdzy/Lzmdc8r04hB9LxsRnhv0zDZiDQ2RyxVJZbKkMllyuSLW0BA9s5+fvpeNTC8O4XTOKZLD8UKofgPj4TomIhU8mrtKLB4llyuQymRIZTLkcgVi8SiP5q4yEalgPFyH6jfgcLwQks3mFKq/nb5ABXJYQomcpv/VD6xs7hLfThHfTrK6uc3Aq1sokdPIYYm+QAWqvx2bzSkkq9UhzPMGumdvMOi/xm8RiV73N4wHl1BDCdRQmrHgDl3uJnojEoP+a3TP3sA8b8BqdQhJtYyLRDbJXkFjM/EXv860kV++yf6fPzO6eYiytsXw2jp9awV+melkK7HLXkEjkU2iWsaFZDKrQivqlEoHbKeL/PF6ncPln8hFfsS8UWDQ18qgu5nxnUOs4Qw7aY1S6QCtqGMyq0ISIyahFXXK78vsZjV+jySYyxxiTxxjWp6lZ+oruifrmVhzMRnNsJvVKL8voxV1xIhJSLIihK7vc3R0RCq/z1Q0iVc7YCa3j313kQH1OgPqdVzpZaYW06Tyn19d30dWhJAGZEWk91KUD8sktRzdM50oge8xv27GHL3FqPVbTNbvUELNdM90ktRylA/LpPdSDMiKkGTZJMa8XcjeFtRQK2rwMr2uJp74AzwLLPIsuMSThSC9ribU4GXUUCuyt4UxbxeybBJSf/+IMHnaUSOXMEfPoiycYSTQQkJ7R750TL50TEJ7x0igBWXhDOboWdTIJUyedvr7R4T02CjEsPsu4s0pTOsSHa4q3uZX+PQRTk5OODk54dNHeJtfocNVhWldQrw5xbD7Lo+NQkjGh7KYDBvp8J7H4D/HbWclztVR/p9zdZTbzkoM/nN0eM8zGTZifCgL6U7bg3s2p63w1G7RLTZVt9jHdIdrWvf4/LrHN/+FX3e4pnWLfUy32FT9qd2i25y2wp22B/ekyurqC7W1F6/U1X3d8I+amvqGqqqa/6ipqW/491Nbe/FKZXX1hb8BEJLejJQjP5wAAAAASUVORK5CYII="
});

// 替换 openImgRar.uc.js。 打开图像RAR
page({
label: "打开图像RAR",
accesskey: "R",
insertBefore:"context-saveimage",
condition: 'image',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACcUlEQVQ4jZXIXUtTARwH4L/iGEeGe0Eny3JTnMbU9qLMvZwdt7Gpw+bO2YLNedzUFR5qLRhmsJY2xGrY8VxmBIaRJdhV9gGK6CKLvtKvmxyCmHjx3DwkimJfIZ/fWJyfv5RCPr82G4+3U2xqaivF81itzWFNnsfa9okc1rdzWC5mkEokkE2n8aBUQjKRQIrnkeJ5TEQiSxQJh5Xi4xnsHiew+1NoeHucxPs/aXz4nUNBSuF+8R52dnYgJBKYid9EfHoawUBAIi4QUKLRIMIR9oxYwo9XX2fw7lcaez9y2D9ewu73Obz5lkF2MQa/xyORd2xMCQeDOM/0LS+kmh/ll1Gsv07i7gaL5Zof0UkW7pERiUZdLoX1+fA/fq8XoihClmVwLAu/1wvW54PTbpdoeHBQGXW5cJHZTAayLMPjdjfOZrNJNGC1KsNDQ7hIKplEvV6H0+FonNVqlcjS3a1Y+/pwHi7iQOFRCKtbKSj7RdyphLH4kMMNx3Vc6+qSyGQyKRazGT0Wyxl25wCefZpE/UsEtUMOTw85rB8GUD3ww+nrhclolKjdYFCCQj+ef46gfjSB+tFkw4ujCJ4csLCNXgHLBrCysoLOzk4Y9AYYOzqg1+sl0mg0ik6nxVjsKkLpHoQy/6R7EEpb0O8wQq/XY2FhAZubm3C73dBqtdBptdBoNBIxarXS2tqKEwzDgOM48DwPQRAgCAKy2SwqlQqq1SrK5TKSySTMZjPUarVELS0tikqlwmlqtRoMwzTodDqIoohSqYTx8XEwDAOVSoXm5maJiEgmIlykra0NdrsdTU1Np/82EZGHiPaJ6OMl7RFR718Ge5uCNFZveAAAAABJRU5ErkJggg==",
oncommand: function(){
var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
try {
var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + "\\Cache\\" + new Date().getTime() + ".rar";
file.initWithPath(path);
} catch (e) {
var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache\\" + new Date().getTime() + ".rar";
}
file.initWithPath(path);
Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI((gContextMenu.mediaURL || gContextMenu.imageURL), null, null), null, null, null, null, file, null);
setTimeout(function () {
file.launch();
}, 100);
}
});

/*——————————选中文本右键——————————*/

//搜索选中文本
new function () {
var items = [
//打开方式(默认当前页面)，通过where 更改，具体tab(前台)、tabshifted(后台)、window(窗口)

{label:"Baidu搜索",accesskey: "B",url:"http://www.baidu.com/baidu?wd=%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaWSy0sCURjF/XfuRugukha1CzeBCBKIFFFIBEGrCoRwE4EErlskoYW0EFy0iBAkCMFNBCGuKrqjNg6OgzOTjY+5nhbh3ehMrw/O8vud73E8hDL8Rx5CGf5ajoBCsQuvT0IubwIATk51xA/bsPkPAdFtBYQyLIXeUCpbYtybQtcd0Na+LHb2WiCUYTXaRC5vCsBdyXIG3D/0QCjD2qaCl9cB9g9UPFb66OgcuzEVmayBpmKjVLamAxJJTTg9PQ+mHm1+sQ5CGS4ujUlAJmuAUIaZOQkdnaNS7SMYlhGKyKjVh7B6I2EQi6uTAJsDV9fvqFT7YNIQsws10eAPNNDWODa2FHh9Eoq3H85faKk2/IHGRGCWV2RYvZH7Fzo6n9o8VmS9CcPkzoBUWv82umfnhjNgfEg3pdK6M8AwuUihP9DA0bGGRFJDMCyLYLmu8NsSgP/oExgMERjFwInkAAAAAElFTkSuQmCC",where: 'tab'},

{label:"Google搜索",accesskey: "G",url:"http://www.google.com/search?q=%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC",where: 'tab'},

{label:"Bing搜索",accesskey: "M",url:"http://www.bing.com/search?q=%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jWP4v5PhPyWYAZnzfQsz+Qb828nwPyAg4H9OovP/1W3q5BsQEBDwPzXWjTIDAgICqGNAWbr9/+UtGv/vLuUnz4AplYZwfkqM+/+ZNXr/L8wVI80LkaE+KOIBAQH//5FiwNfNrP87isxIMyA30fn//50M/+8u5f/fnGdJmgvS41z/X5wr+r+nxOR/IJrG5Bj3/4enyuAOg7wkp/8Ty43/BwX6o2gMDvL7v6hRG2tKRUnKfaXGGM5tzLX6/2QlD3F54f9Ohv8Hp8j+jwrz+Z8a4/7/+HQp0jITDP/axvz/7w5G0nMjORgALS2D1pyznwIAAAAASUVORK5CYII=",where: 'tab'},
{},
{label:"Wiki-EN",url:"https://en.wikipedia.org/wiki/%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABo0lEQVQ4ja2TO4siQRSFC5lJOlUjEQQDE8FYRREFBUEwMDEcEJPGH2BsZiQoBgaiYCoiBv4FwRZDTQQROxE0sum2H3wT7EzDrLvs80Z1LnW+OkXVFcAr8Aas+f1af3hexcfib+tN/OHJT0mEbdvouo6u6xiGAeBq0zRxHMfVjuNgmqarbdtGbLdbMpkMQgh6vR6O41AoFBBCMBwOOZ1OJBIJcrkcqqoym83wer2Uy2V2ux0C4Hg88vLywnw+B0DTNEKhEN1uF4BsNsvtdgPg8XiQTCaxLAvgGwCgWq2SSqXcyw0GA4LBINPplHa77fYnkwn9ft/VLmCz2SCEYLVaAWBZFuFwmFgshq7rrqFYLKJp2jPgM2qlUnG1LMv4fD43rqIoNJvNL8/wBbBcLvF4PBwOBwBKpRJ+v5/xeAxAvV5HVdWfAwCi0SiyLLNYLOh2u7RaLSKRCJfLhVqt9v32Z8BoNEKSJPL5PIZhcL1ekSSJeDyOoii/BpimSSAQoNPpuL1Go0E6nX4yfwKevvJ+v8dxHFff73fO5/OP/Ov/Mkz/NM7vB+B52iVL10sAAAAASUVORK5CYII=",where: 'tab'},

{label:"Wiki-ZH",url:"https://zh.wikipedia.org/wiki/%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABo0lEQVQ4ja2TO4siQRSFC5lJOlUjEQQDE8FYRREFBUEwMDEcEJPGH2BsZiQoBgaiYCoiBv4FwRZDTQQROxE0sum2H3wT7EzDrLvs80Z1LnW+OkXVFcAr8Aas+f1af3hexcfib+tN/OHJT0mEbdvouo6u6xiGAeBq0zRxHMfVjuNgmqarbdtGbLdbMpkMQgh6vR6O41AoFBBCMBwOOZ1OJBIJcrkcqqoym83wer2Uy2V2ux0C4Hg88vLywnw+B0DTNEKhEN1uF4BsNsvtdgPg8XiQTCaxLAvgGwCgWq2SSqXcyw0GA4LBINPplHa77fYnkwn9ft/VLmCz2SCEYLVaAWBZFuFwmFgshq7rrqFYLKJp2jPgM2qlUnG1LMv4fD43rqIoNJvNL8/wBbBcLvF4PBwOBwBKpRJ+v5/xeAxAvV5HVdWfAwCi0SiyLLNYLOh2u7RaLSKRCJfLhVqt9v32Z8BoNEKSJPL5PIZhcL1ekSSJeDyOoii/BpimSSAQoNPpuL1Go0E6nX4yfwKevvJ+v8dxHFff73fO5/OP/Ov/Mkz/NM7vB+B52iVL10sAAAAASUVORK5CYII=",where: 'tab'},
{},
{label:"汉典",url:"http://www.zdic.net/search?q=%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4jY2TMWrEMBBFdQYJuU23BsM2gbQBFSl0AEsEs+CzxClETpALpEwbttjGJ9hiwXLh1uf4W81EcpRNBgTfo9HTeDQjlnmCk7q4xrbP1joErEPIfGJsezipsbWPt5eiTo0BJfOqwjJPAAAnNevUorE54Hw6ZoCSzmN2ENFY3jifjlkNurpBNDbTFAcAl/0DRFc3DEhrkeptNgRwUkNQ4H8BTurfAV5V6OoGz4/3nHZXN3BSIxrL+ibgryIWAVQY+r9bOo1nwOvB/6j+Vqc+ryrWwqsdtrbME74+3/l7HUKxkZzUEJf9U+ZMe2Eb7O9UBnJSf/fBMk/cLOntqa1DgJOaZ4NrQJNXSrMEoUszAL01vXc0FusQ+BCNL+1FYzG2Pa51VtKhEx+TOgAAAABJRU5ErkJggg==",where: 'tab'},

];
var menu = PageMenu({
condition:"select",
label: "搜索选中文本",
accesskey: "S",
insertAfter:"context-viewpartialsource-selection",
position: 2,
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHDSURBVDhPpVJbKENhHJ887NmLcnmQZ+U6SZ7mEk+ur8qDXEpMLBSRJbRHlzSRDFuNkkQRHoaiXE44LxbTssk0zhpDdj7/H0ecsYflV//+5/+7fN853/kUf4ExFkkVJYpiElUhVbnUk8BDl6y/AZGMcbu2O41+lecrDFYhu38jgI4ZPPSQi2CHXdutRmM6uMnUrbHgAg8dPikiB15Tv3LGq3pWmdZ86OQcnok3UWxExwweOnxSRA4SCiuGtwRV1zLjrjwTNMdTKdExg4cOnxSRg4TyrLalQEbHIsPOCEu8EjN46PB9BIKBlcsG1oV07Tzj7G75G9AMHjp8UuQbdDARJKj7zXv2tGYT005uO7kL9+cZUMcMftCy//sMpHCMwy30Fncv+PJaLf60BiMLrvqRzRsrfy3/C1/hS9dDe2m32ZtaN8lyWo3Pupmdq1LdgqCqmQqg95mtvPXEIb8HP8MlnXPelGoDy20y+k/ttyPEF1AVUYW+iURGX7jutSUdc97kqlGmbjT4OZtLT6YEmTEUfL6XlLKWKU9y5RBTN4yFFwZgnl45ms2vHX86PncOhhUG6BOUFEh8fHzNpOfYsML/h0LxDlnLtXo5zlbFAAAAAElFTkSuQmCC"
});
menu(items);
};

/*——————————输入框右键——————————*/

//粘贴并确定
page({
    label: "粘贴并确定",
    condition: "input",
    accesskey: "V",
    insertBefore: "context-copy",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACA0lEQVQ4jX3Sz2vTcBjH8fwPQwQPggdB8CCMUXZQUJjgDo5UQSMKC1hYvGwjMlsWUWSk0c0gLclXwcwm1HVjgg6h4g9wUAqTFaQI89CDA4ewtPQXBHYIDx8P0mCb6AOv0wNvvjx8OW5gbNtmjuPAcRzYts0G96FZTcbYWmoUa6lRLC/OgDEG3/fh+z4YY1henEFvv5qMhYOFuRgO9qs42K9C0zR4ngfXdeG6LjzPg6Zpwb4wF0MokJdH0KgY2CtOIZ+ZRTKZ7JPPzGKvOIVGxUBeHgkHctPDcLey2N1IYPfNzWgbCbhbWeSmh8OB57dO4Vf5CWqvRNTWJwPvV9LoHXNQ33FZ4iR+burYWbmBnZfXA5ZlgYgiWZaFUqn05zWZyRP48ekRqrmrqL64EjBNE0SERqOBer0eHJaIYJomTNOEYRiM068dR+1dGtvPLmH7aTyg6zqICM1msy/y90t0XQf38PIxfH+7gHJ2AuXMxYCqqiAitFqtUKQXUlUV3MLEUXx7fR+bj8fxeelCQFGUIBAVISIoigLu3vgRfF2/i4/p8/igjgVkWQYRod1uR0aICLIsg5sfO4xKYR7FB+f6SJIEIkKn04mMEBEkSQJ35+whfMmnQkRRBBGh2+1GRogIoiiCk08PsdtnhjBIEIR//oMeQRDCP7M3PM+zeDyO/+F5nv0G0AKQNKy5AuIAAAAASUVORK5CYII=",
    oncommand: function(event) {
        goDoCommand("cmd_paste");

         window.QueryInterface(Ci.nsIInterfaceRequestor)
             .getInterface(Ci.nsIDOMWindowUtils)
             .sendKeyEvent("keypress", KeyEvent.DOM_VK_RETURN, 0, 0);
    }
})

//插入code代码
page({
    label: "插入code代码",
    condition: "input",
    accesskey: "I",
    insertAfter: "context-paste",
    oncommand: function() {
        var str = addMenu.convertText('[code]%P[/code]');
        addMenu.copy(str);
        goDoCommand('cmd_paste');
    },
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACS0lEQVQ4jZXR30tTcRjH8f07IgRB0EUXYYgkSYapF91E0I03XhzIOJKaw4tgGEKHE7RpLH/BtNl0Q9fWkgwKJgqHGYohgo35azvn7MzNc87k3YW6H6hBDzwXz/OFFzyfr8NxVm29Mbm9b5F/dVtvTHZcVa09MfZ1mz3dYlezSKkWKdUkmTntP2mT1p4YD198uRxp6Y5yoNtEEzphRSO0qhFYVvHH0/h+HpLMmLT3LdLSHaVFjFxEmrvCHGZtFn9liSR0FhSN4KrGp2WVj/E068l86ZTmrjD3ny1UI01CiLRhs7RhXIpspApVeTQJIe4JwTLS2DlLxrD58Tt3KbKZKiAOKzz3KAyMrzEwlqCxc5YS0NDhR80ViW8dXYmcn3OeSUOHvwx0vxrH6/USjHwnvnVEILyE1+vFP//tAuKPp0lmTO489Z0Cbrdb9ng8FItFPB4PK9t5Kuep4NcqJLCsklJNbj+ewCFJkixJEqZpIkkSM6EYys4x03NRKvcTM5ESElrVSKkWtx59wOFyuSgUCrhcLkLzn1lPmawlTZSdYyb981S+n2cSVjR2NYubbSM4+vv7ZafTiaZpOJ1OJqfnWE+ZjE3NUbkfmQyUgo0mdPZ0ixsP3p1mIIqiLIoihmEgiiKbexaVs2d0+sLv7Os215veln+h/clLBEHg/biPrQOL4VEfgiDg9vpQdo5Z2c5XIQe6zbW7b8pAbf0QucIJxllnCyfo+RP0fBHtqIh6VETNFckYNmnD5jBrU1s/VAZq6gblmrrX/F8Pyn8BzRewGKfber0AAAAASUVORK5CYII=",
//限定只在kafan生效
  onshowing: function(menuitem) {
    var isHidden = !(content.location.host == 'bbs.kafan.cn');
    this.hidden = isHidden;
},
});

//快捷回复
new function(){
var items = [
{label:"mail163~~~",input_text: "dupontjoy@163.com",accesskey: "1",image:" "},
{label:"Gmail~~~",input_text: "dupont2305@gmail.com",accesskey: "2",image:" "},
{label:"dupontjoy~~~",input_text: "dupontjoy",accesskey: "3",image:" "},
{},
{label:"谢谢你的解答~~~", input_text: "非常感谢你的解答！！！",image:" "},
{label:"看起来很不错~~~", input_text: "看起来很不错哦~~~\n谢谢啦！！！",image:" "},
{},
{label:"不明真相的~~~", input_text: "不明真相的围观群众~~~\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",image:" "},
{label:"不知LZ在说~~~", input_text: "不知道LZ在说什么\n\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",image:" "},
{label:"嘿嘿~~~", input_text: "\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",image:" "},
{},
{label:"為神馬要15字~~~", input_text: "為神馬要15字，好吧，那就來標凖15字~~~",image:" "}
];
var menu = PageMenu({
label:"快速回复",
condition:"input",
accesskey: "W",
insertAfter: "插入code代码",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAASZQTFRFq2MmrGUpxZNqyJNP+e/P////wIlcUFBQnp6eoaGhoZmSrY51sJN6UFBQVFRUWFhYXl5eY2NjampqcHBwd3d3fX19hISEioqKkJCQlZWVmpqanF8mnpmWnp6eoaGht3k6uH5MuoFRwY5kwpJpw4tGxI9gxY1JxZRlxpFNx5NWx5dryJNRypZWyptwy5hRy51szJlSzJpRzJ51zp9ezqF5zqR8zqqL0qd/17uk37iD5NfM5eXl5rgl5rgn5rs/5ubm5+fn6L046Ojo6enp6uLc6urq6+vr7Ozs7e3t7u7u7+/v8NSm8PDw8fHx8sMA8vHx8vLy88so89BC9NBE9Nmf9eTI9ebV9uHA9u/o+OrC+OvC+eO8+ePL+unX/Pv6/f39/vz5////ByadbwAAAA10Uk5TAAAAAAAAG5aWlqHFxQD6C4kAAADMSURBVBgZBcFNS8NAFIbR595MaqEbrQa6UgSFFhVCdy7Fvy3uFUQQBHEruAmkNqHkg8y8nmN5KACAagAInD0AAM/VCAQiPwlNXG1UjwlHmLvlgeXqZm4WEJ5w0vC97tNX7wjLPLPV57qbFudZQBhQfJRd3LUzOcLMlu9lF+v9tEmOcDt523axbuLtE45wey3HWDfj3ZFwhP0Vi3l76MsdwhHZdBHttN3uDREQVJd1/XvfGIiA0PiSFdcHJ6EUkB8/GgDgkuU+AwAAxuEflNBc+frSdwMAAAAASUVORK5CYII=",
//跟进depft更新
oncommand: function(event){
var input_text = event.target.getAttribute('input_text');
if(input_text) {
addMenu.copy(input_text);
setTimeout(function() {
goDoCommand("cmd_paste");
}, 100);
}
}
});
menu(items);
};


//隐藏相同项。必须，不能删除
function syncHidden(event) {
Array.slice(event.target.children).forEach(function(elem){
var command = elem.getAttribute('command');
if (!command) return;
var original = document.getElementById(command);
if (!original) {
elem.hidden = true;
return;
};
elem.hidden = original.hidden;
elem.collapsed = original.collapsed;
elem.disabled = original.disabled;
});
};

//移动图标，代替Movebutton.uc.js，需配合RebuildWhenStart.uc.js
new function(){
tab({
    id: "flashgot-media-tbb",
    insertBefore: "userChromebtnMenu",
    clone: false,  // 不克隆，直接改在原来的菜单上面
}
);
tab({
    id: "lpt_lastpass-compact-btn",
    insertBefore: "userChromebtnMenu",
    clone: false,  // 不克隆，直接改在原来的菜单上面
}
);
tab({
    id: "foxyproxy-toolbar-icon",
    insertBefore: "userChromebtnMenu",
    clone: false,  // 不克隆，直接改在原来的菜单上面
}
);

};

