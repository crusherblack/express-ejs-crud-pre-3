var express = require("express");
var router = express.Router();
const dbConnection = require("../lib/db");

/* GET home page. */
router.get("/", function (req, res, next) {
  dbConnection.query(
    `SELECT 
    post.id as postId, post.title as title, post.thumbnail as thumbnail, 
    post.content as content,  category.name as categoryName 
    FROM post 
    LEFT JOIN category 
    ON post.category_id = category.id 
    ORDER BY title ASC`,
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        res.render("post/index", { title: "Express", data: data });
      }
    }
  );
});

router.get("/add", (req, res) => {
  res.render("post/add", {
    title: "",
    content: "",
    thumbnail: "",
    categoryId: "",
    authorId: "",
  });
});

router.post("/store", (req, res) => {
  const { title, content, thumbnail, categoryId, authorId } = req.body;
  let error = false;

  if (
    !title.length ||
    !content.length ||
    !thumbnail.length ||
    !categoryId.length ||
    !authorId.length
  ) {
    error = true;

    req.flash("error", "Tolong lengkapi seluruh data");

    res.render("post/add", { title, content, thumbnail, categoryId, authorId });
  }

  if (!error) {
    const formData = {
      title,
      content,
      thumbnail,
      category_id: categoryId,
      author_id: authorId,
    };

    dbConnection.query("INSERT INTO post SET ?", formData, (error) => {
      if (error) {
        req.flash("error", error);
      } else {
        req.flash("success", "Berhasil tambah post");
        res.redirect("/");
      }
    });
  }
});

router.get("/about", (req, res) => {
  response.render("about", {
    text: "hello world",
    name: "Rama",
    cars: ["mobil1", "mobil2", "mobil3"],
  });
});

router.get("/delete/(:id)", (req, res) => {
  const id = req.params.id;

  dbConnection.query("DELETE FROM post WHERE id = " + id, (error) => {
    if (error) {
      req.flash("error", error);
    } else {
      req.flash("success", "Berhasil hapus data");
      res.redirect("/");
    }
  });
});

router.get("/blog", (request, response) => {
  response.render("blog", {});
});

module.exports = router;
