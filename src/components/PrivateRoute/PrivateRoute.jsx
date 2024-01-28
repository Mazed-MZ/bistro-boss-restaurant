import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { UserContext } from '../providers/AuthProviders';

export default function PrivateRoute({ children }) {
    const { user, loading } = useContext(UserContext);
    const location = useLocation();
    // console.log(location);

    if (loading) {
        return <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="secondary" />
            <LinearProgress color="secondary" />
            <LinearProgress color="secondary" />
            <LinearProgress color="secondary" />
            <LinearProgress color="secondary" />
            <LinearProgress color="secondary" />
            <LinearProgress color="secondary" />
            <LinearProgress color="success" />
            <LinearProgress color="success" />
            <LinearProgress color="success" />
            <LinearProgress color="success" />
            <LinearProgress color="success" />
            <LinearProgress color="success" />
            <LinearProgress color="success" />
            <LinearProgress color="success" />
            <LinearProgress color="success" />
            <LinearProgress color="success" />
            <LinearProgress color="success" />
            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
        </Stack>
    }
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
}
