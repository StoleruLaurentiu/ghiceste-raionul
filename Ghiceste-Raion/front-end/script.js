let flags = [];
let names = [];
let correctDistrict = "";
let correct = 0;
let availableDistricts = []; 

document.getElementById("score").innerHTML = `Score: ${correct}`;

fetch('http://localhost:5000/district/all')
    .then(res => res.json())
    .then(data => {
        flags = data.map(district => district.flag);
        names = data.map(district => district.name);
        availableDistricts = [...Array(names.length).keys()]; 
		generateFlag();
    })
    .catch(error => console.error('Error fetching districts:', error));

function generateFlag() {
    if (availableDistricts.length === 0) {
        availableDistricts = [...Array(names.length).keys()];
    }

    const randomIndex = Math.floor(Math.random() * availableDistricts.length);
    const nameIndex = availableDistricts[randomIndex];

    availableDistricts.splice(randomIndex, 1);

    correctDistrict = names[nameIndex];
    const flag = flags[nameIndex];

    document.getElementById('flag').src = flag;
    document.getElementById('flag').style.display = 'block';

    setButton(nameIndex);
}

function setButton(correctIndex) {
    const options = [correctIndex];

    while (options.length < 3) {
        const randomIndex = Math.floor(Math.random() * names.length);
        if (!options.includes(randomIndex)) {
            options.push(randomIndex);
        }
    }

    options.sort(() => Math.random() - 0.5);

    options.forEach((index, i) => {
        const button = document.getElementById(`option${i + 1}`);
        button.textContent = names[index];
        button.onclick = () => checkAnswer(names[index]);
    });
}

function checkAnswer(selectedDistrict) {
    if (selectedDistrict === correctDistrict) {
        correct++;
        document.getElementById("score").innerHTML = `Score: ${correct}`;
        generateFlag();
    } else {
        correct = 0;
        document.getElementById("score").innerHTML = `Score: ${correct}`;
        alert("Wrong! Try again.");
        generateFlag();
    }
}
