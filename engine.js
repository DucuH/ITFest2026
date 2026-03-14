const Engine = {

    state: {
        gender: 'M',
        totalIntake: 0,

        db: [
            { name: "Chicken Breast (Grilled)", kcal: 165, type: "Protein" },
            { name: "Chicken Thigh (Skinless)", kcal: 209, type: "Protein" },
            { name: "Beef Steak (Sirloin)", kcal: 244, type: "Protein" },
            { name: "Beef (Ground 90/10)", kcal: 176, type: "Protein" },
            { name: "Salmon Fillet", kcal: 208, type: "Protein" },
            { name: "Cod Fillet", kcal: 82, type: "Protein" },
            { name: "Tuna (Canned in Water)", kcal: 116, type: "Protein" },
            { name: "Shrimp (Cooked)", kcal: 99, type: "Protein" },
            { name: "Turkey Breast", kcal: 135, type: "Protein" },
            { name: "Pork Tenderloin", kcal: 143, type: "Protein" },
            { name: "Egg (Whole)", kcal: 155, type: "Protein" },
            { name: "Egg Whites", kcal: 52, type: "Protein" },
            { name: "Tofu (Firm)", kcal: 83, type: "Protein" },
            { name: "Tempeh", kcal: 193, type: "Protein" },
            { name: "Greek Yogurt (Non-fat)", kcal: 59, type: "Protein" },
            { name: "Cottage Cheese (2%)", kcal: 81, type: "Protein" },
            { name: "Lamb Chop", kcal: 294, type: "Protein" },
            { name: "Venison Steak", kcal: 158, type: "Protein" },

            { name: "White Rice (Cooked)", kcal: 130, type: "Carb" },
            { name: "Brown Rice (Cooked)", kcal: 111, type: "Carb" },
            { name: "Quinoa (Cooked)", kcal: 120, type: "Carb" },
            { name: "Oatmeal (Cooked)", kcal: 71, type: "Carb" },
            { name: "Pasta (Wheat, Cooked)", kcal: 131, type: "Carb" },
            { name: "Sweet Potato (Baked)", kcal: 90, type: "Carb" },
            { name: "Potato (Boiled)", kcal: 77, type: "Carb" },
            { name: "Bread (Whole Wheat)", kcal: 247, type: "Carb" },
            { name: "Lentils (Boiled)", kcal: 116, type: "Carb" },
            { name: "Chickpeas (Boiled)", kcal: 164, type: "Carb" },
            { name: "Black Beans (Boiled)", kcal: 132, type: "Carb" },
            { name: "Kidney Beans (Boiled)", kcal: 127, type: "Carb" },
            { name: "Couscous (Cooked)", kcal: 112, type: "Carb" },
            { name: "Rice Cake (Plain)", kcal: 387, type: "Carb" },
            { name: "Corn (Sweet)", kcal: 86, type: "Carb" },

            { name: "Banana", kcal: 89, type: "Carb" },
            { name: "Apple", kcal: 52, type: "Carb" },
            { name: "Blueberries", kcal: 57, type: "Carb" },
            { name: "Strawberries", kcal: 32, type: "Carb" },
            { name: "Mango", kcal: 60, type: "Carb" },
            { name: "Pineapple", kcal: 50, type: "Carb" },
            { name: "Orange", kcal: 47, type: "Carb" },
            { name: "Grapes", kcal: 69, type: "Carb" },
            { name: "Watermelon", kcal: 30, type: "Carb" },
            { name: "Kiwi", kcal: 61, type: "Carb" },

            { name: "Avocado", kcal: 160, type: "Fat" },
            { name: "Olive Oil", kcal: 884, type: "Fat" },
            { name: "Coconut Oil", kcal: 862, type: "Fat" },
            { name: "Butter (Unsalted)", kcal: 717, type: "Fat" },
            { name: "Peanut Butter", kcal: 588, type: "Fat" },
            { name: "Almonds", kcal: 579, type: "Fat" },
            { name: "Walnuts", kcal: 654, type: "Fat" },
            { name: "Cashews", kcal: 553, type: "Fat" },
            { name: "Chia Seeds", kcal: 486, type: "Fat" },
            { name: "Pumpkin Seeds", kcal: 559, type: "Fat" },
            { name: "Pistachios", kcal: 562, type: "Fat" },
            { name: "Flax Seeds", kcal: 534, type: "Fat" },

            { name: "Broccoli", kcal: 34, type: "Fiber" },
            { name: "Spinach (Raw)", kcal: 23, type: "Fiber" },
            { name: "Kale (Raw)", kcal: 49, type: "Fiber" },
            { name: "Asparagus", kcal: 20, type: "Fiber" },
            { name: "Zucchini", kcal: 17, type: "Fiber" },
            { name: "Cauliflower", kcal: 25, type: "Fiber" },
            { name: "Carrots", kcal: 41, type: "Fiber" },
            { name: "Bell Pepper", kcal: 31, type: "Fiber" },
            { name: "Mushrooms", kcal: 22, type: "Fiber" },
            { name: "Cucumber", kcal: 15, type: "Fiber" },
            { name: "Green Beans", kcal: 31, type: "Fiber" },

            { name: "Pizza (Pepperoni)", kcal: 266, type: "Cheat" },
            { name: "Burger (Fast Food)", kcal: 295, type: "Cheat" },
            { name: "French Fries", kcal: 312, type: "Cheat" },
            { name: "Dark Chocolate (85%)", kcal: 598, type: "Cheat" },
            { name: "Ice Cream (Vanilla)", kcal: 207, type: "Cheat" },
            { name: "Donut (Glazed)", kcal: 452, type: "Cheat" },
            { name: "Potato Chips", kcal: 536, type: "Cheat" },
        ]
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