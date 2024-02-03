import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { UserContext } from '../providers/AuthProviders';
import useAuth from '../shared/useAuth';
import useAdmin from '../shared/useAdmin';

export default function AdminRoute({children}) {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    // console.log(location);

    if (loading || isAdminLoading) {
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
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='*' state={{ from: location }} replace></Navigate>
}
