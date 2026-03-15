async function loadEngineData() {
    try {
        const response = await fetch("DataBase.json");
        if (!response.ok) throw new Error("Could not find the JSON file");
        const data = await response.json();
        Engine.state.db = data.foodDatabase;
        return Engine.state.db;
    } catch (error) {
        console.error("Error loading state:", error);
    }
}

Engine.food = {
    init: (data = Engine.state.db) => {
        const body = document.getElementById('food-body');
        if(!body) return;
        body.innerHTML = '';
        data.forEach((item) => {
            const safeName = item.name.replace(/'/g, "\\'"); 
            const row = `
            <tr>
                <td style="padding-left: 15px;">
                    ${item.name}<br>
                    <span style="font-size:8px; color:var(--t-neon-dim)">${item.type}</span>
                </td>
                <td style="text-align: center;">${item.kcal}</td>
                <td style="padding-right: 15px;">
                    <div style="display: flex; justify-content: flex-end; gap: 8px;">
                        <button class="add-action-btn" onclick="Engine.food.add(${item.kcal}, '${safeName}', this)">ADD</button>
                        <button class="add-action-btn btn-reset-item" style="display: none; border-color: var(--t-warn); color: var(--t-warn);" 
                                onclick="Engine.food.removeSpecific('${safeName}', this)">RESET</button>
                    </div>
                </td>
            </tr>`;
            body.innerHTML += row; 
        });
    },

    updateRemaining: () => {
        const remainingElement = document.getElementById('remaining-kcal');
        if (remainingElement) {
            const remaining = Engine.state.targetKcal - Engine.state.totalIntake;
            remainingElement.innerText = remaining;
            remainingElement.style.color = remaining < 0 ? 'var(--t-warn)' : 'var(--t-neon)';
        }
    },

    search: () => {
        const query = document.getElementById('food-search').value.toLowerCase();
        const filtered = Engine.state.db.filter(f => f.name.toLowerCase().includes(query));
        Engine.food.init(filtered);
    },

    add: (kcalPer100, name, btn) => {
        const mass = prompt(`ENTER MASS FOR [${name}] (GRAMS):`, "100");
        if (mass && !isNaN(mass)) {
            const calculated = Math.round((kcalPer100 / 100) * parseFloat(mass));
            Engine.state.totalIntake += calculated;
            
            document.getElementById('intake-total').innerText = Engine.state.totalIntake;
            Engine.food.updateRemaining();
            
            btn.style.color = '#ffd700';
            btn.style.borderColor = '#ffd700';
            
            const resetBtn = btn.nextElementSibling;
            if (resetBtn) {
                resetBtn.style.display = 'block';
                resetBtn.dataset.addedKcal = calculated;
            }
            
            const log = document.querySelector('.terminal-log');
            log.innerHTML = `[${new Date().toLocaleTimeString()}] <span>LOGGED: ${name} (+${calculated} kcal)</span>`;
        }
    },

    removeSpecific: (name, resetBtn) => {
        const val = parseInt(resetBtn.dataset.addedKcal || 0);
        Engine.state.totalIntake -= val;
        if (Engine.state.totalIntake < 0) Engine.state.totalIntake = 0;
        
        document.getElementById('intake-total').innerText = Engine.state.totalIntake;
        Engine.food.updateRemaining();
        
        resetBtn.style.display = 'none';
        const addBtn = resetBtn.previousElementSibling;
        addBtn.style.color = '';
        addBtn.style.borderColor = '';
        
        const log = document.querySelector('.terminal-log');
        log.innerHTML = `[${new Date().toLocaleTimeString()}] <span style="color:var(--t-warn)">REMOVED: ${name} (-${val} kcal)</span>`;
    },

    addCustom: () => {
        const name = prompt("ENTER FOOD NAME:");
        const kcal = prompt("ENTER KCAL PER 100g:");
        const type = prompt("ENTER FOOD TYPE (Protein, Fiber, Carb, Fat, Cheat, Drink, Alcohol):");
        if (name && kcal && type) {
            Engine.state.db.push({ name, kcal: parseInt(kcal), type });
            Engine.food.init();
        }
    },

    reset: () => {
        if (confirm("RESET ALL INTAKE DATA?")) {
            Engine.state.totalIntake = 0;
            document.getElementById('intake-total').innerText = "0";
            Engine.food.updateRemaining();
            Engine.food.init(); // Reîncarcă lista pentru a reseta stilul butoanelor
        }
    }
};

window.onload = async () => {
    const database = await loadEngineData();
    if (database) Engine.food.init(database);
};