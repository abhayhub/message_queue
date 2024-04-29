const express = require('express');
const client = require('redis');

const app = express();
app.use(express.json());

const Client = client.createClient();

app.post("/submit", (req,res) => {
    const {problemId, userId, code, language} = req.body;
    //push thsi to a database prisma.submission.create();
    Client.lPush("submissions", JSON.stringify({problemId, userId, code, language}));
    res.json({message : "Submission Received"});
})


async function StartServer(){
    await Client.connect();
    console.log("redis server started");
    app.listen(3000,() => {
        console.log("Server started");
    })
}

StartServer();