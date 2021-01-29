document.addEventListener("DOMContentLoaded", () => {
    // Начало выбора параметров( choice )
    // Создание параметра
    let choices = document.querySelectorAll(".main__filter_item"); // Контейнер с чёйсами
    const tagsList = document.querySelector(".filter__tags"); // Список пояляющихся фильтров

    for (let i = 0; i < choices.length; i++) {
        createElem(
            choices[i],
            choices[i]
                .closest(".main__filter_choice")
                .getAttribute("data-type"),
        );
    }
    function createElem(item, type) {
        let text = item.querySelector("p").innerHTML;
        item.querySelector("input").addEventListener("change", function () {
            if (this.checked) {
                const id = this.getAttribute("id");
                let li = document.createElement("li");
                li.className = "filter__tags-item";
                li.setAttribute("data-number", id);
                li.setAttribute("data-type", type);
                li.innerHTML = `<p>${text}</p><span class="filter__tags-item__cross"></span>`;
                li.addEventListener("click", () => {
                    document.querySelector(`#${id}`).checked = false;
                    document
                        .querySelectorAll(".filter__tags-item")
                        .forEach((item) => {
                            if (item.getAttribute("data-number") == id)
                                item.remove();
                        });
                });
                tagsList.append(li);
            } else {
                removeElem(this);
            }
        });
    }
    function removeElem(context) {
        const id = context.getAttribute("id");
        document.querySelectorAll(".filter__tags-item").forEach((item) => {
            if (item.getAttribute("data-number") == id) {
                item.remove();
            }
        });
    }
    // Конец выбора параметров( choice )

    // Поиск по параметрам
    let filters = {
        genres: [],
        directors: [],
        actors: [],
        years: [],
    };
    function takeFilres() {
        // Очитка объедка от старых фильтров

        tagsList.querySelectorAll(".filter__tags-item").forEach((item) => {
            switch (item.getAttribute("data-type")) {
                case "genre":
                    filters.genres.push(item.querySelector("p").innerHTML);
                    break;
                case "director":
                    filters.directors.push(item.querySelector("p").innerHTML);
                    break;
                case "actor":
                    filters.actors.push(item.querySelector("p").innerHTML);
                    break;
                case "year":
                    filters.years.push(item.querySelector("p").innerHTML);
                    break;
            }
        });

        console.log(filters);
    }

    document.querySelector(".filter__btn").addEventListener("click", (e) => {
        e.preventDefault();
        takeFilres();
    });
});
