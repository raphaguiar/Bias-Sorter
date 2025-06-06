let members = [];

const zb1 = ["Hanbin", "Zhang Hao", "Jiwoong", "Matthew", "Taerae", "Ricky", "Gyuvin", "Gunwook", "Yujin"];
const got7 = ["JB", "Mark", "Jackson", "Jinyoung", "Youngjae", "Bambam", "Yugyeom"];
const enhypen = ["Jungwon", "Heeseung", "Jay", "Jake", "Sunghoon", "Sunoo", "Ni-ki"];
const bonedo = ["Jaehyun", "Sungho", "Riwoo", "Taesan", "Leehan", "Woonhak"];
const exo = ["Xiumin", "Suho", "Baekhyun", "Chen", "Chanyeol", "D.O", "Kai", "Sehun"];
const ateez = ["Hongjoong", "Seonghwa", "Mingi", "Wooyoung", "San", "Yeosang", "Yunho", "Jongho"];
const p1h = ["Keeho", "Intak", "Soul", "Jongseob", "Theo", "Jiung"];
const tbz = ["Sangyeon", "Jacob", "Younghoon", "Hyunjae", "Juyeon", "Kevin", "New", "Q", "Haknyeon", "Sunwoo", "Eric"];
const andteam = ["K", "Fuma", "Nicholas", "EJ", "Yuma", "Jo", "Harua", "Taki", "Maki"];


function selectGroup(group) {
    document.querySelector('p').style.display = 'none';

    if (group === 'zb1') {
        members = [...zb1];
    } else if (group === 'got7') {
        members = [...got7];
    } else if (group === 'enhypen') {
        members = [...enhypen];
    } else if (group === 'bonedo') {
        members = [...bonedo];
    } else if (group === 'exo') {
        members = [...exo];
    } else if (group === 'ateez') {
        members = [...ateez];
    } else if (group === 'p1h') {
        members = [...p1h];
    } else if (group === 'tbz') {
        members = [...tbz];
    } else if (group === 'andteam') {
        members = [...andteam];
    }
    
    document.querySelector('.group-selection').style.display = 'none'; 
    document.getElementById('battleSection').style.display = 'block'; 

    shuffledMembers = shuffleArray([...members]);
    battles = generateBattles(shuffledMembers);
    results = members.reduce((acc, member) => {
        acc[member] = 0;
        return acc;
    }, {});

    currentBattle = 0;
    updateBattle();
}

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
