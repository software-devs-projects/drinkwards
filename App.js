import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { withAuthenticator } from 'aws-amplify-react-native'
import { Auth } from 'aws-amplify'
import UserHomeScreen from './src/UserHomeScreen'
import BusinessHomeScreen from './src/BusinessHomeScreen'
import Icon from 'react-native-vector-icons/FontAwesome'

Icon.loadFont();

const App = () => {
	const [user, setUser] = useState(null)

	const getUser = async () => {
		const user = await Auth.currentAuthenticatedUser()
		setUser(user)
	}

	useEffect(() => {
		getUser()
	}, [])

	return (
		<>
			{(() => {
				if (!user) {
					return <Text>Loading</Text>
				} else {
					const group = user.signInUserSession.accessToken.payload['cognito:groups']
					if (group.includes('business')) {
						return <BusinessHomeScreen />
					}
					return <UserHomeScreen />
				}
			})()}
		</>
	)

}

export default withAuthenticator(App)
