var script = {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: "Loading..."
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.loading
    ? _c("div", { staticClass: "body-loading" }, [
        _vm._m(0),
        _vm._v(" "),
        _c("div", { staticClass: "loading-text" }, [_vm._v(_vm._s(_vm.text))])
      ])
    : _vm._e()
};
var __vue_staticRenderFns__ = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "loading" }, [
      _c("div", { staticClass: "circle" }),
      _vm._v(" "),
      _c("div", { staticClass: "circle" }),
      _vm._v(" "),
      _c("div", { staticClass: "circle" })
    ])
  }
];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-7cc1cdc6_0", { source: "\n.body-loading[data-v-7cc1cdc6] {\n  top: 0;\n  left: 0;\n  right: 0;\n  position: fixed;\n  min-height: 100vh;\n  min-width: 100vw;\n  margin: 0;\n  padding: 0;\n  background-color: #353b48;\n  -khtml-opacity: 0.8;\n  -moz-opacity: 0.8;\n  -ms-filter: ”alpha(opacity=80) ”;\n  filter: alpha(opacity=80);\n  filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0.8);\n  opacity: 0.8;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  transition: opacity 0.5s ease-in;\n}\n.loading-text[data-v-7cc1cdc6] {\n  margin-top: 2rem;\n  font-family: \"Courier New\", Courier, monospace;\n  color: #fff;\n}\n.loading[data-v-7cc1cdc6] {\n  display: flex;\n  transition: opacity 0.3s ease-in;\n}\n.circle[data-v-7cc1cdc6] {\n  background-color: #fff;\n  border-radius: 50%;\n  margin: 2px;\n  height: 10px;\n  width: 10px;\n  animation: jump-data-v-7cc1cdc6 0.7s ease-in infinite;\n}\n.circle[data-v-7cc1cdc6]:nth-of-type(2) {\n  animation-delay: 0.2s;\n}\n.circle[data-v-7cc1cdc6]:nth-of-type(3) {\n  animation-delay: 0.4s;\n}\n@keyframes jump-data-v-7cc1cdc6 {\n0%,\n  100% {\n    transform: translateY(0);\n}\n50% {\n    transform: translateY(-10px);\n}\n}\n", map: {"version":3,"sources":["/home/rant1989/dev/tests/vue-sfc-rollup/src/component.vue"],"names":[],"mappings":";AA2BA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,eAAA;EACA,iBAAA;EACA,gBAAA;EACA,SAAA;EACA,UAAA;EACA,yBAAA;EACA,mBAAA;EACA,iBAAA;EACA,gCAAA;EACA,yBAAA;EACA,4DAAA;EACA,YAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,gCAAA;AACA;AAEA;EACA,gBAAA;EACA,8CAAA;EACA,WAAA;AACA;AAEA;EACA,aAAA;EACA,gCAAA;AACA;AAEA;EACA,sBAAA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,qDAAA;AACA;AAEA;EACA,qBAAA;AACA;AAEA;EACA,qBAAA;AACA;AAEA;AACA;;IAEA,wBAAA;AACA;AAEA;IACA,4BAAA;AACA;AACA","file":"component.vue","sourcesContent":["<script>\nexport default {\n  props: {\n    loading: {\n      type: Boolean,\n      default: false\n    },\n    text: {\n      type: String,\n      default: \"Loading...\"\n    }\n  }\n};\n</script>\n\n<template>\n  <div class=\"body-loading\" v-if=\"loading\">\n    <div class=\"loading\">\n      <div class=\"circle\"></div>\n      <div class=\"circle\"></div>\n      <div class=\"circle\"></div>\n    </div>\n    <div class=\"loading-text\">{{text}}</div>\n  </div>\n</template>\n\n<style scoped>\n.body-loading {\n  top: 0;\n  left: 0;\n  right: 0;\n  position: fixed;\n  min-height: 100vh;\n  min-width: 100vw;\n  margin: 0;\n  padding: 0;\n  background-color: #353b48;\n  -khtml-opacity: 0.8;\n  -moz-opacity: 0.8;\n  -ms-filter: ”alpha(opacity=80) ”;\n  filter: alpha(opacity=80);\n  filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0.8);\n  opacity: 0.8;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  transition: opacity 0.5s ease-in;\n}\n\n.loading-text {\n  margin-top: 2rem;\n  font-family: \"Courier New\", Courier, monospace;\n  color: #fff;\n}\n\n.loading {\n  display: flex;\n  transition: opacity 0.3s ease-in;\n}\n\n.circle {\n  background-color: #fff;\n  border-radius: 50%;\n  margin: 2px;\n  height: 10px;\n  width: 10px;\n  animation: jump 0.7s ease-in infinite;\n}\n\n.circle:nth-of-type(2) {\n  animation-delay: 0.2s;\n}\n\n.circle:nth-of-type(3) {\n  animation-delay: 0.4s;\n}\n\n@keyframes jump {\n  0%,\n  100% {\n    transform: translateY(0);\n  }\n\n  50% {\n    transform: translateY(-10px);\n  }\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-7cc1cdc6";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

// Import vue component

// install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('homeran-loading', __vue_component__);
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// To auto-install when vue is found
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'homeran-loading';
// export const RollupDemoDirective = component;

export default __vue_component__;
export { install };
