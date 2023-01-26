const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'Opensource1*',
    server: 'localhost',
    database: 'PedradaDb',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};

async function checkSchema() {
    try {
        const pool = await sql.connect(config);
        
        const result = await pool.request().query(`
            SELECT 
                c.COLUMN_NAME,
                c.DATA_TYPE,
                c.CHARACTER_MAXIMUM_LENGTH,
                c.NUMERIC_PRECISION,
                c.NUMERIC_SCALE,
                c.IS_NULLABLE,
                c.ORDINAL_POSITION
            FROM INFORMATION_SCHEMA.COLUMNS c
            WHERE c.TABLE_NAME = 'TransacaoParcela'
            ORDER BY c.ORDINAL_POSITION
        `);
        
        console.log('Schema da tabela Transacao:');
        console.log('============================');
        result.recordset.forEach(col => {
            console.log(`${col.ORDINAL_POSITION}. ${col.COLUMN_NAME} - ${col.DATA_TYPE}${col.CHARACTER_MAXIMUM_LENGTH ? '('+col.CHARACTER_MAXIMUM_LENGTH+')' : ''}${col.NUMERIC_PRECISION ? '('+col.NUMERIC_PRECISION+','+col.NUMERIC_SCALE+')' : ''} ${col.IS_NULLABLE === 'NO' ? 'NOT NULL' : 'NULL'}`);
        });
        
        await sql.close();
    } catch (err) {
        console.error('Erro:', err);
        await sql.close();
    }
}

checkSchema();
