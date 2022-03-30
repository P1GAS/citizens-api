const router = require("express").Router();

const City = require("../models/city");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const city = City.findById(id);

    return res.status(200).json({ ok: false, city });
  } catch (error) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

module.exports = router;
