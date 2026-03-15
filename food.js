async function loadEngineData() {
    try {
        const response = await fetch("DataBase.json");
        if (!response.ok) throw new Error("Could not find the JSON file");
        
        const data = await response.json();
        
        // Populate the Engine state with the JSON data
        Engine.state.db = data.foodDatabase;
        
        console.log("Database successfully imported:", Engine.state.db.length, "items loaded.");
        return Engine.state.db;
    } catch (error) {
        console.error("Error loading state:", error);
    }
}



Engine.food = {
    init: (data = Engine.state.db) => {
        const body = document.getElementById('food-body');
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
                        <button class="add-action-btn" style="display: none; border-color: var(--t-warn); color: var(--t-warn);" 
                                onclick="Engine.food.removeSpecific('${safeName}', this)">RESET</button>
                    </div>
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

    add: (kcalPer100, name, btn) => {
        const mass = prompt(`ENTER MASS FOR [${name}] (GRAMS):`, "100");
        if (mass && !isNaN(mass)) {
            const calculated = Math.round((kcalPer100 / 100) * parseFloat(mass));
            Engine.state.totalIntake += calculated;
            document.getElementById('intake-total').innerText = Engine.state.totalIntake;
            
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
        const val = parseInt(resetBtn.dataset.addedKcal);
        Engine.state.totalIntake -= val;
        if (Engine.state.totalIntake < 0) Engine.state.totalIntake = 0;
        document.getElementById('intake-total').innerText = Engine.state.totalIntake;
        
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
        if (name && kcal) {
            Engine.state.db.push({ name, kcal: parseInt(kcal), type: "Custom" });
            Engine.food.init();
        }
    },

    reset: () => {
        if (confirm("PURGE ALL INTAKE DATA?")) {
            Engine.state.totalIntake = 0;
            document.getElementById('intake-total').innerText = "0";
            Engine.food.init();
        }
    }
};

window.onload = async () => {
    const database = await loadEngineData();
    
    if (database) {
        // Initialize the UI only AFTER the data exists
        Engine.food.init(database);
    }
};