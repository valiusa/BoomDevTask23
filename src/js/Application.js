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

        this._url = "https://swapi.boom.dev/api/planets";
        this._loading = document.querySelector(".progress");

        this._startLoading();
        this._create();
        this.emit(Application.events.READY);
    }

    async _load() {
        return await fetch(url).then((response) => {
            return response.json();
        });
    }

    _create() {
        this._load(this._url)
            .then((response) => {
                response.results.forEach((element) => {
                    const box = document.createElement("div");
                    box.classList.add("box");
                    box.innerHTML = this._render({
                        name: element.name,
                        terrain: element.terrain,
                        population: element.population,
                    });
                    this._stopLoading();
                    document.querySelector(".main").appendChild(box);
                });

                if (response.next != null) {
                    this._url = response.next;
                    return { hasNextPage: true };
                } else {
                    return { hasNextPage: false };
                }
            })
            .then((response) => {
                if (response.hasNextPage) {
                    this._create();
                }
            });
    }

    _startLoading() {
        this._loading.style.display = "block";
    }
    _stopLoading() {
        this._loading.style.display = "none";
    }

    _render({ name, terrain, population }) {
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
}
