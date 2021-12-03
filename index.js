const express = require("express");
const app = express();
app.use(express.json());

const USERS = [];
const TASKS = [];

app.post("/register", (req, res, next) => {
    const user = req.body;
    if (!user.email || !user.email.length || !user.password || !user.password.length)
        res.status(400).send("Bad body");

    user.id = USERS.length + 1;
    USERS.push(user);

    const result = { ...user };
    delete result.password
    res.status(200).send(result);
});

app.post("/login", (req, res, next) => {
    const user = req.body;
    if (!user.email || !user.email.length || !user.password || !user.password.length)
        res.status(400).send("Bad body");

    const results = USERS.find(u => u.email === user.email && u.password === user.password);
    if (results)
        res.status(200).send({ jwt: "JWT" });
    else
        res.status(404).send("No user found");
});

app.get("/user", (req, res, next) => {
    const header = req.headers;
    if (!header["authorization"])
        res.status(400).send("Bad body");

    let user = USERS[0];
    if (!user)
        res.status(404).send("No user found");
    user = { ...USERS[0] };
    delete user.password
    res.status(200).send(result);
});

app.post("/create-task", (req, res, next) => {
    const header = req.headers;
    if (!header["authorization"])
        res.status(400).send("Bad body");
    const { task } = req.body;
    if (!task.email || !task.length)
        res.status(400).send("Bad body");

    const _task = { id: TASKS.length + 1, name: task };
    TASKS.push(_task);
    res.status(200).send(_task);

})
app.get("/list-tasks", (req, res, next) => {
    const header = req.headers;
    if (!header["authorization"])
        res.status(400).send("Bad body");

    res.status(200).send(TASKS);
})

app.listen(3000, () => {
    console.log("Listening to port 3000");
})