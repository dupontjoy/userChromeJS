(function() {
  var ch = NEJ.P,
    bs = NEJ.O,
    gG = ch("nej.v"),
    rp = ch("nej.u"),
    bv = ch("nej.j"),
    bE = ch("nej.ut"),
    bB = ch("nm.x"),
    bkp = ch("nm.d"),
    Uc = "track-queue",
    bet = "track-history",
    Bj = "player-setting",
    kc = "random-queue",
    fi, bu;
  var VT = function() {
    var fR = function(beZ, beY) {
      return Math.random() - .5
    };
    return function(ca) {
      for (var i = 0, nA = []; i < ca; ++i) nA[i] = i;
      nA.sort(fR);
      return nA
    }
  }();
  bkp.fb = NEJ.C();
  fi = bkp.fb.br(bkp.iR);
  fi.bO = function(cr) {
    this.bS(cr);
    this.MV()
  };
  fi.MV = function() {
    var iB = !1;
    return function() {
      if (iB) return;
      iB = !0;
      this.AZ(Bj, {
        mode: 4,
        volume: .5,
        autoplay: !1,
        index: -1,
        lock: !0
      });
      var hm = this.AZ(Uc, []);
      this.nC(kc, VT(hm.length))
    }
  }();
  fi.gU = function() {
    return this.uo(Bj)
  };
  fi.kB = function(bhf, Rk, deleted) {
    var fU = this.gU(),
      Nb = fU[bhf];
    fU[bhf] = Rk;
    this.nS(Bj, fU);
    gG.bk(bkp.fb, "settingchange", {
      key: bhf,
      newValue: Rk,
      oldValue: Nb,
      deleted: deleted
    })
  };
  fi.gO = function(CM, bfK, bgW) {
    var Ne = this.gU().index;
    this.kB("index", CM);
    if (bfK === undefined) bfK = true;
    gG.bk(bkp.fb, "playchange", {
      newValue: CM,
      oldValue: Ne,
      autoplay: bfK,
      endtype: bgW
    })
  };
  fi.uY = function(CM, bfK, bgW, Np) {
    var nA = this.jn();
    if (!nA || !nA[CM]) return;
    if (bB.mK(nA[CM])) CM = this.bjx(CM, Np);
    if (CM < 0) {
      gG.bk(bkp.fb, "playerror", {
        code: 403
      });
      return
    }
    this.gO(CM, bfK, bgW)
  };
  fi.Nf = function() {
    return this.gU().index
  };
  fi.tr = function(cQ) {
    if (!cQ || rp.eH(cQ) && !cQ.length) return;
    var nA = this.jn();
    !rp.eH(cQ) ? nA.push(cQ) : Array.prototype.push.apply(nA, cQ);
    var ec = 1e3;
    if (nA.length > ec) {
      var Un = this.Nf(),
        bae = nA.length - ec;
      if (Un >= 0 && Un < bae) {
        var bez = nA.splice(0, bae + 1);
        if (bez[Un]) {
          nA.unshift(bez[Un]);
          this.kB("index", 0)
        }
      } else {
        nA.splice(0, bae);
        if (Un >= bae) this.kB("index", Un - bae)
      }
    }
    this.nS(Uc, nA);
    this.nC(kc, VT(nA.length));
    gG.bk(bkp.fb, "queuechange", {
      queue: nA
    })
  };
  fi.jn = function() {
    return this.uo(Uc)
  };
  fi.Nh = function(cQ, fc) {
    this.nS(Uc, []);
    if (!cQ || !cQ.length) {
      gG.bk(bkp.fb, "queuechange", {
        queue: []
      });
      this.nC(kc, [])
    } else {
      this.tr(cQ)
    } if (fc !== undefined) this.gO(fc === 0 ? -1 : 0, true, 3)
  };
  fi.bex = function(Xv) {
    if (Xv) {
      this.Nh([]);
      this.kB("index", -1);
      return
    }
    var Uo = this.gU().index,
      ZI = this.mB(Uo);
    if (ZI) {
      this.Nh([ZI]);
      this.kB("index", 0)
    }
  };
  fi.MX = function() {
    var AM = /^\/m\/(album|playlist|dj)\?id=(\d+)/;
    var EJ = function(bY, bP) {
      if (!bY) return;
      if (!bP) {
        bY.from = {};
        return
      }
      if (!bP.fid) {
        var bG = {
            dj: 17,
            album: 19,
            playlist: 13
          },
          SL = (bP.fhref || "").match(AM);
        if (SL) {
          bP.fid = bG[SL[1]];
          bP.fdata = SL[2]
        }
      }
      bY.from = {
        fid: bP.fid,
        fdata: bP.fdata,
        fhref: bP.fhref
      }
    };
    return function(nA, bP) {
      if (!nA || !nA.length) return;
      var hm = this.jn();
      for (var i = 0, bb = -1, Qm = []; i < nA.length; ++i) {
        bb = this.Zt(nA[i].id, bP.fid, bP.fdata);
        if (bb >= 0) continue;
        Qm.push(nA[i])
      }
      rp.bZ(Qm, function(bm) {
        EJ(bm, bP)
      });
      this.tr(Qm)
    }
  }();
  fi.Nj = function(bb) {
    var nA = this.jn();
    if (bb < 0 || bb >= nA.length) return;
    fU = nA.splice(bb, 1);
    this.nS(Uc, nA);
    this.nC(kc, VT(nA.length));
    gG.bk(bkp.fb, "queuechange", {
      queue: nA,
      index: bb,
      deleted: !0
    });
    var Uo = this.gU().index;
    if (bb < Uo) {
      this.kB("index", Uo - 1, "deleted")
    } else if (bb == Uo) {
      this.uY(bb == nA.length ? bb - 1 : this.nk(), !1, 3)
    }
    return fU
  };
  fi.mB = function(bb) {
    var nA = this.jn();
    return nA[bb]
  };
  fi.nk = function() {
    var nA = this.jn(),
      dQ = this.gU();
    if (!nA || !nA.length) return -1;
    if (dQ.index != -1) return dQ.index;
    var bb = dQ.mode == 5 ? rp.mq(0, nA.length) : Math.max(Math.min(dQ.index, nA.length), 0);
    return bb
  };
  fi.Nn = function() {
    var nA = this.jn(),
      dQ = this.gU();
    if (!nA || !nA.length) return -1;
    var bb = (dQ.index - 1 + nA.length) % nA.length;
    if (dQ.mode == 5) {
      var SM = this.ow(kc),
        Td = Math.max(0, rp.eY(SM, dQ.index));
      Td = (Td - 1 + SM.length) % SM.length;
      bb = SM[Td]
    }
    if (bb === undefined) rp.mq(0, nA.length);
    return bb
  };
  fi.No = function() {
    var nA = this.jn(),
      dQ = this.gU();
    if (!nA || !nA.length) return -1;
    var bb = (dQ.index + 1) % nA.length;
    if (dQ.mode == 5) {
      var SM = this.ow(kc),
        Td = Math.max(0, rp.eY(SM, dQ.index));
      Td = (Td + 1) % SM.length;
      bb = SM[Td]
    }
    if (bb === undefined) rp.mq(0, nA.length);
    return bb
  };
  fi.bjx = function(CM, Np) {
    var nA = this.jn(),
      dQ = this.gU();
    if (!nA || !nA.length) return -1;
    var cO = 0,
      bb, bY;
    do {
      cO++;
      if (!Np) {
        bb = (CM + 1) % nA.length;
        if (dQ.mode == 5) {
          var SM = this.ow(kc),
            Td = Math.max(0, rp.eY(SM, CM));
          Td = (Td + 1) % SM.length;
          bb = SM[Td]
        }
      } else {
        bb = (CM - 1 + nA.length) % nA.length;
        if (dQ.mode == 5) {
          var SM = this.ow(kc),
            Td = Math.max(0, rp.eY(SM, CM));
          Td = (Td - 1 + SM.length) % SM.length;
          bb = SM[Td]
        }
      }
      bY = nA[bb];
      if (bY && !bB.mK(bY)) return bb;
      CM = bb
    } while (cO < nA.length);
    return -1
  };
  fi.Zt = function(JD, bfH, bfJ) {
    var hm = this.jn();
    if (!hm || !hm.length) return -1;
    return rp.eY(hm, function(bm) {
      if (bm.id != JD) return !1;
      var dK = bm.from;
      if (!dK) return !1;
      if (dK.type == bfH && dK.rid == bfJ) return !0;
      if (dK.fid == bfH && dK.fdata == bfJ) return !0;
      return !1
    })
  };
  fi.beC = function(eE) {
    if (!eE) return;
    var gR = bv.uH("playlist") || "";
    gR = !gR ? [] : gR.split("|");
    var bb = rp.eY(gR, eE + "");
    if (bb >= 0) gR.splice(bb, 1);
    gR.unshift(eE);
    if (gR.length > 8) gR.splice(8, gR.length - 8);
    bv.uH("playlist", {
      value: gR.join("|"),
      expires: 7
    })
  };
  bE.gE.bH({
    element: bkp.fb,
    event: ["playchange", "queuechange", "settingchange", "playresource", "playerror"]
  })
})();
(function() {
  var ch = NEJ.P,
    bs = NEJ.O,
    bC = NEJ.F,
    gG = ch("nej.v"),
    bE = ch("nej.ut"),
    bkp = ch("nm.d"),
    AB = {},
    fi, bu;
  var xd = function(bhc, cr) {
    bhc.conf = cr.conf;
    return bhc
  };
  bkp.hL({
    "res-mv-get": {
      type: "GET",
      url: "/api/song/mv",
      format: xd
    },
    "res-song-get": {
      type: "GET",
      url: "/api/song/detail/",
      format: function(bhc, cr) {
        if (!!bhc.songs && bhc.songs.length > 0) bhc.song = bhc.songs[0];
        else bhc.song = AB;
        delete bhc.songs;
        return xd(bhc, cr)
      },
      filter: function(cr) {
        cr.data.ids = "[" + cr.data.id + "]"
      }
    },
    "res-program-get": {
      type: "GET",
      url: "/api/dj/program/detail",
      format: xd
    },
    "res-album-get": {
      type: "GET",
      url: "/api/album/{id}",
      format: xd
    },
    "res-playlist-get": {
      type: "GET",
      url: "/api/playlist/detail",
      format: function(bhc, cr) {
        bhc.playlist = bhc.result;
        delete bhc.result;
        return xd(bhc, cr)
      }
    },
    "res-mv-play": {
      type: "GET",
      url: "/api/song/mv/play",
      format: xd
    },
    "res-playlist-play": {
      type: "GET",
      url: "/api/playlist/update/playcount",
      format: xd
    },
    "res-program-play": {
      type: "GET",
      url: "/api/dj/program/listen",
      format: xd
    },
    "res-hotSongs-get": {
      type: "GET",
      url: "/api/artist/{id}",
      format: xd
    },
    "res-lyric-get": {
      type: "GET",
      url: "/api/song/media",
      format: function(bhc, cr) {
        bhc.lyric = {
          lyric: bhc.lyric
        };
        bhc.lyric.nolyric = bhc.nolyric;
        return xd(bhc, cr)
      }
    }
  });
  bkp.BW = NEJ.C();
  fi = bkp.BW.br(bkp.iR);
  fi.JW = function(bc, eE, cr) {
    cr = cr || {};
    var fU = this.ow(this.Aw(bc, eE));
    if (fU && bc != 13) {
      this.bk("onresourceload", bc, eE, fU, cr.conf);
      return
    }
    cr.data = {
      id: eE
    };
    cr.onload = this.Ka.bha(this, bc, eE);
    cr.onerror = this.Kb.bha(this, bc, eE);
    this.cs("res-" + this.bfx(bc) + "-get", cr)
  };
  fi.Ka = function(bc, eE, bhc) {
    var fU = bhc[this.bfx(bc)];
    this.nC(this.Aw(bc, eE), fU);
    this.bk("onresourceload", bc, eE, fU, bhc.conf)
  };
  fi.Kb = function(bc, eE, bhc, cr) {
    if (bhc.code != 404) {
      this.bk("onresourceerror", bc, eE, bhc.code);
      return
    }
    this.nC(this.Aw(bc, eE), AB);
    this.bk("onresourceload", bc, eE, AB, cr.conf)
  };
  fi.KJ = function(bc, cr) {
    this.cs("res-" + this.bfx(bc) + "-play", cr)
  };
  fi.Aw = function(bc, eE) {
    return "res-" + this.bfx(bc) + "-" + eE
  };
  fi.bfx = function(bc) {
    var bG = {
      2: "hotSongs",
      13: "playlist",
      17: "program",
      18: "song",
      19: "album",
      21: "mv",
      41: "lyric"
    };
    return bG[bc]
  }
})();
(function() {
  var ch = NEJ.P,
    Oo = ch("nej.e"),
    gG = ch("nej.v"),
    rp = ch("nej.u"),
    bhg = ch("nej.ui"),
    bB = ch("nm.x"),
    fV = ch("nm.i"),
    fi, bu;
  fV.rN = NEJ.C();
  fi = fV.rN.br(bhg.oX);
  fi.cP = function() {
    Oo.bt(this.bl, "z-hover");
    Oo.bt(this.bl, "z-hover1");
    this.gO(!1);
    this.dm()
  };
  fi.dc = function() {
    this.du = "m-player-playtrack"
  };
  fi.cA = function() {
    this.dh();
    Oo.bF(this.bl, "js-iparent");
    var nA = Oo.dw(this.bl);
    this.Oa = nA[1];
    this.Ob = nA[2];
    this.Oc = nA[3];
    this.lM = nA[4];
    this.TJ = nA[5].firstChild;
    gG.ba(this.bl, "mouseover", this.bjA.bha(this));
    gG.ba(this.bl, "mouseout", this.bjB.bha(this))
  };
  fi.eT = function() {
    var beD = function(hr) {
      if (!hr) return "";
      if (hr.program) {
        var dz = hr.program.dj;
        return !dz ? "" : '<a href="/user/home?id=' + dz.userId + '" hidefocus="true">' + rp.km(dz.nickname) + "</a>"
      }
      return bB.Fs(hr.artists)
    };
    return function(fU) {
      bB.mK(fU) ? Oo.bF(this.bl, "js-dis") : Oo.bt(this.bl, "js-dis");
      this.Oa.innerHTML = (fU.name || "") + (!fU.djprogram ? "" : "[DJ节目]");
      this.lM.innerText = bB.sH(fU.duration / 1e3);
      this.Oc.innerHTML = beD(fU);
      var Rv = bB.bap(fU.from, fU.id);
      if (Rv) {
        Oo.bt(this.TJ, "ico-src-dis");
        this.TJ.href = "#" + Rv.link;
        this.TJ.title = "来自" + Rv.title
      } else {
        Oo.bF(this.TJ, "ico-src-dis");
        this.TJ.href = "#";
        this.TJ.title = "暂无来源"
      }
    }
  }();
  fi.gO = function(Oe) {
    if (Oo.cV(this.bl, "js-dis")) return;
    !Oe ? Oo.bt(this.bl, "z-sel") : Oo.bF(this.bl, "z-sel")
  };
  fi.bjA = function() {
    var Il = Oo.cV(this.bl, "js-dis") ? "z-hover1" : "z-hover";
    Oo.bF(this.bl, Il)
  };
  fi.bjB = function() {
    var Il = Oo.cV(this.bl, "js-dis") ? "z-hover1" : "z-hover";
    Oo.bt(this.bl, Il)
  }
})();
(function() {
  var ch = NEJ.P,
    cC = window,
    Oo = ch("nej.e"),
    gG = ch("nej.v"),
    rp = ch("nej.u"),
    bE = ch("nej.ut"),
    bhd = ch("nej.p"),
    fV = ch("nm.i"),
    bkp = ch("nm.d"),
    bB = ch("nm.x"),
    be = ch("nm.l"),
    bN = ch("nm.m"),
    gb = ch("nm.u"),
    dO = ch("nm.w"),
    bp = ch("nm.m.f"),
    bhX = /^https?:\/\/.*?\//i,
    fi, bu;
  bp.Ds = NEJ.C();
  fi = bp.Ds.br(bE.gM);
  fi.cS = function() {
    this.dq();
    this.bl = Oo.hA("m-player-playlist");
    this.bgM = Oo.bI(this.bl, "listbd")[0];
    this.bgb = Oo.bI(this.bl, "listbdc")[0];
    var nA = Oo.dw(this.bl);
    this.Og = Oo.bI(nA[0], "j-flag");
    this.bfL = this.Og[2];
    nA = Oo.bI(nA[1], "j-flag");
    this.bfA = nA[0];
    this.kl = nA[1];
    this.Oh = nA[2];
    this.gr = nA[3];
    this.bfl = nA[4];
    this.fB([
      [this.bl, "click", this.eX.bha(this)],
      [this.bfA, "load", this.bgk.bha(this)],
      [bkp.fb, "queuechange", this.xg.bha(this)],
      [bkp.fb, "settingchange", this.tl.bha(this)]
    ]);
    this.bi = bkp.fb.bH();
    if (bhd.dC.browser == "ie") Oo.ck(this.bfA, "display", "none")
  };
  fi.gK = function(cr) {
    var sR = this.bi.Nf(),
      nA = this.bi.jn();
    this.kl.style.display = !nA.length ? "none" : "";
    this.Oh.style.display = !nA.length ? "" : "none";
    this.Og[0].innerText = "播放列表(" + nA.length + ")";
    this.dn = fV.rN.bW(this.dn);
    this.dn = Oo.hy(nA, fV.rN, {
      parent: this.kl
    });
    if (!this.bfv) this.bfv = dO.bfF.bH({
      track: this.gr,
      slide: this.bfl,
      content: this.bgb,
      speed: 4
    });
    else this.bfv.RQ(); if (this.dn[sR]) {
      this.dn[sR].gO(true);
      var bhb = this.kl.parentNode,
        bT = sR * 28;
      bhb.scrollTop = Math.min(bhb.scrollHeight, Math.max(0, bT - 112));
      this.bfv.bfX();
      var bY = this.bi.mB(sR);
      this.bfL.innerText = bY.name ? bY.name : "";
      if (bY.program) this.bfA.src = bY.program.blurCoverUrl;
      else this.bfA.src = "http://music.163.com/api/img/blur/" + bY.album.picId
    }
    if (!this.bcU) {
      this.bcU = dO.bfV.bH();
      this.bcU.bk("onshow", {});
      this.bcU.bfM();
      if (bY) this.bcU.bfG(bY);
      else this.bcU.bfG(false)
    } else {
      this.bcU.bfM();
      if (bY) this.bcU.bfG(bY);
      else this.bcU.bfG(false)
    }
  };
  fi.uQ = function(cr) {
    var bX = this.HA(cr);
    this.JH(cr);
    bX.insertAdjacentElement("afterBegin", this.bl)
  };
  fi.bgk = function() {
    var ds = this.bfA.clientHeight;
    var bgl = parseInt(Oo.di(this.bgb, "height"));
    Oo.ck(this.bfA, "top", (bgl - ds) / 2 + "px")
  };
  fi.eX = function() {
    var WT = function(bhb) {
      var fJ = bhb;
      while (!!fJ && !Oo.cV(fJ, "js-iparent")) fJ = fJ.parentNode;
      return fJ
    };
    var ul = function(nA, bhb) {
      if (!nA || !nA.length || !bhb) return -1;
      var bhI = WT(bhb),
        bb = rp.eY(nA, function(bm) {
          return bm.mL() === bhI
        });
      return bb
    };
    return function(fq) {
      gG.qX(fq);
      var bhb = gG.cc(fq);
      if (bhb.href) {
        var hk = bhb.href.replace(bhX, "/");
        if (!/#$/.test(hk)) {
          if (hk.charAt(1) != "#") {
            gG.cD(fq);
            location.hash = "#" + hk
          }
          this.bM();
          return
        }
        gG.cD(fq)
      }
      var bhb = gG.cc(fq, "d:action");
      if (!bhb) return;
      gG.cD(fq);
      var gi = Oo.bK(bhb, "action"),
        bb = ul(this.dn, bhb);
      switch (gi) {
        case "likeall":
          var hm = this.bi.jn();
          if (hm.length > 0) {
            this.bM();
            var bju = [],
              bjv = [];
            rp.bZ(hm, function(bm) {
              if (!bm.program) bju.push(bm)
            });
            rp.bZ(bju, function(bm) {
              if (!bB.mK(bm)) bjv.push(bm)
            });
            if (bju.length > 0 && bjv.length <= 0) {
              bB.mz("由于版权保护，您所在的地区暂时无法使用这批歌曲。")
            } else {
              cC.subscribe(bjv, !1)
            }
          }
          break;
        case "close":
          this.bM();
          break;
        case "clear":
          this.bi.bex(true);
          break;
        case "iplay":
          if (Oo.cV(bhb, "js-dis")) {
            bB.mz();
            return
          }
          this.bi.gO(bb, true, 3);
          break;
        case "ilike":
        case "ishare":
          var bY = this.dn[bb].jr();
          if (bY && bY.mp3Url) {
            if (gi == "ishare") {
              !bY.program ? bB.ki({
                rid: bY.id,
                type: 18,
                purl: bY.album.picUrl
              }) : bB.ki({
                rid: bY.program.id,
                type: 17,
                purl: bY.album.picUrl
              })
            } else {
              cC.subscribe(bY, !!bY.program)
            }
            this.bM()
          }
          break;
        case "idelete":
          this.bi.Nj(bb);
          break
      }
    }
  }();
  fi.gI = function(fq) {
    if (!this.dn || !this.dn.length) return;
    var bm = this.dn[fq.oldValue];
    !!bm && bm.gO(!1);
    bm = this.dn[fq.newValue];
    !!bm && bm.gO(!0);
    var bhb = this.kl.parentNode,
      bT = fq.newValue * 28;
    if (this.bi.gU().mode == 5) {
      bhb.scrollTop = Math.min(bhb.scrollHeight, Math.max(0, bT - 112))
    } else {
      if (bT > bhb.scrollTop + 224) bhb.scrollTop = Math.min(bhb.scrollHeight, Math.max(0, bT));
      else if (bT < bhb.scrollTop) bhb.scrollTop = Math.min(bhb.scrollHeight, Math.max(0, bT - 224))
    }
    this.bfv.bfX();
    var bY = this.bi.mB(fq.newValue);
    this.bfL.innerText = bY.name ? bY.name : "";
    if (bY.program) this.bfA.src = bY.program.blurCoverUrl;
    else this.bfA.src = "http://music.163.com/api/img/blur/" + bY.album.picId;
    this.bcU.bfG(bY)
  };
  fi.xg = function(fq) {
    this.bk("onrefresh")
  };
  fi.tl = function(fq) {
    if (fq.key == "index") {
      this.gI(fq)
    }
  };
  fi.bM = function() {
    this.bk("onhide");
    this.bk("onclose")
  };
  fi.sx = function() {
    return !!this.bl.parentNode && !!this.bl.parentNode.tagName
  };
  fi.mL = function() {
    return this.bl
  };
  fi.bfN = function(cn) {
    this.bcU.bfN(cn)
  };
  fi.bgm = function() {
    this.bfL.innerText = "";
    if (this.bcU) this.bcU.bgn()
  };
  fi.wG = function() {
    this.Ky()
  };
  fi.uQ = function(cr) {
    this.JH(cr);
    if (this.bcU) this.bcU.bjt()
  }
})();
(function() {
  var ch = NEJ.P,
    bs = NEJ.O,
    Oo = ch("nej.e"),
    gG = ch("nej.v"),
    rp = ch("nej.u"),
    bE = ch("nej.ut"),
    gb = ch("nm.u"),
    fi, bu;
  gb.vA = NEJ.C();
  fi = gb.vA.br(bE.dD);
  fi.dJ = function() {
    var NM = function(bo) {
      gG.ba(this.bL, bo, this.NN.bha(this, bo))
    };
    return function() {
      this.dY();
      this.bL = new Audio;
      this.go = ["play", "pause", "ended", "playing", "progress", "loadeddata", "timeupdate", "error", "emptied"];
      rp.bZ(this.go, NM, this);
      this.WX = 0;
      this.UH = 0
    }
  }();
  fi.cP = function() {
    this.jC();
    this.Nz()
  };
  fi.jC = function() {
    if (!this.bL.currentSrc) return;
    this.UQ();
    this.bL.currentTime = 0;
    this.bL.pause();
    this.bL.src = ""
  };
  fi.NN = function(bo) {
    switch (bo) {
      case "play":
      case "loadeddata":
        if (bo == "loadeddata") this.UQ();
        this.bk("onstatechange", {
          state: 0
        });
        break;
      case "pause":
        this.bk("onstatechange", {
          state: 2
        });
        break;
      case "ended":
        this.bk("onstatechange", {
          state: 4
        });
        break;
      case "playing":
        this.bk("onstatechange", {
          state: 1
        });
        break;
      case "progress":
        if (!this.bL.buffered.length) return;
        var Oo = this.bL.buffered.end(0);
        this.bk("onloadprogress", {
          loaded: Oo,
          duration: this.bL.duration
        });
        break;
      case "timeupdate":

        // tomwan
        window.M.trigger('play-progress', this.bL);


        this.bk("onplayprogress", {
          current: this.bL.currentTime,
          duration: this.bL.duration
        });
        break;
      case "emptied":
        break;
      case "error":
        var fM = this.bL.error,
          bY = this.bL.currentSrc,
          UO = this.bL.currentTime;
        if (fM) {
          switch (fM.code) {
            case fM.MEDIA_ERR_ABORTED:
            case fM.MEDIA_ERR_DECODE:
            case fM.MEDIA_ERR_ENCRYPTED:
              this.bk("onplayerror", {
                error: fM.code,
                src: bY,
                time: UO
              });
              break;
            case fM.MEDIA_ERR_NETWORK:
              this.beE(bY, UO);
              break;
            case fM.MEDIA_ERR_SRC_NOT_SUPPORTED:
              if (!!this.bL.src && this.bL.src != "http://" + location.host + "/" && this.bL.src.indexOf("#") < 0) {
                this.bk("onplayerror", {
                  error: fM.code,
                  src: bY,
                  time: UO
                })
              }
              break;
            default:
              this.bk("onplayerror", {
                error: -1,
                src: bY,
                time: UO
              });
              break
          }
        }
        break
    }
  };
  fi.gA = function(dG, beH, bfz) {
    this.UQ();
    this.bL.src = this.bqk(dG);
    if (bfz === undefined) bfz = true;
    if (bfz) {
      this.bL.play()
    }
  };
  fi.UQ = function() {
    this.UH = 0;
    this.WX = clearTimeout(this.WX)
  };
  fi.beE = function(dG, XF) {
    if (!dG || this.UH > 5) {
      if (this.UH > 5) this.bk("onplayerror", {
        error: 2,
        src: dG,
        time: XF
      });
      this.UQ();
      return
    }
    if (this.UH > 0) {
      var bb = dG.indexOf("#");
      dG = bb >= 0 ? dG.substring(0, bb) : dG;
      this.bL.src = dG + "#t=" + XF;
      this.bL.play()
    }
    this.UH++;
    this.WX = setTimeout(arguments.callee.bha(this, dG, XF), 5e3)
  };
  fi.jz = function() {
    this.bL.pause()
  };
  fi.kP = function() {
    this.bL.play()
  };
  fi.cd = function() {
    this.jC();
    this.bk("onstatechange", {
      state: 3
    })
  };
  fi.kQ = function(fm) {
    if (!this.bL.currentSrc) return;
    this.bL.currentTime = this.bL.duration * fm
  };
  fi.NH = function(mI) {
    this.bL.muted = !!mI;
    this.bk("onmutedchange", {
      muted: mI
    })
  };
  fi.mk = function(Rk) {
    this.bL.volume = Rk;
    this.bk("onvolumechange", {
      value: Rk
    })
  };
  fi.Dg = function() {
    return this.bL.played.length > 0 && !this.bL.ended && !this.bL.paused
  };
  fi.bqk = function(dG) {
    return dG + (dG.indexOf("?") > 0 ? "&" : "?") + "v=" + rp.jl(8)
  }
})();
(function() {
  var ch = NEJ.P,
    bs = NEJ.O,
    Oo = ch("nej.e"),
    gG = ch("nej.v"),
    rp = ch("nej.u"),
    bE = ch("nej.ut"),
    gb = ch("nm.u"),
    fi, bu;
  gb.uh = NEJ.C();
  fi = gb.uh.br(bE.dD);
  fi.dJ = function() {
    this.dY();
    Oo.ve({
      src: "http://music.163.com/style/swf/CloudMusicPlayer.swf?v=2014060988888",
      hidden: true,
      parent: document.body,
      params: {
        flashvars: "hostname=" + location.hostname,
        allowscriptaccess: "always",
        wmode: "transparent"
      },
      onready: this.Nu.bha(this)
    });
    window.onIoError = this.ou.bha(this);
    window.onLoadProgress = this.bhJ.bha(this);
    window.onPlayProgress = this.ng.bha(this);
    window.onPlayComplete = this.Ny.bha(this)
  };
  fi.cP = function() {
    this.jC();
    this.Nz()
  };
  fi.Nu = function(eF) {
    this.bL = eF;
    if (typeof console === "undefined") {
      console = {}
    }
    console.aslog = this.Js.bha(this);
    this.mk(this.Qe);
    this.gA(this.gr)
  };
  fi.Js = function(de) {
    this.bL.as_postMessage(de)
  };
  fi.jC = function() {
    delete this.gr;
    if (this.bL) {
      this.bL.as_stop();
      this.bL.as_clear()
    }
  };
  fi.ou = function(fM) {
    this.bk("onplayerror", {
      name: "ioerror",
      code: fM
    })
  };
  fi.bhJ = function(uW, cp) {
    if (this.ez < 1) return;
    this.bk("onloadprogress", {
      loaded: uW / 1e3,
      duration: cp / 1e3
    })
  };
  fi.ng = function(NC, cp) {
    this.ez = cp;

    // tomwan
    window.M.trigger('play-progress', { currentTime: NC / 1e3 });

    this.bk("onplayprogress", {
      current: NC / 1e3,
      duration: cp / 1e3
    })
  };
  fi.Ny = function(fU) {
    this.bk("onstatechange", {
      state: 4
    })
  };
  fi.gA = function(dG, beH, bfz) {
    this.jC();
    if (!dG) return;
    this.gr = this.bqk(dG);
    this.ez = 0;
    if (this.bL) {
      this.bL.as_addSong({
        id: beH,
        url: this.gr
      });
      if (bfz === undefined) bfz = true;
      if (bfz) {
        this.bL.as_play();
        this.bk("onstatechange", {
          state: 1
        })
      }
    }
  };
  fi.jz = function() {
    if (this.bL && this.gr) {
      this.bL.as_pause();
      this.bk("onstatechange", {
        state: 2
      })
    }
  };
  fi.kP = function() {
    if (this.bL && this.gr) {
      this.bL.as_play();
      this.bk("onstatechange", {
        state: 1
      })
    }
  };
  fi.cd = function() {
    this.jC();
    this.bk("onstatechange", {
      state: 3
    })
  };
  fi.kQ = function(fm) {
    if (!this.bL || !this.gr) return;
    this.bL.as_setPosition(this.ez * fm);
    this.bL.currentTime = this.bL.duration * fm
  };
  fi.NH = function(mI) {
    if (this.bL) this.bL.as_setMuted(!!mI);
    this.bk("onmutedchange", {
      muted: mI
    })
  };
  fi.mk = function(Rk) {
    this.Qe = Rk;
    if (this.bL) this.bL.as_setVolume(Rk);
    this.bk("onvolumechange", {
      value: Rk
    })
  };
  fi.Dg = function() {
    return this.bL && this.bL.as_isPlaying()
  };
  fi.bqk = function(dG) {
    return dG + (dG.indexOf("?") > 0 ? "&" : "?") + "v=" + rp.jl(8)
  }
})();
(function() {
  var ch = NEJ.P,
    bs = NEJ.O,
    bC = NEJ.F,
    bhd = ch("nej.ut"),
    fi;
  if (!!bhd.wq) return;
  bhd.wq = NEJ.C();
  fi = bhd.wq.br(bhd.dD);
  fi.bO = function(cr) {
    this.bS(cr);
    this.ru = cr.to || bs;
    this.nl = cr.from || {};
    this.Km = Math.max(0, parseInt(cr.delay) || 0)
  };
  fi.cP = function() {
    this.dm();
    this.cd();
    if (!!this.jA) {
      window.clearTimeout(this.jA);
      delete this.jA
    }
    delete this.ru;
    delete this.nl
  };
  fi.CF = function(cn) {
    if (!this.nl) return;
    if (("" + cn).indexOf(".") >= 0) cn = +(new Date);
    if (this.CG(cn)) {
      this.cd();
      return
    }
    this.dT = requestAnimationFrame(this.CF.bha(this))
  };
  fi.CG = bC;
  fi.gA = function() {
    var Kr = function() {
      this.jA = window.clearTimeout(this.jA);
      this.nl.time = +(new Date);
      this.dT = requestAnimationFrame(this.CF.bha(this))
    };
    return function() {
      this.jA = window.setTimeout(Kr.bha(this), this.Km);
      return this
    }
  }();
  fi.cd = function() {
    this.dT = cancelRequestAnimationFrame(this.dT);
    this.bk("onstop");
    return this
  }
})();
(function() {
  var ch = NEJ.P,
    bs = NEJ.O,
    rp = ch("nej.u"),
    bhd = ch("nej.ut"),
    fi, bu;
  if (!!bhd.kV) return;
  bhd.kV = NEJ.C();
  fi = bhd.kV.br(bhd.wq);
  bu = bhd.kV.cE;
  fi.bO = function(cr) {
    this.bS(cr);
    this.vG = cr.duration || 200;
    this.Iq = 1 / (200 * this.vG);
    this.Ir(cr.timing);
    this.Is()
  };
  fi.cP = function() {
    this.dm();
    delete this.mx;
    delete this.vq
  };
  fi.Ir = function() {
    var eh = /^cubic\-bezier\((.*?)\)$/i,
      gk = /\s*,\s*/i,
      CK = {
        linear: [0, 0, 1, 1],
        ease: [.25, .1, .25, 1],
        easein: [.42, 0, 1, 1],
        easeout: [0, 0, .58, 1],
        easeinout: [0, 0, .58, 1]
      };
    var PT = function(Rk, bb, nA) {
      nA[bb] = parseFloat(Rk)
    };
    return function(qq) {
      qq = (qq || "").toLowerCase();
      this.mx = CK[qq];
      if (eh.test(qq)) {
        this.mx = RegExp.$1.split(gk);
        rp.bZ(this.mx, PT)
      }
      if (!!this.mx) return;
      this.mx = CK.ease
    }
  }();
  fi.Is = function() {
    var mQ = this.mx,
      vo = 3 * mQ[0],
      CN = 3 * (mQ[2] - mQ[0]) - vo,
      Iv = 1 - vo - CN,
      vn = 3 * mQ[1],
      CO = 3 * (mQ[3] - mQ[1]) - vn,
      Ix = 1 - vn - CO;
    this.vq = {
      ax: Iv,
      ay: Ix,
      bx: CN,
      by: CO,
      cx: vo,
      cy: vn
    }
  };
  fi.Iy = function() {
    var CP = function(cn, fZ) {
      return ((fZ.ax * cn + fZ.bx) * cn + fZ.cx) * cn
    };
    var IA = function(cn, fZ) {
      return ((fZ.ay * cn + fZ.by) * cn + fZ.cy) * cn
    };
    var IB = function(cn, fZ) {
      return (3 * fZ.ax * cn + 2 * fZ.bx) * cn + fZ.cx
    };
    var IC = function(cn, CQ, fZ) {
      var t0, t1, t2, x2, d2, i;
      for (t2 = cn, i = 0; i < 8; i++) {
        x2 = CP(t2, fZ) - cn;
        if (Math.abs(x2) < CQ) return t2;
        d2 = IB(t2, fZ);
        if (Math.abs(d2) < 1e-6) break;
        t2 = t2 - x2 / d2
      }
      t0 = 0;
      t1 = 1;
      t2 = cn;
      if (t2 < t0) return t0;
      if (t2 > t1) return t1;
      while (t0 < t1) {
        x2 = CP(t2, fZ);
        if (Math.abs(x2 - cn) < CQ) return t2;
        if (cn > x2) t0 = t2;
        else t1 = t2;
        t2 = (t1 - t0) * .5 + t0
      }
      return t2
    };
    return function(cB) {
      return IA(IC(cB / this.vG, this.Iq, this.vq), this.vq)
    }
  }();
  fi.CG = function(cn) {
    var cB = cn - this.nl.time,
      CR = this.Iy(cB),
      bT = rp.pl(this.nl.offset * (1 - CR) + this.ru.offset * CR, 2),
      iV = !1;
    if (cB >= this.vG) {
      bT = this.ru.offset;
      iV = !0
    }
    this.bk("onupdate", {
      offset: bT
    });
    return iV
  };
  fi.cd = function() {
    this.bk("onupdate", {
      offset: this.ru.offset
    });
    bu.cd.apply(this, arguments);
    return this
  }
})();
(function() {
  var ch = NEJ.P,
    bhd = ch("nej.ut"),
    fi;
  if (!!bhd.qE) return;
  bhd.qE = NEJ.C();
  fi = bhd.qE.br(bhd.kV);
  fi.bO = function(cr) {
    cr = NEJ.X({}, cr);
    cr.timing = "easein";
    this.bS(cr)
  }
})();
(function() {
  var ch = NEJ.P,
    bs = NEJ.O,
    fN = NEJ.R,
    Oo = ch("nej.e"),
    gG = ch("nej.v"),
    bhd = ch("nej.ut"),
    jM;
  if (!!bhd.zu) return;
  bhd.zu = NEJ.C();
  jM = bhd.zu.br(bhd.dD);
  jM.dJ = function() {
    this.dE = {
      onchange: this.sv.bha(this),
      ondragend: this.sv.hP(this, !0)
    };
    this.dY()
  };
  jM.bO = function(cr) {
    this.bS(cr);
    this.dE.view = Oo.bn(cr.track);
    this.dE.body = Oo.bn(cr.slide);
    this.dE.mbar = this.dE.view;
    this.OK(cr.range);
    this.fB([
      [this.dE.view, "mousedown", this.OL.bha(this)]
    ]);
    this.pn = bhd.pt.bH(this.dE)
  };
  jM.cP = function() {
    this.dm();
    this.pn.bW();
    delete this.pn;
    delete this.hc;
    delete this.dE.view;
    delete this.dE.body;
    delete this.dE.mbar
  };
  jM.sv = function(fq, iW) {
    var Fj = fq.left / this.hc.x[1],
      Fk = fq.top / this.hc.y[1],
      Fl = this.hc.x,
      Fm = this.hc.y;
    this.bk("onchange", {
      stopped: !!iW,
      x: {
        rate: Fj,
        value: Fj * (Fl[1] - Fl[0])
      },
      y: {
        rate: Fk,
        value: Fk * (Fm[1] - Fm[0])
      }
    })
  };
  jM.OL = function(fq) {
    var bT = Oo.qU(this.dE.view),
      Fo = {
        x: gG.hB(fq),
        y: gG.kj(fq)
      },
      cB = {
        x: Math.floor(this.dE.body.offsetWidth / 2),
        y: Math.floor(this.dE.body.offsetHeight / 2)
      };
    this.pn.hj({
      top: Fo.y - bT.y - cB.y,
      left: Fo.x - bT.x - cB.x
    })
  };
  jM.OK = function(lE) {
    var jX;
    if (!!this.hc) {
      var hl = this.pn.vZ();
      jX = {
        x: hl.left / this.hc.x[1],
        y: hl.top / this.hc.y[1]
      }
    }
    lE = lE || bs;
    var OS = (lE.x || fN)[1] || this.dE.view.clientWidth - this.dE.body.offsetWidth,
      OT = (lE.y || fN)[1] || this.dE.view.clientHeight - this.dE.body.offsetHeight;
    this.hc = {
      x: lE.x || [0, OS],
      y: lE.y || [0, OT]
    };
    if (!!jX) this.hj(jX);
    return this
  };
  jM.hj = function(jX) {
    jX = jX || bs;
    this.pn.hj({
      top: this.hc.y[1] * (jX.y || 0),
      left: this.hc.x[1] * (jX.x || 0)
    })
  }
})();
(function() {
  var bhd = NEJ.P("nej.ut"),
    Fv;
  if (!!bhd.PU) return;
  bhd.PU = NEJ.C();
  Fv = bhd.PU.br(bhd.zu);
  Fv.dJ = function() {
    this.dY();
    this.dE.direction = 2
  }
})();
(function() {
  var ch = NEJ.P,
    Oo = ch("nej.e"),
    gG = ch("nej.v"),
    bhd = ch("nej.ut"),
    iv;
  bhd.AQ = NEJ.C();
  iv = bhd.AQ.br(bhd.dD);
  iv.bO = function(cr) {
    this.bS(cr);
    this.OW = !!cr.reset;
    this.KQ = parseInt(cr.delta) || 0;
    this.gr = Oo.bn(cr.track);
    this.Fw = Oo.bn(cr.progress);
    this.fB([
      [cr.thumb, "mousedown", this.OY.bha(this)],
      [document, "mousemove", this.Fx.bha(this)],
      [document, "mouseup", this.OZ.bha(this)],
      [this.gr, "mousedown", this.Pb.bha(this)]
    ]);
    var fm = cr.value;
    if (fm == null) {
      fm = this.Fw.offsetWidth / this.gr.offsetWidth
    }
    this.hj(fm)
  };
  iv.cP = function() {
    if (!!this.OW) this.qR(0);
    this.dm()
  };
  iv.OY = function(fq) {
    if (!!this.dt) return;
    gG.cd(fq);
    this.dt = gG.hB(fq);
    this.Fz = this.gr.offsetWidth
  };
  iv.Fx = function(fq) {
    if (!this.dt) return;
    var bT = gG.hB(fq),
      cB = bT - this.dt;
    this.dt = bT;
    this.qR(this.lB + cB / this.Fz);
    this.bk("onslidechange", {
      ratio: this.lB
    })
  };
  iv.OZ = function(fq) {
    if (!this.dt) return;
    this.Fx(fq);
    delete this.dt;
    delete this.Fz;
    this.bk("onslidestop", {
      ratio: this.lB
    })
  };
  iv.Pb = function(fq) {
    var Pe = Oo.qU(this.gr).x,
      Pf = gG.hB(fq);
    this.qR((Pf - Pe + this.KQ) / this.gr.offsetWidth);
    this.bk("onslidestop", {
      ratio: this.lB
    })
  };
  iv.qR = function(fm) {
    this.lB = Math.max(0, Math.min(1, fm));
    Oo.ck(this.Fw, "width", this.lB * 100 + "%")
  };
  iv.hj = function(fm) {
    if (!!this.dt) return;
    this.qR(fm)
  };
  iv.vZ = function(fm) {
    return this.lB
  }
})();
(function() {
  var ch = NEJ.P,
    Oo = ch("nej.e"),
    gG = ch("nej.v"),
    bhd = ch("nej.p"),
    gw = ch("nej.ui"),
    pm = ch("nej.ut"),
    dO = ch("nm.w"),
    fi, bu;
  dO.bfF = NEJ.C();
  fi = dO.bfF.br(gw.ji);
  bu = dO.bfF.cE;
  fi.dJ = function() {
    this.dY()
  };
  fi.bO = function(cr) {
    this.bS(cr);
    this.bl = Oo.bn(cr.content);
    this.bfl = Oo.bn(cr.slide);
    this.gr = Oo.bn(cr.track);
    this.bfZ = cr.speed;
    this.bfY = this.bl.scrollHeight - this.bl.clientHeight;
    Oo.ck(this.bfl, "height", this.bl.clientHeight / this.bl.scrollHeight * parseInt(Oo.di(this.gr, "height")) + "px");
    if (this.bl.scrollHeight <= this.bl.clientHeight) Oo.ck(this.bfl, "display", "none");
    else Oo.ck(this.bfl, "display", "block");
    this.bfy = pm.PU.bH({
      slide: this.bfl,
      track: this.gr,
      onchange: this.bgo.bha(this)
    });
    if (bhd.dC.browser != "firefox") this.fB([
      [this.bl, "mousewheel", this.bfU.bha(this)]
    ]);
    else {
      this.bl.addEventListener("DOMMouseScroll", this.bfU.bha(this), false)
    }
  };
  fi.cP = function() {
    this.dm();
    this.bfy.bW();
    delete this.bl;
    delete this.bfl;
    delete this.gr;
    delete this.hc;
    delete this.bfZ
  };
  fi.bgo = function(fq) {
    this.bl.scrollTop = parseInt(this.bfY * fq.y.rate)
  };
  fi.bfU = function(fq) {
    gG.cD(fq);
    this.bfY = this.bl.scrollHeight - this.bl.clientHeight;
    var cB = 0,
      bfB, ds, ig;
    ds = parseInt(this.gr.clientHeight) - parseInt(Oo.di(this.bfl, "height"));
    cB = fq.wheelDelta ? fq.wheelDelta / 120 : -fq.detail / 3;
    bfB = parseInt(Oo.di(this.bfl, "top")) - cB * this.bfZ;
    if (bfB < 0) bfB = 0;
    if (bfB > ds) bfB = ds;
    Oo.ck(this.bfl, "top", bfB + "px");
    ig = parseInt(Oo.di(this.bfl, "top"));
    this.bfy.bk("onchange", {
      y: {
        rate: ig / ds
      }
    })
  };
  fi.RQ = function() {
    this.bfY = this.bl.scrollHeight - this.bl.clientHeight;
    this.bfy.hj({
      x: 0,
      y: 0
    });
    Oo.ck(this.bfl, "height", this.bl.clientHeight / this.bl.scrollHeight * parseInt(this.gr.clientHeight) + "px");
    this.bfy.OK({
      x: [],
      y: [0, this.gr.clientHeight - parseInt(Oo.di(this.bfl, "height"))]
    });
    if (this.bl.scrollHeight <= this.bl.clientHeight) Oo.ck(this.bfl, "display", "none");
    else Oo.ck(this.bfl, "display", "block")
  };
  fi.hj = function(lC) {
    this.bfy.hj(lC)
  };
  fi.bgf = function(bfO) {
    var bgp = parseInt(Oo.di(this.bfl, "height"));
    var bgq = parseInt(Oo.di(this.gr, "height"));
    var bgr = bgq - bgp;
    var ig = parseInt(bgr * bfO) + "px";
    Oo.ck(this.bfl, "top", ig)
  };
  fi.bfX = function() {
    if (this.bl.scrollHeight <= this.bl.clientHeight) return;
    var bfO = this.bl.scrollTop / (this.bl.scrollHeight - this.bl.clientHeight);
    this.bgf(bfO)
  };
  fi.bgL = function() {
    if (this.bfy) this.bfy.OK()
  }
})();
(function() {
  var ch = NEJ.P,
    cC = window,
    Oo = ch("nej.e"),
    gG = ch("nej.v"),
    rp = ch("nej.u"),
    bv = ch("nej.j"),
    bE = ch("nej.ut"),
    bhd = ch("nej.p"),
    fV = ch("nm.i"),
    bkp = ch("nm.d"),
    bB = ch("nm.x"),
    be = ch("nm.l"),
    bN = ch("nm.m"),
    gb = ch("nm.u"),
    bp = ch("nm.m.f"),
    dO = ch("nm.w"),
    fi, bu;
  var bgs = Oo.ln("m-lyric-line");
  dO.bfV = NEJ.C();
  fi = dO.bfV.br(bE.gM);
  fi.cS = function(cr) {
    this.dq();
    this.bl = Oo.bI(document.body, "listbd")[0];
    this.yF = 0;
    this.bfP = false;
    var bfu = Oo.bI(this.bl, "j-flag");
    this.bfC = bfu[5];
    this.bfD = bfu[6];
    this.bfQ = bfu[7];
    this.bfR = bfu[8];
    this.bft = bfu[9];
    this.gr = bfu[10];
    this.bfl = bfu[11];
    this.bfI = false;
    this.baz = true;
    this.baB = false;
    this.nb = 0;
    this.Ip = false;
    this.timeCtrl = setInterval(function() {
      if (this.baB) return;
      this.nb += 1;
      if (this.nb == 30) this.baz = true
    }.bha(this), 100);
    if (bhd.dC.browser != "firefox") this.fB([
      [this.bfC, "click", this.bgt.bha(this)],
      [this.bft, "click", this.eX.bha(this)],
      [this.bft, "mousewheel", this.bfU.bha(this)],
      [this.bfl, "mousedown", this.beJ.bha(this)],
      [document, "mouseup", this.bfk.bha(this)],
      [bkp.fb, "queuechange", this.xg.bha(this)],
      [bkp.fb, "settingchange", this.tl.bha(this)]
    ]);
    else {
      this.fB([
        [this.bfC, "click", this.bgt.bha(this)],
        [this.bft, "click", this.eX.bha(this)],
        [this.bfl, "mousedown", this.beJ.bha(this)],
        [document, "mouseup", this.bfk.bha(this)],
        [bkp.fb, "queuechange", this.xg.bha(this)],
        [bkp.fb, "settingchange", this.tl.bha(this)]
      ]);
      this.bft.addEventListener("DOMMouseScroll", this.bfU.bha(this), false)
    }
    this.bi = bkp.fb.bH()
  };
  fi.gK = function(cr) {
    var sR = this.bi.Nf(),
      nA = this.bi.jn();
    if (!nA[sR]) return;
    Oo.ck(this.bfD, "display", "none");
    if (nA[sR].program) {
      this.bfI = true;
      Oo.ck(this.bfC, "display", "none")
    } else {
      this.bfI = false;
      Oo.ck(this.bfC, "display", "block")
    }
    this.yF = nA[sR].id;
    this.bgu(this.yF)
  };
  fi.bgt = function(fq) {
    var cg = Oo.di(this.bfD, "display");
    Oo.ck(this.bfD, "display", cg == "none" ? "block" : "none")
  };
  fi.bgv = function() {
    var eh = /\r\n|\r|\n/,
      gk = /\[(.*?)\]/gi,
      bgw = {
        ar: "artist",
        ti: "track",
        al: "album",
        offset: "offset"
      };
    var bgx = function(bhc, nP) {
      var cj = [];
      nP = nP.replace(gk, function($1, $2) {
        var cn = bgy.call(this, bhc, $2);
        if (cn != null) {
          cj.push({
            time: cn
          });
          bhc.scrollable = !0
        }
        return ""
      }.bha(this)).trim();
      if (!cj.length) {
        if (!nP || nP.length == 0) return;
        cj.push({
          time: -1
        })
      }
      rp.bZ(cj, function(bm) {
        bm.lyric = nP
      });
      var qA = bhc.lines;
      qA.push.apply(qA, cj)
    };
    var bgy = function(bhc, cn) {
      var cj = cn.split(":"),
        bfE = cj.shift(),
        bhf = bgw[bfE];
      if (!!bhf) {
        bhc[bhf] = cj.join(":");
        return null
      }
      bfE = parseInt(bfE);
      if (isNaN(bfE)) {
        return null
      } else {
        var bT = parseInt(bhc.offset) || 0;
        return bfE * 60 + parseFloat(cj.join(".")) + bT / 1e3
      }
    };
    var bgz = function(bgA, bgB) {
      return bgA.time - bgB.time
    };
    return function(bh, bA) {
      var bhc = {
        id: bh,
        lines: [],
        scrollable: !1,
        source: bA
      };
      rp.bZ((bA || "").trim().split(eh), bgx.bha(null, bhc));
      bhc.lines.sort(bgz);
      if (bhc.scrollable) {
        var bb;
        for (var i = 0; i < bhc.lines.length; i++) {
          if (!!bhc.lines[i].lyric) {
            bb = i;
            break
          }
        }
        bhc.lines.splice(0, bb)
      }
      return bhc
    }
  }();
  fi.bgu = function(bh, Lm) {
    if (!bh) return;
    Lm = Lm ? Lm : 0;
    var bz = "/api/song/media",
      cm = "id=" + bh + "&version=" + Lm;
    bv.fe(bz, {
      sync: false,
      type: "json",
      query: cm,
      method: "get",
      onload: this.bgC.bha(this, bh),
      onerror: this.bgD.bha(this)
    })
  };
  fi.bgC = function(bh, fU) {
    var sR = this.bi.Nf(),
      nA = this.bi.jn();
    if (!nA[sR]) return;
    if (nA[sR].id != bh) return;
    if (fU.nolyric) {
      this.bfR.href = this.bfR.href + "&type=nolyric";
      Oo.bF(this.bfR, "pure");
      Oo.ck(this.bfQ, "display", "none")
    } else {
      Oo.bt(this.bfR, "pure");
      Oo.ck(this.bfQ, "display", "block")
    } if (!fU.lyric) {
      if (!fU.nolyric) {
        this.bfR.href = this.bfR.href + "&type=nolyric"
      }
      this.bgd(fU);
      return
    }
    this.bcU = this.bgv(3, fU.lyric);
    this.bfP = this.bcU.scrollable ? true : false;
    Oo.BK(this.bft, bgs, {
      lines: this.bcU.lines,
      scrollable: this.bfP
    });
    if (!this.bfv) this.bfv = dO.bfF.bH({
      track: this.gr,
      slide: this.bfl,
      content: this.bft,
      speed: 4
    });
    else this.bfv.RQ()
  };
  fi.bgD = function(fU) {
    this.bgd()
  };
  fi.bfU = function(fq) {
    this.bgN()
  };
  fi.beJ = function(fq) {
    this.baB = true;
    this.bgN()
  };
  fi.bfk = function(fq) {
    var RH = gG.cc(fq);
    if (!Oo.cV(RH, "ico-ask")) Oo.ck(this.bfD, "display", "none");
    this.baB = false
  };
  fi.bgN = function() {
    this.baz = false;
    this.nb = 0
  };
  fi.eX = function(fq) {
    var bhb = gG.cc(fq, "d:songid");
    if (!bhb) return;
    gG.cD(fq);
    bv.fe("api/feedback/lyric", {
      method: "get",
      query: {
        songId: Oo.bK(bhb, "songid"),
        errorType: 6
      }
    });
    be.dR.bw({
      tip: "反馈成功"
    })
  };
  fi.bgd = function(fU, type) {
    if (this.bfI) {
      this.bft.innerHTML = '<div class="nocnt nolyric"><span class="s-fc4">DJ节目，无歌词</span></div>'
    } else if (fU.nolyric) {
      this.bft.innerHTML = '<div class="nocnt nolyric"><span class="s-fc4">纯音乐，无歌词</span></div>'
    } else {
      this.bft.innerHTML = '<div class="nocnt nolyric"><span class="s-fc4">暂时没有歌词</span><a ' + "data-songid=" + this.bgE.id + ' href="#" class="f-tdu">求歌词</a></div>'
    }
    this.bfM()
  };
  fi.gI = function(fq) {};
  fi.xg = function(fq) {
    this.bk("onrefresh")
  };
  fi.tl = function(fq) {
    this.bk("onrefresh");
    delete this.bjr
  };
  fi.bM = function() {
    this.bk("onhide");
    this.bk("onclose")
  };
  fi.sx = function() {
    return !!this.bl.parentNode && !!this.bl.parentNode.tagName
  };
  fi.mL = function() {
    return this.bl
  };
  fi.bfN = function(cn) {
    if (!(!!this.bl.parentNode.parentNode && !!this.bl.parentNode.parentNode.tagName)) return;
    if (!this.bfP) return;
    if (this.Ip) return;
    if (!this.baz) return;
    var bfu = Oo.bI(this.bft, "j-item"),
      bgF = Oo.bI(this.bft, "z-sel")[0],
      ca = this.bcU.lines.length,
      bT = 32,
      CR = 0,
      yG = 0,
      lE = this.bft.scrollHeight - this.bft.clientHeight,
      bb = 0,
      Ik = 0,
      bfS = 0;
    for (var i = 0; i < ca; i++) {
      if (this.bcU.lines[0].time > cn) {
        if (this.bcU.lines[0].time - cn < 2) {
          bb = 0
        } else {
          bb = -1
        }
        Ik = 0;
        break
      }
      if (i == ca - 1) {
        Ik = bb = ca - 1;
        break
      }
      var bgG = this.bcU.lines[i].time - cn;
      var bgH = this.bcU.lines[i + 1].time - cn;
      if (bgG < 0 && bgH > 0) {
        Ik = bb = i;
        break
      }
    }
    Oo.bt(bgF, "z-sel");
    if (bb >= 0) Oo.bF(bfu[bb], "z-sel");
    if (ca < 7 || Oo.qU(bfu[Ik], this.bft).y < 96) {
      yG = 0
    } else {
      for (var bhg = 0; bhg < Ik; bhg++) {
        bfS += bfu[bhg].clientHeight
      }
      yG = bfS - 96 > lE ? lE : bfS - 96
    } if (!this.bjr) {
      this.bft.scrollTop = yG;
      this.bfv.bgf(yG / lE)
    } else {
      var tj = Math.ceil((yG - this.bft.scrollTop) / 50);
      if (parseInt(tj) != 0) {
        this.Ip = true;
        var cO = 0;
        var XT = setInterval(function() {
          var SE = this.bft.scrollTop + tj;
          if (Math.abs(yG - SE) < Math.abs(tj) || cO == 50) {
            this.bft.scrollTop = yG;
            CR = yG / lE;
            this.bfv.bgf(CR);
            clearInterval(XT);
            this.Ip = false
          } else {
            CR = SE / lE;
            this.bft.scrollTop = SE;
            this.bfv.bgf(CR)
          }
          cO++
        }.bha(this), 14)
      }
    }
    this.bjr = {
      scrollTop: yG,
      percent: yG / lE
    }
  };
  fi.bfG = function(bY) {
    if (!bY) {
      Oo.ck(this.bfC, "display", "none");
      Oo.ck(this.bfD, "display", "none");
      return
    }
    if (bY != this.bgE) {
      this.bfQ.href = "/lyric?id=" + bY.id;
      this.bfR.href = "/lyric/report?id=" + bY.id
    }
    this.bgE = bY;
    if (!this.bfI) Oo.ck(this.bfC, "display", "block")
  };
  fi.bfM = function() {
    if (this.bfv) this.bfv.RQ()
  };
  fi.bgn = function() {
    this.bft.innerHTML = "";
    Oo.ck(this.bfC, "display", "nono");
    Oo.ck(this.bfD, "display", "none")
  };
  fi.bjt = function() {
    if (this.bjr) {
      this.bft.scrollTop = this.bjr.scrollTop;
      this.bfv.bgf(this.bjr.percent);
      delete this.bjr
    }
  }
})();
(function() {
  var ch = NEJ.P,
    cC = window,
    Oo = ch("nej.e"),
    gG = ch("nej.v"),
    rp = ch("nej.u"),
    eg = ch("nej.p"),
    bv = ch("nej.j"),
    bE = ch("nej.ut"),
    bkp = ch("nm.d"),
    be = ch("nm.l"),
    bB = ch("nm.x"),
    bN = ch("nm.m"),
    gb = ch("nm.u"),
    dO = ch("nm.w"),
    bp = ch("nm.m.f"),
    nt = ch("window.player"),
    bhX = /^https?:\/\/.*?\//i,
    bfT = "http://s4.music.126.net/style/web2/img/default_album.jpg",
    fi, bu;
  var Xw = function() {
    var GZ = bB.Ra();
    if (GZ > 0) return !0;
    bB.yC({
      clazz: "m-layer-w2",
      btntxt: "立即下载",
      message: "你的浏览器还没安装Flash播放器，无法播放音乐。",
      action: function(bc) {
        window.open("http://get.adobe.com/cn/flashplayer/")
      }
    });
    return !1
  };
  bp.xr = NEJ.C();
  fi = bp.xr.br(bE.gM);
  fi.cS = function() {
    this.dq();
    this.yF = rp.jl();
    this.bl = Oo.bn("g_player");
    this.dA = this.bl.parentNode;
    var nA = Oo.dw(this.dA);
    this.LH = nA[0].firstChild;
    this.KE = nA[2];
    var nA = Oo.dw(this.bl);
    this.KC = nA[0];
    this.oZ = nA[1];
    this.GN = nA[2];
    this.Ek = nA[3];
    this.DF = nA[4];
    this.ny = Oo.dw(this.KC);
    this.DB = Oo.dw(this.Ek);
    nA = Oo.bI(this.GN, "j-flag");
    this.zd = nA[0];
    this.OM = nA[2];
    this.ON = nA[3];
    this.Dv = nA[4];
    this.lM = nA[5];
    this.wV = bE.AQ.bH({
      track: nA[1],
      thumb: nA[4],
      progress: nA[3],
      onslidestop: this.Oi.bha(this)
    });
    nA = Oo.bI(this.DF, "j-flag");
    this.PS = nA[0];
    this.Qj = nA[1];
    this.nv = nA[2];
    this.oI = nA[3];
    this.ze = nA[4];
    this.XI = nA[5];
    nA = Oo.bI(this.PS, "j-t");
    this.Qd = bE.PU.bH({
      track: nA[1],
      slide: nA[2],
      onchange: this.Qc.bha(this)
    });
    this.Qb = nA[1].firstChild;
    var GZ = bB.Ra(),
      cl = GZ == 2 ? gb.vA : gb.uh;
    this.bL = cl.bH({
      onplayerror: this.ou.bha(this),
      onstatechange: this.jQ.bha(this),
      onmutedchange: this.tm.bha(this),
      onvolumechange: this.rG.bha(this),
      onloadprogress: this.bhJ.bha(this),
      onplayprogress: this.ng.bha(this)
    });
    this.en = {
      onclose: this.NV.bha(this),
      onclear: this.beI.bha(this)
    };
    this.wU = bkp.BL.bH();
    this.bi = bkp.fb.bH();
    this.BZ = bkp.BW.bH();
    this.BZ.ba("onresourceload", this.Ei.bha(this));
    this.BZ.ba("onresourceerror", this.bgI.bha(this));
    this.fB([
      [document, "keyup", this.BB.bha(this)],
      [document, "click", this.tI.bha(this)],
      [window, "iframeclick", this.tI.bha(this)],
      [this.PS, "click", gG.cd.bha(this)],
      [this.dA, "click", this.eX.bha(this)],
      [document.body, "mouseup", this.Ke.bha(this)],
      [this.Dv, "mousedown", this.IU.bha(this)],
      [this.oZ.firstChild, "error", this.beK.bha(this)],
      [bkp.fb, "playerror", this.ou.bha(this)],
      [bkp.fb, "playchange", this.gI.bha(this)],
      [bkp.fb, "queuechange", this.xg.bha(this)],
      [bkp.fb, "settingchange", this.tl.bha(this)],
      [this.dA, eg.dC.browser == "ie" ? "mouseleave" : "mouseout", this.Dt.bha(this, !1)],
      [this.dA, eg.dC.browser == "ie" ? "mouseenter" : "mouseover", this.Dt.bha(this, !0)]
    ]);
    nt.show = this.bw.bha(this);
    nt.hide = this.bM.bha(this);
    nt.play = this.beL.bha(this);
    nt.pause = this.jz.bha(this);
    nt.addto = this.bfW.bha(this);
    nt.append = this.beM.bha(this);
    nt.hotkeys = this.BB.bha(this)
  };
  fi.gK = function(cr) {
    var nA = this.bi.jn(),
      dQ = this.bi.gU();
    this.ze.innerText = nA.length || 0;
    Oo.bF(this.nv, dQ.mode == 2 ? "icn-one" : dQ.mode == 4 ? "icn-loop" : "icn-shuffle");
    this.nv.title = dQ.mode == 2 ? "单曲循环" : dQ.mode == 4 ? "循环" : "随机";
    this.bL.mk(dQ.volume);
    this.Qd.hj({
      x: 0,
      y: 1 - dQ.volume
    });
    this.Al(this.bi.mB(dQ.index));
    this.bU(dQ.lock);
    this.Ar()
  };
  fi.beK = function() {
    this.oZ.firstChild.src = bfT
  };
  fi.Al = function(bY) {
    if (!bY || !bY.mp3Url) {
      this.gr = null;
      this.Ql = null;
      this.bL.cd();
      this.wV.hj(0);
      this.oZ.lastChild.href = "#";
      this.oZ.firstChild.src = bfT;
      this.zd.innerHTML = "";
      this.lM.innerHTML = "<em>00:00</em> / 00:00";
      Oo.ck(this.OM, "width", "0%");
      return
    }
    this.gr = bY;
    this.Ql = {
      id: bY.id,
      time: 0
    };
    this.wV.hj(0);
    this.oZ.lastChild.href = !bY.program ? !bY.album ? "#" : "/song?id=" + bY.id : "/dj?id=" + bY.program.id;
    this.oZ.firstChild.src = !bY.album || !bY.album.picUrl ? bfT : bY.album.picUrl + "?param=34x34";
    this.lM.innerHTML = "<em>00:00</em> / 00:00";
    var dK = bB.bap(bY.from, bY.id);
    var fU;
    try {
      fU = NEJ.X({
        source: dK
      }, bY)
    } catch (e) {
      fU = bY;
      fU.source = dK
    }
    this.zd.innerHTML = Oo.eR("m-player-playinfo", fU, {
      getArtistName: bB.Fs,
      firstAlia: bB.fy
    });
    Oo.ck(this.OM, "width", "0%")
  };
  fi.BB = function(fq) {
    if (fq.keyCode == 80 && !bB.ns()) {
      this.bL.Dg() ? this.jz() : Oo.cV(this.ny[1], "js-pause") ? this.kP() : this.gA();
      return
    }
    if (!fq.ctrlKey) return;
    switch (fq.keyCode) {
      case 13:
        break;
      case 37:
        this.Do();
        break;
      case 39:
        this.jj();
        break
    }
  };
  fi.tI = function(fq) {
    Oo.ck(this.PS, "visibility", "hidden");
    !!this.ek && this.ek.bM()
  };
  fi.eX = function(fq) {
    gG.qX(fq);
    var bhb = gG.cc(fq);
    if (bhb.href) {
      var hk = bhb.href.replace(bhX, "/");
      if (!/#$/.test(hk)) {
        if (hk.charAt(1) != "#") {
          gG.cD(fq);
          location.hash = "#" + hk
        }
        return
      }
      gG.cD(fq)
    }
    var bhb = gG.cc(fq, "d:action");
    if (!bhb) return;
    gG.cD(fq);
    var gi = Oo.bK(bhb, "action");
    if (gi != "setvolume") Oo.ck(this.PS, "visibility", "hidden");
    switch (gi) {
      case "lock":
        this.bU(!this.bU());
        !this.bU() && this.ii(false);
        break;
      case "prev":
        this.Do();
        break;
      case "play":
        if (Xw()) {
          this.bL.Dg() ? this.jz() : Oo.cV(bhb, "js-pause") ? this.kP() : this.gA()
        }
        break;
      case "next":
        this.jj();
        break;
      case "like":
        var bY = this.gr;
        if (bY && bY.mp3Url) {
          if (bB.mK(bY)) {
            bB.mz("由于版权保护，您所在的地区暂时无法使用这首歌曲。");
            break
          }
          cC.subscribe(bY, !!bY.program)
        }
        break;
      case "share":
        var bY = this.gr;
        if (bY && bY.mp3Url) {
          if (bB.mK(bY)) {
            bB.mz("由于版权保护，您所在的地区暂时无法使用这首歌曲。");
            break
          }!bY.program ? bB.ki({
            rid: bY.id,
            type: 18,
            purl: bY.album.picUrl
          }) : bB.ki({
            rid: bY.program.id,
            type: 17,
            purl: bY.album.picUrl
          })
        }
        break;
      case "setmode":
        var df = this.bi.gU().mode || 4;
        this.bi.kB("mode", df == 4 ? 2 : df == 2 ? 5 : 4);
        break;
      case "setvolume":
        if (this.PS.style.visibility != "hidden") Oo.ck(this.PS, "visibility", "hidden");
        else Oo.ck(this.PS, "visibility", "visible");
        break;
      case "playlist":
        !this.ek && (this.ek = bp.Ds.bH(this.en));
        this.ek.bk(this.ek.sx() ? "onhide" : "onshow", {
          parent: this.bl.parentNode
        });
        !this.ek.sx() && this.ii(false);
        break
    }
  };
  fi.Dt = function(sj, fq) {
    var bhb = gG.cc(fq);
    if (this.ek) {
      var dZ = this.ek.mL();
      if (bhb == dZ || bB.Bg(dZ, bhb)) return
    }
    if (bB.bes(fq, this.dA)) this.ii(sj)
  };
  fi.NV = function() {
    this.ii(false)
  };
  fi.beI = function() {
    this.bi.bex(!this.bL.Dg())
  };
  fi.Ke = function() {
    this.rP = false
  };
  fi.IU = function() {
    this.rP = true;
    Oo.ck(this.PS, "visibility", "hidden")
  };
  fi.Oi = function(fq) {
    this.bL.kQ(fq.ratio);
    this.rP = false
  };
  fi.Qc = function(fq) {
    var Rk = 1 - fq.y.rate,
      ds = 93 * Rk;
    Oo.ck(this.Qb, "height", ds + "px");
    ds > 0 ? Oo.bt(this.Qj, "icn-volno") : Oo.bF(this.Qj, "icn-volno");
    this.bL.mk(Rk);
    if (fq.stopped) this.bi.kB("volume", Rk)
  };
  fi.ou = function(fq) {
    be.dR.bw({
      type: 2,
      tip: "当前歌曲播放失败"
    });
    this.wU.Gq("player", fq)
  };
  fi.jQ = function(fq) {
    if (fq.state == 1 || fq.state == 2) {
      var bb = this.bi.nk(),
        bY = this.bi.mB(bb);
      if (!bY || !bY.mp3Url) document.title = bB.Lc();
      else document.title = (fq.state == 1 ? decodeURIComponent("%E2%96%B6%20") : "") + bY.name
    }
    if (fq.state == 2 || fq.state == 3) {
      Oo.bt(this.ny[1], "pas");
      fq.state == 2 ? Oo.bF(this.ny[1], "js-pause") : Oo.bt(this.ny[1], "js-pause");
      if (fq.state == 3) document.title = bB.Lc();
      return
    }
    Oo.bF(this.ny[1], "pas");
    Oo.bt(this.ny[1], "js-pause");
    if (fq.state == 4) {
      var df = this.bi.gU().mode || 4;
      var hm = this.bi.jn();
      if (!hm.length && !!this.ek) {
        this.ek.bgm()
      }
      switch (df) {
        case 1:
          break;
        case 2:
          this.gA();
          break;
        case 3:
        case 4:
        case 5:
          hm = this.bi.jn();
          if (!hm.length) {
            this.Al(null)
          } else {
            this.bi.uY(this.bi.No(), true, 2)
          }
          break
      }
    }
  };
  fi.tm = function(fq) {};
  fi.rG = function(fq) {};
  fi.bhJ = function() {
    var rO = 0;
    return function(fq) {
      Oo.ck(this.OM, "width", fq.loaded * 100 / fq.duration + "%")
    }
  }();
  fi.ng = function() {
    var rO = 0;
    return function(fq) {
      if (this.Ql) this.Ql.time = fq.current;
      if (this.rP) return;
      if (!this.mS()) return;
      var bE = +(new Date);
      if (bE - rO < 1e3) return;
      rO = bE;
      this.wV.hj(fq.current / fq.duration);
      this.lM.innerHTML = "<em>" + bB.sH(fq.current) + "</em> / " + bB.sH(fq.duration);
      if (this.ek) this.ek.bfN(fq.current);
      var bh = bv.uH("playerid");
      if (!!bh && bh != this.yF) this.jz()
    }
  }();
  fi.ou = function(fq) {
    if (fq.code == 403) bB.mz()
  };
  fi.gI = function(fq) {
    if (fq.newValue != fq.oldValue && this.Ql && this.Ql.time >= 3) {
      var bY = this.bi.mB(fq.oldValue);
      if (bY && bY.mp3Url) {
        this.wU.IK(this.Ql.id, this.Ql.time, bY.from, fq.endtype)
      }
    }
    if (fq.newValue < 0) {
      this.Al(null);
      return
    }
    var bY = this.bi.mB(fq.newValue);
    if (!bY || !bY.mp3Url) return;
    this.Al(bY);
    bv.uH("playerid", this.yF);
    if (!fq.autoplay) {
      fq.autoplay = !Oo.cV(this.ny[1], "js-pause")
    }


    // tomwan
    self = this;
    if(!window.M.hasHijacked){
      window.M.on('play', function(event, bY){
        self.bL.gA(bY.mp3Url, bY.id, fq.autoplay);
      });
      window.M.hasHijacked = true;
    }
    
    window.M.trigger('play', bY);
    //this.bL.gA(bY.mp3Url, bY.id, fq.autoplay);

    gG.bk(window, "playchange", {
      trackId: bY.id
    })
  };
  fi.xg = function(fq) {
    var hm = fq.queue;
    this.ze.innerText = hm.length || 0
  };
  fi.tl = function() {
    var bhj;
    var beO = function() {
      this.XI.style.display = "none"
    };
    return function(fq) {
      if (fq.key == "mode") {
        var cl = {
          2: "icn-one",
          4: "icn-loop",
          5: "icn-shuffle"
        };
        Oo.bt(this.nv, cl[fq.oldValue]);
        Oo.bF(this.nv, cl[fq.newValue]);
        var nW = fq.newValue == 2 ? "单曲循环" : fq.newValue == 4 ? "循环" : "随机";
        this.nv.title = nW;
        this.XI.innerText = nW;
        this.XI.style.display = "";
        clearTimeout(bhj);
        bhj = setTimeout(beO.bha(this), 2e3)
      }
    }
  }();
  fi.Ei = function(bc, eE, fU, bP) {
    if (!fU || !fU.id) {
      this.Iz({
        rid: eE,
        type: bc,
        code: 404,
        list: []
      });
      return
    }
    var cQ = [];
    switch (bc) {
      case 13:
        cQ = fU.tracks;
        break;
      case 17:
        fU.songs = [];
        var hr = NEJ.X({
          album: {}
        }, fU.mainSong);
        hr.program = fU;
        hr.album.picUrl = fU.coverUrl;
        cQ.push(hr);
        break;
      case 18:
        cQ.push(fU);
        break;
      case 19:
        cQ = fU.songs;
        break
    }
    if (!cQ.length) {
      this.Iz({
        rid: eE,
        type: bc,
        code: 200,
        list: [],
        play: bP.play
      });
      return
    }
    bP.rid = eE;
    bP.type = bc;
    this.bge(cQ, bP.play, bP)
  };
  fi.bgI = function(bc, eE, yL) {
    this.Iz({
      rid: eE,
      type: bc,
      code: yL,
      list: []
    })
  };
  fi.Iz = function() {
    var bhj;
    var cK = function(fq) {
      clearTimeout(bhj);
      if (!fq) {
        this.oI.innerText = "";
        Oo.ck(this.oI, "display", "none");
        return
      }
      var hb = !fq.play ? "已添加到播放列表" : "已开始播放";
      if (fq.code != 200) {
        hb = fq.code == 404 ? "无法播放，音乐已下线" : "添加到播放列表失败"
      } else if (!fq.list || !fq.list.length) {
        switch (fq.type) {
          case 18:
            hb = "该歌曲不存在，无法播放";
            break;
          case 13:
            hb = "歌单内无歌曲，无法播放";
            break;
          case 17:
            hb = "DJ节目内无歌曲，无法播放";
            break;
          case 19:
            hb = "专辑内无歌曲，无法播放";
            break;
          default:
            "歌曲列表为空，无法播放"
        }
      }
      this.oI.innerText = hb;
      Oo.ck(this.oI, "display", "");
      this.Ar();
      bhj = setTimeout(arguments.callee.bha(this, null), 2e3)
    };
    return function(fq) {
      if (this.mS()) {
        cK.call(this, fq);
        return
      }
      this.mS(true, cK.bha(this, fq))
    }
  }();
  fi.Do = function() {
    this.bi.uY(this.bi.Nn(), true, 1, true)
  };
  fi.jj = function() {
    this.bi.uY(this.bi.No(), true, 1)
  };
  fi.gA = function() {
    this.bi.uY(this.bi.nk(), true, 3)
  };
  fi.jz = function() {
    this.bL.jz()
  };
  fi.kP = function() {
    bv.uH("playerid", this.yF);
    this.bL.kP()
  };
  fi.kQ = function(fm) {
    this.bL.kQ(fm)
  };
  fi.mk = function(Rk) {
    this.bL.mk(Rk);
    this.bi.kB("volume", Rk)
  };
  fi.NX = function(df) {
    this.bi.kB("mode", df)
  };
  fi.beL = function(bc, eE, dK) {
    return this.bfW(bc, eE, true)
  };
  fi.beM = function(bY, bc, eE, bfr) {
    if (bfr === undefined) bfr = true;
    var bP = {
      fid: bc,
      fdata: eE
    };
    if (!rp.eH(bY)) {
      bP.rid = bY.id;
      bP.type = 18;
      bY = [bY]
    }
    this.bgJ(bY, bfr, bP)
  };
  fi.bfW = function(bc, eE, bfr, bP) {
    if (!Xw()) return;
    bP = bP || {};
    if (bP.fid === undefined && bc != 18) {
      bP.fid = bc;
      bP.fdata = eE
    }
    if (bc == 18) {
      var bb = this.bi.Zt(eE, bP.fid, bP.fdata);
      if (bb >= 0) {
        this.Iz({
          rid: eE,
          type: bc,
          code: 200,
          list: [eE],
          play: bfr
        });
        if (bfr) this.bi.uY(bb, true, 3);
        return
      }
    }
    var dF = bB.UW();
    var fU = {
      play: bfr,
      fid: bP.fid,
      fdata: bP.fdata,
      fhref: dF
    };
    this.BZ.JW(bc, eE, {
      conf: fU
    });
    this.wU.zC({
      rid: eE,
      type: bc,
      hash: dF,
      play: bfr,
      source: bP.fid,
      sourceid: bP.fdata
    });
    return this.wU.beB(bc, eE)
  };
  fi.bge = function(nA, bfr, bP) {
    if (!nA || !nA.length) return;
    for (var i = 0, bjw = [], bjC; i < nA.length; ++i) {
      if (bB.mK(nA[i])) continue;
      bjw.push(nA[i])
    }
    nA = bjw;
    if (!nA.length) {
      bB.mz();
      return
    }
    bP = bP || {};
    var eE = bP.rid,
      bc = bP.type;
    if (bfr && bc != 18 && bc != 17) {
      this.bi.bex(true)
    }
    this.bi.MX(nA, {
      fid: bP.fid,
      fdata: bP.fdata,
      fhref: bP.fhref
    });
    if (bfr) {
      if (bc == 18 || bc == 17) {
        var bb = this.bi.Zt(nA[0].id, bP.fid, bP.fdata);
        this.bi.uY(bb, true, 3)
      } else {
        this.bi.uY(this.bi.nk(), true, 3)
      }
    }
    if (bc == 13) this.bi.beC(eE);
    this.Iz({
      rid: eE,
      type: bc,
      code: 200,
      list: nA,
      play: bfr
    })
  };
  fi.bgJ = function(nA, bfr, bP) {
    if (!Xw()) return;
    bP = bP || {};
    bP.fhref = bB.UW();
    this.bge(nA, bfr, bP);
    this.wU.zC({
      rid: bP.fdata,
      type: bP.fid,
      hash: bP.fhref,
      play: bfr,
      source: bP.fid,
      sourceid: bP.fdata
    })
  };
  fi.bU = function(cW) {
    var bhb = this.dA,
      rL = "m-playbar-lock",
      Av = "m-playbar-unlock";
    if (cW === undefined) return Oo.cV(bhb, rL);
    !cW ? Oo.kg(bhb, rL, Av) : Oo.kg(bhb, Av, rL);
    this.bi.kB("lock", cW)
  };
  fi.mS = function() {
    var pA, DV = function(iQ, cK) {
        Oo.ck(this.KE, "display", iQ ? "none" : "");
        if (rp.dV(cK)) cK.call(this)
      },
      Od = function(fq) {
        Oo.ck(this.dA, "top", fq.offset + "px")
      };
    return function(iQ, cK) {
      var dK = parseInt(Oo.di(this.dA, "top"));
      if (iQ === undefined) {
        return dK < -7
      }
      pA && pA.bW();
      pA = bE.qE.bH({
        to: {
          offset: iQ ? -53 : -7
        },
        from: {
          offset: dK
        },
        onstop: DV.bha(this, iQ, cK),
        onupdate: Od.bha(this),
        duration: iQ ? 100 : 350
      });
      pA.gA()
    }
  }();
  fi.Ar = function() {
    var mp = function() {
      this.dT = clearTimeout(this.dT);
      this.ii(false)
    };
    return function() {
      this.dT = setTimeout(mp.bha(this), 3e3)
    }
  }();
  fi.ii = function() {
    var bhj;
    return function(iQ) {
      clearTimeout(bhj);
      if (iQ) {
        this.mS(!0);
        return
      }
      if (this.dT || this.bU() || this.PS.style.visibility != "hidden" || this.ek && this.ek.sx()) return;
      bhj = setTimeout(this.mS.bha(this, !1), 500)
    }
  }();
  fi.bw = function() {
    Oo.ck(this.dA, "visibility", "visible")
  };
  fi.bM = function() {
    this.jz();
    Oo.ck(this.dA, "visibility", "hidden")
  }
})();
(function() {
  var ch = NEJ.P,
    bC = NEJ.F,
    bE = ch("nej.ut"),
    rp = ch("nej.u"),
    gG = ch("nej.v"),
    bv = ch("nej.j"),
    bkp = ch("nm.d"),
    fi;
  bkp.hL({
    "binding-list": {
      url: "/api/user/bindings/{id}",
      type: "get",
      filter: function(cr) {},
      format: function(co) {
        return this.bkV(co.bindings)
      }
    }
  });
  bkp.bkT = NEJ.C();
  fi = bkp.bkT.br(bkp.iR);
  fi.dJ = function() {
    this.dY()
  };
  fi.bkV = function(nA) {
    var bb, dB, bkt = [{
      type: 1,
      title: "手机",
      icon: "mb",
      key: "cellphone",
      uidkey: "cellphone"
    }, {
      type: 2,
      title: "新浪微博",
      icon: "sn",
      key: "name",
      uidkey: "uid"
    }, {
      type: 0,
      title: "网易通行证",
      icon: "urs",
      key: "email",
      uidkey: "email"
    }, {
      type: 6,
      title: "腾讯微博",
      icon: "tc",
      key: "nick",
      uidkey: "openId"
    }, {
      type: 4,
      title: "人人",
      icon: "rr",
      key: "user.name",
      uidkey: "user.id"
    }, {
      type: 3,
      title: "豆瓣",
      icon: "db",
      key: "douban_user_name",
      uidkey: "douban_user_id"
    }];
    rp.bZ(nA, function(bm) {
      bb = rp.eY(bkt, function(ord) {
        return ord.type == bm.type
      });
      if (bb >= 0) {
        bm.tokenJson = bm.tokenJson || JSON.parse(bm.tokenJsonStr);
        bm.uid = query(bm.tokenJson, bkt[bb].uidkey);
        bm.uname = query(bm.tokenJson, bkt[bb].key);
        bkt[bb].info = bm;
        if (bm.type == window.currentAccountType) {
          dB = bkt[bb];
          bkt.splice(bb, 1);
          bkt.unshift(dB)
        }
      }
    });
    return bkt;

    function query(ey, bhf) {
      if (bhf) {
        bhf = bhf.split(".");
        for (var i = 0; i < bhf.length; i++) {
          ey = ey[bhf[i]];
          if (!ey) return
        }
        return ey
      }
    }
  }
})();
(function() {
  var ch = NEJ.P,
    Oo = ch("nej.e"),
    bv = ch("nej.j"),
    bs = ch("nej.o"),
    rp = ch("nej.u"),
    gG = ch("nej.v"),
    gw = ch("nej.ui"),
    bkp = ch("nm.d"),
    bB = ch("nm.x"),
    be = ch("nm.l"),
    fi, bu;
  be.bkJ = NEJ.C();
  fi = be.bkJ.br(be.em, !0);
  fi.dJ = function() {
    this.dY()
  };
  fi.cA = function() {
    this.dh();
    var nA = Oo.bI(this.bl, "j-flag");
    this.Ob = nA[0];
    this.bkC = nA[1];
    this.bkE = nA[2];
    gG.ba(nA[3], "click", this.bkD.bha(this))
  };
  fi.dc = function() {
    this.du = "m-unbind-alert"
  };
  fi.bO = function(cr) {
    cr.parent = cr.parent || document.body;
    this.bS(cr);
    if (cr.type == "success") {
      Oo.kg(this.Ob, "u-icn-88", "u-icn-89")
    } else {
      Oo.kg(this.Ob, "u-icn-89", "u-icn-88")
    }
    this.bkC.innerText = cr.mesg || "";
    if (cr.mesg2) {
      Oo.bt(this.bkE, "f-hide");
      this.bkE.innerHTML = cr.mesg2 || ""
    } else {
      Oo.bF(this.bkE, "f-hide")
    }
  };
  fi.cP = function() {
    this.dm()
  };
  fi.bkD = function(fq) {
    this.bk("onnotice");
    this.bM()
  };
  be.yC = function(cr) {
    if (this.bkq) {
      this.bkq.bW();
      delete this.bkq
    }
    this.bkq = be.bkJ.bH(cr);
    this.bkq.bw()
  }
})();
(function() {
  var ch = NEJ.P,
    bs = NEJ.O,
    Oo = ch("nej.e"),
    gG = ch("nej.v"),
    rp = ch("nej.u"),
    bB = ch("nm.x"),
    bkp = ch("nm.d"),
    be = ch("nm.l"),
    fi, bu;
  be.bqJ = NEJ.C();
  fi = be.bqJ.br(be.em);
  bu = be.bqJ.cE;
  fi.bO = function(cr) {
    this.bS(cr);
    this.bi = bkp.hC.bH();
    this.bi.ba("onsendcaptcha", this.bhU.bha(this));
    this.bi.ba("onsendcaptchaerror", this.es.bha(this));
    this.bR();
    this.bU(!1);
    this.bqE = cr.title1 || "";
    this.brh = cr.title2 || "";
    Oo.ck(this.bqU, "display", !this.bqE ? "none" : "");
    Oo.ck(this.bqT, "display", !this.bqE ? "none" : "");
    this.bqU.innerHTML = this.bqE;
    this.bqT.innerHTML = this.brh;
    this.ci.value = "";
    Oo.ck(this.bqU, "display", !this.bqE ? "none" : "");
    Oo.ck(this.bqT, "display", !this.bqE ? "none" : "");
    Oo.ck(this.eC, "display", !this.bjP ? "none" : "");
    Oo.bt(this.ci, "u-txt-err")
  };
  fi.dc = function() {
    this.du = "m-wgt-sentcaptchawin"
  };
  fi.cA = function() {
    this.dh();
    var nA = Oo.bI(this.bl, "j-flag");
    this.bqU = nA[0];
    this.bqT = nA[1];
    this.ci = nA[2];
    this.cH = nA[3];
    this.cN = nA[4];
    Oo.gf(this.ci, "holder");
    gG.ba(this.ci, "focus", this.ht.bha(this));
    gG.ba(this.ci, "keypress", this.kb.bha(this));
    gG.ba(this.cH, "click", this.oB.bha(this))
  };
  fi.ht = function() {
    Oo.bt(this.ci, "u-txt-err")
  };
  fi.kb = function(fq) {
    if (fq.keyCode == 13) this.oB()
  };
  fi.oB = function(fq) {
    gG.cD(fq);
    if (this.bU()) return;
    var dI;
    if (!(dI = this.oi())) return;
    this.bk("onsendcaptcha", {
      mobile: dI
    });
    this.bM()
  };
  fi.bhU = function(bhc) {
    this.bU(!1);
    this.bM();
    this.bk("onsendcaptcha", bhc)
  };
  fi.es = function(bhc) {
    this.bU(!1);
    this.bR(bhc.message || "验证码发送失败")
  };
  fi.oi = function() {
    var dI = this.ci.value.trim();
    if (!dI || !bB.qg(dI)) {
      Oo.bF(this.ci, "u-txt-err");
      this.bR("请输入正确的手机号码");
      return
    }
    this.bR();
    Oo.bt(this.ci, "u-txt-err");
    return dI
  };
  fi.bR = function(de) {
    this.gy(this.cN, de)
  };
  fi.bU = function(cW) {
    return this.eb(this.cH, cW, "获取验证码", "发送中...")
  }
})();
(function() {
  var ch = NEJ.P,
    bs = NEJ.O,
    Oo = ch("nej.e"),
    gG = ch("nej.v"),
    rp = ch("nej.u"),
    bkp = ch("nm.d"),
    be = ch("nm.l"),
    fi, bu;
  be.bqI = NEJ.C();
  fi = be.bqI.br(be.em);
  bu = be.bqI.cE;
  fi.bO = function(cr) {
    this.bS(cr);
    this.ho = cr.mobile || "";
    this.bqV = cr.head || "你的手机号为：" + this.ho;
    this.bi = bkp.hC.bH();
    this.bi.ba("onsendcaptcha", this.bhU.bha(this));
    this.bi.ba("onverifycaptcha", this.ER.bha(this));
    this.bi.ba("onmobilebinderror", this.es.bha(this, 0));
    this.bi.ba("onsendcaptchaerror", this.es.bha(this, 1));
    this.bi.ba("onverifycaptchaerror", this.es.bha(this, 2));
    this.bR();
    this.bU(!1);
    this.Bq.innerText = this.bqV;
    this.ci.value = "";
    Oo.bt(this.ci, "u-txt-err");
    Oo.ck(this.Bq, "display", this.bqV ? "" : "none");
    this.oB();
    Oo.ck(this.ke, "display", cr.noback ? "none" : "");
    if (cr.ntext) {
      this.nY.innerHTML = "<i>" + cr.ntext + "</i>"
    } else {
      this.nY.innerHTML = "<i>下一步</i>"
    }
  };
  fi.dc = function() {
    this.du = "m-wgt-verifycaptchawin"
  };
  fi.cA = function() {
    this.dh();
    var nA = Oo.bI(this.bl, "j-flag");
    this.Bq = nA[0];
    this.ci = nA[1];
    this.ET = nA[2];
    this.cH = nA[3];
    this.cN = nA[4];
    this.ke = nA[5];
    this.nY = nA[6];
    gG.ba(this.ci, "focus", this.ht.bha(this));
    gG.ba(this.ci, "keypress", this.kb.bha(this));
    gG.ba(this.cH, "click", this.oB.bha(this));
    gG.ba(this.ke, "click", this.sa.bha(this));
    gG.ba(this.nY, "click", this.bqS.bha(this))
  };
  fi.cP = function() {
    this.dm();
    if (this.dT) {
      clearInterval(this.dT);
      delete this.dT
    }
  };
  fi.ht = function() {
    Oo.bt(this.ci, "u-txt-err")
  };
  fi.kb = function(fq) {
    if (fq.keyCode == 13) this.bqD()
  };
  fi.sa = function(fq) {
    gG.cD(fq);
    this.bM();
    this.bk("onback")
  };
  fi.bqS = function(fq) {
    gG.cD(fq);
    this.bqD()
  };
  fi.bqD = function() {
    if (this.bU()) return;
    var og;
    if (!(og = this.Fe())) return;
    this.bU(!0);
    this.bi.LF({
      data: {
        cellphone: this.ho,
        captcha: og
      }
    })
  };
  fi.ER = function(bhc) {
    this.bk("onnext", bhc);
    this.bM()
  };
  fi.oB = function(fq) {
    gG.cD(fq);
    if (!!this.dT) return;
    this.bi.zy({
      data: {
        cellphone: this.ho
      }
    })
  };
  fi.bhU = function(bhc) {
    this.bhG()
  };
  fi.es = function(bc, bhc) {
    bhc = bhc || {};
    this.bU(!1);
    if (bc == 1) {
      this.bR(bhc.message || "验证码发送失败")
    } else {
      this.bR(bhc.message || "验证码错误")
    }
  };
  fi.Fe = function() {
    var og = this.ci.value.trim();
    if (!og) {
      Oo.bF(this.ci, "u-txt-err");
      this.bR("请输入验证码");
      return
    }
    this.bR();
    Oo.bt(this.ci, "u-txt-err");
    return og
  };
  fi.bhG = function() {
    var cn;
    var yW = function() {
      cn--;
      cn = Math.max(0, cn);
      this.ET.innerText = " (00:" + (cn >= 10 ? cn : "0" + cn) + ") ";
      if (cn <= 0) {
        this.dT = clearInterval(this.dT)
      }
    };
    return function() {
      cn = 60;
      this.dT = clearInterval(this.dT);
      this.dT = setInterval(yW.bha(this), 1e3);
      yW.call(this)
    }
  }();
  fi.bR = function(de) {
    this.gy(this.cN, de)
  };
  fi.bU = function(cW) {
    return this.eb(this.nY, cW, "下一步", "验证中...")
  }
})();
(function() {
  var ch = NEJ.P,
    bs = NEJ.O,
    Oo = ch("nej.e"),
    gG = ch("nej.v"),
    rp = ch("nej.u"),
    bkp = ch("nm.d"),
    be = ch("nm.l"),
    fi, bu;
  be.bqC = NEJ.C();
  fi = be.bqC.br(be.em);
  bu = be.bqC.cE;
  fi.bO = function(cr) {
    this.bS(cr);
    this.bi = bkp.hC.bH();
    this.bi.ba("onmobileresetpwd", this.Ex.bha(this));
    this.bi.ba("onmobileupdatepwd", this.Ex.bha(this));
    this.bi.ba("onmobileresetpwderror", this.es.bha(this));
    this.bi.ba("onmobileupdatepwderror", this.es.bha(this));
    this.ho = cr.mobile;
    this.nM = cr.captcha;
    this.bR();
    this.bU(!1);
    this.cF.value = "";
    this.vv.innerHTML = cr.message || "设置密码后，可使用手机号登录";
    if (!cr.message) {
      Oo.kg(this.lu, "n-set-2", "n-set-1")
    } else {
      Oo.kg(this.lu, "n-set-1", "n-set-2")
    }
    Oo.ck(this.ke, "display", !cr.noback ? "" : "none");
    Oo.bt(this.cF, "u-txt-err")
  };
  fi.dc = function() {
    this.du = "m-wgt-setpasswordwin"
  };
  fi.cA = function() {
    this.dh();
    var nA = Oo.dw(this.bl);
    this.lu = nA[0];
    nA = Oo.bI(this.bl, "j-flag");
    this.vv = nA[0];
    this.cF = nA[1];
    this.cN = nA[2];
    this.ke = nA[3];
    this.nY = nA[4];
    Oo.gf(this.cF, "holder");
    gG.ba(this.cF, "focus", this.ht.bha(this));
    gG.ba(this.cF, "keypress", this.kb.bha(this));
    gG.ba(this.ke, "click", this.sa.bha(this));
    gG.ba(this.nY, "click", this.yZ.bha(this))
  };
  fi.ht = function() {
    Oo.bt(this.ci, "u-txt-err")
  };
  fi.kb = function(fq) {
    if (fq.keyCode == 13) this.yZ()
  };
  fi.sa = function(fq) {
    gG.cD(fq);
    this.bM();
    this.bk("onback")
  };
  fi.yZ = function(fq) {
    gG.cD(fq);
    if (this.bU()) return;
    var dx;
    if (!(dx = this.jv())) return;
    this.bU(!0);
    if (!this.nM) {
      var fU = {
        phone: this.ho,
        oldPassword: "",
        password: rp.oG(dx)
      };
      this.bi.brn({
        data: fU
      });
      return
    }
    var fU = {
      phone: this.ho,
      captcha: this.nM,
      password: rp.oG(dx)
    };
    this.bi.LK({
      data: fU
    })
  };
  fi.Ex = function(bhc) {
    this.bU(!1);
    this.bM();
    this.bk("onnext", bhc)
  };
  fi.es = function(bhc) {
    this.bU(!1);
    this.bR("密码设置失败")
  };
  fi.jv = function() {
    var dx = this.cF.value;
    if (/[^\x00-\xff]/.test(dx)) {
      Oo.bF(this.cF, "u-txt-err");
      this.bR("密码不支持中文字符");
      return
    }
    if (!dx || dx.length < 6 || dx.length > 16) {
      Oo.bF(this.cF, "u-txt-err");
      this.bR(!dx ? "请输入密码" : "请输入6到16个字符的密码");
      return
    }
    this.bR();
    Oo.bt(this.cF, "u-txt-err");
    return dx
  };
  fi.bR = function(de) {
    this.gy(this.cN, de)
  };
  fi.bU = function(cW) {
    return this.eb(this.nY, cW, "完　成", "设置中...")
  }
})();
(function() {
  var ch = NEJ.P,
    Oo = ch("nej.e"),
    bv = ch("nej.j"),
    bs = ch("nej.o"),
    gG = ch("nej.v"),
    rp = ch("nej.u"),
    pm = ch("nej.ut"),
    gw = ch("nej.ui"),
    bkp = ch("nm.d"),
    bB = ch("nm.x"),
    be = ch("nm.l"),
    fi, bu;
  be.bqR = NEJ.C();
  fi = be.bqR.br(pm.dD, !0);
  fi.dJ = function() {
    this.dY();
    this.bqy = [{
      klass: be.bqJ,
      opt: {
        parent: document.body,
        title: "绑定手机号",
        onclose: this.bqB.bha(this),
        onsendcaptcha: this.oB.bha(this)
      }
    }, {
      klass: be.bqI,
      opt: {
        parent: document.body,
        title: "绑定手机号",
        onclose: this.bqB.bha(this),
        onback: function() {
          this.bqx(0)
        }.bha(this),
        onnext: this.blJ.bha(this)
      }
    }, {
      klass: be.bqC,
      opt: {
        parent: document.body,
        title: "设置密码",
        onclose: this.bqB.bha(this),
        onback: function() {
          this.bqx(1)
        }.bha(this),
        onnext: this.bqQ.bha(this)
      }
    }]
  };
  fi.bO = function(cr) {
    this.bS(cr);
    if (cr && rp.eH(cr.conf)) {
      if (cr.conf[0]) {
        this.bqy[0].opt.title1 = cr.conf[0].title1;
        this.bqy[0].opt.title2 = cr.conf[0].title2;
        this.bqy[0].opt.tip = cr.conf[0].tip
      }
      if (cr.conf[1]) {
        this.bqy[1].opt.head = cr.conf[1].head
      }
      if (cr.conf[2]) {
        this.bqy[2].opt.head = cr.conf[2].head;
        this.bqy[2].opt.message = cr.conf[2].message
      }
    }
    this.bqP = (cr || {}).relogin;
    this.bqw = {};
    this.bqx(0)
  };
  fi.bqB = function(fq) {
    this.bk("onabort")
  };
  fi.cP = function() {
    this.dm()
  };
  fi.bqx = function(tj) {
    this.bqz = tj || 0;
    var bqv = this.bqy[this.bqz];
    if (bqv) {
      bqv.opt.mobile = this.bqw.mobile;
      bqv.opt.captcha = this.bqw.captcha;
      bqv.klass.bH(bqv.opt).bw()
    }
  };
  fi.oB = function(bhc) {
    this.bqw.mobile = bhc.mobile;
    this.bqx(1)
  };
  fi.blJ = function(bhc) {
    this.bqw.captcha = bhc.captcha;
    bv.fe("/api/user/bindingCellphone", {
      type: "json",
      method: "post",
      query: {
        phone: this.bqw.mobile,
        captcha: bhc.captcha
      },
      onload: this.bkw.bha(this),
      onerror: this.bkw.bha(this)
    })
  };
  fi.bqQ = function(bhc) {
    if (this.bqP) {
      bv.fe("/api/mainAccount/set", {
        type: "json",
        method: "post",
        query: {
          phone: this.bqw.mobile,
          password: bhc.password
        },
        onload: this.bqA.bha(this),
        onerror: this.bqA.bha(this)
      });
      return
    }
    be.yC({
      type: "success",
      title: "绑定成功",
      mesg: "绑定成功",
      mesg2: "以后可直接用手机号登录云音乐"
    });
    this.bk("onsuccess")
  };
  fi.bqA = function(fq) {
    be.yC({
      type: "success",
      title: "绑定成功",
      mesg: "绑定成功",
      mesg2: "以后可直接用手机号登录云音乐"
    });
    if (fq && fq.code == 200) {
      localCache.fL("user", fq);
      gG.bk(window, "login", {
        user: fq
      })
    }
  };
  fi.bkw = function(fq) {
    if (fq.code == 200) {
      this.bqx(2)
    } else {
      if (fq.code == 506) {
        be.yC({
          type: "fail",
          title: "绑定失败",
          mesg: "绑定失败",
          mesg2: "手机号已被绑定在云音乐帐号：" + fq.bindingNickname
        })
      } else {
        be.yC({
          type: "fail",
          title: "绑定失败",
          mesg: "绑定失败"
        })
      }
    }
  };
  fi.bkM = function(fq) {
    if (fq.code == 200) {
      top.g_cbBind({
        code: 200,
        type: 1,
        message: "以后可直接用手机号登录云音乐",
        cellphone: this.bqw.mobile
      })
    } else {
      be.yC({
        type: "fail",
        title: "设置密码失败",
        mesg: "设置密码失败"
      })
    }
  }
})();
(function() {
  var ch = NEJ.P,
    Oo = ch("nej.e"),
    bv = ch("nej.j"),
    bs = ch("nej.o"),
    gG = ch("nej.v"),
    rp = ch("nej.u"),
    pm = ch("nej.ut"),
    gw = ch("nej.ui"),
    bkp = ch("nm.d"),
    bB = ch("nm.x"),
    be = ch("nm.l"),
    fi, bu;
  be.bre = NEJ.C();
  fi = be.bre.br(pm.dD, !0);
  fi.dJ = function() {
    this.dY();
    this.bqy = [{
      klass: be.bqC,
      opt: {
        parent: document.body,
        title: "设置密码",
        onclose: this.bqB.bha(this),
        noback: true,
        onnext: this.bqQ.bha(this)
      }
    }]
  };
  fi.bO = function(cr) {
    this.bS(cr);
    if (cr && rp.eH(cr.conf)) {
      if (cr.conf[0]) {
        var dI = cr.conf[0].mobile;
        this.bqy[0].opt.mobile = dI;
        this.bqy[0].opt.message = "云音乐即将不支持腾讯微博登录，设置密码后，<br/>可使用手机号" + bB.brk(dI) + "登录"
      }
    }
    this.bqP = (cr || {}).relogin;
    this.bqw = {};
    this.bqx(0)
  };
  fi.cP = function() {
    this.dm()
  };
  fi.bqB = function(fq) {
    this.bk("onabort")
  };
  fi.bqx = function(tj) {
    this.bqz = tj || 0;
    var bqv = this.bqy[this.bqz];
    if (bqv) {
      bqv.klass.bH(bqv.opt).bw()
    }
  };
  fi.bqQ = function(bhc) {
    if (this.bqP) {
      bv.fe("/api/mainAccount/set", {
        type: "json",
        method: "post",
        query: {
          phone: bhc.mobile,
          password: bhc.password
        },
        onload: this.bqA.bha(this),
        onerror: this.bqA.bha(this)
      });
      return
    }
    be.yC({
      type: "success",
      title: "密码设置成功",
      mesg: "密码设置成功",
      mesg2: "以后可直接用手机号登录云音乐"
    });
    this.bk("onsuccess")
  };
  fi.bqA = function(fq) {
    be.yC({
      type: "success",
      title: "密码设置成功",
      mesg: "密码设置成功",
      mesg2: "以后可直接用手机号登录云音乐"
    });
    if (fq && fq.code == 200) {
      localCache.fL("user", fq);
      gG.bk(window, "login", {
        user: fq
      })
    }
  }
})();
(function() {
  var ch = NEJ.P,
    Oo = ch("nej.e"),
    gG = ch("nej.v"),
    rp = ch("nej.u"),
    eg = ch("nej.p"),
    bv = ch("nej.j"),
    Rp = ch("nm.ut"),
    dO = ch("nm.w"),
    be = ch("nm.l"),
    bB = ch("nm.x"),
    fi, bu;
  be.XE = NEJ.C();
  fi = be.XE.br(be.em);
  bu = be.XE.cE;
  fi.dJ = function(cr) {
    cr.title = "转发动态";
    this.dY(cr)
  };
  fi.bO = function(cr) {
    if (cr.onclose === undefined) cr.onclose = function() {
      this.bM()
    }.bha(this);
    this.bS(cr);
    this.hs = cr.rid;
    this.yQ = cr.uid;
    this.baM = cr.text;
    this.Rm.value = this.baM;
    this.Rt = dO.TQ.bH({
      parent: document.body,
      target: this.Rm
    })
  };
  fi.dc = function() {
    this.du = "m-wgt-forward"
  };
  fi.cA = function() {
    this.dh();
    var eB = Oo.bI(this.bl, "j-flag");
    this.Vq = eB[0];
    this.Rm = eB[1];
    this.Wq = eB[2];
    this.baN = eB[3];
    this.TO = eB[4];
    this.nb = eB[5];
    this.ban = eB[6];
    this.baO = eB[7];
    this.baP = eB[8];
    gG.ba(this.Rm, "input", this.kx.bha(this));
    gG.ba(this.Rm, "keyup", this.WB.bha(this));
    gG.ba(this.Rm, "click", this.RM.bha(this));
    gG.ba(this.TO, "click", this.Ws.bha(this));
    gG.ba(this.baN, "click", this.DX.bha(this));
    gG.ba(this.ban, "click", this.baQ.bha(this));
    gG.ba(this.baO, "click", this.FW.bha(this))
  };
  fi.cP = function() {
    this.dm();
    if (this.wQ) {
      this.wQ.bW();
      delete this.wQ
    }
    if (this.Rt) {
      this.Rt.bW();
      delete this.Rt
    }
  };
  fi.kx = function(fq) {
    eg.dC.browser == "ie" && eg.dC.version < "7.0" ? setTimeout(this.ko.bha(this), 0) : this.ko()
  };
  fi.WB = function(fq) {
    this.RM();
    this.kx()
  };
  fi.ko = function() {
    var ca = this.Rm.value.trim().length;
    this.nb.innerHTML = !ca ? "140" : 140 - ca;
    ca > 140 ? Oo.bF(this.nb, "s-fc6") : Oo.bt(this.nb, "s-fc6");
    if (!ca || ca == 0) Oo.ck(this.Vq, "display", "block");
    else Oo.ck(this.Vq, "display", "none")
  };
  fi.Ws = function(fq) {
    gG.cd(fq);
    !!this.wQ && this.wQ.bM();
    this.Rt.TS();
    this.ko()
  };
  fi.DX = function(fq) {
    gG.cd(fq);
    if (!this.wQ) {
      this.wQ = be.wC.bH({
        parent: this.Wq
      });
      this.wQ.ba("onselect", this.wF.bha(this))
    }
    this.wQ.bw()
  };
  fi.wF = function(fq) {
    var bA = "[" + fq.text + "]";
    Rp.TZ(this.Rm, this.RU, bA);
    this.ko();
    gG.bk(this.Rm, "keyup")
  };
  fi.RM = function() {
    this.RU = Rp.Sq(this.Rm)
  };
  fi.baQ = function(fq) {
    gG.cd(fq);
    if (this.eb()) return;
    if (this.Rm.value.trim().length > 140) {
      this.gy("字数超过140个字符");
      return
    }
    var baS = this.Rm.value.trim();
    var RC = window.GUser.userId;
    var bh = this.hs;
    var bz = "/api/event/forward";
    var fU = {
      forwards: baS,
      id: this.hs,
      eventUserId: this.yQ
    };
    fU = rp.eo(fU);
    this.eb(!0);
    var cq = bv.fe(bz, {
      sync: false,
      type: "json",
      data: fU,
      method: "POST",
      onload: this.nE.bha(this),
      onerror: this.gx.bha(this)
    })
  };
  fi.nE = function(bhc) {
    this.eb(!1);
    if (bhc.code != 200) {
      var de = "转发失败";
      switch (bhc.code) {
        case 404:
          de = bhc.message || "该动态已被删除";
          break;
        case 407:
          de = "输入内容包含有关键字";
          break;
        case 408:
          de = "转发太快了，过会再分享吧";
          break
      }
      this.gy(de);
      return
    }
    Rp.YL(this.Rm.value);
    this.bM();
    be.dR.bw({
      tip: "转发成功！",
      autoclose: true
    });
    this.bk("onforward", {
      id: this.hs,
      eventUserId: this.yQ
    })
  };
  fi.gx = function(fU) {
    this.eb(!1);
    this.gy(de)
  };
  fi.eb = function(cW) {
    return bu.eb(this.ban, cW, "转发", "转发中 ...")
  };
  fi.gy = function(de) {
    return bu.gy(this.baP, de)
  };
  fi.FW = function(fq) {
    gG.cD(fq);
    this.bM()
  };
  fi.Jw = function() {
    this.Rm.focus();
    if (eg.dC.browser == "ie" && parseInt(eg.dC.version) < 10) return;
    Rp.Wg(this.Rm, {
      start: 0,
      end: 0
    });
    this.RM()
  };
  fi.bM = function() {
    bu.bM.call(this);
    if (this.wQ) {
      this.wQ.bW();
      delete this.wQ
    }
    if (this.Rt) {
      this.Rt.bW();
      delete this.Rt
    }
  };
  fi.bw = function(cr) {
    bu.bw.call(this);
    this.gy();
    this.eb(!1);
    this.ko();
    this.Jw();
    this.RU = Rp.Sq(this.Rm)
  };
  bB.XB = function(cr) {
    if (!GUser || !GUser.userId || GUser.userId <= 0) {
      be.lA.bw({
        title: "登录"
      });
      return
    }
    if (cr.title === undefined) cr.title = "转发动态";
    be.XE.bw(cr)
  }
})();
(function() {
  var ch = NEJ.P,
    bs = NEJ.O,
    Oo = ch("nej.e"),
    gG = ch("nej.v"),
    rp = ch("nej.u"),
    bv = ch("nej.j"),
    bE = ch("nej.ut"),
    bkp = ch("nm.d"),
    bB = ch("nm.x"),
    bN = ch("nm.m"),
    be = ch("nm.l"),
    bp = ch("nm.m.f"),
    AM = /#(.*?)$/,
    fi, bu;
  bp.AW = NEJ.C();
  fi = bp.AW.br(bE.gM);
  fi.cS = function() {
    this.dq();
    window.onHashChange = this.Hb.bha(this);
    window.log = this.KA.bha(this);
    window.share = this.Hw.bha(this);
    window.login = this.Hl.bha(this);
    window.logout = this.Ed.bha(this);
    window.subscribe = this.oD.bha(this);
    window.onIframeClick = this.oq.bha(this);
    window.g_cbBind = this.wP.bha(this);
    window.g_cbLogin = this.hU.bha(this);
    gG.ba(window, "login", this.MH.bha(this));
    gG.ba(window, "playchange", this.gI.bha(this));
    this.Ih();
    this.bL = bp.xr.bH();
    this.bL.bk("onshow", {});
    bv.fe("/api/login/token/refresh", {
      type: "json",
      method: "post"
    });
    this.Hb(bB.UW())
  };
  fi.Ih = function() {
    var dz = {
      account: {},
      profile: {},
      bindings: []
    };
    if (typeof GUser !== "undefined") {
      dz.profile.userId = GUser.userId;
      dz.profile.nickname = GUser.nickname;
      dz.profile.avatarUrl = GUser.avatarUrl
    }
    if (typeof GBinds !== "undefined") {
      dz.bindings = GBinds
    }
    localCache.fL("user", dz);
    this.wU = bkp.BL.bH();
    this.Br = bkp.hC.bH();
    this.Br.ba("onlogout", this.Gx.bha(this));
    this.Br.ba("onmainaccountreplace", this.hU.bha(this))
  };
  fi.Hb = function(dF) {
    var fq = location.parse(dF);
    this.fv(fq)
  };
  fi.fv = function(fq, bc) {
    var bJ = Oo.bn("g_iframe"),
      hk = fq.path,
      cm = fq.query,
      jp = bJ.contentWindow.location;
    this.nz = bJ;
    if (/^\/mv/.test(hk)) {
      if (this.bL) this.bL.bM();
      this.bjd = document.title
    } else {
      if (this.bL) this.bL.bw();
      document.title = this.bjd || bB.Lc()
    } if (cm.play == "true" && /^\/(m\/)?song/.test(hk)) {
      if (this.bL) this.bL.bfW(18, cm.id, true)
    }
    if (/^\/my\/m\/music\/playlist/.test(hk)) {
      var SS = bB.UU();
      if (!SS && !!cm.id) {
        location.dispatch2("/playlist?id=" + cm.id);
        return
      }
    }
    if (bc !== undefined) {
      if (hk == "/my/" || hk == "/friend" || hk == "/event") GDispatcher.refreshIFrame(fq.href);
      else jp.reload();
      return
    }
  };
  fi.MH = function() {
    var bqM = function(brl) {
      bv.uH("MUSIC_U", {
        expires: -1
      });
      if (!brl) this.Br.Lw();
      else this.Br.bro();
      var cl = be.lA;
      cl.bw({
        title: "登录"
      })
    };
    var bqL = function(dN) {
      var dF = AM.test(location.href) ? RegExp.$1 : "",
        fq = location.parse(dF);
      this.fv(fq, dN)
    };
    return function(fq) {
      if (typeof GUser === "object" && fq.user && fq.user.profile) {
        var tQ = fq.user.profile;
        GUser.userId = tQ.userId;
        GUser.nickname = tQ.nickname;
        GUser.avatarUrl = tQ.avatarUrl
      }
      var dz = localCache.bn("user");
      if (dz.account && dz.account.type == 6) {
        if (dz.loginType == 6) {
          var bqK = null,
            brf = false,
            brg = false;
          for (var i = 0, nA = dz.bindings || [], dB; i < nA.length; ++i) {
            if (nA[i].type != 1) continue;
            try {
              dB = JSON.parse(nA[i].tokenJsonStr)
            } catch (e) {}
            if (dB) {
              bqK = dB.cellphone;
              brf = true;
              brg = !!dB.hasPassword;
              break
            }
          }
          if (!brf) {
            be.bqR.bH({
              conf: [{
                title1: "云音乐即将不支持腾讯微博登录",
                title2: "绑定手机号后，可使用手机号登录",
                tip: "为了安全，我们会向你的手机发送短信验证码！"
              }, {
                head: ""
              }, {
                message: "设置密码后，可使用手机号登录"
              }],
              relogin: true,
              onabort: bqM.bha(this)
            });
            bqL.call(this, 1);
            return
          }
          if (!brg) {
            be.bre.bH({
              conf: [{
                mobile: bqK
              }],
              relogin: true,
              onabort: bqM.bha(this)
            });
            bqL.call(this, 1);
            return
          }
          be.hd.bw({
            title: "手机号登录",
            onclose: bqM.bha(this, true),
            tweibo: true,
            mobile: bqK
          })
        } else {
          this.Br.brq({
            data: {
              type: dz.loginType
            }
          });
          var bG = {
            1: "手机号",
            0: "通行证",
            2: "新浪微博"
          };
          bB.mr({
            title: "登录说明",
            message: "云音乐即将不支持腾讯微博登录<br/>系统将自动把" + (bG[dz.loginType] || "") + "设置为你的主帐号",
            btnok: "查看详情",
            btncc: "我知道了",
            okstyle: "u-btn2-w1",
            ccstyle: "u-btn2-w1",
            action: function(bc) {
              if (bc == "ok") {
                location.hash = "/user/binding"
              }
            }
          })
        }
      } else {
        bqL.call(this, 1)
      }
    }
  }();
  fi.gI = function(fq) {
    var dP = this.nz.contentWindow;
    if (dP.nej && dP.nej.v) dP.nej.v.bk(dP, "playchange", fq)
  };
  fi.KA = function(gi, bP) {
    switch (gi) {
      case "play":
        this.wU.gA(bP);
        break;
      case "search":
        this.wU.Gp(bP);
        break;
      default:
        this.wU.Gq(gi, bP)
    }
  };
  fi.Ed = function() {
    be.rm.bM();
    bv.uH("MUSIC_U", {
      expires: -1
    });
    this.Br.Lw()
  };
  fi.Gx = function(bhc) {
    localCache.ej("user");
    localCache.ej("host-plist");
    if (typeof GUser === "object") {
      GUser.userId = 0;
      GUser.nickname = "";
      GUser.avatarUrl = ""
    }
    if (!location.hash || location.hash == "#") {
      var dF = AM.test(location.href) ? RegExp.$1 : "",
        fq = location.parse(dF);
      this.fv(fq, 0);
      return
    }
    location.hash = "#"
  };
  fi.Hl = function(bc) {
    be.lA.bM();
    be.hd.bM();
    be.jY.bM();
    var cl = bc === undefined ? be.lA : bc == 0 ? be.hd : be.jY;
    cl.bw({
      title: bc === undefined ? "登录" : bc == 0 ? "手机号登录" : "网易通行证登录"
    })
  };
  fi.hU = function(bhc) {
    if (bhc && bhc.code == 200) {
      var SE = JSON.stringify(bhc);
      localCache.fL("user", JSON.parse(SE));
      if (bhc.profile) {
        this.MH({
          user: bhc
        })
      } else {
        be.lq.bw({
          title: "昵称设置"
        })
      }
      return
    }
  };
  fi.Hw = function() {
    if (this.nz.contentWindow.share) {
      this.nz.contentWindow.share.apply(this.nz.contentWindow, arguments)
    }
  };
  fi.oD = function(bY, beS) {
    var dP = this.nz.contentWindow;
    if (dP.nm && dP.nm.x) {
      if (beS && dP.nm.x.bad) {
        dP.nm.x.bad({
          data: bY.program
        })
      } else if (dP.nm.x.gQ) {
        var nA = rp.eH(bY) ? bY : [bY];
        dP.nm.x.gQ({
          tracks: nA
        })
      }
    }
  };
  fi.oq = function(fq) {
    gG.bk(window, "iframeclick")
  };
  fi.wP = function(bhc) {
    var bb, bkv = localCache.Pp("user.bindings") || [],
      dP = this.nz.contentWindow;
    if (bhc.code == 200) {
      bb = rp.eY(bkv, function(bd) {
        return bd.type == bhc.type
      });
      bhc.tokenJson = bhc;
      if (bb >= 0) {
        bkv[bb] = bhc
      } else {
        bkv.push(bhc)
      } if (dP.nej && dP.nej.v) dP.nej.v.bk(dP, "snsbind", {
        result: bhc
      });
      gG.bk(window, "snsbind", {
        result: bhc
      })
    } else {
      if (dP.nej && dP.nej.v) dP.nej.v.bk(dP, "snsbind", {
        result: bhc
      });
      if (bhc.stopped) return;
      if (bhc.code == 400) {
        be.yC({
          title: "解绑失败",
          type: "fail",
          mesg: "解绑失败",
          mesg2: bhc.message || ""
        })
      } else {
        be.yC({
          title: "绑定失败",
          type: "fail",
          mesg: "绑定失败",
          mesg2: bhc.message || "绑定失败"
        })
      }
    }
  };
  bE.gE.bH({
    element: window,
    event: ["login", "snsbind", "playchange", "iframeclick"]
  });
  Oo.eU("template-box");
  new bp.AW
})()