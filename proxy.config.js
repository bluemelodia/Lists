const PROXY_CONFIG = [
    {
        context: [
            "/todo/addBirthday",
        ],
        target: "http://localhost:9002",
        secure: false
    }
]

module.exports = PROXY_CONFIG