const fetch = require('node-fetch')

const { ADMIN_SECRET, HASURA_GQL_URL } = process.env

const query = `
	mutation registerUser(
		$userId: uuid!,
		$email: String!,
	) {
		insert_user_one(
			object: {
				userId: $userId,
				email: $email,
			}
		) {
			userId
			email
			rewardPoints
		}
  	} 
`

exports.handler = (event, context, callback) => {
	console.log(event)
	try {
		const queryVariables = {
			userId: event.request.userAttributes.sub,
			email: event.request.userAttributes.email,
		}

		fetch(`${HASURA_GQL_URL}/v1/graphql`, {
			method: 'POST',
			body: JSON.stringify({
				query,
				variables: queryVariables
			}),
			headers: {
				'Content-Type': 'application/json',
				'x-hasura-admin-secret': ADMIN_SECRET
			}
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json)
				callback(null, event)
			})
	} catch (e) {
		console.err(e)
		callback(null, event)
	}
}