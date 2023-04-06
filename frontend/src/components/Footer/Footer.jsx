import * as React from 'react';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Typography from "@mui/material/Typography";

const Footer = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        localStorage.setItem('cookie-consent', 'true');
        setOpen(false);
    }
    return (
        <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ backgroundColor: "primary.main", position: 'fixed', bottom: 0, width: "100%", p: 2, boxShadow: 5 }}>
            <Typography color="white" component="a" href="/privacy-policy" sx={{ textDecoration: "none" }}>Privacy Policy</Typography>
            <Typography color="white" component="a" onClick={handleOpen}>Cookie Policy</Typography>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                ContentProps={{ sx: { backgroundColor: '#fff', color: "primary.main", fontSize: 18 } }}
                open={open}
                onClose={handleClose}
                message="We use cookies for solely one purpose - to store an access token to authenticate you while logged in. It's as simple as that! No other hidden cookies :)"
                action={<Button variant="contained" onClick={handleClose}>OK</Button>}
            />
        </Box>
    )
}

export default Footer;