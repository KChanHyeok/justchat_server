import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const options = {
    swaggerDefinition: {
        info: {
            title: 'JustChat API',
            version: '1.0.0',
            description: 'JustChat API',
        },
    },
    apis: ['./src/controller/*.ts'],
}

const specs = swaggerJSDoc(options)

export {swaggerUi, specs} 