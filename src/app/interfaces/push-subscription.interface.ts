/**
* endpoint: contains a unique URL to a Firebase Cloud Messaging endpoint. This is a public,
* but unguessable endpoint to the Browser Push Service, used by the application server to
* send push notifications to this subscription.
*
* expirationTime: some messages, ex. auth codes, are time sensitive and don't need to be sent
* if a certain time interval has passed.
*
* p256dh: encryption key that our server will use to encrypt the message before sending it
* to the push Service.
*
* auth: an authentication secret, one of the inputs of the message content encryption process.
*/
export interface PushSubscription {
	endpoint: string,
	expirationTime: string,
	keys: PushSubscrionKeys,
}

export interface PushSubscrionKeys {
	p256dh: string,
	auth: string,
}