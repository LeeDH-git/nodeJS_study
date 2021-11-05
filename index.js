let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let methodOverride = require("method-override");
let app = express();

// DB setting
mongoose.connect(process.env.MONGO_DB); // process.env 오브젝트는 환경변수들을 가지고 있는 객체(node.js에서 기본으로 제공)
let db = mongoose.connection;
// once(event,listener) 메소드 = 이벤트 리스너 함수가 한번이라도 실행하고 나면 자동으로 제거 되므로 이벤트를 딱 한번만 받아서 처리 할 수 있음.
db.once("open", function () {
  console.log("DB connected");
});
// on(event,listener) 메소드 = 이벤트가 전달될 객체에 이벤트 리스너를 설정하는 역할.
// 보통은 노드 내부에서 미리 만들어 제공하는 이벤트를 받아 처리하지만, 필요할 때는 직접 이벤트를 만들어 전달 할 수도 있다.
db.on("error", function (err) {
  console.log("DB error!: " + err);
});

// Other Setting

//html 템플릿 엔진 ejs 설정
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Route
app.use("/", require("./route/home"));
app.use("/posts", require("./routes/posts"));

// Port Setting
let port = 3000;
app.listen(port, function () {
  console.log("server on! http:://localhost:" + port);
});
