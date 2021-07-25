const PROXY_CONFIG = [
    {
        context: [
            "/todo/addBirthday",
            "/todo/getBirthdays",
            "/todo/deleteBirthday",
        ],
        target: "http://localhost:9002",
        secure: false
    }
]

module.exports = PROXY_CONFIG