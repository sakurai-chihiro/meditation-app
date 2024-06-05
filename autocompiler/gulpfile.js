// gulpプラグインを読み込み
const { src, dest, watch } = require("gulp");
// Sassをコンパイルするプラグインを読み込み
// require('プラグイン名')
const sass = require("gulp-sass")(require("sass"));

// style.scssのタスクを作成
// gulp.task('タスク名', 実行される処理)
// タスク名をdefaultにすると、タスク実行時のタスク名を省略できる

// gulp.task("default", () => {
//   // style.scssファイルを取得
//   return (
//     gulp
//       .src("css/style.scss") //gulp.src('取得するファイル')
//       // Sassのコンパイルを実行
//       .pipe(sass()) //pipe()ひとつひとつの処理をつなげる
//       // cssフォルダー以下に保存
//       .pipe(gulp.dest("css"))
//   );
// });

/**
 * Sassをコンパイルするタスク
 */
// style.scssの監視タスクを作成する
// gulp.task("default", () => {...
// ↑task()は非推奨

const compileSass = () =>
  // style.scssファイルを取得
  src("../css/scss/style.scss")
    // Sassのコンパイルを実行
    .pipe(
      // コンパイル後のCSSを展開
      sass({
        outputStyle: "expanded" // コードを整形
        // https://utano.jp/entry/2018/02/hello-sass-output-style/#google_vignette
      })
    )
    // cssフォルダー以下に保存
    .pipe(dest("../css"));

/**
 * Sassファイルを監視し、変更があったらSassを変換
 */

const watchSassFiles = () => watch("../css/scss/style.scss", compileSass);

// npx gulpというコマンドを実行した時、watchSassFilesが実行されるようにする
exports.default = watchSassFiles;