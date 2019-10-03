// Call in the node-module + fs from node
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create an instance of the PDFDocument class
const doc = new PDFDocument;

doc.pipe(fs.createWriteStream('pdf/file.pdf')); // write to PDF

const headline = 'Kulturhuset.dk';
const customer = ['Ordre nr. #4561375644645', 'Steffen Larsen', '4450 Jyderup', 'Tlf. 12345678'];
const items = [{image: 'images/1.jpg', name:'Levis 501', str: '32/32', farve: 'blå', Pris: '799,-'}, {image: 'images/2.jpg', name:'Levis 502', str: '32/32', farve: 'grøn', Pris: '799,-'}, {image: 'images/3.jpg', name:'Levis 503', str: '32/32', farve: 'sort', Pris: '799,-'}];
const description = 'Så er der en beskrivelse på vej. tralu la lu la lej! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt possimus, a laboriosam quasi officiis aperiam ipsa commodi sunt veritatis veniam distinctio reiciendis voluptates dolore perspiciatis maiores excepturi odit, mollitia eligendi.';

// add stuff to PDF here
doc.font('Helvetica-Bold') 
doc.rect(50, 40, 360, 80,).fillAndStroke("red", "#000")
doc.fontSize(48).fillColor("black").text(`${headline}`, 60, 60, {
    width: 410, 
    align: 'left'
});

doc.fontSize(12);
doc.rect(421, 40, 155, 80,).lineWidth(2).stroke().list(customer, 420, 50, { 
        lineWidth:2,
        width: 150,
        bulletRadius: 1,
        align: 'right'
    });

doc.rect(60, 140, 520, 350,).lineWidth(2).stroke().text('Dine varer:', 70, 150, {
  width: 310,
  align: 'left'
});

items.forEach((item) => {
  doc.moveDown();
  doc.image(`${item.image}`, {width: 60})
    .text(`Vare: ${item.name}, Størrelse: ${item.str}, Farve: ${item.farve}, Pris: ${item.Pris}`, {
    width: 410,
    align: 'left'
  });
});

doc.moveDown();
doc.text(`Beskrivelse: ${description}`, { 
//   width: 310,
  align: 'left'
});


doc.moveDown();
doc.stroke().text(description, {
    columns: 2,
    columnGap: 15,
    // width: 310,
    height: 20,
    align: 'justify'
  });


// finalize the PDF and end the stream
doc.end();