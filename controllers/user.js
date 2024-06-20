async function handleGetAllUser(req, res) {
  try {
    const db = req.app.locals.db;
    const [allDbUsers] = await db.query("SELECT * FROM users"); // Assuming you have a 'users' table
    return res.json(allDbUsers);
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleDeleteUserById(req, res) {
  try {
    const db = req.app.locals.db;
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.json({ status: "Success" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function handlegetUserById(req, res) {
  try {
    const db = req.app.locals.db;
    const [user] = await db.query("SELECT * FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (user.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.json(user[0]);
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleUpdateById(req, res) {
  try {
    const db = req.app.locals.db;
    const [result] = await db.query(
      "UPDATE users SET lastName = 'Changed' WHERE id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.json({ status: "Success" });
  } catch (error) {
    console.error("Error updating user:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleCreatenewUser(req, res) {
  const body = req.body;

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const db = req.app.locals.db;
    const [result] = await db.query(
      "INSERT INTO users (first_name, last_name, email, gender, job_title) VALUES (?, ?, ?, ?, ?)",
      [body.first_name, body.last_name, body.email, body.gender, body.job_title]
    );
    return res.status(201).json({ status: "Success", userId: result.insertId });
  } catch (error) {
    console.error("Error creating new user:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleGetAllUser,
  handleCreatenewUser,
  handlegetUserById,
  handleDeleteUserById,
  handleUpdateById,
};
