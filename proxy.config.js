const PROXY_CONFIG = [
    {
        context: [
            "/todo/addBirthday",
            "/todo/getBirthdays",
        ],
        target: "http://localhost:9002",
        secure: false
    }
]

module.exports = PROXY_CONFIG