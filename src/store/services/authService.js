import API from './api'

export const registerUser = async data => {
	const response = await API.post(`/auth/seller/register`, data)
    if (response.status=200) {
        localStorage.setItem('access_token', response.data.access_token)
    }
    else {
        console.log('Error registering user:', response.status, response.data)
    }

	return response.data
}

export const loginUser = async data => {
    const response = await API.post(`/auth/seller/login`, data)
    if (response.status=200) {
        localStorage.setItem('access_token', response.data.access_token)
    }
    else {
        console.log('Error logging in user:', response.status, response.data)
    }

    return response.data
}