const PROXY_CONFIG = [
    /*{
        context: [
            "/ccal",
        ],
        target: "http://localhost:9003",
        secure: false
    },*/
    {
        context: [
			"/todo/ccal",
            "/todo/birthdays/getBirthdays",
			"/todo/birthdays/deleteBirthday",
            "/todo/birthdays/addBirthday",
            "/todo/birthdays/editBirthday",
			"/todo/gifts/addGift",
            "/todo/gifts/editGift",
			"/todo/meetings/addMeeting",
			"/todo/meetings/deleteMeeting",
			"/todo/meetings/editMeeting",
			"/todo/meetings/getMeetings",
            "/todo/settings/loadSettings",
			"/todo/settings/saveSettings",
        ],
        target: "http://localhost:9002",
        secure: false
    }
]

module.exports = PROXY_CONFIG