const express = require("express");
const app = express();
const cors = require("cors");
const csvToJson = require("convert-csv-to-json");
const port = parseInt(process.env.PORT || 9000);
app.use(cors());
const instructors = csvToJson
    .fieldDelimiter(",")
    .getJsonFromCsv("instructors.csv");

function findById(data, id) {
    for (let i = 0; i < data.length; i++) {
        let holder = data[i].ID.toString();
        if (holder === id) {
            return data[i];
        }
    }
}

app.get("/", (request, response) => {
    response.json(instructors);
});

app.get("/:id", function(request, response) {
    var record = findById(instructors, request.params.id);
    if (!record) {
        response.status = 404;
        response.json({
            error: {
                message: "No record found!"
            }
        });
    } else {
        response.json({ instructors: record });
    }
});

app.listen(port);
