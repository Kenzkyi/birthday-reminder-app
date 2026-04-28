require("dotenv").config();
const express = require("express");
const schedule = require("node-schedule");
const { sendBirthdayEmail } = require("./config/nodemailer");
const user = require("./utils/user");
const { isBirthdayToday } = require("./utils/dateFunc");
const app = express();
const port = process.env.PORT || 3010;

app.use(express.static("public"));

app.use(express.json());

app.post("/submit", (req, res) => {
  const error = user.addUser(req.body);
  if (error) {
    return res.status(400).send({ message: error });
  }
  res.send({ message: "Birthday reminder added successfully" });
});

app.get("/test-email", async (req, res) => {
  try {
    // Trigger a test email immediately
    await sendBirthdayEmail("ekene7561@gmail.com", "Tester");
    res.send("Test email sent! Check your inbox.");
  } catch (error) {
    console.error("Test email failed:", error);
    res.status(500).send("Failed to send test email.");
  }
});

schedule.scheduleJob("55 12 * * *", async () => {
  const users = user.getUsers();
  for (const user of users) {
    if (isBirthdayToday(user.dob)) {
      await sendBirthdayEmail(user.email, user.username);
    } else {
      await sendBirthdayEmail("ekene7561@gmail.com", "kenz");
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
