import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const options = {
    'definition': {
        'info': {
            'title': 'JustChat API',
            'version': '1.0.0',
            'description': 'JustChat API',
            'lucense': {
                'name': 'MIT',
                'type': 'MIT',
            }
        },
        'basePath': '/',
        'schemes': [
            "http"
        ],
        'consumes': ["application/json"],
        'produces': ["application/json"],
        "paths": {
            "/register": {
              "post": {
                "summary": "회원가입",
                "tags": ["login"],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "member_id": {
                                    "type": "string",
                                    "example": "kang"
                                },
                                "member_pwd": {
                                    "type": "string",
                                    "example": "1234"
                                },
                                "member_name": {
                                    "type": "string",
                                    "example": "강O혁"
                                },
                                "nick_name": {
                                    "type": "string",
                                    "example": "kchan"
                                },
                            },
                            "required": ["member_id", "member_pwd", "member_name",]
                        }
                    }
                ],
                "responses": {
                  "200": {
                    "description": "회원가입 성공"
                  },
                  "400": {
                    "description": "Invalid request"
                  }
                }
              }
            },
            "/login": {
                "post": {
                  "summary": "로그인",
                  "tags": ["login"],
                  "parameters": [
                      {
                          "in": "body",
                          "name": "member_id",
                          "required": true,
                          "schema": {
                            "type": "object",
                            "properties": {
                                "member_id": {
                                    "type": "string",
                                    "example": "kang"
                                },
                                "member_pwd": {
                                    "type": "string",
                                    "example": "1234"
                                },
                            },
                            "required": ["member_id", "member_pwd", "member_name",]
                        }
                        }
                  ],
                  "responses": {
                    "200": {
                      "description": "로그인 성공"
                    },
                    "400": {
                      "description": "Invalid request"
                    }
                  }
                }
            }
          }
        
    },
    apis: ['./controller/*.ts'],
}

const specs = swaggerJSDoc(options)

export {swaggerUi, specs} 