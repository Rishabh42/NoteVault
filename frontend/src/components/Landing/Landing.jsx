import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LandingImage from "../../assets/images/landing.svg"
import MetamaskLogo from "../../assets/images/metamask.svg";
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { authenticate } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const cookieConsent = localStorage.getItem('cookie-consent');
        if (!cookieConsent || cookieConsent === "false") {
            setOpen(true);
        }
    }, []);

    const handleLogin = () => {
        setLoading(true);
        authenticate()
            .then(() => navigate('/home'))
            .catch((err) => {
                window.alert(err);
                setLoading(false);
            });
    };

    const handleClose = () => {
        localStorage.setItem('cookie-consent', 'true');
        setOpen(false);
    }

    return (
        <Box sx={{ flexGrow: 0, mb: 6 }}>
            <Grid container alignItems="center" justifyContent="center" mt={5}>
                <Grid xs={12} lg={6} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Typography variant='h2' textAlign="center" fontWeight="bold">Your ideas, your way.</Typography>
                    <Typography variant='h2' textAlign="center" fontWeight="bold" color="primary">We've got your privacy covered.</Typography>
                    <br />
                    <Stack direction="row" spacing={3}>
                        <Button variant='contained' sx={{ fontWeight: "bold" }} onClick={handleLogin}><img src={MetamaskLogo} height={30} />{" "}Login with Metamask</Button>
                        <Button variant='contained' sx={{ fontWeight: "bold" }} onClick={() => { localStorage.setItem('storage', 'local'); navigate('/home?mode=guest'); }}>Try Guest Mode</Button>
                    </Stack>
                </Grid>
                <Grid xs={12} lg={6} display="flex" justifyContent="center">
                    <img src={LandingImage} width={450} alt="Landing image" />
                </Grid>
            </Grid>
            <Grid container p={5} mt={10} sx={{ backgroundColor: "primary.main", color: "white" }}>
                <Grid xs={12}>
                    <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">All the privacy features at your fingertips</Typography>
                </Grid>
                <Grid xs={12} lg={4} display="flex" flexDirection="column" alignItems="center">
                    <VpnKeyIcon sx={{ fontSize: 75 }} />
                    <Typography variant="h6" fontWeight="bold" textAlign="center">Single click secure login through Metamask</Typography>
                </Grid>
                <Grid xs={12} lg={4} display="flex" flexDirection="column" alignItems="center">
                    <SecurityIcon sx={{ fontSize: 75 }} />
                    <Typography fontWeight="bold" variant="h6" textAlign="center">Encrypted notes from start to finish</Typography>
                </Grid>
                <Grid xs={12} lg={4} display="flex" flexDirection="column" alignItems="center">
                    <StorageIcon sx={{ fontSize: 75 }} />
                    <Typography variant="h6" fontWeight="bold" textAlign="center">Store your notes locally or in the cloud</Typography>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                ContentProps={{ sx: { backgroundColor: '#fff', color: "primary.main", fontSize: 18 } }}
                open={open}
                onClose={handleClose}
                message="We use cookies for solely one purpose - to store an access token to authenticate you while logged in. It's as simple as that! No other hidden cookies :)"
                action={<Button variant="contained" onClick={handleClose}>OK</Button>}
            />
        </Box>
    );
};

export default Landing;