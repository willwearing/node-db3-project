// scheme-model
const db = require("../data/db-config");

module.exports = {
  find() {
    return db("schemes");
  },
  findById(id) {
    return db("schemes").where({ id }).first();
  },
  findSteps(id) {
    return db("schemes as s")
      .join("steps as p", "s.id", "p.scheme_id")
      .select("s.scheme_name", "p.instructions")
      .where({ "s.id": id });
  },
  add(schemeData) {
    return db("schemes")
      .insert(schemeData, "id")
      .then(([id]) => this.findById(id));
  },
  addStep(stepData) {
    return db("steps")
      .insert(stepData, "id")
      .then(() => this.findSteps(stepData.scheme_id));
  },
  update(changes, id) {
    return db("schemes")
      .where({ id })
      .update(changes)
      .then((count) => (count > 0 ? this.findById(id) : null));
  },
  remove(id) {
    return db("schemes").where({ id }).del();
  },
};
