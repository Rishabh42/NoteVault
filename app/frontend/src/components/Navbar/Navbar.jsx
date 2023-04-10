import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Note from '@mui/icons-material/NotesTwoTone';
import Circle from '@mui/icons-material/CircleTwoTone';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../../axios';
import { authenticate } from '../../services/auth.service';
import MetamaskLogo from "../../assets/images/metamask.svg"
import Web3 from 'web3';

/**
 * Component for the navbar
 * @returns 
 */
function ResponsiveAppBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const authenticated = location.pathname === "/home" && searchParams.get('mode') !== "guest"
    const pages = authenticated ? ['Home'] : [''];
    const [address, setAddress] = React.useState("");
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            const address = await getAddress();
            setAddress(address);
        })()
    }, [])

    /**
     * This function retrieves the Metamask account public address of the user.
     * @returns 
     */
    const getAddress = async () => {
        let web3 = new Web3(window.ethereum);
        const coinbase = await web3.eth.getCoinbase();
        return coinbase;
    };

    // The below functions are used for the responsiveness of the navbar
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    /**
    * The function is used to trigger the Metamask login process. Called when user clicks on Sign in with MetaMask button.
    */
    const handleLogin = () => {
        authenticate()
            .then(() => navigate('/home'))
            .catch((err) => {
                window.alert(err);
            });
    }

    /**
     * This function closes the user session
     */
    const handleLogout = async () => {
        try {
            const response = await axios.get('/auth/logout');
            if (response.status === 202) {
                navigate('/')
            }
        } catch {
            alert("Error logging out");
        }
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Note sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        NoteVault
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" component="a" onClick={page === "Home" ? () => navigate("/home") : () => handleLogin()}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Note sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        NoteVault
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={page === "Home" ? () => navigate("/home") : () => handleLogin()}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {authenticated ? <Box sx={{ flexGrow: 0 }}>
                        {address && <Tooltip title="Your account">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Chip sx={{ boxShadow: 3, color: 'whitesmoke', }} label={<Box display="flex" alignItems="center"><Circle color='success' sx={{ fontSize: 15, mr: 0.5 }} />{address.slice(0, 6) + '...' + address.slice(36)}</Box>} />
                            </IconButton>
                        </Tooltip>}
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key={'logout'} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center" component="a" onClick={handleLogout}>Log Out</Typography>
                            </MenuItem>
                        </Menu>

                    </Box> : <Button
                        onClick={handleLogin}
                        variant="contained"
                        sx={{ my: 2, color: "primary.main", backgroundColor: "#eee", fontWeight: "bold" }}
                    >
                        <img src={MetamaskLogo} alt="Metamask logo" height={20} />
                        Login with Metamask
                    </Button>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
