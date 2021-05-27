var express = require("express");
var router = express.Router();
const dbConnection = require("../lib/db");

/* GET home page. */
router.get("/", function (req, res, next) {
  dbConnection.query(`SELECT * FROM category`, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      res.render("category/index", { title: "Express", data: data });
    }
  });
});

router.get("/add", (req, res) => {
  res.render("category/add", {
    name: "",
  });
});

router.post("/store", (req, res) => {
  const { name } = req.body;
  let error = false;

  if (!name.length) {
    error = true;
    req.flash("error", "Tolong lengkapi seluruh data");
    res.render("category/add", { name });
  }

  if (!error) {
    const formData = {
      name,
    };

    dbConnection.query("INSERT INTO category SET ?", formData, (error) => {
      if (error) {
        req.flash("error", error);
      } else {
        req.flash("success", "Berhasil tambah category");
        res.redirect("/category");
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
      res.redirect("/post");
    }
  });
});

router.get("/edit/(:id)", (req, res) => {
  const id = req.params.id;

  dbConnection.query(
    "SELECT * FROM category WHERE id= " + id,
    (error, data) => {
      if (error) {
        req.flash("error", error);
      } else {
        res.render("category/edit", {
          id: data[0].id,
          name: data[0].name,
        });
      }
    }
  );
});

router.post("/update", (req, res) => {
  const { id, name } = req.body;
  let error = false;

  if (!name.length) {
    error = true;
    req.flash("error", "Tolong lengkapi seluruh data");
    res.render("category/add", { name });
  }

  if (!error) {
    const formData = {
      name,
    };

    dbConnection.query(
      "UPDATE category SET ? WHERE id = " + id,
      formData,
      (error) => {
        if (error) {
          req.flash("error", error);
        } else {
          req.flash("success", "Berhasil edit category");
          res.redirect("/category");
        }
      }
    );
  }
});

router.get("/blog", (request, response) => {
  response.render("blog", {});
});

module.exports = router;
