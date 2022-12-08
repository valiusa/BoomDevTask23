import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

export default class Application extends EventEmitter {
    static get events() {
        return {
            READY: "ready",
        };
    }

    constructor() {
        super();

        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = this._render({
            name: "Placeholder",
            terrain: "placeholder",
            population: 0,
        });

        document.body.querySelector(".main").appendChild(box);

        this.emit(Application.events.READY);
    }

    _loading = `<progress></progress>`;

    async _load() {
        let task = await fetch("https://swapi.boom.dev/api/planets").then(
            (response) => {
                const progress = document.querySelector(".pregress");
                progress.style.display = "none";
            }
        );
    }

    _create({ name, terrain, population }) {
        return `
<article class="media">
  <div class="media-left">
    <figure class="image is-64x64">
      <img src="${image}" alt="planet">
    </figure>
  </div>
  <div class="media-content">
    <div class="content">
    <h4>${name}</h4>
      <p>
        <span class="tag">${terrain}</span> <span class="tag">${population}</span>
        <br>
      </p>
    </div>
  </div>
</article>
    `;
    }
    _startLoading() {}
    _stopLoading() {}

    //     _render({ name, terrain, population }) {
    //         return `
    // <article class="media">
    //   <div class="media-left">
    //     <figure class="image is-64x64">
    //       <img src="${image}" alt="planet">
    //     </figure>
    //   </div>
    //   <div class="media-content">
    //     <div class="content">
    //     <h4>${name}</h4>
    //       <p>
    //         <span class="tag">${terrain}</span> <span class="tag">${population}</span>
    //         <br>
    //       </p>
    //     </div>
    //   </div>
    // </article>
    //     `;
    //     }
}
