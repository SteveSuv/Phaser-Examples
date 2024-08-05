!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
      ? define("BasePlugin", [], e)
      : "object" == typeof exports
        ? (exports.BasePlugin = e())
        : (t.BasePlugin = e());
})("undefined" != typeof self ? self : this, function () {
  return (function (t) {
    function e(n) {
      if (s[n]) return s[n].exports;
      var o = (s[n] = { i: n, l: !1, exports: {} });
      return t[n].call(o.exports, o, o.exports, e), (o.l = !0), o.exports;
    }
    var s = {};
    return (
      (e.m = t),
      (e.c = s),
      (e.d = function (t, s, n) {
        e.o(t, s) ||
          Object.defineProperty(t, s, {
            configurable: !1,
            enumerable: !0,
            get: n,
          });
      }),
      (e.n = function (t) {
        var s =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return e.d(s, "a", s), s;
      }),
      (e.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (e.p = ""),
      e((e.s = 0))
    );
  })([
    function (t, e) {
      /**
       * @author       Richard Davey <rich@photonstorm.com>
       * @copyright    2018 Photon Storm Ltd.
       * @license      {@link https://github.com/photonstorm/phaser3-plugin-template/blob/master/LICENSE|MIT License}
       */
      var s = function (t) {
        (this.scene = t),
          (this.systems = t.sys),
          t.sys.settings.isBooted || t.sys.events.once("boot", this.boot, this);
      };
      (s.register = function (t) {
        t.register("BasePlugin", s, "base");
      }),
        (s.prototype = {
          boot: function () {
            var t = this.systems.events;
            t.on("start", this.start, this),
              t.on("preupdate", this.preUpdate, this),
              t.on("update", this.update, this),
              t.on("postupdate", this.postUpdate, this),
              t.on("pause", this.pause, this),
              t.on("resume", this.resume, this),
              t.on("sleep", this.sleep, this),
              t.on("wake", this.wake, this),
              t.on("shutdown", this.shutdown, this),
              t.on("destroy", this.destroy, this);
          },
          test: function (t) {
            console.log("BasePlugin says hello " + t + "!");
          },
          start: function () {},
          preUpdate: function (t, e) {},
          update: function (t, e) {},
          postUpdate: function (t, e) {},
          pause: function () {},
          resume: function () {},
          sleep: function () {},
          wake: function () {},
          shutdown: function () {},
          destroy: function () {
            this.shutdown(), (this.scene = void 0);
          },
        }),
        (s.prototype.constructor = s),
        (t.exports = s);
    },
  ]);
});
