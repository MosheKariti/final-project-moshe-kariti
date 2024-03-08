import bcrypt from 'bcrypt';

export const usersData = [
    {
        "name": {
            "first": "Admin",
            "middle": "middle",
            "last": "User"
        },
        "phone": "0512345567",
        "email": "admin@email.com",
        "password": '$2b$12$vTrr01tuWM.mTz/fQ5ov1uDtV5s4zu.7nZ.JWx/d52Ppkat6IhB4u',
        "image": {
            "url": "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
            "alt": "image"
        },
        "address": {
            "state": "IL",
            "country": "Israel",
            "city": "Arad",
            "street": "Shoham",
            "houseNumber": 5,
            "zip": 8920435
        },
        "isBusiness": false,
        "isAdmin": true
    },
    {
        "name": {
            "first": "Business",
            "middle": "middle",
            "last": "User"
        },
        "phone": "0512345567",
        "email": "business@email.com",
        "password": '$2b$12$vTrr01tuWM.mTz/fQ5ov1uDtV5s4zu.7nZ.JWx/d52Ppkat6IhB4u',
        "image": {
            "url": "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
            "alt": "image"
        },
        "address": {
            "state": "IL",
            "country": "Israel",
            "city": "Arad",
            "street": "Shoham",
            "houseNumber": 5,
            "zip": 8920435
        },
        "isBusiness": true
    },
    {
        "name": {
            "first": "Simple",
            "middle": "middle",
            "last": "User"
        },
        "phone": "0512345567",
        "email": "simple@email.com",
        "password": '$2b$12$vTrr01tuWM.mTz/fQ5ov1uDtV5s4zu.7nZ.JWx/d52Ppkat6IhB4u',
        "image": {
            "url": "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
            "alt": "image"
        },
        "address": {
            "state": "IL",
            "country": "Israel",
            "city": "Arad",
            "street": "Shoham",
            "houseNumber": 5,
            "zip": 8920435
        },
        "isBusiness": false
    }
]