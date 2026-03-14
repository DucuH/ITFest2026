Engine.food = {

    init: (data = Engine.state.db) => {

        const body = document.getElementById('food-body');
        body.innerHTML = '';
        data.forEach(item => {
            const row = `
            <tr>
                <td>
                    ${item.name}
                    <br>
                    <span style="font-size:8px; color:var(--t-neon-dim)">
                        ${item.type}
                    </span>
                </td>
                <td>${item.kcal}</td>
                <td>
                    <button class="add-action-btn"
                        onclick="Engine.food.add(${item.kcal}, '${item.name}')">
                        ADD
                    </button>
                </td>

            </tr>`;
            body.innerHTML += row;
        });

    },

    search: () => {

        const query = document.getElementById('food-search').value.toLowerCase();

        const filtered = Engine.state.db.filter(f =>
            f.name.toLowerCase().includes(query)
        );

        Engine.food.init(filtered);

    },

    add: (kcalPer100, name) => {
        const mass = prompt(`ENTER MASS FOR [${name}] (GRAMS):`, "100");
        if (mass && !isNaN(mass)) {

            const calculated = Math.round((kcalPer100 / 100) * parseFloat(mass));
            Engine.state.totalIntake += calculated;

            document.getElementById('intake-total').innerText = Engine.state.totalIntake;
            const log = document.querySelector('.terminal-log');

            log.innerHTML =`[${new Date().toLocaleTimeString()}] <span>LOGGED: ${name} (${mass}g) -> +${calculated} kcal</span>`;
        }
    },

    addCustom: () => {

        const name = prompt("ENTER FOOD NAME:");
        const kcal = prompt("ENTER KCAL PER 100g:");

        if (name && kcal) {

            Engine.state.db.push({
                name,
                kcal: parseInt(kcal),
                type: "Custom"
            });
            Engine.food.init();
        }
    },

    reset: () => {
        if (confirm("PURGE ALL INTAKE DATA?")) {
            Engine.state.totalIntake = 0;
            document.getElementById('intake-total').innerText = "0";
        }
    }
};

window.onload = () => {
    Engine.food.init();
    Engine.core.calculate();

};