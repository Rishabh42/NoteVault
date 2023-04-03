import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
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
                    <Typography variant='h3' textAlign="center" fontWeight="bold">Taking notes.</Typography>
                    <Typography variant='h3' textAlign="center" fontWeight="bold" color="primary">Privacy redefined.</Typography>
                    <br />
                    <Button variant='contained' onClick={handleLogin}><img src={MetamaskLogo} height={30} />{" "}Login with Metamask</Button>
                </Grid>
                <Grid xs={12} lg={6} display="flex" justifyContent="center">
                    <img src={LandingImage} width={350} alt="Landing image" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Landing;