const router = require("express").Router();

const Citizen = require("../models/citizen");

router.get("/", async (_req, res) => {
  try {
    const citizens = await Citizen.find();

    return res.status(200).json({ ok: true, citizens });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type: $type, name } = req.body;

    const citizen = await Citizen.findById(id);

    if (!citizen) {
      return res
        .status(403)
        .json({ ok: false, message: "Citizen is not found" });
    }

    const { groups } = citizen._doc;

    const currentGroupIndex = groups.findIndex(
      (group) => group.$type === $type
    );

    if (name) {
      if (currentGroupIndex !== -1) {
        groups[currentGroupIndex].name = name;
      } else {
        groups.push({ $type, name });
      }
    } else {
      if (currentGroupIndex !== -1) {
        groups.splice(currentGroupIndex, 1);
      } else {
        return res
          .status(403)
          .json({ ok: false, message: "Group is not found" });
      }
    }

    await citizen.save();

    return res.status(200).json({ ok: true, citizen });
  } catch (error) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

module.exports = router;
