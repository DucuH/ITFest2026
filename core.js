Engine.core = {
    
    calculate: () => {
        const w = parseFloat(document.getElementById('mass-in').value);
        const h = parseFloat(document.getElementById('height-in').value);
        const a = parseFloat(document.getElementById('age-in').value);

        let bmr = (10 * w) + (6.25 * h) - (5 * a);

        const tdee = Math.round(bmr * 1.55);


        document.getElementById('kcal-out').innerText = tdee;
    
        const bmi = (w / ((h / 100) * (h / 100))).toFixed(1);

        document.getElementById('bmi-res').innerText = bmi;

        let stat = "";
        let desc = "";
        let p = 0;
        let c = 0;
        let f = 0;

        if (bmi >= 18.5 && bmi < 25) {
            stat = "NORMAL";
            desc = "Maintain current caloric intake.";
            p = 30; c = 45; f = 25;
        }

        if (bmi < 18.5) {
            stat = "UNDERWEIGHT";
            desc = "Caloric surplus protocol recommended.";
            p = 25; c = 55; f = 20;
        }

        if (bmi > 25 && bmi < 30) {
            stat = "OVERWEIGHT";
            desc = "Caloric restriction protocol recommended.";
            p = 40; c = 30; f = 30;
        }

        if (bmi >= 30) {
            stat = "OBESE";
            desc = "Intensive caloric restriction protocol recommended.";
            p = 45; c = 20; f = 35;
        }

        document.getElementById('bmi-stat').innerText = stat;
        document.getElementById('bmi-desc').innerText = desc;

        Engine.ui.updateBars(p, c, f);

    }

};