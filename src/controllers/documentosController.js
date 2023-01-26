const obterDocumentos =
    (request, response) => {
        const payload = {
            requestId: "3ba475f4-17a7-4ba6-a350-8aed9d0a8fcb",
            date: "2024-08-21T08:04:42.1820514-03:00",
            result: [{
                origem: 'Avulso',
                tipo: 3,
                nome: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                titulo: 'Ut varius tincidunt libero. Vestibulum ullamcorper mauris at ligula. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Curabitur ullamcorper ultricies nisi. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. ulla sit amet est. Cras ultricies mi eu turpis hendrerit fringilla.',
                resumo: 'Ut tincidunt tincidunt erat. Nullam accumsan lorem in dui. Praesent congue erat at massa.',
                data: new Date('2024-05-18 00:00:00'),
                documentoId: 1,
            },
            {
                origem: 'Avulso',
                tipo: 8,
                nome: 'Maecenas tempor dui orci, quis auctor ligula consequat non. Vestibulum tincidunt lobortis iaculis.',
                titulo: 'Ut varius tincidunt libero. Vestibulum ullamcorper mauris at ligula. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Curabitur ullamcorper ultricies nisi. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. ulla sit amet est. Cras ultricies mi eu turpis hendrerit fringilla.',
                resumo: 'Ut tincidunt tincidunt erat. Nullam accumsan lorem in dui. Praesent congue erat at massa.',
                data: new Date('2024-08-21 00:00:00'),
                documentoId: 2
            },
            {
                origem: 'Avulso',
                tipo: 8,
                nome: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a lectus vitae felis vehicula vehicula vitae vel lacus. Sed quam urna, posuere id condimentum id, placerat eget sapien. Nam velit urna, scelerisque eget euismod sed, blandit a felis. Donec rutrum nisl at justo semper, id tempor sapien imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a elementum arcu placerat.',
                titulo: 'Ut varius tincidunt libero. Vestibulum ullamcorper mauris at ligula. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Curabitur ullamcorper ultricies nisi. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. ulla sit amet est. Cras ultricies mi eu turpis hendrerit fringilla.',
                resumo: 'Ut tincidunt tincidunt erat. Nullam accumsan lorem in dui. Praesent congue erat at massa.',
                data: new Date('2024-08-21 00:00:00'),
                documentoId: 3
            },
            {
                origem: 'Avulso',
                tipo: 8,
                nome: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis lacinia orci a fermentum. Nam sed dapibus erat. Suspendisse elementum ligula id tellus molestie fringilla. Vivamus et erat velit. Cras ultricies gravida leo ut consequat. Vivamus ut mattis arcu. Vestibulum quis justo id est consequat placerat. In pellentesque ullamcorper nulla, vitae tristique lacus. Suspendisse potenti nam.',
                titulo: 'Ut varius tincidunt libero. Vestibulum ullamcorper mauris at ligula. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Curabitur ullamcorper ultricies nisi. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. ulla sit amet est. Cras ultricies mi eu turpis hendrerit fringilla.',
                resumo: 'Ut tincidunt tincidunt erat. Nullam accumsan lorem in dui. Praesent congue erat at massa.',
                data: new Date('2024-08-21 00:00:00'),
                documentoId: 4
            }
            ]
        };

        const payloadVazio = {
            requestId: "3ba475f4-17a7-4ba6-a350-8aed9d0a8fcb",
            date: "2024-08-21T08:04:42.1820514-03:00",
            result: []
        };

        return response.status(200).json(payload);
        return response.status(200).json(payloadVazio);
    };

const download =
    (request, response) => {
        const payload = {
            requestId: "3ba475f4-17a7-4ba6-a350-8aed9d0a8fcb",
            date: "2024-08-21T08:04:42.1820514-03:00",
            result: {
                nomeArquivo: 'meu_pdf_download.pdf',
                url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf"
            }
        };

        return response.status(200).json(payload);
    };

module.exports =
{
    obterDocumentos,
    download
};
