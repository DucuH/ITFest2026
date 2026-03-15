Engine.core = {
    calculate: () => {
        const massInput = document.getElementById('mass-in').value;
        const heightInput = document.getElementById('height-in').value;
        const ageInput = document.getElementById('age-in').value;
        
        const genderInput = Engine.state.gender; 
        const goalInput = Engine.state.goal;

        if (!massInput || !heightInput || !ageInput) {
            alert("Te rugăm să completezi toate câmpurile!");
            return;
        }

        const w = parseFloat(massInput);
        const h = parseFloat(heightInput);
        const a = parseFloat(ageInput);
        const g = genderInput.toLowerCase();

        // Calcul BMR
        let bmr = (10 * w) + (6.25 * h) - (5 * a);
        bmr = (g === "m") ? bmr + 5 : bmr - 161;

        // Calcul TDEE
        let tdee = Math.round(bmr * 1.55); 

        if (goalInput === 'lose') tdee -= 500; 
        else if (goalInput === 'gain') tdee += 500; 
        else if (goalInput === 'muscle') tdee += 250; 

        // Update UI
        document.getElementById('kcal-out').innerText = tdee;
        Engine.state.targetKcal = tdee; // Salvăm valoarea în starea globală

        const bmi = (w / ((h / 100) ** 2)).toFixed(1);
        document.getElementById('bmi-res').innerText = bmi;

        let stat = "", desc = "";
        if (bmi < 18.5) { stat = "UNDERWEIGHT"; desc = "Surplus necesar."; }
        else if (bmi < 25) { stat = "NORMAL"; desc = "Menține nivelul."; }
        else if (bmi < 30) { stat = "OVERWEIGHT"; desc = "Deficit recomandat."; }
        else { stat = "OBESE"; desc = "Restricție calorică."; }

        document.getElementById('bmi-stat').innerText = stat;
        document.getElementById('bmi-desc').innerText = desc;

        let p = 30, c = 40, f = 30;
        if (goalInput === 'lose') { p = 40; c = 30; f = 30; }
        else if (goalInput === 'gain') { p = 25; c = 55; f = 20; }
        else if (goalInput === 'muscle') { p = 45; c = 35; f = 20; }

        Engine.ui.updateBars(p, c, f);
        
        // Sincronizare imediată cu tab-ul de mâncare
        if(Engine.food.updateRemaining) Engine.food.updateRemaining();
    }
};