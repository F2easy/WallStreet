import { Navigate } from 'react-router-dom'
import React from 'react';
export default function RequireAuth({ user, children }) {

	return user !== null ? children : <Navigate to='/sign-in' replace />
}
