const members = ["Hanbin", "Zhang Hao", "Jiwoong", "Matthew",
    "Taerae", "Ricky", "Gyuvin", "Gunwook", "Yujin"
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateBattles(members) {
    const battles = [];
    for (let i = 0; i < members.length; i++) {
        for (let j = i + 1; j < members.length; j++) {
            battles.push({ member1: members[i], member2: members[j] });
        }
    }
    return shuffleArray(battles);
}

const shuffledMembers = shuffleArray([...members]);
const battles = generateBattles(shuffledMembers);

const results = members.reduce((acc, member) => {
    acc[member] = 0;
    return acc;
}, {});

let currentBattle = 0;

function updateBattle() {
    if (currentBattle < battles.length) {
        const member1Element = document.getElementById("member1");
        const member2Element = document.getElementById("member2");

        member1Element.innerText = battles[currentBattle].member1;
        member2Element.innerText = battles[currentBattle].member2;

        member1Element.onclick = () => choose('member1');
        member2Element.onclick = () => choose('member2');

        document.getElementById("progress").innerText = `Confronto #${currentBattle + 1} - ${Math.round((currentBattle / battles.length) * 100)}% concluído.`;
    } else {
        showResults();
    }
}

function choose(choice) {
    if (choice !== 'no_opinion') {
        results[battles[currentBattle][choice]]++;
    }
    currentBattle++;
    updateBattle();
}

function showResults() {
  const sortedResults = Object.entries(results).sort((a, b) => b[1] - a[1]);
  const rankingContainer = document.getElementById('finalRanking');
  rankingContainer.innerHTML = sortedResults.map(entry => `<li>${entry[0]}</li>`).join('');
  document.getElementById('progress').innerText = 'Ranking Completo!';
}

updateBattle();
