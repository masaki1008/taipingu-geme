// 必要なHTML要素の取得
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');

// 複数のテキストを格納する配列
const textLists = [
    'shukudaiwowasureta','kyounogohannhananikana','watashinonamaehakobayshikyouheidesu',
    'ashitahaamenohida','kodomohahoikuengakiraida!','gennkidetakumashikonisodatuyouni',
    'watashihaJapanese','hitorideikou','samurai',
    'typinggame','information-technology',
    'watashihasyouraiprogrammerninaritai','kyouhanannyoubi?',
    'watashihaongakugadaisukida','yoroshikuonegaishimasu',
    'chrome-firefox-edge-safari','machinelearning',
    'brendan-Eich','tensaininarenakattasubetenohitohe','hidarikikinoeren',
    'Netscape-Communications','nanimonodemonaizibunnnitiisanaitio',
    'arigatougozaimasu','Google.Apple.Facebook.Amazon',
    'ECMAScript','console.log','for;while;if;switch',
    'watashihakokoniirutosenngennshiyou','Windows-Mac-Linux-iOS-Android',
    'programming'
]; 

let checkTexts = [
    
];

// ランダムなテキストを画面に表示する
const createText = () => {
    const p = document.getElementById('text');
    const rnd = Math.floor(Math.random() * textLists.length);

    p.textContent = '';// p要素の中身を空っぽにする

    // 画面に表示するテキスト情報をcheckTexts配列に格納する
    checkTexts = textLists[rnd].split('').map(value => {
        
        const span = document.createElement('span'); // span要素を生成する
  
        span.textContent = value; // span要素に配列の1文字ずつを当てはめる
  
        p.appendChild(span); // span要素をp要素に追加していく
  
        return span; // 1文字ずつcheckTextsに格納していく
    })
};

let score = 0; // スコアの初期値を設定する

// キーイベント＆入力判定処理
const keyDown = e => {
    
    wrap.style.backgroundColor = '#666'; // 背景色のデフォルト値を設定する
    
    if(e.key === checkTexts[0].textContent) {
        checkTexts[0].className = 'add-color'; // add-colorクラスを付与する
        checkTexts.shift(); // 配列から1文字を削除する
        
        score++; // 正しい入力の時だけスコアを加算する
        
        if(!checkTexts.length) createText(); // 最後まで入力したら新しいテキストを用意する
        
    } else if(e.key === 'Shift') { // Shiftキーを押した時は色が変わらない
        wrap.style.backgroundColor = '#666';
    } else { // タイプミスした時だけ背景色を赤色に変える
        wrap.style.backgroundColor = 'red';
    }
};

// ランク判定とメッセージ生成処理
const rankCheck = score => {
    let text = ''; // テキストを格納する変数を作る
    
    // スコアに応じて異なるメッセージを変数textに格納する
    if(score < 100) {
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if(score < 200) {
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
    } else if(score < 300) {
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
    } else if(score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます！`;    
  }

   // 生成したメッセージと一緒に文字列を返す
   return `${score}文字打てました！\n${text}\n【OK】リトライ／【キャンセル】終了`;
    
};

// ゲームの終了処理
const gameOver = id => {
    clearInterval(id); // タイマーをストップする

    const result = confirm(rankCheck(score)); // スコアの値をrankCheck()に渡してダイアログで結果を表示する
    
    if(result) window.location.reload(); // OKボタンをクリックされたらリロードする
};

// タイマー処理
const timer = () => {

    let time = 60; // タイマーの初期値を設定（60秒）

    const count = document.getElementById('count'); // タイマー要素を取得する

    const id = setInterval(() => {
        
        // カウントが0になったらタイマーを停止する
        if(time <= 0) gameOver(id); // カウントが0になったらタイマーのIDをgameOver()に渡す
  
        count.textContent = time--; // タイマーの表示を1ずつ減らしていく
  
    }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {
    
    timer(); // タイマー関数を追記する
    
    createText(); // ランダムなテキストを表示する関数
    
    start.style.display = 'none'; // 「スタート」ボタンを非表示にする処理を追記
    
    document.addEventListener('keydown', keyDown); // キーボードのイベント処理
});