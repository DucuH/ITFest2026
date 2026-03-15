const Engine = {
    state: {
        gender: 'M',
        goal: 'maintain',
        totalIntake: 0,
        targetKcal: 0,
        db: []
    },

    ui: {
        switchTab: (id, btn) => {
            document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.getElementById(`tab-${id}`).classList.add('active');
            btn.classList.add('active');
        },

        setGender: (g, btn) => {
            Engine.state.gender = g;
            btn.parentElement.querySelectorAll('.choice').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
        },

        setGoal: (g, btn) => {
            Engine.state.goal = g;
            btn.parentElement.querySelectorAll('.choice').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            if(document.getElementById('mass-in').value) Engine.core.calculate();
        },

        updateBars: (p, c, f) => {
            const macros = { 'p': p, 'c': c, 'f': f };
            Object.keys(macros).forEach(key => {
                const bar = document.getElementById(`${key}-bar`);
                const val = document.getElementById(`${key}-val`);
                if(bar) {
                    bar.style.width = macros[key] + '%';
                    bar.style.transition = "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
                }
                if(val) val.innerText = macros[key] + '%';
            });
        }
    }
};