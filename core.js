Engine.core = {
    calculate: () => {
        const massInput = document.getElementById('mass-in').value;
        const heightInput = document.getElementById('height-in').value;
        const ageInput = document.getElementById('age-in').value;
        
        const genderInput = Engine.state.gender; 

        if (!massInput || !heightInput || !ageInput || !genderInput) {
            console.warn("Missing input parameters");
            return;
        }

        const w = parseFloat(massInput);
        const h = parseFloat(heightInput);
        const a = parseFloat(ageInput);
        const g = genderInput.toLowerCase();

        let bmr = (10 * w) + (6.25 * h) - (5 * a);
        
        if (g === "m") { 
            bmr += 5;
        } else if (g === "f") { 
            bmr -= 161;
        }

        const tdee = Math.round(bmr * 1.55); 
        document.getElementById('kcal-out').innerText = tdee;

        const bmi = (w / ((h / 100) ** 2)).toFixed(1);
        document.getElementById('bmi-res').innerText = bmi;

        let stat = "";
        let desc = "";
        let p = 0, c = 0, f = 0;

        if (bmi >= 18.5 && bmi < 25) {
            stat = "NORMAL";
            desc = "Maintain current caloric intake.";
            p = 30; c = 45; f = 25;
        } else if (bmi < 18.5) {
            stat = "UNDERWEIGHT";
            desc = "Caloric surplus protocol recommended.";
            p = 25; c = 55; f = 20;
        } else if (bmi >= 25 && bmi < 30) {
            stat = "OVERWEIGHT";
            desc = "Caloric restriction protocol recommended.";
            p = 40; c = 30; f = 30;
        } else if (bmi >= 30) {
            stat = "OBESE";
            desc = "Intensive caloric restriction protocol recommended.";
            p = 45; c = 20; f = 35;
        }

        document.getElementById('bmi-stat').innerText = stat;
        document.getElementById('bmi-desc').innerText = desc;
        Engine.ui.updateBars(p, c, f);
    }
};