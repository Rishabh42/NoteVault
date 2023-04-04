import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LandingImage from "../../assets/images/landing.svg"
import MetamaskLogo from "../../assets/images/metamask.svg"
import { authenticate } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const handleLogin = () => {
        setLoading(true);
        authenticate()
            .then(() => navigate('/home'))
            .catch((err) => {
                window.alert(err);
                setLoading(false);
            });
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Grid container alignItems="center" justifyContent="center" mt={5}>
                <Grid xs={12} lg={6} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Typography variant='h3' textAlign="center" fontWeight="bold">Your ideas, your way</Typography>
                    <Typography variant='h3' textAlign="center" fontWeight="bold" color="primary">We've got your privacy covered.</Typography>
                    <br />
                    <Stack direction="row" spacing={3}>
                        <Button variant='contained' onClick={handleLogin}><img src={MetamaskLogo} height={30} />{" "}Login with Metamask</Button>
                        <Button variant='contained' onClick={() => { localStorage.setItem('storage', 'local'); navigate('/home?mode=guest'); }}>Try Guest Mode</Button>
                    </Stack>
                </Grid>
                <Grid xs={12} lg={6} display="flex" justifyContent="center">
                    <img src={LandingImage} width={350} alt="Landing image" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Landing;