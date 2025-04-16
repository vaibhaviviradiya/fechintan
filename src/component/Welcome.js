import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Card, CardContent, CardActionArea, Grid, Avatar, useMediaQuery, Container } from '@mui/material';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Person, Category, Subscriptions, Inventory, ShoppingCart, Dashboard as DashboardIcon } from '@mui/icons-material';

const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    width: '100%',
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    background: 'linear-gradient(145deg, #f6f8ff 0%, #f0f3ff 100%)',
    minHeight: '100vh',
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  width: '100%',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    background: 'linear-gradient(165deg, #2D3250 0%, #424769 100%)',
    color: '#ffffff',
    borderRight: 'none',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at top right, rgba(101, 115, 255, 0.12), transparent 40%)',
      pointerEvents: 'none',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at bottom left, rgba(255, 255, 255, 0.08), transparent 40%)',
      pointerEvents: 'none',
    },
    '& .MuiListItemIcon-root': {
      color: 'rgba(255, 255, 255, 0.85)',
      minWidth: '40px',
      transition: 'all 0.3s ease',
    },
    '& .MuiListItemButton-root': {
      margin: '4px 8px',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
        transform: 'translateX(-100%)',
        transition: 'transform 0.6s ease',
      },
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        transform: 'translateX(4px)',
        '&::before': {
          transform: 'translateX(100%)',
        },
      },
      '&.Mui-selected': {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          background: 'linear-gradient(180deg, #6573ff 0%, #7b86ff 100%)',
          borderRadius: '0 4px 4px 0',
        },
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
        '& .MuiListItemIcon-root': {
          color: '#ffffff',
        },
        '& .MuiTypography-root': {
          background: 'linear-gradient(90deg, #ffffff, #e0e4ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 600,
        },
      },
    },
    '& .MuiDivider-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      margin: '16px 0',
    },
  },
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  '& .MuiGrid-item': {
    opacity: 0,
    transform: 'translateY(20px)',
    animation: 'fadeInUp 0.6s ease forwards',
    '@keyframes fadeInUp': {
      '0%': {
        opacity: 0,
        transform: 'translateY(20px)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  },
}));

function Welcome() {
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    if (isSmallScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallScreen]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  var navigate = useNavigate();

  const menuItems = [
    { title: 'Dashboard', icon: <DashboardIcon />, route: '/' },
    { title: 'User List', icon: <Person />, route: '/userlist' },
    { title: 'Categories', icon: <Category />, route: '/category-managment' },
    { title: 'Subcategories', icon: <Subscriptions />, route: '/subcategory_managment' },
    { title: 'Products', icon: <Inventory />, route: '/product_managment' },
    { title: 'Orders', icon: <ShoppingCart />, route: '/orderlist' },
  ];

  const cardData = [
    { title: 'User List', icon: <Person fontSize="large" />, color: 'linear-gradient(135deg, #6200ea 0%, #3f51b5 100%)', route: '/userlist' },
    { title: 'Category Management', icon: <Category fontSize="large" />, color: 'linear-gradient(135deg, #0091ea 0%, #00b0ff 100%)', route: '/category-managment' },
    { title: 'Subcategories', icon: <Subscriptions fontSize="large" />, color: 'linear-gradient(135deg, #00bfa5 0%, #1de9b6 100%)', route: '/subcategory_managment' },
    { title: 'Product Management', icon: <Inventory fontSize="large" />, color: 'linear-gradient(135deg, #00c853 0%, #69f0ae 100%)', route: '/product_managment' },
    { title: 'Order Management', icon: <ShoppingCart fontSize="large" />, color: 'linear-gradient(135deg, #ffd600 0%, #ffeb3b 100%)', route: '/orderlist' },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(145deg, #f6f8ff 0%, #f0f3ff 100%)' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ 
              mr: 2, 
              ...(open && { display: 'none' }),
              backgroundColor: 'rgba(26, 35, 126, 0.08)',
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: 'rgba(26, 35, 126, 0.12)',
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h5" 
            color="primary" 
            sx={{ 
              fontWeight: 700, 
              letterSpacing: 1,
              background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Luxe Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <StyledDrawer
        variant={isSmallScreen ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ 
              background: 'linear-gradient(135deg, #6573ff 0%, #7b86ff 100%)',
              width: 40,
              height: 40,
              boxShadow: '0 4px 12px rgba(101, 115, 255, 0.3)',
            }}>
              <DashboardIcon />
            </Avatar>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#ffffff', 
                fontWeight: 600,
                background: 'linear-gradient(90deg, #ffffff, #e0e4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dashboard
            </Typography>
          </Box>
          <IconButton 
            onClick={handleDrawerClose} 
            sx={{ 
              color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ px: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                onClick={() => handleCardClick(item.route)}
                selected={location.pathname === item.route}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText 
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: location.pathname === item.route ? 600 : 400,
                    sx: {
                      transition: 'all 0.3s ease',
                      color: location.pathname === item.route ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </StyledDrawer>
      <Main open={open}>
        <DrawerHeader />
        <Container 
          maxWidth="xl" 
          sx={{ 
            mt: 2,
            pl: { xs: 2, sm: 2, md: 2 },
            pr: { xs: 2, sm: 2, md: 2 },
          }}
        >
          <StyledGrid 
            container 
            spacing={2}
            sx={{
              width: '100%',
              margin: 0,
            }}
          >
            {cardData.map((card, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={card.title}
                sx={{ 
                  animationDelay: `${index * 0.1}s`,
                  pl: 2,
                  pr: 2,
                  pb: 2,
                }}
              >
                <Card
                  sx={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    height: '100%',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: card.color
                    }
                  }}
                >
                  <CardActionArea 
                    onClick={() => handleCardClick(card.route)}
                    sx={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '32px 20px',
                    }}
                  >
                    <Avatar
                      sx={{
                        background: card.color,
                        width: 80,
                        height: 80,
                        marginBottom: 3,
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                        }
                      }}
                    >
                      {card.icon}
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#1a237e',
                        fontWeight: 600,
                        fontSize: '1.2rem',
                        textAlign: 'center'
                      }}
                    >
                      {card.title}
                    </Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </StyledGrid>
        </Container>
      </Main>
    </Box>
  );
}

export default Welcome;