import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native'
import { Auth } from 'aws-amplify'
import UserMain from './src/UserMain'
import BusinessHomeScreen from './src/BusinessHomeScreen'
import Icon from 'react-native-vector-icons/FontAwesome'

Icon.loadFont();

const SignInButton = Object.assign({}, AmplifyTheme.button,
	{
		backgroundColor: '#AA4B2B',
		borderRadius: 25,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.6,
		shadowRadius: 4.65,
		elevation: 6
	})
const MyTheme = Object.assign({}, AmplifyTheme, { button: SignInButton, })

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
					return <UserMain />
				}
			})()}
		</>
	)

}
const signUpConfig = {
	hideAllDefaults: true,
	signUpFields: [
		{
			label: 'Email',
			key: 'email',
			required: true,
			placeholder: 'Email',
			type: 'email',
			displayOrder: 1
		},
		{
			label: 'Password',
			key: 'password',
			required: true,
			placeholder: 'Password',
			type: 'password',
			displayOrder: 2
		}
	]
};

export default withAuthenticator(
	App,
	{
		signUpConfig: signUpConfig,
	},
	[],
	null,
	MyTheme
)
