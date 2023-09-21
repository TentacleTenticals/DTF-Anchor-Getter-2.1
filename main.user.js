// ==UserScript==
// @name        DTF Anchor getter v3.0
// @namespace   https://github.com/TentacleTenticals/
// @match       https://dtf.ru/*
// @grant       Tentacle Tenticals
// @version     1.0.5
// @author      Tentacle Tenticals
// @description Скрипт для получения якорей (anchor)
// @homepage    https://github.com/TentacleTenticals/DTF-Anchor-Getter-2.1
// @updateURL   https://github.com/TentacleTenticals/DTF-Anchor-Getter-2.1/raw/main/main.user.js
// @downloadURL https://github.com/TentacleTenticals/DTF-Anchor-Getter-2.1/raw/main/main.user.js
//
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/splitCls/classes.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/settings/css/dtfCore.js
//
// @require     https://github.com/TentacleTenticals/DTF-Libs1/raw/main/classes/widget/panel/js/wItem.js
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

(() => {
  const cfg = {
    lazyMode: false,
    cut: 70
  };

class Anchor{
  Group({path, text, anchor, link, editor}){
    const group = new El().Div({
      path: path,
      cName: 'group',
      rtn: []
    });
    new El().Div({
      path: group,
      cName: 'label',
      text: text
    });

    const btns = new El().Div({
      path: group,
      cName: 'buttons',
      rtn: []
    });

    if(editor){
      new El().Button({
        path: btns,
        cName: 'btn',
        text: '📛\uFE0E',
        onclick: () => {
          navigator.clipboard.writeText(text);
        }
      });
      new El().Button({
        path: btns,
        cName: 'btn',
        text: '🔗\uFE0E',
        onclick: () => {
          navigator.clipboard.writeText(`#${anchor}`);
        }
      });
    }
    new El().Button({
      path: btns,
      cName: 'btn',
      text: '↪️\uFE0E',
      onclick: () => {
        link.scrollIntoView();
      }
    });
  }
  anchorSearch(){
    const path = document.getElementById(`widgetPanel`).children[1].children[1].querySelector(`.wl-item.anchor`).children[1].children[1];
    if(path.children.length > 0) path.replaceChildren();
    const sites = ['ce-paragraph', 'cdx-tool', 'quote-tool', 'incut-tool', 'code-tool', 'andropov-tool__input', 'embed-block', 'gallery', 'audio-tool', 'quiz-tool', 'number-tool', 'person-tool', 'ce-header'];
    for (let i = 0, arr = document.querySelectorAll(`.ce-block--anchor`), len = arr.length; i < len; i++) {
      let res;
      res = (() => {
        switch (arr[i].children[2].children[0].classList.value.match(new RegExp(`${sites.join('|')}`))?.[0]) {
          case 'ce-header':
          return {
            anchor: arr[i].getAttribute('data-anchor'),
            text: arr[i].children[2].children[0].textContent?.trim()?.slice(0, cfg.cut),
            link: arr[i].children[2].children[0]
          }
          case 'ce-paragraph':
          return {
            anchor: arr[i].getAttribute('data-anchor'),
            text: arr[i].children[2].children[0].textContent?.trim()?.slice(0, cfg.cut),
            link: arr[i].children[2].children[0]
          }
          case 'cdx-tool':
          return {
            anchor: arr[i].getAttribute('data-anchor'),
            text: arr[i].children[2].children[0].children[0].textContent?.trim()?.slice(0, cfg.cut),
            link: arr[i].children[2].children[0].children[0]
          }
          case 'incut-tool':
          return {
            anchor: arr[i].getAttribute('data-anchor'),
            text: arr[i].children[2].children[0].children[0].textContent?.trim()?.slice(0, cfg.cut),
            link: arr[i].children[2].children[0].children[0]
          }
          case 'quote-tool':
          return {
            anchor: arr[i].getAttribute('data-anchor'),
            text: arr[i].children[2].children[0].children[1].textContent?.trim()?.slice(0, cfg.cut),
            link: arr[i].children[2].children[0].children[1]
          }
          case 'code-tool':
          return {
            anchor: arr[i].getAttribute('data-anchor'),
            text: 'Блок кода',
            link: arr[i].children[2].children[0].children[0]
          }
          case 'andropov-tool__input':
          return {
            anchor: arr[i].getAttribute('data-anchor'),
            text: 'Ссылка на вложение',
            link: arr[i].children[2].children[0].children[0]
          }
          case 'embed-block':
          return {
            anchor: arr[i].getAttribute('data-anchor'),
            text: 'Эмбед блок',
            link: arr[i].children[2].children[0].children[0]
          }
          case 'gallery':
          return {
            anchor: arr[i].getAttribute('data-anchor'),
            text: 'Галерея',
            link: arr[i].children[2].children[0].children[0]
          }
          case 'audio-tool':
          return {
            anchor: arr[i].getAttribute('data-anchor'),
            text: 'Аудио',
            link: arr[i].children[2].children[0].children[0]
          }
          case 'quiz-tool':
          return {
            anchor: arr[i].getAttribute('data-anchor'),
            text: arr[i].children[2].children[0].children[0].textContent?.trim()?.slice(0, cfg.cut),
            link: arr[i].children[2].children[0].children[0]
          }
          case 'number-tool':
          return {
            anchor: arr[i].getAttribute('data-anchor'),
            text: 'Цифра',
            link: arr[i].children[2].children[0].children[0]
          }
          case 'person-tool':
          return {
            anchor: arr[i].getAttribute('data-anchor'),
            text: 'Персона',
            link: arr[i].children[2].children[0]
          }
        }
      })();
      this.Group({
        path: path,
        text: res.text,
        anchor: res.anchor,
        link: res.link,
        editor: true
      })
    }
  }
  linksSearch(){
    const path = document.getElementById(`widgetPanel`).children[1].children[1].querySelector(`.wl-item.anchor`).children[1].children[1];
    if(path.children.length > 0) path.replaceChildren();
    for(let i = 0, arr = document.querySelectorAll(`.content--full a`), len = arr.length; i < len; i++){
      if(arr[i].className && arr[i].className.match(/content__anchor/)){
        this.Group({
          path: path,
          text: arr[i].nextElementSibling && arr[i].nextElementSibling.children[0].nodeName === 'P' ? arr[i].nextElementSibling.textContent.trim().slice(0, cfg.cut) : arr[i].getAttribute('name'),
          link: arr[i]
        });
      }
    }
  }
};

const css = (cfg) => `
.wl-item.anchor .anchors {
  display: flex;
  flex-direction: column;
  gap: 3px 0;
  max-height: 100px;
  scrollbar-width: thin;
  scrollbar-color: rgb(189 164 164) transparent;
  overflow: auto;
}
.wl-item.anchor .anchors::-webkit-scrollbar-thumb {
  background-color: rgb(189 164 164);
}
.wl-item.anchor .anchors::-webkit-scrollbar {
  width: 2px;
}
.wl-item.anchor .group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0 5px;
}
.wl-item.anchor .group .label {
  font-size: 13px;
  word-break: break-all;
  color: rgb(255,255,255);
}
.wl-item.anchor .group .buttons {
  display: flex;
  gap: 0 5px;
}
.wl-item.anchor .group .buttons .btn {
  color: rgb(255,255,255);
  cursor: pointer;
}
.wl-item.anchor .group .buttons .btn:hover {
  filter: brightness(0.8);
}
.wl-item.anchor .getter {
  background: linear-gradient(0deg, rgb(185 179 179), transparent);
  background-color: rgb(255,255,255);
  font-size: 14px;
  margin: 3px;
  border-radius: 2px;
  cursor: pointer;
}
.wl-item.anchor .getter:hover {
  filter: brightness(0.8);
}
`;

  function getPageType(url){
    if(!url) return;
    if(url.match(/\?writing=\d+/)) return 'editor';
    else
    return url.replace(/https:\/\/dtf\.ru\/([^]+)/, (d, text) => {
      let arr = text.split('/');

      if(arr[0] && arr[0].match(/^popular$/)){
        if(!arr[1]) {
          return 'popular';
        }
      }else
      if(arr[0] && arr[0].match(/^new$/)){
        if(!arr[1]) {
          return 'new';
        }
      }else
      if(arr[0] && arr[0].match(/^my$/)){
        if(arr[1] && arr[1].match(/^new$/)) {
          return 'my new';
        }
      }else

      if(arr[0] && arr[0].match(/^u$/)){
        if(arr[1] && !arr[2]) {
          return 'user pages';
        }
        if(arr[1] && arr[2]) {
          return 'topics';
        }
      }else
      if(arr[0] && arr[0].match(/^s$/)){
        if(arr[1] && !arr[2]) {
          return 'subsites';
        }
        if(arr[1] && arr[2]) {
          return 'topics';
        }
      }else
      if(arr[0] && !arr[0].match(/^(u|s)$/)){
        if(arr[0] && !arr[1]) {
          return 'subsites';
        }
        if(arr[0] && arr[1]) {
          return 'topics';
        }
      }
    })
  }

  new El().Css('DTF-core', dtfCoreCSS, true);
  new El().Css('DTF-anchor', css(cfg));
  // new El().Css('DTF-widgets', widgetCss(), true);
  new wItem({
    bText: '⚓',
    hText: 'Список якорей',
    cName: 'anchor',
    id: 'anchor',
    items: (i) => {
      new El().Button({
        path: i,
        cName: 'getter',
        text: 'Получить список ⚓\uFE0E',
        onclick: () => {
          if(!document.querySelectorAll(`.content--full a .content_anchor`)) return;
          if(document.location.href.match(/\?writing=\d+/)) new Anchor().anchorSearch();
          else
          new Anchor().linksSearch();
        }
      });
      new El().Div({
        path: i,
        cName: 'anchors'
      });
    }
  });

  function run(c){
    if(cfg.lazyMode) return;
    if(c.page === 'editor' && c.status === 'ready'){
      if(document.querySelectorAll(`.content--full a .content_anchor`)) new Anchor().anchorSearch();
    }
    else
    if(c.page === 'editor' && c.status === 'closed'){
      const path = document.getElementById(`widgetPanel`).children[1].children[1].querySelector(`.wl-item.anchor`).children[1].children[1];
      path.replaceChildren();
    }else
    if(c.page === 'def' && getPageType(document.location.href) === 'topics'){
      if(document.querySelectorAll(`.content--full a .content_anchor`)) new Anchor().linksSearch();
    }
  }

  new El().onPageLoad(run);
})();
