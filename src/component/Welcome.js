import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Card, CardContent, CardActionArea, Grid } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { Person, Category, Subscriptions, Inventory, ShoppingCart, SupportAgent, Feedback, Payment } from '@mui/icons-material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Welcome() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  var navigate = useNavigate()

  const handleCardClick = (route) => {
    if(route=='/user-list')
    {
      navigate('/userlist');  
    }
    if(route=='/cat-mgmt')
    {
      navigate('/category-managment')
    }
    if(route=='/sub-cat')
    {
      navigate('/subcategory_managment')
    }
    if(route=='/product-mgmt')
    {
      navigate('/product_managment')
    }
  };

  const cardData = [
    { title: 'User List', icon: <Person fontSize="large" />, color: '#fbbc04', route: '/user-list' },
    { title: 'Category Managment', icon: <Category fontSize="large" />, color: '#3188d4', route: '/cat-mgmt' },
    { title: 'Subcategories', icon: <Subscriptions fontSize="large" />, color: '#e21680', route: '/sub-cat' },
    { title: 'Product Managment', icon: <Inventory fontSize="large" />, color: '#34a853', route: '/product-mgmt' },
    { title: 'Order Managment', icon: <ShoppingCart fontSize="large" />, color: '#e6df5e', route: '/user-list' },
    { title: 'Customer Support', icon: <SupportAgent fontSize="large" />, color: '#4285f4', route: '/property-list' },
    { title: 'Reviews & Feedback', icon: <Feedback fontSize="large" />, color: '#f16ab0  ', route: '/transactions' },
    { title: 'Payment Transactions', icon: <Payment fontSize="large" />, color: '#7ad431 ', route: '/sold-property' }
  ];

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color='#000'>
        <Toolbar>
           <Typography fontSize={'30px'} fontFamily={"Lucida sans"} sx={{marginRight:'150px'}}>
            Luxe
          </Typography>
          <IconButton
            color="#000"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* boxes */}
         <Grid container spacing={3}>
            {cardData.map((card) => (
              <Grid item xs={12} sm={4} md={3} key={card.title}>
                <Card
                  sx={{
                    backgroundColor: card.color,
                    color: '#fff',
                    height:'200px',
                    padding:'15%'
                    // textAlign: 'center'
                  }}
                  
                >
                  <CardActionArea onClick={() => handleCardClick(card.route)}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      {card.icon}
                      <Typography variant="h3">{card.count}</Typography>
                      <Typography variant="h6">{card.title}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
      </Main>
    </Box>
    </div>
  )
}

export default Welcome