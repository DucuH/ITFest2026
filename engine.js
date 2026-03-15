const Engine = {
    state: {
        gender: 'M',
        totalIntake: 0,
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
            document.querySelectorAll('.choice').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
        },

        updateBars: (p, c, f) => {

            document.getElementById('p-bar').style.width = p + '%';
            document.getElementById('p-val').innerText = p + '%';

            document.getElementById('c-bar').style.width = c + '%';
            document.getElementById('c-val').innerText = c + '%';

            document.getElementById('f-bar').style.width = f + '%';
            document.getElementById('f-val').innerText = f + '%';

        }
    }

};      