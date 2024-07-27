import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ClientSettingsDialog from "./ClientSettingsDialog.tsx";

const settings = ['Settings'];

export function EventsAppBar() {
    const [openClientSettings, setOpenClientSettings] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        handleClickOpenClientSettingsFormDialog()
        setAnchorElUser(null);
    };

    const handleClickOpenClientSettingsFormDialog = () => {
        setOpenClientSettings(true);
    };

    const handleCloseClientSettingsFormDialog = () => {
        setOpenClientSettings(false);
    };

    return (
        <>
            <AppBar position="static" style={{ backgroundColor: '#252850' }}>
                <Container>
                    <Toolbar>
                        <img
                            src={'/logo.png'}
                            alt='tuttoevents logo'
                            width={50}
                            height={50}
                            style={{ marginRight: 20 }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component="p"
                            sx={{
                                mr: 10,
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TuttoEvents
                        </Typography>

                        <Box sx={{ flexGrow: 1}}></Box>

                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="profile tuttodev" src="/profile.png"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
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
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <ClientSettingsDialog
                handleClose={handleCloseClientSettingsFormDialog}
                open={openClientSettings}
            />
        </>
    );
}
