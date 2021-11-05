let express = require("express");
let router = express.Router();
let modelPost = require("../model/posts");

// index
// res.render는 ejs파일을 html로 만들어 client(브라우저)로 return하는 함수
/** 모델.find(검색조건, callback_함수)
 * 모델.find의 검색조건은 Object 형태로 전달
 * 빈 Object({})를 전달하는 경우(=검색조건 없음)
 * DB에서 해당 모델의 모든 data를 return
 * */
router.get("/", function (req, res) {
  modelPost
    .find({})
    .sort("-createAt")
    .exec(function (err, posts) {
      if (err) return res.json(err);
      res.render("posts/index", { posts: posts });
    });
});

// new
router.get("/new", function (req, res) {
  res.render("posts/new");
});

// create
/** 모델.create은 DB에 data를 생성하는 함수
 *  첫번째 parameter로 error를 받고 두번째 parameter로 생성된 data를 받음
 */
router.post("/", function (req, res) {
  modelPost.create(req.body, function (err, post) {
    if (err) return res.json(err);
    res.redirect("posts");
  });
});

// show
router.get("/:id", function (req, res) {
  modelPost.findOne({ _id: req.param.id }, function (err, post) {
    if (err) return res.json(err);
    res.render("posts/show", { post: post });
  });
});

// edit
router.get("/:id/edit", function (req, res) {
  modelPost.findOne({ _id: req.params.id }, function (err, post) {
    if (err) return res.json(err);
    res.render("posts/edit", { post: post });
  });
});

// update
router.put("/:id", function (req, res) {
  req.body.updatedAt = Date.now();
  modelPost.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    function (err, post) {
      if (err) return res.json(err);
      res.redirect("/posts/" + req.params.id);
    }
  );
});

// destroy
router.delete("/:id", function (req, res) {
  modelPost.deleteOne({ _id: req.params.id }, function (err) {
    if (err) return res.json(err);
    res.redirect("/posts");
  });
});
