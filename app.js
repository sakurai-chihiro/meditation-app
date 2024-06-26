// 
const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');

  // 再生ボタンのアウトラインをアニメーション化
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');
  // サウンドを選択 全てのボタンを取得したいのでquerySelectorAll
  const sounds = document.querySelectorAll('.sound-picker button');
  // 時間表示
  const timeDisplay = document.querySelector('.time-display');
  // 時間選択ボタン
  const timeSelect = document.querySelectorAll('.time-select button');
  // 再生ボタンの輪郭の長さを取得
  const outlineLength = outline.getTotalLength();
  // 継続時間（実際には曲全体の長さを取得するのではないので fake とする
  let fakeDuration = 600;

  /* アニメーション化 */
  // stroke-dasharrayとstroke-dashoffsetを取得し、
  // それらのプロパティをアニメーション化してゼロから開始しているように見せる

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // 音楽を選択できるようにする
  sounds.forEach(sounds => {
    sounds.addEventListener('click', function(){
      song,src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    })
  })

  // 音楽を再生
  play.addEventListener('click', () => {
    // song.play();
    checkPlaying(song);
  });

  // 音楽の長さを選択できるようにする
  timeSelect.forEach(option => {
    option.addEventListener('click', function(){
      fakeDuration = this.getAttribute('data-time');
      // 表示されている時間を更新
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)} : ${Math.floor(
        fakeDuration % 60
      )}`
    })
  })

  // 音楽の再生＆停止を切り替えるボタン
  // 曲が再生されているか停止されているかを判別して、
  const checkPlaying = song => {
    // もし曲が停止されている場合は曲・ビデオを再生して
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  }

  /* サークルをアニメーション化して時間がわかるようにする */
  // 曲の現在の時間を取得できる
  song.ontimeupdate = () => {
    // 再生ボタンを押すと、曲が続くかぎり更新され続ける
    // 曲が停止すると止まる
    // ゼロからはじまる
    let currentTime = song.currentTime;
    // 曲の経過時間を取得する（残りの再生時間）
    let elapsed = fakeDuration - currentTime;
    // %:左辺を右辺で割った余りを計算する演算子
    // 現在の再生位置から次の60秒までの残り時間（秒単位）
    // Math.floor：小数点以下を切り捨て
    let seconds = Math.floor(elapsed % 60);
    // 現在の再生位置から次に60秒までの残り時間（分単位）
    let minutes = Math.floor(elapsed / 60);

    // プログレスバーをアニメーション化する
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    // 時間を表示できるようにする
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if(currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = './svg/play.svg';
      video.pause();
    }
  }
};

  //
app();