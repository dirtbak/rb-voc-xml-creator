const express = require('express')
const bodyParser = require("body-parser");
let cors = require('cors');
let builder = require('xmlbuilder');
let fs = require('fs');
const app = express()
const port = 8181
const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router.post('/create', (request, response) => {
//code to perform particular action.
//To access POST variable use req.body()methods.
    console.log(request.body);
    let annotation = request.body;

    let xml = builder.create('annotation');

    xml.ele('folder').txt('watermark').up()
        .ele('filename').txt(annotation.name).up()
        .ele('path').txt('/watermark/' + annotation.name).up()
        .ele('source').ele('dataset').txt('Unspecified').up().up()
        .ele('size').ele('width').txt(annotation.width).up()
        .ele('height').txt(annotation.height).up()
        .ele('depth').txt('3').up().up()
        .ele('object')
        .ele('name').txt('watermark').up()
        .ele('pose').txt('Unspecified').up()
        .ele('truncated').txt('Unspecified').up()
        .ele('difficult').txt('Unpsecified').up()
        .ele('bndbox')
        .ele('xmin').txt(annotation.xmin).up()
        .ele('ymin').txt(annotation.ymin).up()
        .ele('xmax').txt(annotation.xmax).up()
        .ele('ymax').txt(annotation.ymax).up()
        .up().up();

    fs.writeFile('/Users/dzhusi/projects/watermark-ws/annotations/' + annotation.filename, xml.toString({ pretty: true }), () => {
        console.info('success');
    })

    response.send({
        success: true
    });
});

app.use("/", router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
