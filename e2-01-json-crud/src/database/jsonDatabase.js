const fs = require('fs');
const path = require('path');

const model = function (name) {
    return {
        tablePath: path.resolve(__dirname, '../data/', `${name}.json`),
        readFile() {
            let tableContents = fs.readFileSync(this.tablePath, 'utf-8');
            return JSON.parse(tableContents) || [];
        },
        writeFile(contents) {
            let tableContents = JSON.stringify(contents, null, ' ');
            fs.writeFileSync(this.tablePath, tableContents);
        },
        nextId() {
            let rows = this.readFile();
            let lastRow = rows.pop();

            return lastRow.id ? ++lastRow.id : 1;
        },
        all() {
            return this.readFile();
        },
        find(id) {
            let rows = this.readFile();
            return rows.find(product => product.id == id);
        },
        create(row) {
            let rows = this.readFile();
            row.id = this.nextId();
            rows.push(row);

            this.writeFile(rows);

            return row.id;
        },
        update(row) {
            let rows = this.readFile();
            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == row.id) {
                    return row;
                }

                return oneRow;
            });

            this.writeFile(updatedRows);

            return row.id;
        },
        delete(id) {
            let rows = this.readFile();
            let updatedRows = rows.filter(row => {
                return row.id != id;
            });

            this.writeFile(updatedRows);
        }
    }
}

module.exports = model;