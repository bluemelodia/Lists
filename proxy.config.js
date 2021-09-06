const PROXY_CONFIG = [
    {
        context: [
            "/ccal",
        ],
        target: "http://localhost:9002",
        secure: false
    },
    {
        context: [
            "/todo/addBirthday",
            "/todo/editBirthday",
            "/todo/getBirthdays",
            "/todo/deleteBirthday",
			"/todo/loadSettings",
			"/todo/saveSettings"
        ],
        target: "http://localhost:9003",
        secure: false
    }
]

module.exports = PROXY_CONFIG