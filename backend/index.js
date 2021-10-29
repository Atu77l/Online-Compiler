const express = require("express");
const cors = require("cors");
const { generateFile } = require("./generateFile");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");

app.get("/",(req,res) => {
   return res.json("Hello World!");
})
app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;

  console.log(language, "Length:", code.length);

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  // need to generate a c++ file with content from the request
  console.log(req.body);
  try{
  const filepath = await generateFile(language, code);
  
  let output;
  console.log(filepath);
  if (language === "cpp") {
    output = await executeCpp(filepath);
  } else if (job.language === "py") {
    output = await executePy(filepath);
  }
  console.log(output);
  return res.json({filepath , output});
}catch(err){
  return res.json("error");
}
});

app.listen(5000, () => {
  console.log(`Listening on port 5000!`);
});
